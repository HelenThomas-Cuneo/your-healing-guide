// Smṛti Meditation Scripts for Dr. Helen's AI Avatar
// Ready for ElevenLabs voice synthesis with natural breaks

export const meditationScripts = {
  smriti_meditation: {
    title: "Smṛti Meditation — Remembrance of Wholeness",
    duration: "8-10 minutes",
    segments: [
      {
        text: "Welcome, beloved one.",
        pause: 2000
      },
      {
        text: "This is a meditation of Smṛti — remembrance.",
        pause: 2000
      },
      {
        text: "The remembering of your wholeness, your original light, your innate healing power.",
        pause: 3000
      },
      {
        text: "Close your eyes gently.",
        pause: 2000
      },
      {
        text: "Place one hand on your heart, and one hand on your belly.",
        pause: 3000
      },
      {
        text: "Feel the warmth of your own touch.",
        pause: 2000
      },
      {
        text: "Take a slow breath in… drawing golden light through your nose.",
        pause: 4000
      },
      {
        text: "And breathe out slowly… releasing doubt, heaviness, or fog.",
        pause: 4000
      },
      {
        text: "With each breath, silently say to yourself:",
        pause: 2000
      },
      {
        text: "Inhale: I am whole.",
        pause: 3000
      },
      {
        text: "Exhale: I remember.",
        pause: 4000
      },
      {
        text: "Now, gently bring your attention from the crown of your head… to your heart… to your belly… to your feet.",
        pause: 6000
      },
      {
        text: "At each point, whisper inside: This place remembers its wholeness.",
        pause: 4000
      },
      {
        text: "Let us chant softly together: Smritih Purnata Swabhavah.",
        pause: 3000
      },
      {
        text: "Remembrance is the nature of wholeness.",
        pause: 3000
      },
      {
        text: "See yourself as a child, radiant and free.",
        pause: 4000
      },
      {
        text: "Notice their joy, their purity, their untouchable wholeness.",
        pause: 4000
      },
      {
        text: "They walk toward you now, and gently step into your heart.",
        pause: 4000
      },
      {
        text: "Feel every cell lighting up, whispering: We never forgot. We only waited for you to remember.",
        pause: 5000
      },
      {
        text: "Bring palms together at your heart.",
        pause: 2000
      },
      {
        text: "Bow your head slightly, and whisper: Today, I live from wholeness remembered.",
        pause: 4000
      },
      {
        text: "Take one final deep breath in… and exhale into your day, carrying remembrance with you.",
        pause: 4000
      }
    ],
    sanskrit_pronunciation: {
      "Smṛti": "SMRI-ti (remembrance)",
      "Smritih Purnata Swabhavah": "SMRI-tih PUR-na-ta SVA-bha-vah"
    },
    healing_intention: "Reconnecting with innate wholeness and healing power through remembrance",
    clinical_notes: "This meditation activates the parasympathetic nervous system and supports deep healing by reconnecting with our essential nature."
  },

  guided_breathing: {
    title: "Pranayama for Constitutional Balance",
    segments: [
      {
        text: "Let's practice pranayama to balance your doshas. Sit comfortably with your spine straight.",
        pause: 3000
      },
      {
        text: "We'll begin with Nadi Shodhana, alternate nostril breathing, to harmonize Vata.",
        pause: 2000
      },
      {
        text: "Use your right thumb to close your right nostril. Inhale through your left nostril for 4 counts.",
        pause: 5000
      },
      {
        text: "Now close your left nostril with your ring finger, release your thumb, and exhale through your right nostril for 4 counts.",
        pause: 5000
      },
      {
        text: "Continue this pattern, breathing slowly and mindfully.",
        pause: 3000
      }
    ]
  },

  constitutional_affirmations: {
    title: "Constitutional Healing Affirmations",
    vata: [
      "I am grounded and stable in my being.",
      "My nervous system is calm and peaceful.",
      "I move through life with grace and ease.",
      "My body knows how to heal and restore itself."
    ],
    pitta: [
      "I am cool, calm, and collected.",
      "My inner fire burns with perfect balance.",
      "I digest life experiences with wisdom.",
      "My heart is open and compassionate."
    ],
    kapha: [
      "I am energized and motivated.",
      "My body moves with lightness and joy.",
      "I embrace change with enthusiasm.",
      "My spirit is vibrant and alive."
    ]
  }
};

// ElevenLabs voice settings for Dr. Helen's avatar
export const voiceSettings = {
  voice_id: "jen_psaki_style", // Similar to Jen Psaki news anchor voice
  stability: 0.75,
  similarity_boost: 0.85,
  style: 0.65,
  use_speaker_boost: true,
  optimize_streaming_latency: 2
};

// Meditation session management
export class MeditationSession {
  constructor(scriptName, avatar) {
    this.script = meditationScripts[scriptName];
    this.avatar = avatar;
    this.currentSegment = 0;
    this.isPlaying = false;
    this.isPaused = false;
  }

  async start() {
    if (!this.script) return;
    
    this.isPlaying = true;
    this.currentSegment = 0;
    
    // Update avatar to meditation mode
    this.avatar.setMode('meditation');
    
    await this.playSegment();
  }

  async playSegment() {
    if (this.currentSegment >= this.script.segments.length) {
      this.complete();
      return;
    }

    const segment = this.script.segments[this.currentSegment];
    
    // Speak the text through avatar
    await this.avatar.speak(segment.text, {
      voice_settings: voiceSettings,
      meditation_mode: true
    });
    
    // Pause for the specified duration
    if (segment.pause) {
      await this.wait(segment.pause);
    }
    
    this.currentSegment++;
    
    if (this.isPlaying && !this.isPaused) {
      await this.playSegment();
    }
  }

  pause() {
    this.isPaused = true;
    this.avatar.pauseSpeaking();
  }

  resume() {
    this.isPaused = false;
    this.avatar.resumeSpeaking();
    this.playSegment();
  }

  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentSegment = 0;
    this.avatar.stopSpeaking();
    this.avatar.setMode('normal');
  }

  complete() {
    this.isPlaying = false;
    this.avatar.setMode('normal');
    this.avatar.speak("Your meditation is complete. Take a moment to notice how you feel. Carry this remembrance with you throughout your day.");
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default meditationScripts;
