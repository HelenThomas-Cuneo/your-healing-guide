import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Heart, 
  Users, 
  Crown, 
  Shield, 
  Sparkles, 
  Home,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FamilyWisdom = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const familyRoles = [
    {
      id: 'elders',
      title: 'Elders — The Kapha Draft Horse',
      icon: <Crown className="w-6 h-6" />,
      dosha: 'Kapha',
      color: 'bg-green-100 border-green-300 text-green-800',
      description: 'Strong, steady, carrying the wisdom of the herd',
      affirmation: 'I am the ground of our herd. My strength holds us steady.',
      qualities: ['Wisdom', 'Stability', 'Patience', 'Grounding'],
      guidance: [
        'Share stories and traditional knowledge',
        'Provide emotional stability during family challenges',
        'Maintain family traditions and rituals',
        'Offer unconditional love and acceptance'
      ],
      ayurvedic_role: 'The foundation of family dharma, providing stability and wisdom through life experience.',
      meditation_focus: 'Deep belly breathing, feeling your strength as the family\'s foundation'
    },
    {
      id: 'parents',
      title: 'Parents — The Pitta Work Horse',
      icon: <Shield className="w-6 h-6" />,
      dosha: 'Pitta',
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      description: 'Radiant, fiery-eyed, pulling the chariot of family life',
      affirmation: 'I guide with vision, I protect with love.',
      qualities: ['Leadership', 'Protection', 'Vision', 'Discipline'],
      guidance: [
        'Set clear boundaries with loving firmness',
        'Balance work and family responsibilities',
        'Model healthy habits and values',
        'Create structure while allowing flexibility'
      ],
      ayurvedic_role: 'The active force that guides and protects, maintaining family balance and direction.',
      meditation_focus: 'Steady breathing, visualizing yourself as a radiant protector and guide'
    },
    {
      id: 'children',
      title: 'Children — The Vata Colts',
      icon: <Sparkles className="w-6 h-6" />,
      dosha: 'Vata',
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      description: 'Playful foals, prancing and leaping in the meadow',
      affirmation: 'My laughter is medicine, my wonder is renewal.',
      qualities: ['Joy', 'Wonder', 'Creativity', 'Renewal'],
      guidance: [
        'Express creativity and natural curiosity',
        'Bring lightness and joy to family moments',
        'Learn through play and exploration',
        'Trust in the family\'s love and protection'
      ],
      ayurvedic_role: 'The life force that brings renewal, joy, and fresh perspective to the family.',
      meditation_focus: 'Light breathing, imagining yourself as a joyful foal bringing medicine through laughter'
    },
    {
      id: 'siblings',
      title: 'Siblings — The Balancing Horses',
      icon: <Users className="w-6 h-6" />,
      dosha: 'Tridoshic',
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      description: 'Trotting side by side, learning balance together',
      affirmation: 'I mirror and balance, I teach and grow.',
      qualities: ['Balance', 'Mirroring', 'Growth', 'Companionship'],
      guidance: [
        'Support each other through challenges',
        'Learn patience and sharing',
        'Celebrate individual differences',
        'Create lifelong bonds of friendship'
      ],
      ayurvedic_role: 'The mirrors that reflect and balance, teaching patience and mutual growth.',
      meditation_focus: 'Rhythmic breathing, feeling the balance and harmony with your siblings'
    }
  ];

  const familyPractices = [
    {
      title: 'The Family Meal — Shared Harvest',
      icon: <Heart className="w-5 h-5" />,
      description: 'Together we nourish, together we thrive',
      practices: [
        'Begin meals with gratitude',
        'Share stories from the day',
        'Eat mindfully without distractions',
        'Include all family members in preparation'
      ]
    },
    {
      title: 'The Home — The Stable of the Soul',
      icon: <Home className="w-5 h-5" />,
      description: 'Our home is sanctuary. Here we heal, here we belong',
      practices: [
        'Create sacred spaces for family gathering',
        'Maintain cleanliness and order',
        'Fill the home with love and laughter',
        'Establish routines that bring comfort'
      ]
    }
  ];

  const meditationScript = {
    introduction: "Welcome, family. Close your eyes and take three deep breaths. Imagine a wide, open meadow at sunrise. The air is fresh, the earth is steady, and around you stand gentle, powerful horses. You are part of their herd — a family of strength, love, and rhythm.",
    closing: "Take three deep breaths. Feel the herd within your family — elders, parents, children, siblings — moving as one. Place a hand on your heart and whisper: We are strong together. We are love together."
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 text-brand-gold"
        >
          <Users className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Ancient Wisdom on Family</h2>
          <Heart className="w-8 h-8" />
        </motion.div>
        <p className="text-brand-earth text-lg max-w-3xl mx-auto">
          Discover the sacred roles within your family through the wisdom of Ayurveda and the spirit of horses. 
          Each family member embodies unique qualities that contribute to the harmony of the whole.
        </p>
        
        <div className="bg-gradient-to-r from-brand-gold/10 to-brand-orange/10 rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-brand-gold mb-3">Horse Spirit & Herd Harmony</h3>
          <p className="text-brand-earth italic">
            "Imagine your family as a herd of horses — each with their own strength, each essential to the harmony of the whole. 
            The elders are the steady draft horses, the parents are the guiding work horses, the children are the joyful colts, 
            and siblings are the balancing companions."
          </p>
        </div>
      </div>

      {/* Family Meditation Player */}
      <Card className="border-brand-gold/30 bg-gradient-to-br from-brand-gold/5 to-brand-orange/5">
        <CardHeader>
          <CardTitle className="text-brand-gold flex items-center gap-2">
            <Play className="w-5 h-5" />
            Family Ayurveda Guided Meditation
          </CardTitle>
          <CardDescription>
            A sacred journey for the whole family to practice together
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 rounded-lg p-4 border border-brand-gold/20">
            <p className="text-brand-earth italic text-center">
              "{meditationScript.introduction}"
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-brand-gold hover:bg-brand-gold/90 text-white"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Meditation
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Begin Family Journey
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsMuted(!isMuted)}
              className="border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <Badge variant="outline" className="border-brand-orange text-brand-orange">
              <Clock className="w-3 h-3 mr-1" />
              8-10 minutes
            </Badge>
          </div>

          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-brand-gold/10 rounded-lg p-4 border border-brand-gold/20"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Heart className="w-8 h-8 text-brand-gold" />
                </div>
                <p className="text-brand-gold font-medium">Family meditation in progress...</p>
                <p className="text-brand-earth text-sm">
                  Breathe together, feel the herd harmony within your family
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Family Roles */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-brand-gold text-center">Sacred Family Roles</h3>
        
        <div className="grid gap-6 md:grid-cols-2">
          {familyRoles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRole === role.id ? 'ring-2 ring-brand-gold shadow-lg' : 'border-brand-gold/20'
                }`}
                onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-brand-gold">
                    <div className={`p-2 rounded-full ${role.color}`}>
                      {role.icon}
                    </div>
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-brand-earth">
                    {role.description}
                  </CardDescription>
                  <div className="flex items-center gap-2">
                    <Badge className={role.color}>
                      {role.dosha} Dosha
                    </Badge>
                  </div>
                </CardHeader>
                
                <AnimatePresence>
                  {selectedRole === role.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <CardContent className="space-y-4 border-t border-brand-gold/20 pt-4">
                        {/* Affirmation */}
                        <div className="bg-gradient-to-r from-brand-gold/10 to-brand-orange/10 rounded-lg p-4">
                          <h4 className="font-semibold text-brand-gold mb-2">Sacred Affirmation</h4>
                          <p className="text-brand-earth italic text-center">
                            "{role.affirmation}"
                          </p>
                        </div>

                        {/* Qualities */}
                        <div>
                          <h4 className="font-semibold text-brand-gold mb-2">Essential Qualities</h4>
                          <div className="flex flex-wrap gap-2">
                            {role.qualities.map((quality, idx) => (
                              <Badge key={idx} variant="outline" className="border-brand-mustard text-brand-mustard">
                                {quality}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Guidance */}
                        <div>
                          <h4 className="font-semibold text-brand-gold mb-2">Family Guidance</h4>
                          <ul className="space-y-1 text-brand-earth text-sm">
                            {role.guidance.map((guide, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Star className="w-3 h-3 text-brand-gold mt-1 flex-shrink-0" />
                                {guide}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ayurvedic Role */}
                        <div className="bg-brand-earth/5 rounded-lg p-3">
                          <h4 className="font-semibold text-brand-earth mb-1">Ayurvedic Understanding</h4>
                          <p className="text-brand-earth text-sm">
                            {role.ayurvedic_role}
                          </p>
                        </div>

                        {/* Meditation Focus */}
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <h4 className="font-semibold text-purple-700 mb-1">Meditation Focus</h4>
                          <p className="text-purple-600 text-sm">
                            {role.meditation_focus}
                          </p>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Family Practices */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-brand-gold text-center">Sacred Family Practices</h3>
        
        <div className="grid gap-6 md:grid-cols-2">
          {familyPractices.map((practice, index) => (
            <Card key={index} className="border-brand-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-brand-gold">
                  <div className="p-2 rounded-full bg-brand-gold/10">
                    {practice.icon}
                  </div>
                  {practice.title}
                </CardTitle>
                <CardDescription className="text-brand-earth italic">
                  "{practice.description}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {practice.practices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-brand-earth text-sm">
                      <Heart className="w-3 h-3 text-brand-gold mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Closing Wisdom */}
      <Card className="border-brand-gold/30 bg-gradient-to-br from-brand-gold/5 to-brand-orange/5">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-brand-gold" />
          </div>
          <h3 className="text-xl font-bold text-brand-gold">Herd Harmony Blessing</h3>
          <p className="text-brand-earth italic max-w-2xl mx-auto">
            "{meditationScript.closing}"
          </p>
          <div className="flex items-center justify-center gap-2 text-brand-gold">
            <Heart className="w-4 h-4" />
            <span className="text-sm">— Dr. Helen Thomas DC</span>
            <Heart className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyWisdom;
