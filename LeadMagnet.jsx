import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Download, BookOpen, Star, Gift, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadMagnet = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Submit to newsletter endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'lead_magnet_13_body_types'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Trigger PDF download
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = '/The_13_Ayurvedic_Body_Types.pdf';
          link.download = 'The_13_Ayurvedic_Body_Types.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 1000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    }

    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-brand-earth mb-2">
              Thank You!
            </h3>
            <p className="text-brand-earth/70">
              Your download should start automatically. Check your email for more healing wisdom!
            </p>
          </div>

          <div className="bg-brand-gold/10 p-4 rounded-lg">
            <p className="text-sm text-brand-earth font-semibold mb-2">
              🌟 Want Personalized Guidance?
            </p>
            <p className="text-xs text-brand-earth/70 mb-3">
              Get AI-powered answers to your specific health questions for just $19/month
            </p>
            <Button 
              className="bg-brand-gold hover:bg-brand-gold/90 text-white text-sm px-4 py-2"
              onClick={() => window.location.href = '#subscription'}
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="border-brand-earth text-brand-earth hover:bg-brand-earth hover:text-white"
          >
            Continue Exploring
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
      >
        <div className="bg-gradient-to-r from-brand-gold to-brand-orange p-6 text-white text-center">
          <Gift className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">
            Free Gift for You!
          </h2>
          <p className="opacity-90">
            Discover your unique constitutional blueprint
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="bg-brand-gold/10 p-4 rounded-lg mb-4">
              <BookOpen className="w-8 h-8 text-brand-gold mx-auto mb-2" />
              <h3 className="font-bold text-brand-earth text-lg mb-1">
                The 13 Ayurvedic Body Types
              </h3>
              <p className="text-sm text-brand-earth/70">
                Complete guide with 5 daily tips for each constitution
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-brand-gold" />
                <span>20-page comprehensive guide</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-brand-gold" />
                <span>65 personalized daily tips</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-brand-gold" />
                <span>Dr. Helen's 44 years of wisdom</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-brand-gold" />
                <span>Instant PDF download</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-brand-earth/30 focus:border-brand-gold"
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold py-3"
            >
              {isLoading ? (
                'Sending...'
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Get My Free Guide Now
                </>
              )}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-xs text-brand-earth/60">
              💝 No spam, ever. Unsubscribe anytime. Your data stays with you.
            </p>
            
            <div className="bg-brand-orange/10 p-3 rounded-lg">
              <p className="text-xs text-brand-earth font-semibold mb-1">
                🌟 Bonus: Join our healing community
              </p>
              <p className="text-xs text-brand-earth/70">
                Get weekly Ayurvedic wisdom and special offers
              </p>
            </div>

            <Button
              onClick={onClose}
              variant="ghost"
              className="text-brand-earth/60 hover:text-brand-earth text-sm"
            >
              Maybe later
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LeadMagnet;
