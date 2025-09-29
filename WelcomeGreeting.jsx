import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Star, Clock, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import drHelenAvatar from '../assets/dr-helen-avatar.jpg';

const WelcomeGreeting = ({ onStartTour, onSubscribe }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      // Show CTA after 30 seconds
      if (audio.currentTime > 30 && !showCTA) {
        setShowCTA(true);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowCTA(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
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
  }, [showCTA]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gold/10 via-white to-brand-orange/10 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Audio Element */}
        <audio
          ref={audioRef}
          src="/gary_halbert_greeting.mp3"
          preload="metadata"
        />

        {/* Header with Urgency */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4 mr-2" />
            Limited Time - New Members Only
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-brand-earth leading-tight">
            Stop Guessing About<br />
            <span className="text-brand-gold">Your Health</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-earth/80 max-w-3xl mx-auto leading-relaxed">
            Discover the <strong>constitutional blueprint</strong> that took me 44 years 
            and 15,000 patients to perfect
          </p>
        </motion.div>

        {/* Dr. Helen Avatar with Play Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-brand-gold shadow-2xl">
            <img
              src={drHelenAvatar}
              alt="Dr. Helen Thomas DC"
              className="w-full h-full object-cover"
            />
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                onClick={togglePlayPause}
              >
                <div className="bg-brand-gold hover:bg-brand-gold/90 rounded-full p-6 transition-colors">
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
              </motion.div>
            )}

            {/* Speaking Animation */}
            {isPlaying && (
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(218, 165, 32, 0.3)",
                    "0 0 40px rgba(218, 165, 32, 0.8)",
                    "0 0 20px rgba(218, 165, 32, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
            )}
          </div>

          {/* Audio Controls */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-4"
            >
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={togglePlayPause}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full w-12 h-12 p-0"
                >
                  <Pause className="w-6 h-6" />
                </Button>

                <Button
                  onClick={toggleMute}
                  variant="outline"
                  className="border-brand-earth text-brand-earth hover:bg-brand-earth hover:text-white rounded-full w-10 h-10 p-0"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-gold to-brand-orange"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <Card className="border-brand-gold/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <Users className="w-8 h-8 text-brand-gold mx-auto mb-3" />
              <h3 className="font-semibold text-brand-earth mb-2">15,000+ Patients</h3>
              <p className="text-sm text-brand-earth/70">44 years of clinical wisdom</p>
            </CardContent>
          </Card>

          <Card className="border-brand-orange/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <Star className="w-8 h-8 text-brand-orange mx-auto mb-3" />
              <h3 className="font-semibold text-brand-earth mb-2">AI-Powered Guidance</h3>
              <p className="text-sm text-brand-earth/70">Personalized answers 24/7</p>
            </CardContent>
          </Card>

          <Card className="border-brand-gold/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <Clock className="w-8 h-8 text-brand-gold mx-auto mb-3" />
              <h3 className="font-semibold text-brand-earth mb-2">Just $19/Month</h3>
              <p className="text-sm text-brand-earth/70">Less than your coffee budget</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-brand-gold to-brand-orange p-8 rounded-2xl text-white max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Stop Guessing?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Join thousands who've discovered their unique constitutional blueprint
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={onSubscribe}
                    className="bg-white text-brand-gold hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                  >
                    Start Your Journey - $19/Month
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button
                    onClick={onStartTour}
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 text-lg"
                  >
                    Take Free Tour First
                  </Button>
                </div>
              </div>

              <p className="text-sm text-brand-earth/60 max-w-md mx-auto">
                Cancel anytime. No questions asked. But once you experience personalized 
                health guidance that actually works, you'll never want to go back.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA for non-audio users */}
        {!isPlaying && !showCTA && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="space-y-4"
          >
            <p className="text-brand-earth/70">
              👆 Click Dr. Helen's photo to hear her personal message
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onSubscribe}
                className="bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold px-8 py-3"
              >
                Skip to Subscription - $19/Month
              </Button>
              <Button
                onClick={onStartTour}
                variant="outline"
                className="border-brand-earth text-brand-earth hover:bg-brand-earth hover:text-white font-semibold px-8 py-3"
              >
                Explore First (Free)
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WelcomeGreeting;
