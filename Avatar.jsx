import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import drHelenAvatar from '../assets/dr-helen-avatar.jpg'

const Avatar = ({ 
  script = "", 
  autoPlay = false, 
  size = "large",
  onSpeakingStart,
  onSpeakingEnd 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)
  const synthRef = useRef(null)

  // Avatar size configurations
  const sizeConfig = {
    small: { width: 'w-16 h-16', text: 'text-xs' },
    medium: { width: 'w-24 h-24', text: 'text-sm' },
    large: { width: 'w-32 h-32', text: 'text-base' },
    xlarge: { width: 'w-48 h-48', text: 'text-lg' }
  }

  const currentSize = sizeConfig[size] || sizeConfig.large

  // Text-to-Speech function using Web Speech API
  const speakText = (text) => {
    if (!text || isMuted) return

    // Cancel any ongoing speech
    if (synthRef.current) {
      window.speechSynthesis.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Configure voice to sound like Jen Psaki (professional, clear, trustworthy)
    utterance.rate = 0.8 // Slower for better clarity
    utterance.pitch = 1.0 // Natural pitch for better understanding
    utterance.volume = 1.0 // Full volume for clarity

    // Try to find a suitable voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google US English') || 
      voice.name.includes('Microsoft Zira') ||
      voice.name.includes('Samantha') || 
      voice.name.includes('Karen') || 
      voice.name.includes('Susan') ||
      (voice.lang.includes('en-US') && voice.name.includes('Female'))
    ) || voices.find(voice => voice.lang.includes('en-US') && voice.localService)

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
      setIsPlaying(true)
      onSpeakingStart?.()
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPlaying(false)
      onSpeakingEnd?.()
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPlaying(false)
      onSpeakingEnd?.()
    }

    synthRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  // Handle avatar click
  const handleAvatarClick = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsPlaying(false)
    } else if (script) {
      speakText(script)
    }
  }

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && script && !isMuted) {
      const timer = setTimeout(() => {
        speakText(script)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [autoPlay, script, isMuted])

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices()
    }
    
    loadVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Image */}
      <motion.div
        className={`
          avatar-container ${currentSize.width} cursor-pointer relative
          ${isSpeaking ? 'avatar-speaking' : ''}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAvatarClick}
        animate={isSpeaking ? {
          boxShadow: [
            "0 0 0 0 rgba(212, 175, 55, 0.7)",
            "0 0 0 10px rgba(212, 175, 55, 0)",
            "0 0 0 0 rgba(212, 175, 55, 0.7)"
          ]
        } : {}}
        transition={{ duration: 1.5, repeat: isSpeaking ? Infinity : 0 }}
      >
        <img
          src={drHelenAvatar}
          alt="Dr. Helen Thomas DC"
          className="w-full h-full object-cover rounded-full"
        />
        
        {/* Speaking indicator */}
        {isSpeaking && (
          <motion.div
            className="absolute inset-0 border-4 border-brand-gold rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 0.4, 0.8]
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Play/Pause overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white" />
          ) : (
            <Play className="h-8 w-8 text-white ml-1" />
          )}
        </motion.div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMuted(!isMuted)}
          className="text-brand-gold hover:text-brand-orange"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        
        {script && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAvatarClick}
            className="text-brand-gold hover:text-brand-orange"
          >
            {isPlaying ? 'Stop' : 'Speak'}
          </Button>
        )}
      </div>

      {/* Speaking status */}
      {isSpeaking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center ${currentSize.text} text-brand-gold font-medium`}
        >
          Dr. Helen is speaking...
        </motion.div>
      )}
    </div>
  )
}

export default Avatar
