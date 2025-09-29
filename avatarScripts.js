// Avatar scripts for different pages and contexts
export const avatarScripts = {
  welcome: {
    greeting: "Hello and welcome. I'm Dr. Helen Thomas, DC. I've spent 44 years in the clinic, taught Ayurveda at college, and wrote two books — so you don't have to guess what works.",
    
    pulseIntro: "This is the heart of Ayurveda — your pulse shows me what's happening right now in your body. It reveals where you're in balance, and where you may have dryness, heat, inflammation, or congestion and stagnation.",
    
    firstStep: "The first step is always simple: remoisturizing dryness, cooling inflammation, or flushing mucus and stagnation. That's how we begin.",
    
    consultation: "And together, we can take the next step through an Ayurvedic-Nutritional consultation — a live connection where your healing patterns are revealed and supported."
  },

  digestive: {
    symptomCheck: "Hi, I'm Dr. Helen Thomas, DC. If you feel burning, bloating, or reflux, your body is signaling that digestion is out of balance.",
    
    whatToDo: "What to do: sip cumin, coriander, and fennel tea — simple seeds you may already have in your kitchen.",
    
    why: "Why: this calms excess heat, soothes your stomach, and steadies digestion.",
    
    consultation: "But digestion is more than symptoms — it's the fire that fuels your whole body. In a consultation, I help you find your personal map, so healing lasts, not just for today but for the long run."
  },

  sleep: {
    symptomCheck: "Welcome, I'm Dr. Helen Thomas, DC. If you can't fall asleep, wake at night, or feel anxious in the evening, it may be your Vata — the nervous system energy — running too fast.",
    
    whatToDo: "What to do: drink warm milk with a pinch of nutmeg, or try a few minutes of slow breathing before bed.",
    
    why: "Why: these simple rituals calm the mind and nourish the nervous system.",
    
    consultation: "In consultation, I show you how your whole pattern connects — sleep, digestion, stress, and energy — so you can restore balance and wake up refreshed."
  },

  energy: {
    symptomCheck: "Hello, I'm Dr. Helen Thomas, DC. If you feel heavy, sluggish mornings, or low energy throughout the day, this may be Kapha energy that needs gentle stirring.",
    
    whatToDo: "What to do: start your morning with ginger-lemon tea and gentle movement to awaken your metabolism.",
    
    why: "Why: this kindles your digestive fire and moves stagnant energy through your system.",
    
    consultation: "Because weight, mood, and digestion are always linked, a consultation reveals your unique pattern and gives you tools that work with your body, not against it."
  },

  assessment: {
    intro: "I'm here to guide you through discovering your unique Ayurvedic constitution. This assessment draws from 44 years of clinical experience and ancient wisdom.",
    
    process: "Answer honestly about your natural tendencies, not temporary conditions. Your constitution is your blueprint — it doesn't change, but understanding it changes everything.",
    
    results: "Your results will reveal your primary dosha and give you personalized recommendations for diet, lifestyle, and healing practices that work specifically for your body type."
  },

  consultation: {
    intro: "I'm Dr. Helen Thomas, DC, and I've dedicated my life to helping people heal through Ayurveda and nutrition.",
    
    experience: "In 44 years of practice, I've seen that every person has a unique healing pattern. Cookie-cutter approaches don't work because your body is not cookie-cutter.",
    
    approach: "In our consultation, I'll read your pulse, understand your constitution, and create a personalized protocol that addresses your root causes, not just symptoms.",
    
    invitation: "When you're ready to stop guessing and start healing with precision, I'm here to guide you."
  }
}

// Function to get a random script from a category
export const getRandomScript = (category) => {
  const scripts = avatarScripts[category]
  if (!scripts) return ""
  
  const scriptKeys = Object.keys(scripts)
  const randomKey = scriptKeys[Math.floor(Math.random() * scriptKeys.length)]
  return scripts[randomKey]
}

// Function to get a complete script by combining multiple parts
export const getCombinedScript = (category, parts = []) => {
  const scripts = avatarScripts[category]
  if (!scripts) return ""
  
  if (parts.length === 0) {
    // Return all scripts combined
    return Object.values(scripts).join(" ")
  }
  
  // Return specific parts combined
  return parts.map(part => scripts[part]).filter(Boolean).join(" ")
}
