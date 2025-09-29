import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import drHelenAvatar from '../assets/dr-helen-avatar.jpg';

const EnhancedAvatar = ({ 
  isActive = false, 
  onSpeakingChange, 
  meditationMode = false,
  currentText = '',
  showControls = true 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsSpeaking(false);
      if (onSpeakingChange) onSpeakingChange(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsSpeaking(true);
      if (onSpeakingChange) onSpeakingChange(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsSpeaking(false);
      if (onSpeakingChange) onSpeakingChange(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [onSpeakingChange]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Avatar speaking animation
  const avatarVariants = {
    idle: {
      scale: 1,
      boxShadow: "0 0 20px rgba(218, 165, 32, 0.3)",
    },
    speaking: {
      scale: [1, 1.02, 1],
      boxShadow: [
        "0 0 20px rgba(218, 165, 32, 0.3)",
        "0 0 30px rgba(218, 165, 32, 0.6)",
        "0 0 20px rgba(218, 165, 32, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/smriti_meditation_improved_inflection.mp3"
        preload="metadata"
      />

      {/* Avatar Container */}
      <motion.div
        className="relative"
        variants={avatarVariants}
        animate={isSpeaking ? "speaking" : "idle"}
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand-gold shadow-2xl">
          <img
            src={drHelenAvatar}
            alt="Dr. Helen Thomas DC"
            className="w-full h-full object-cover"
          />
          
          {/* Speaking Indicator Overlay */}
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-brand-gold/20 to-transparent"
              />
            )}
          </AnimatePresence>

          {/* Meditation Mode Indicator */}
          {meditationMode && (
            <div className="absolute top-2 right-2 bg-brand-orange/90 rounded-full p-2">
              <Heart className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Speaking Animation Rings */}
        <AnimatePresence>
          {isSpeaking && (
            <>
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-brand-gold"
              />
              <motion.div
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full border-2 border-brand-orange"
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Current Text Display */}
      <AnimatePresence>
        {currentText && isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md text-center"
          >
            <Card className="border-brand-gold/30 bg-gradient-to-r from-brand-gold/10 to-brand-orange/10">
              <CardContent className="pt-4">
                <p className="text-brand-earth italic leading-relaxed">
                  "{currentText}"
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Controls */}
      {showControls && (
        <div className="flex flex-col items-center space-y-3 w-full max-w-md">
          {/* Play/Pause and Mute Controls */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={togglePlayPause}
              className={`${
                isPlaying 
                  ? 'bg-brand-orange hover:bg-brand-orange/90' 
                  : 'bg-brand-gold hover:bg-brand-gold/90'
              } text-white rounded-full w-12 h-12 p-0`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>

            <Button
              onClick={toggleMute}
              variant="outline"
              className="border-brand-earth text-brand-earth hover:bg-brand-earth hover:text-white rounded-full w-10 h-10 p-0"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-gold to-brand-orange"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Time Display */}
            <div className="flex justify-between text-xs text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Meditation Title */}
          {meditationMode && (
            <div className="text-center">
              <h3 className="text-brand-gold font-semibold">Smṛti Meditation</h3>
              <p className="text-sm text-brand-earth">Remembrance of Wholeness</p>
            </div>
          )}
        </div>
      )}

      {/* Status Text */}
      <div className="text-center">
        <p className="text-sm text-brand-earth">
          {isSpeaking 
            ? "Dr. Helen is guiding your meditation..." 
            : meditationMode 
              ? "Ready to begin your healing journey" 
              : "Dr. Helen Thomas DC - 44 years of healing wisdom"
          }
        </p>
      </div>
    </div>
  );
};

export default EnhancedAvatar;
