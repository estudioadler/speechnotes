import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface UseSpeechRecognitionProps {
  onTranscript: (transcript: string) => void;
}

export const useSpeechRecognition = ({ onTranscript }: UseSpeechRecognitionProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startRecording = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Seu navegador não suporta reconhecimento de fala.");
      return;
    }

    try {
      const newRecognition = new SpeechRecognition();
      newRecognition.lang = 'pt-BR';
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.maxAlternatives = 1;

      newRecognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ');
        
        onTranscript(transcript);
      };

      newRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event);
        toast.error("Erro no reconhecimento de fala");
        setIsRecording(false);
      };

      newRecognition.start();
      setRecognition(newRecognition);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      toast.error("Não foi possível iniciar a gravação");
    }
  }, [onTranscript]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  }, [recognition]);

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  return { isRecording, startRecording, stopRecording };
};
