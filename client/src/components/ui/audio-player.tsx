import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Headphones } from 'lucide-react';
import { Button } from './button';
import { Slider } from './slider';

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  content?: string;
}

export function AudioPlayer({ audioUrl, title, content }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
      setIsLoading(false);
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
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = volume;
        
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

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const seekTime = value[0];
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skipBack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, audio.currentTime - 15);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(duration, audio.currentTime + 15);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
          <Headphones className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {speechSupported && content ? 'Listen to this article' : 'Audio Player'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
            {speechSupported && content ? 'AI text-to-speech reading' : title}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-slate-600 dark:text-slate-400">Loading audio...</p>
        </div>
      ) : !speechSupported && !audioUrl ? (
        <div className="text-center py-4">
          <p className="text-slate-600 dark:text-slate-400">Audio not available on this device</p>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={skipBack}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={togglePlayPause}
                size="sm"
                className="h-10 w-10 p-0 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
              
              <Button
                onClick={skipForward}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 min-w-0">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}