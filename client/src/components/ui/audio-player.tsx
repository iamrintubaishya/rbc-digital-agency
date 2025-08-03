import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Mic, Speaker } from 'lucide-react';
import { Button } from './button';

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  content?: string;
}

export function AudioPlayer({ audioUrl, title, content }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<number>(0);
  const [speechRate, setSpeechRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
      setIsLoading(false);
      
      // Load available voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        // Select first English voice or default
        const englishVoice = availableVoices.findIndex(voice => voice.lang.startsWith('en'));
        setSelectedVoice(englishVoice >= 0 ? englishVoice : 0);
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else if (audioUrl) {
      // Fallback to audio file if speech synthesis not supported
      const audio = audioRef.current;
      if (!audio) return;

      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
        setIsLoading(false);
      };

      const setAudioTime = () => setCurrentTime(audio.currentTime);
      
      const handleLoadError = () => {
        setIsLoading(false);
        console.warn('Audio failed to load:', audioUrl);
      };

      if (audio.readyState > 0) {
        setAudioData();
      }

      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('error', handleLoadError);

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', () => setIsPlaying(false));
        audio.removeEventListener('error', handleLoadError);
      };
    } else {
      setIsLoading(false);
    }
  }, [audioUrl]);

  // Stop audio when navigating away
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (speechSupported && isSpeaking) {
        window.speechSynthesis.cancel();
      }
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
      }
    };

    const handlePopState = () => {
      if (speechSupported && isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPlaying(false);
      }
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      // Cleanup on unmount
      if (speechSupported && isSpeaking) {
        window.speechSynthesis.cancel();
      }
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
      }
    };
  }, [speechSupported, isSpeaking]);

  const togglePlayPause = async () => {
    if (speechSupported && content) {
      // Use text-to-speech
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPlaying(false);
      } else {
        // Clean content for speech (remove markdown, HTML, etc.)
        const cleanContent = content
          .replace(/#{1,6}\s+/g, '') // Remove markdown headers
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
          .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
          .replace(/\n\n+/g, '. ') // Replace paragraphs with pauses
          .replace(/\n/g, ' ') // Replace single newlines with spaces
          .substring(0, 2000); // Limit length for performance

        const utterance = new SpeechSynthesisUtterance(cleanContent);
        if (voices[selectedVoice]) {
          utterance.voice = voices[selectedVoice];
        }
        utterance.rate = speechRate;
        utterance.pitch = 1;
        
        utterance.onstart = () => {
          setIsSpeaking(true);
          setIsPlaying(true);
        };
        
        utterance.onend = () => {
          setIsSpeaking(false);
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setIsSpeaking(false);
          setIsPlaying(false);
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else if (audioUrl) {
      // Fallback to audio file
      const audio = audioRef.current;
      if (!audio) return;

      try {
        if (isPlaying) {
          audio.pause();
        } else {
          await audio.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.warn('Audio playback failed:', error);
        setIsPlaying(false);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (speechSupported && content) {
      // Speech synthesis doesn't support seeking
      return;
    }
    
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = clickX / rect.width;
    const newTime = clickRatio * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipBack = () => {
    if (speechSupported && content) {
      // For speech synthesis, decrease speed temporarily
      if (isSpeaking) {
        setSpeechRate(prev => Math.max(0.5, prev - 0.25));
        window.speechSynthesis.cancel();
        setTimeout(() => togglePlayPause(), 100);
      }
    } else {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = Math.max(0, audio.currentTime - 15);
      }
    }
  };

  const skipForward = () => {
    if (speechSupported && content) {
      // For speech synthesis, increase speed temporarily
      if (isSpeaking) {
        setSpeechRate(prev => Math.min(2, prev + 0.25));
        window.speechSynthesis.cancel();
        setTimeout(() => togglePlayPause(), 100);
      }
    } else {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = Math.min(duration, audio.currentTime + 15);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-400 text-center">Loading audio...</p>
      </div>
    );
  }

  if (!speechSupported && !audioUrl) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-400 text-center">Audio not available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4 border border-blue-200 dark:border-slate-600" data-testid="audio-player">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-4">
        {/* Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Skip Back Button - only show for audio files */}
          {!speechSupported && audioUrl && (
            <Button
              onClick={skipBack}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-slate-600 hover:text-blue-600"
              data-testid="button-audio-skip-back"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
          )}
          
          {/* Play/Pause Button */}
          <Button
            onClick={togglePlayPause}
            size="sm"
            className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            data-testid="button-audio-play-pause"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>

          {/* Skip Forward Button - only show for audio files */}
          {!speechSupported && audioUrl && (
            <Button
              onClick={skipForward}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-slate-600 hover:text-blue-600"
              data-testid="button-audio-skip-forward"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Progress Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-slate-900 dark:text-white">
              {speechSupported && content ? 'Listen to article' : title}
            </div>
            {!speechSupported && audioUrl && duration > 0 && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {formatTime(duration)} total
              </div>
            )}
          </div>
          
          {speechSupported && content ? (
            // For text-to-speech, show a simple progress indicator
            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isSpeaking ? 'bg-blue-600 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'
                }`}
                style={{ width: isSpeaking ? '100%' : '0%' }}
              />
            </div>
          ) : (
            // For audio files, show clickable progress bar
            <div className="space-y-1">
              <div 
                className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 cursor-pointer"
                onClick={handleProgressClick}
                data-testid="audio-progress-bar"
              >
                <div 
                  className="h-2 bg-blue-600 rounded-full transition-all duration-150"
                  style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span data-testid="audio-current-time">{formatTime(currentTime)}</span>
                <span data-testid="audio-duration">{formatTime(duration)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Voice Controls for Text-to-Speech */}
      {speechSupported && content && (
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            {/* Voice Selection */}
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(Number(e.target.value))}
                className="text-xs bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-slate-700 dark:text-slate-300"
                data-testid="select-voice"
              >
                {voices.map((voice, index) => (
                  <option key={index} value={index}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <Speaker className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <div className="flex items-center gap-1">
                <Button
                  onClick={skipBack}
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 text-xs"
                  data-testid="button-speed-down"
                  title="Slower"
                >
                  <SkipBack className="w-3 h-3" />
                </Button>
                <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[3rem] text-center">
                  {speechRate.toFixed(2)}x
                </span>
                <Button
                  onClick={skipForward}
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 text-xs"
                  data-testid="button-speed-up"
                  title="Faster"
                >
                  <SkipForward className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Reset Speed */}
            <Button
              onClick={() => setSpeechRate(1)}
              variant="ghost"
              size="sm"
              className="text-xs h-6 px-2"
              data-testid="button-speed-reset"
            >
              Reset Speed
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}