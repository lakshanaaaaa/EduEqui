const API_URL = 'http://localhost:5000/tts';

interface TTSOptions {
  text: string;
  languageCode: string;
  force?: boolean; // If true, will interrupt current speech
}

// Global queue for TTS requests
const ttsQueue: Array<{text: string, languageCode: string}> = [];
let isPlaying = false;
let currentAudio: HTMLAudioElement | null = null;
let isInitialized = false;
const queuedSpeeches = new Set<string>(); // Track queued speeches to prevent duplicates

const processQueue = async (): Promise<void> => {
  if (isPlaying || ttsQueue.length === 0) return;
  
  isPlaying = true;
  const { text, languageCode } = ttsQueue.shift()!;
  
  // Skip if this exact text is already in the queue
  if (queuedSpeeches.has(text)) {
    isPlaying = false;
    processQueue();
    return;
  }
  
  queuedSpeeches.add(text);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        lang: languageCode.split('-')[0] // Ensure we only use language code without region
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate speech');
    }

    // Convert the response to a blob
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    return new Promise((resolve) => {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        URL.revokeObjectURL(currentAudio.src);
      }
      
      // Create audio element and play
      const audio = new Audio(audioUrl);
      currentAudio = audio;
      
      // Set up cleanup and queue processing for next item
      const cleanup = () => {
        if (currentAudio === audio) {
          currentAudio = null;
        }
        URL.revokeObjectURL(audioUrl);
        isPlaying = false;
        audio.removeEventListener('ended', onEnd);
        audio.removeEventListener('error', onError);
        queuedSpeeches.delete(text);
        processQueue();
        resolve();
      };
      
      const onEnd = () => cleanup();
      const onError = () => {
        console.error('Error playing audio');
        cleanup();
      };
      
      audio.addEventListener('ended', onEnd);
      audio.addEventListener('error', onError);
      
      // Play the audio
      audio.play().catch(error => {
        console.error('Audio playback failed:', error);
        cleanup();
      });
    });
    
  } catch (error) {
    console.error('TTS Error:', error);
    isPlaying = false;
    processQueue();
  }
};

export const speakWithTTS = async ({ text, languageCode, force = false }: TTSOptions): Promise<void> => {
  if (!text) return;
  
  // If force is true, stop current playback and clear queue
  if (force) {
    stopTTS();
  }
  
  // Skip if already in queue and not forcing
  if (queuedSpeeches.has(text) && !force) {
    return;
  }
  
  // Add to queue
  ttsQueue.push({ text, languageCode });
  
  // Process queue if not already processing
  if (!isPlaying) {
    await processQueue();
  }
};

export const stopTTS = (): void => {
  // Clear the queue
  ttsQueue.length = 0;
  queuedSpeeches.clear();
  
  // Stop current audio if any
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    URL.revokeObjectURL(currentAudio.src);
    currentAudio = null;
  }
  
  isPlaying = false;
};

// Stop all TTS when page is unloaded
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', stopTTS);
  window.addEventListener('pagehide', stopTTS);
}
