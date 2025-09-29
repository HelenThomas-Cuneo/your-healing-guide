import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Sparkles, 
  Brain, 
  Star, 
  Leaf, 
  Sun, 
  Moon, 
  Heart,
  Clock,
  User,
  Mail,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EnhancedAIQuery = ({ userEmail, userConstitution, onEmailUpdate }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [subscriptionEmail, setSubscriptionEmail] = useState(userEmail || '');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  useEffect(() => {
    if (userEmail) {
      checkSubscriptionStatus(userEmail);
    }
  }, [userEmail]);

  const checkSubscriptionStatus = async (email) => {
    try {
      const response = await fetch(`/api/ai/subscription-status/${encodeURIComponent(email)}`);
      const data = await response.json();
      if (data.success) {
        setIsSubscribed(data.subscribed);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleSubscribe = async () => {
    if (!subscriptionEmail.trim()) return;
    
    setSubscriptionLoading(true);
    try {
      const response = await fetch('/api/ai/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: subscriptionEmail.trim() }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubscribed(true);
        setShowSubscription(false);
        if (onEmailUpdate) {
          onEmailUpdate(subscriptionEmail.trim());
        }
      } else {
        alert(data.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!query.trim()) return;
    
    if (!isSubscribed) {
      setShowSubscription(true);
      return;
    }
    
    setIsLoading(true);
    setResponse(null);
    
    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          email: userEmail || subscriptionEmail,
          constitution: userConstitution
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResponse(data.response);
      } else {
        if (data.error === 'Subscription required') {
          setShowSubscription(true);
        } else {
          setResponse({
            answer: data.message || 'Sorry, I encountered an error processing your query.',
            error: true
          });
        }
      }
    } catch (error) {
      console.error('Query error:', error);
      setResponse({
        answer: 'Sorry, I encountered a technical error. Please try again.',
        error: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    {
      category: "Constitutional",
      icon: <User className="w-4 h-4" />,
      questions: [
        "What foods should I eat for my Vata constitution during winter?",
        "How do I balance my Pitta dosha in summer?",
        "What lifestyle changes are best for Kapha types?"
      ]
    },
    {
      category: "Symptoms & Health",
      icon: <Heart className="w-4 h-4" />,
      questions: [
        "I have trouble sleeping, what Ayurvedic remedies can help?",
        "How can I improve my digestion naturally?",
        "What herbs are good for anxiety and stress?"
      ]
    },
    {
      category: "Vedic Astrology",
      icon: <Star className="w-4 h-4" />,
      questions: [
        "How does Saturn affect my health and what remedies help?",
        "What planetary influences might be causing my health issues?",
        "How can I use gemstones for healing according to my birth chart?"
      ]
    },
    {
      category: "Seasonal Guidance",
      icon: <Sun className="w-4 h-4" />,
      questions: [
        "How should I adjust my routine for the current season?",
        "What foods are best for spring detox?",
        "How do seasonal changes affect my dosha balance?"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-brand-gold"
        >
          <Brain className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Ask Dr. Helen Thomas DC</h2>
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <p className="text-brand-earth text-lg">
          Get personalized Ayurvedic guidance based on your constitution, current season, and life stage
        </p>
        
        {/* Subscription Status */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {isSubscribed ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Premium Access Active
            </Badge>
          ) : (
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              <AlertCircle className="w-3 h-3 mr-1" />
              Subscription Required
            </Badge>
          )}
        </div>
      </div>

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
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-brand-gold" />
                </div>
                
                <h3 className="text-xl font-bold text-brand-gold">
                  Subscribe for AI Guidance
                </h3>
                
                <p className="text-brand-earth">
                  Get unlimited access to personalized Ayurvedic guidance from Dr. Helen Thomas DC's 44 years of experience
                </p>
                
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={subscriptionEmail}
                    onChange={(e) => setSubscriptionEmail(e.target.value)}
                    className="border-brand-gold/30 focus:border-brand-gold"
                  />
                  
                  <Button
                    onClick={handleSubscribe}
                    disabled={subscriptionLoading || !subscriptionEmail.trim()}
                    className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white"
                  >
                    {subscriptionLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Subscribe & Get Access
                      </>
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-gray-600">
                  Free subscription • Unsubscribe anytime • Your email is safe with us
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Query Interface */}
      <Card className="border-brand-gold/30">
        <CardHeader>
          <CardTitle className="text-brand-gold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Your Personal AI Guide
          </CardTitle>
          <CardDescription>
            Ask about symptoms, nutrition, lifestyle, Vedic astrology, seasonal guidance, and more
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Textarea
              placeholder="Ask your question about Ayurveda, health, nutrition, or lifestyle..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] border-brand-gold/30 focus:border-brand-gold resize-none"
            />
            
            <Button
              onClick={handleQuery}
              disabled={isLoading || !query.trim()}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Dr. Helen is thinking...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask Dr. Helen
                </>
              )}
            </Button>
          </div>

          {/* User Context Display */}
          {(userConstitution || isSubscribed) && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-brand-gold/20">
              {userConstitution && (
                <Badge variant="outline" className="border-brand-mustard text-brand-mustard">
                  <User className="w-3 h-3 mr-1" />
                  {userConstitution} Constitution
                </Badge>
              )}
              {isSubscribed && (
                <Badge variant="outline" className="border-green-500 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Premium Member
                </Badge>
              )}
              <Badge variant="outline" className="border-brand-orange text-brand-orange">
                <Clock className="w-3 h-3 mr-1" />
                {new Date().toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Display */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className={`border-2 ${response.error ? 'border-red-200 bg-red-50' : 'border-brand-gold/30 bg-gradient-to-br from-brand-gold/5 to-brand-orange/5'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${response.error ? 'text-red-700' : 'text-brand-gold'}`}>
                  {response.error ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <Heart className="w-5 h-5" />
                  )}
                  Dr. Helen's Guidance
                </CardTitle>
                {!response.error && (
                  <CardDescription>
                    Based on {response.clinical_authority || "44 years of clinical experience"}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className={`leading-relaxed ${response.error ? 'text-red-700' : 'text-brand-earth'}`}>
                    {response.answer}
                  </p>
                </div>

                {/* Enhanced Response Sections */}
                {!response.error && (
                  <div className="space-y-4">
                    {/* Constitutional Guidance */}
                    {response.constitutional_guidance && Object.keys(response.constitutional_guidance).length > 0 && (
                      <div className="p-4 bg-brand-mustard/10 rounded-lg border border-brand-mustard/20">
                        <h4 className="font-semibold text-brand-mustard mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Constitutional Guidance
                        </h4>
                        <div className="text-sm text-brand-earth space-y-2">
                          {response.constitutional_guidance.balancing_foods && (
                            <div>
                              <strong>Recommended Foods:</strong>
                              <ul className="list-disc list-inside ml-2">
                                {response.constitutional_guidance.balancing_foods.map((food, index) => (
                                  <li key={index}>{food}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Astrological Insights */}
                    {response.astrological_insights && Object.keys(response.astrological_insights).length > 0 && (
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Vedic Astrology Insights
                        </h4>
                        <div className="text-sm text-purple-600">
                          {Object.entries(response.astrological_insights).map(([planet, guidance]) => (
                            <div key={planet} className="mb-2">
                              <strong className="capitalize">{planet}:</strong> {guidance.constitutional_impact}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Herbs & Supplements */}
                    {response.herbs_and_supplements && response.herbs_and_supplements.length > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                          <Leaf className="w-4 h-4" />
                          Recommended Herbs
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {response.herbs_and_supplements.map((herb, index) => (
                            <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                              {herb}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clinical Wisdom */}
                    {response.clinical_wisdom && (
                      <div className="p-4 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
                        <h4 className="font-semibold text-brand-orange mb-2 flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Clinical Wisdom
                        </h4>
                        <p className="text-sm text-brand-earth italic">
                          "{response.clinical_wisdom}"
                        </p>
                      </div>
                    )}

                    {/* Follow-up Questions */}
                    {response.follow_up_questions && response.follow_up_questions.length > 0 && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-2">
                          Consider asking:
                        </h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {response.follow_up_questions.map((question, index) => (
                            <li key={index} className="cursor-pointer hover:text-blue-800" onClick={() => setQuery(question)}>
                              • {question}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Disclaimer */}
                {!response.error && (
                  <div className="text-xs text-gray-600 border-t pt-3">
                    <p>{response.warning || "This guidance is for educational purposes. Always consult your healthcare provider for medical advice."}</p>
                    <p className="mt-1">Source: {response.source}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sample Questions */}
      <div className="grid gap-4 md:grid-cols-2">
        {sampleQuestions.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-brand-gold/20 hover:border-brand-gold/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-brand-gold flex items-center gap-2">
                {category.icon}
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {category.questions.map((question, questionIndex) => (
                <button
                  key={questionIndex}
                  onClick={() => setQuery(question)}
                  className="text-left text-xs text-brand-earth hover:text-brand-gold transition-colors block w-full p-2 rounded hover:bg-brand-gold/5"
                >
                  "{question}"
                </button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedAIQuery;
