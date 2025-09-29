import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Play, Pause, Square, Volume2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { meditationScripts, MeditationSession } from '../data/meditationScripts';
import EnhancedAvatar from './EnhancedAvatar';

const Meditation = ({ avatar, userConstitution }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedMeditation, setSelectedMeditation] = useState('smriti_meditation');

  const startMeditation = async (scriptName) => {
    if (currentSession) {
      currentSession.stop();
    }

    const session = new MeditationSession(scriptName, {
      speak: async (text, options) => {
        setCurrentText(text);
        // Simulate speaking with avatar
        if (avatar && avatar.speak) {
          await avatar.speak(text, options);
        } else {
          // Fallback: use Web Speech API
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.8;
          utterance.pitch = 1.1;
          utterance.volume = 0.9;
          speechSynthesis.speak(utterance);
          
          return new Promise(resolve => {
            utterance.onend = resolve;
          });
        }
      },
      setMode: (mode) => {
        console.log(`Avatar mode: ${mode}`);
      },
      pauseSpeaking: () => {
        speechSynthesis.pause();
      },
      resumeSpeaking: () => {
        speechSynthesis.resume();
      },
      stopSpeaking: () => {
        speechSynthesis.cancel();
      }
    });

    setCurrentSession(session);
    setIsPlaying(true);
    setSelectedMeditation(scriptName);
    
    await session.start();
  };

  const pauseMeditation = () => {
    if (currentSession) {
      currentSession.pause();
      setIsPlaying(false);
    }
  };

  const resumeMeditation = () => {
    if (currentSession) {
      currentSession.resume();
      setIsPlaying(true);
    }
  };

  const stopMeditation = () => {
    if (currentSession) {
      currentSession.stop();
      setCurrentSession(null);
      setIsPlaying(false);
      setCurrentText('');
      setProgress(0);
    }
  };

  const getConstitutionalAffirmations = () => {
    if (!userConstitution) return [];
    
    const primaryDosha = userConstitution.split('-')[0].toLowerCase();
    return meditationScripts.constitutional_affirmations[primaryDosha] || [];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-brand-gold"
        >
          <Heart className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Sacred Meditation with Dr. Helen</h2>
          <Heart className="w-6 h-6" />
        </motion.div>
        <p className="text-brand-earth text-lg">
          Guided meditations combining Ayurvedic wisdom with healing presence
        </p>
      </div>

      {/* Meditation Selection */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-brand-gold/20 hover:border-brand-gold/40 transition-colors cursor-pointer"
              onClick={() => setSelectedMeditation('smriti_meditation')}>
          <CardHeader>
            <CardTitle className="text-brand-gold flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Smṛti Meditation
            </CardTitle>
            <CardDescription>
              Remembrance of your wholeness and innate healing power
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-brand-earth">
              Duration: 8-10 minutes • Sanskrit mantra included
            </p>
            <p className="text-xs text-gray-600 mt-2">
              "Smritih Purnata Swabhavah" - Remembrance is the nature of wholeness
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-gold/20 hover:border-brand-gold/40 transition-colors cursor-pointer"
              onClick={() => setSelectedMeditation('guided_breathing')}>
          <CardHeader>
            <CardTitle className="text-brand-gold flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Pranayama Practice
            </CardTitle>
            <CardDescription>
              Constitutional breathing for dosha balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-brand-earth">
              Duration: 5-7 minutes • Nadi Shodhana technique
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Constitutional Affirmations */}
      {userConstitution && (
        <Card className="border-brand-mustard/20">
          <CardHeader>
            <CardTitle className="text-brand-mustard">
              Your {userConstitution} Affirmations
            </CardTitle>
            <CardDescription>
              Personalized healing affirmations for your constitution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getConstitutionalAffirmations().map((affirmation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-brand-mustard/10 rounded-lg border-l-4 border-brand-mustard"
                >
                  <p className="text-brand-earth italic">"{affirmation}"</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dr. Helen's Avatar with Integrated Audio */}
      <Card className="border-brand-gold/30">
        <CardHeader>
          <CardTitle className="text-brand-gold text-center">
            Smṛti Meditation with Dr. Helen
          </CardTitle>
          <CardDescription className="text-center">
            Guided remembrance of your wholeness and innate healing power
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <EnhancedAvatar
              isActive={isPlaying}
              onSpeakingChange={setIsPlaying}
              meditationMode={true}
              currentText={currentText}
              showControls={true}
            />
          </div>

          {/* Sanskrit Pronunciation Guide */}
          {selectedMeditation === 'smriti_meditation' && (
            <div className="mt-4 p-3 bg-brand-orange/10 rounded-lg">
              <h4 className="font-semibold text-brand-orange mb-2">Sanskrit Pronunciation:</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Smṛti:</strong> SMRI-ti (remembrance)</p>
                <p><strong>Smritih Purnata Swabhavah:</strong> SMRI-tih PUR-na-ta SVA-bha-vah</p>
                <p className="text-xs text-gray-600 mt-2">
                  "Remembrance is the nature of wholeness"
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clinical Notes */}
      <Card className="border-brand-earth/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-brand-earth mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-brand-earth">
                <strong>Clinical Wisdom:</strong> These meditations activate the parasympathetic nervous system 
                and support deep healing by reconnecting with our essential nature. Regular practice helps 
                balance the doshas and restore natural healing capacity.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                — Dr. Helen Thomas DC, 44 years of clinical experience
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Meditation;
