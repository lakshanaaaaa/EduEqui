import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import VoiceButton from "./VoiceButton";
import { speakWithTTS } from "@/lib/tts";

interface CategoryCardProps {
  title: string;
  titleTamil: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

import { useRef } from 'react';

const CategoryCard = ({ title, titleTamil, description, icon: Icon, onClick }: CategoryCardProps) => {
  const isSpeakingRef = useRef(false);
  
  const handleHover = () => {
    if (isSpeakingRef.current) return;
    
    isSpeakingRef.current = true;
    speakWithTTS({
      text: `${title}. ${description}`,
      languageCode: 'en-US', // Using English for category descriptions
      force: true // Stop any current speech
    })
    .finally(() => {
      // Reset the flag after a delay to prevent rapid re-triggering
      setTimeout(() => {
        isSpeakingRef.current = false;
      }, 1000);
    })
    .catch(error => {
      console.error('Error in TTS:', error);
      isSpeakingRef.current = false;
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={handleHover}
      onFocus={handleHover}
    >
      <Card
        className="p-8 gradient-card cursor-pointer hover:shadow-elegant transition-all border-2 border-primary/20 rounded-3xl"
        onClick={onClick}
        onMouseEnter={handleHover}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        aria-label={`${title} - ${description}`}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-6 bg-primary/10 rounded-full">
            <Icon className="w-16 h-16 text-primary" aria-hidden="true" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-primary mb-1">{titleTamil}</h3>
            <h4 className="text-2xl font-bold mb-2">{title}</h4>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          
          <VoiceButton 
            englishText={`${title}. ${description}`}
            tamilText={`${titleTamil}. ${description}`}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;
