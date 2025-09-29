import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, Mic, Play, Pause, CheckCircle, AlertCircle, Settings, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceCloning = ({ onVoiceCloned }) => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [setupStatus, setSetupStatus] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceId, setVoiceId] = useState(null);
  const [testAudio, setTestAudio] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const response = await fetch('/api/voice-cloning/setup-status');
      const status = await response.json();
      setSetupStatus(status);
    } catch (error) {
      console.error('Error checking setup status:', error);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploadStatus('uploading');
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('/api/voice-cloning/upload-voice-sample', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus('success');
        setVoiceId(result.voice_id);
        onVoiceCloned?.(result.voice_id);
        await checkSetupStatus();
      } else {
        setUploadStatus('error');
        console.error('Upload failed:', result.error);
      }
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload error:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecordedAudio = () => {
    if (recordedAudio) {
      const audioUrl = URL.createObjectURL(recordedAudio);
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const uploadRecordedAudio = () => {
    if (recordedAudio) {
      const file = new File([recordedAudio], 'recorded_voice.wav', { type: 'audio/wav' });
      handleFileUpload(file);
    }
  };

  const testVoice = async () => {
    if (!voiceId) return;

    try {
      const response = await fetch(`/api/voice-cloning/test-voice/${voiceId}`, {
        method: 'POST',
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setTestAudio(audioUrl);
        
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error('Error testing voice:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'uploading': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'uploading': return <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Setup Status */}
      {setupStatus && (
        <Card className="border-brand-gold/30">
          <CardHeader>
            <CardTitle className="text-brand-gold flex items-center gap-2">
              <Settings className="w-5 h-5" />
              ElevenLabs Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>API Configuration</span>
              <Badge variant={setupStatus.api_key_configured ? "default" : "destructive"}>
                {setupStatus.api_key_configured ? "Configured" : "Not Configured"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Voice Clone Ready</span>
              <Badge variant={setupStatus.voice_id_configured ? "default" : "secondary"}>
                {setupStatus.voice_id_configured ? "Ready" : "Pending"}
              </Badge>
            </div>
            {setupStatus.subscription_tier && (
              <div className="flex items-center justify-between">
                <span>Subscription</span>
                <Badge variant="outline">{setupStatus.subscription_tier}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      {showInstructions && (
        <Card className="border-brand-orange/30 bg-gradient-to-br from-brand-orange/5 to-brand-gold/5">
          <CardHeader>
            <CardTitle className="text-brand-orange">Voice Recording Instructions</CardTitle>
            <CardDescription>
              Follow these steps to create Dr. Helen's custom voice clone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <strong>Prepare Your Environment:</strong> Find a quiet room with minimal echo and background noise
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <strong>Recording Duration:</strong> Record 5-10 minutes of clear, natural speech
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <strong>Speaking Style:</strong> Use your natural, conversational tone as if speaking to a patient
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <div>
                  <strong>Content:</strong> Read the provided script naturally, including Ayurvedic terms and your tagline
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInstructions(false)}
              className="text-brand-earth hover:text-brand-gold"
            >
              Hide Instructions
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recording Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Record Audio */}
        <Card className="border-brand-mustard/30">
          <CardHeader>
            <CardTitle className="text-brand-mustard flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Record Your Voice
            </CardTitle>
            <CardDescription>
              Record directly in your browser using your microphone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  className="bg-brand-mustard hover:bg-brand-orange text-white"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  variant="destructive"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Recording
                </Button>
              )}
            </div>

            {recordedAudio && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Recording Complete</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={playRecordedAudio}
                    disabled={isPlaying}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    {isPlaying ? 'Playing...' : 'Preview'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={uploadRecordedAudio}
                    className="bg-brand-gold hover:bg-brand-orange text-white"
                    disabled={uploadStatus === 'uploading'}
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    Upload Recording
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload File */}
        <Card className="border-brand-dirt-red/30">
          <CardHeader>
            <CardTitle className="text-brand-dirt-red flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Audio File
            </CardTitle>
            <CardDescription>
              Upload a pre-recorded audio file (WAV, MP3, M4A, FLAC)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".wav,.mp3,.m4a,.flac"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              className="hidden"
            />
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-brand-dirt-red hover:bg-brand-orange text-white"
              disabled={uploadStatus === 'uploading'}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Audio File
            </Button>

            <div className="text-xs text-gray-600">
              Supported formats: WAV, MP3, M4A, FLAC<br />
              Recommended: 5-10 minutes of clear speech
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Status */}
      <AnimatePresence>
        {uploadStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className={`border-2 ${
              uploadStatus === 'success' ? 'border-green-200 bg-green-50' :
              uploadStatus === 'error' ? 'border-red-200 bg-red-50' :
              'border-blue-200 bg-blue-50'
            }`}>
              <CardContent className="pt-6">
                <div className={`flex items-center gap-3 ${getStatusColor(uploadStatus)}`}>
                  {getStatusIcon(uploadStatus)}
                  <div>
                    {uploadStatus === 'uploading' && "Creating your voice clone..."}
                    {uploadStatus === 'success' && "Voice clone created successfully! Dr. Helen's voice is ready."}
                    {uploadStatus === 'error' && "Failed to create voice clone. Please try again."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Testing */}
      {voiceId && uploadStatus === 'success' && (
        <Card className="border-brand-gold/30 bg-gradient-to-br from-brand-gold/5 to-brand-orange/5">
          <CardHeader>
            <CardTitle className="text-brand-gold flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Test Your Voice Clone
            </CardTitle>
            <CardDescription>
              Listen to how your cloned voice sounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={testVoice}
              className="bg-brand-gold hover:bg-brand-orange text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Test Dr. Helen's Voice
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceCloning;
