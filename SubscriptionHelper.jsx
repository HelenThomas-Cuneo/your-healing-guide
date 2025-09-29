import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, AlertCircle, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SubscriptionHelper = ({ userEmail, onEmailUpdate, onSubscriptionComplete }) => {
  const [email, setEmail] = useState(userEmail || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [showHelper, setShowHelper] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscription = async () => {
    if (!validateEmail(email)) {
      setSubscriptionStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);
    setSubscriptionStatus({ type: 'loading', message: 'Subscribing...' });

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatus({ 
          type: 'success', 
          message: 'Welcome to our healing community! Check your email for confirmation.' 
        });
        onEmailUpdate?.(email);
        onSubscriptionComplete?.(email);
      } else {
        const errorData = await response.json();
        setSubscriptionStatus({ 
          type: 'error', 
          message: errorData.message || 'Subscription failed. Please try again.' 
        });
      }
    } catch (error) {
      setSubscriptionStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscription();
    }
  };

  return (
    <Card className="border-brand-gold/30 bg-gradient-to-br from-brand-gold/5 to-brand-orange/5">
      <CardHeader>
        <CardTitle className="text-brand-gold flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Join Our Healing Community
        </CardTitle>
        <CardDescription>
          Get personalized Ayurvedic wisdom and healing insights delivered to your inbox
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email Input */}
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Helen@healingairwaves.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-brand-gold/30 focus:border-brand-gold"
            disabled={isSubmitting}
          />
          <Button
            onClick={handleSubscription}
            disabled={isSubmitting || !email}
            className="bg-brand-gold hover:bg-brand-orange text-white px-6"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                Subscribe
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>

        {/* Status Messages */}
        {subscriptionStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 p-3 rounded-lg ${
              subscriptionStatus.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : subscriptionStatus.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            {subscriptionStatus.type === 'success' && <CheckCircle className="w-4 h-4" />}
            {subscriptionStatus.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {subscriptionStatus.type === 'loading' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
            )}
            <span className="text-sm">{subscriptionStatus.message}</span>
          </motion.div>
        )}

        {/* Troubleshooting Helper */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHelper(!showHelper)}
            className="text-brand-earth hover:text-brand-gold text-xs"
          >
            Having trouble? Click here for help
          </Button>

          {showHelper && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white/50 rounded-lg p-4 border border-brand-gold/20 space-y-3"
            >
              <h4 className="font-semibold text-brand-gold text-sm">Subscription Troubleshooting:</h4>
              <ul className="space-y-2 text-xs text-brand-earth">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  Make sure your email address is spelled correctly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  Check your spam/junk folder for the confirmation email
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  Try refreshing the page if the button doesn't respond
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  Contact us at Helen@healingairwaves.com if issues persist
                </li>
              </ul>
              
              <div className="pt-2 border-t border-brand-gold/20">
                <p className="text-xs text-brand-earth italic">
                  Once subscribed, you'll gain access to the AI Guide for personalized Ayurvedic wisdom.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="flex items-center justify-center gap-4 text-xs text-brand-earth">
          <Badge variant="outline" className="border-brand-mustard text-brand-mustard">
            Your data stays with you
          </Badge>
          <Badge variant="outline" className="border-brand-mustard text-brand-mustard">
            No spam, ever
          </Badge>
          <Badge variant="outline" className="border-brand-mustard text-brand-mustard">
            Unsubscribe anytime
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionHelper;
