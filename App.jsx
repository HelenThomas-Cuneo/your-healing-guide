import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Heart, Sparkles, BookOpen, Users, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import Avatar from './components/Avatar.jsx'
import WelcomeGreetingSoft from './components/WelcomeGreetingSoft.jsx'
import ElevenLabsAvatar from './components/ElevenLabsAvatar.jsx'
import EnhancedAIQuery from './components/EnhancedAIQuery.jsx'
import Meditation from './components/Meditation.jsx'
import FamilyWisdom from './components/FamilyWisdom.jsx'
import SubscriptionHelper from './components/SubscriptionHelper.jsx'
import VoiceCloning from './components/VoiceCloning.jsx'
import './App.css'

function App() {
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false)
  const [currentSection, setCurrentSection] = useState('welcome')
  const [userEmail, setUserEmail] = useState('')
  const [userConstitution, setUserConstitution] = useState('')
  const [showWelcomeGreeting, setShowWelcomeGreeting] = useState(true)

  const handleStartTour = () => {
    setShowWelcomeGreeting(false)
    setCurrentSection('welcome')
  }

  const handleSubscribe = () => {
    setShowWelcomeGreeting(false)
    setCurrentSection('subscription')
  }



  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Show welcome greeting first
  if (showWelcomeGreeting) {
    return <WelcomeGreetingSoft onStartTour={handleStartTour} onSubscribe={handleSubscribe} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="om-symbol">🕉️</div>
              <div>
                <h1 className="text-2xl font-bold text-brand-gold">Your Healing Guide</h1>
                <p className="text-sm text-muted-foreground">Ancient Wisdom Portal</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" onClick={() => setCurrentSection('welcome')}>
                Home
              </Button>
              <Button variant="ghost" onClick={() => setCurrentSection('assessment')}>
                Assessment
              </Button>
              <Button variant="ghost" onClick={() => setCurrentSection('library')}>
                Library
              </Button>
              <Button variant="ghost" onClick={() => setCurrentSection('ai-query')}>
                AI Guide
              </Button>
              <Button variant="ghost" onClick={() => setCurrentSection('meditation')}>
                Meditation
              </Button>
              <Button variant="ghost" onClick={() => setCurrentSection('family')}>
                Family Wisdom
              </Button>
              <Button variant="ghost" onClick={() => setCurrentSection('voice-setup')}>
                Voice Setup
              </Button>
              <Button variant="ghost" onClick={() => setCurrentSection('contact')}>
                Contact
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentSection === 'welcome' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="space-y-12"
          >
            {/* Hero Section with Avatar */}
            <motion.section variants={fadeInUp} className="text-center py-12">
              <div className="max-w-4xl mx-auto">
                {/* Avatar Container */}
                <div className="mb-8">
                  <ElevenLabsAvatar
                    script="Hello and welcome. I'm Dr. Helen Thomas, DC. I've spent 44 years in the clinic, taught Ayurveda at college, and wrote two books — so you don't have to guess what works. This is the heart of Ayurveda — your pulse shows me what's happening right now in your body. It reveals where you're in balance, and where you may have dryness, heat, inflammation, or congestion and stagnation. The first step is always simple: remoisturizing dryness, cooling inflammation, or flushing mucus and stagnation. That's how we begin."
                    autoPlay={false}
                    size="xlarge"
                    onSpeakingStart={() => setIsAvatarSpeaking(true)}
                    onSpeakingEnd={() => setIsAvatarSpeaking(false)}
                  />
                </div>

                <Badge className="mb-4 bg-brand-gold text-white">
                  🙏 Sacred Wisdom for Educational Growth
                </Badge>

                <h2 className="text-5xl font-bold mb-6 text-foreground">
                  Discover Your Ayurvedic Constitution
                </h2>

                <blockquote className="text-xl text-brand-dirt-red mb-4 font-medium">
                  "I've spent 44 years in the clinic, taught Ayurveda at college, and wrote two books — so you don't have to guess what works."
                </blockquote>

                <p className="text-lg text-muted-foreground mb-2">
                  — Dr. Helen Thomas DC
                </p>

                <p className="text-lg text-muted-foreground mb-8">
                  "Healing is remembering. Ayurveda is the Mother."
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="btn-brand bg-brand-gold hover:bg-brand-orange text-white px-8 py-3"
                    onClick={() => setCurrentSection('assessment')}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Reveal My Constitution
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="btn-brand border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-8 py-3"
                    onClick={() => setCurrentSection('contact')}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Book Consultation
                  </Button>
                </div>
              </div>
            </motion.section>

            {/* Features Grid */}
            <motion.section variants={fadeInUp} className="py-12">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center border-brand-gold/20 hover:border-brand-gold/40 transition-colors">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold-orange rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-brand-dirt-red">Body Type Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Discover your unique constitution among the 13 Ayurvedic bodytypes
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center border-brand-gold/20 hover:border-brand-gold/40 transition-colors">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-mustard-gold rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-brand-dirt-red">AI Wisdom</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Personalized healing protocols powered by 44 years of clinical experience
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center border-brand-gold/20 hover:border-brand-gold/40 transition-colors">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-orange rounded-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-brand-dirt-red">Ancient Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      5000+ years of Vedic wisdom applied to modern healing
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </motion.section>

            {/* Trust Indicators */}
            <motion.section variants={fadeInUp} className="text-center py-8">
              <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  <span>Your data stays with you</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                  <span>Free assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-mustard rounded-full"></div>
                  <span>Personalized results</span>
                </div>
              </div>
            </motion.section>

            {/* Newsletter Signup */}
            <motion.section variants={fadeInUp} className="py-12">
              <div className="max-w-md mx-auto">
                <SubscriptionHelper
                  userEmail={userEmail}
                  onEmailUpdate={setUserEmail}
                  onSubscriptionComplete={(email) => {
                    console.log('Subscription completed for:', email);
                  }}
                />
              </div>
            </motion.section>
          </motion.div>
        )}

        {currentSection === 'assessment' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-brand-dirt-red">Constitution Assessment</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Assessment feature coming soon...
            </p>
            <Button 
              onClick={() => setCurrentSection('welcome')}
              className="bg-brand-gold hover:bg-brand-orange text-white"
            >
              Back to Home
            </Button>
          </motion.div>
        )}

        {currentSection === 'library' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-brand-dirt-red">Wellness Library</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Digital library coming soon...
            </p>
            <Button 
              onClick={() => setCurrentSection('welcome')}
              className="bg-brand-gold hover:bg-brand-orange text-white"
            >
              Back to Home
            </Button>
          </motion.div>
        )}

        {currentSection === 'ai-query' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <EnhancedAIQuery
                userEmail={userEmail}
                userConstitution={userConstitution}
                onEmailUpdate={setUserEmail}
              />
            </motion.div>
            
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => setCurrentSection('welcome')}
                className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}

        {currentSection === 'meditation' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <Meditation
                avatar={null} // Will be connected to actual avatar later
                userConstitution={userConstitution}
              />
            </motion.div>
            
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => setCurrentSection('welcome')}
                className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}

        {currentSection === 'family' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <FamilyWisdom />
            </motion.div>
            
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => setCurrentSection('welcome')}
                className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}

        {currentSection === 'voice-setup' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-brand-dirt-red">Voice Setup</h2>
              <p className="text-lg text-muted-foreground">
                Create Dr. Helen's custom voice clone for a personalized healing experience
              </p>
            </div>
            
            <VoiceCloning 
              onVoiceCloned={(voiceId) => {
                console.log('Voice cloned successfully:', voiceId);
                // You can add additional logic here when voice is cloned
              }}
            />
            
            <div className="text-center mt-8">
              <Button 
                variant="outline"
                onClick={() => setCurrentSection('welcome')}
                className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}

        {currentSection === 'contact' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-brand-dirt-red text-center">Contact Dr. Helen Thomas DC</h2>
              
              <Card className="border-brand-gold/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-6 w-6 text-brand-gold" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">Helen@healingairwaves.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Phone className="h-6 w-6 text-brand-gold" />
                      <div>
                        <p className="font-medium">Consultation Booking</p>
                        <p className="text-muted-foreground">Schedule your Ayurvedic-Nutritional consultation</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button 
                      size="lg"
                      className="btn-brand bg-brand-gold hover:bg-brand-orange text-white px-8 py-3"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Book Your Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentSection('welcome')}
                  className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              © 2025 Your Healing Guide. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Always consult your healthcare provider for medical guidance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
