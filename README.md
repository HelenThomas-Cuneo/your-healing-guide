# Your Healing Guide

A comprehensive Ayurvedic healing platform featuring an AI avatar of Dr. Helen Thomas DC, with personalized guidance, meditation sessions, and ancient wisdom integration.

## Features

- **AI Avatar**: Interactive AI representation of Dr. Helen Thomas DC with custom voice synthesis
- **Personalized Guidance**: AI-powered responses to health and wellness questions
- **Meditation Sessions**: Guided Smṛti meditation with authentic voice narration
- **Lead Magnet**: Free "13 Ayurvedic Body Types" PDF guide
- **Subscription Service**: Premium AI query system for $19/month
- **Ancient Wisdom**: Integration of Ayurveda, Vedic astrology, and healing practices

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom brand colors
- **UI Components**: shadcn/ui component library
- **Voice Synthesis**: ElevenLabs API integration
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Brand Colors

- **Gold**: `#D4AF37` (Primary accent)
- **Earth/Dirt Red**: `#8B4513` (Primary text)
- **Mustard**: `#FFDB58` (Secondary accent)
- **Orange**: `#FF8C00` (Call-to-action)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[username]/your-healing-guide.git
cd your-healing-guide
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. When you push to the `main` branch, the site will automatically build and deploy.

### Custom Domain Setup

1. In your GitHub repository, go to Settings > Pages
2. Set source to "GitHub Actions"
3. The CNAME file is already configured for `healingairwaves.com`
4. Update your domain's DNS settings to point to GitHub Pages

### DNS Configuration

For `healingairwaves.com`, configure these DNS records:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: [username].github.io
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Avatar.jsx      # AI avatar component
│   ├── AIQuery.jsx     # AI query interface
│   ├── Meditation.jsx  # Meditation player
│   ├── LeadMagnet.jsx  # Lead capture form
│   └── ...
├── data/               # Static data and scripts
├── assets/             # Images and media files
├── lib/                # Utility functions
└── main.jsx           # Application entry point
```

## Key Components

### AI Avatar
- Interactive representation of Dr. Helen Thomas DC
- Custom voice synthesis using ElevenLabs
- Contextual responses based on Ayurvedic knowledge

### Lead Magnet System
- Email capture form
- Automatic PDF download
- Newsletter subscription integration

### Subscription System
- $19/month premium access
- Enhanced AI query capabilities
- Stripe payment integration

## Environment Variables

For full functionality, set up these environment variables:

```env
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
VITE_API_BASE_URL=your_backend_api_url
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software created for Dr. Helen Thomas DC and Healing Airwaves.

## Contact

Dr. Helen Thomas DC - [dr.helen@healingairwaves.com](mailto:dr.helen@healingairwaves.com)

Project Link: [https://github.com/[username]/your-healing-guide](https://github.com/[username]/your-healing-guide)

---

*Built with ❤️ for the healing community*
