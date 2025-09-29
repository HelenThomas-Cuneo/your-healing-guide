import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Sparkles, Send, Lock, CheckCircle, AlertCircle, BookOpen, Leaf, Calendar, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Avatar from './Avatar.jsx'

const AIQuery = ({ userEmail, userConstitution, onSubscribe }) => {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)
  const [email, setEmail] = useState(userEmail || '')
  const [showSubscription, setShowSubscription] = useState(false)

  // Sample queries to inspire users
  const sampleQueries = [
    "What should I eat for my constitution during winter?",
    "I have trouble sleeping, what Ayurvedic remedies can help?",
    "How does the current season affect my dosha?",
    "What lifestyle changes are best for my age and constitution?",
    "I feel anxious and restless, what does this mean in Ayurveda?",
    "What herbs are good for digestion according to my body type?",
    "How do planetary influences affect my health?",
    "What daily routine is best for my constitution?"
  ]

  // Check subscription status on component mount
  useEffect(() => {
    if (email) {
      checkSubscriptionStatus()
    }
  }, [email])

  const checkSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/subscription/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      if (data.success) {
        setIsSubscribed(data.active)
        setSubscriptionStatus(data)
      }
    } catch (error) {
      console.error('Error checking subscription:', error)
    }
  }

  const handleSubscribe = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      if (data.success) {
        setIsSubscribed(true)
        setShowSubscription(false)
        onSubscribe?.(email)
        alert('Successfully subscribed! You now have access to AI guidance.')
      } else {
        alert(data.error || 'Subscription failed')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      alert('Subscription failed. Please try again.')
    }
  }

  const handleQuery = async () => {
    if (!query.trim()) return
    
    if (!isSubscribed) {
      setShowSubscription(true)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          email,
          constitution: userConstitution
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setResponse(data.response)
      } else {
        if (data.error === 'Subscription required') {
          setShowSubscription(true)
        } else {
          alert(data.error || 'Query failed')
        }
      }
    } catch (error) {
      console.error('Error querying AI:', error)
      alert('Query failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSampleQuery = (sampleQuery) => {
    setQuery(sampleQuery)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-dirt-red mb-4">
          Ask Dr. Helen Thomas DC
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Get personalized Ayurvedic guidance based on your constitution, current season, and life stage
        </p>
        
        {/* Subscription Status */}
        {isSubscribed ? (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            Subscribed - Full Access
          </Badge>
        ) : (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <Lock className="w-4 h-4 mr-1" />
            Subscription Required
          </Badge>
        )}
      </div>

      {/* Query Interface */}
      <Card className="border-brand-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-dirt-red">
            <Sparkles className="h-5 w-5 text-brand-gold" />
            Your Personal AI Guide
          </CardTitle>
          <CardDescription>
            Ask about symptoms, nutrition, lifestyle, Vedic astrology, seasonal guidance, and more
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Query Input */}
          <div className="space-y-2">
            <Textarea
              placeholder="Ask your question about Ayurveda, health, nutrition, or lifestyle..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] border-brand-gold/30 focus:border-brand-gold"
              disabled={isLoading}
            />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {userConstitution && (
                  <span className="text-brand-gold">
                    Personalized for {userConstitution} constitution
                  </span>
                )}
              </span>
              
              <Button
                onClick={handleQuery}
                disabled={!query.trim() || isLoading}
                className="bg-brand-gold hover:bg-brand-orange text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Thinking...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Ask Dr. Helen
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sample Queries */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Sample questions:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.slice(0, 4).map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSampleQuery(sample)}
                  className="text-xs border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/10"
                  disabled={isLoading}
                >
                  {sample}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showSubscription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSubscription(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-brand-gold/10 rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-brand-gold" />
                </div>
                
                <h3 className="text-xl font-bold text-brand-dirt-red">
                  Subscribe for AI Guidance
                </h3>
                
                <p className="text-muted-foreground">
                  Get unlimited access to personalized Ayurvedic guidance from Dr. Helen Thomas DC's 44 years of experience
                </p>
                
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-brand-gold/30 focus:border-brand-gold"
                  />
                  
                  <Button
                    onClick={handleSubscribe}
                    className="w-full bg-brand-gold hover:bg-brand-orange text-white"
                  >
                    Subscribe & Get Access
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Free subscription • Unsubscribe anytime • Your email is safe with us
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Response */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Avatar Response */}
            <Card className="border-brand-gold/30 bg-gradient-to-r from-brand-gold/5 to-brand-orange/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      script={response.answer}
                      size="medium"
                      autoPlay={true}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-semibold text-brand-dirt-red mb-2">Dr. Helen's Response:</h4>
                      <p className="text-foreground">{response.answer}</p>
                    </div>
                    
                    {response.constitution_specific && (
                      <div className="bg-brand-gold/10 p-4 rounded-lg">
                        <h5 className="font-medium text-brand-dirt-red mb-2 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          For Your Constitution:
                        </h5>
                        <p className="text-sm">{response.constitution_specific}</p>
                      </div>
                    )}
                    
                    {response.seasonal_guidance && (
                      <div className="bg-brand-orange/10 p-4 rounded-lg">
                        <h5 className="font-medium text-brand-dirt-red mb-2 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Seasonal Guidance:
                        </h5>
                        <p className="text-sm">{response.seasonal_guidance}</p>
                      </div>
                    )}
                    
                    {response.recommendations.length > 0 && (
                      <div className="bg-brand-mustard/10 p-4 rounded-lg">
                        <h5 className="font-medium text-brand-dirt-red mb-2 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Recommendations:
                        </h5>
                        <ul className="text-sm space-y-1">
                          {response.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {response.herbs_supplements.length > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-medium text-brand-dirt-red mb-2 flex items-center">
                          <Leaf className="w-4 h-4 mr-2" />
                          Herbs & Supplements:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {response.herbs_supplements.map((herb, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {herb}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                        <p className="text-xs text-orange-800">{response.warning}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AIQuery
