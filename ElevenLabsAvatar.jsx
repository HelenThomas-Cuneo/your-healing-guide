import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';
import drHelenAvatar from '../assets/dr-helen-avatar.jpg';

const ElevenLabsAvatar = ({ 
  script = "", 
  autoPlay = false, 
  size = "large",
  onSpeakingStart,
  onSpeakingEnd 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  // Avatar size configurations
  const sizeConfig = {
    small: { width: 'w-16 h-16', text: 'text-xs' },
    medium: { width: 'w-24 h-24', text: 'text-sm' },
    large: { width: 'w-32 h-32', text: 'text-base' },
    xlarge: { width: 'w-48 h-48', text: 'text-lg' }
  };

  const currentSize = sizeConfig[size] || sizeConfig.large;

  // Generate speech using ElevenLabs API
  const generateSpeech = async (text) => {
    if (!text || isMuted) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/voice-cloning/generate-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: text,
          voice_id: 'dj4xxt8wpTWpR9yAZcfn' // Dr. Helen's voice ID
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Create and play audio
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onloadstart = () => {
          setIsLoading(false);
          setIsSpeaking(true);
          setIsPlaying(true);
          onSpeakingStart?.();
        };

        audio.onended = () => {
          setIsSpeaking(false);
          setIsPlaying(false);
          onSpeakingEnd?.();
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          setIsSpeaking(false);
          setIsPlaying(false);
          setIsLoading(false);
          onSpeakingEnd?.();
          console.error('Audio playback error');
        };

        await audio.play();
      } else {
        console.error('Failed to generate speech');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      setIsLoading(false);
    }
  };

  // Handle avatar click
  const handleAvatarClick = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
      setIsPlaying(false);
    } else if (script && !isLoading) {
      generateSpeech(script);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && script && !isMuted && !isLoading) {
      const timer = setTimeout(() => {
        generateSpeech(script);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, script, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Image */}
      <motion.div
        className={`
          avatar-container ${currentSize.width} cursor-pointer relative
          ${isSpeaking ? 'avatar-speaking' : ''}
          ${isLoading ? 'avatar-loading' : ''}
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

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center"
          >
            <motion.div
              className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}

        {/* Play/Pause overlay */}
        {!isLoading && (
          <motion.div
            className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white ml-1" />
            )}
          </motion.div>
        )}
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
            disabled={isLoading}
            className="text-brand-gold hover:text-brand-orange"
          >
            {isLoading ? 'Generating...' : isPlaying ? 'Stop' : 'Speak'}
          </Button>
        )}
      </div>

      {/* Speaking status */}
      {(isSpeaking || isLoading) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center ${currentSize.text} text-brand-gold font-medium`}
        >
          {isLoading ? 'Preparing Dr. Helen\'s voice...' : 'Dr. Helen is speaking...'}
        </motion.div>
      )}
    </div>
  );
};

export default ElevenLabsAvatar;
