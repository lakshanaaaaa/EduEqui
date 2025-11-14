import { useState } from "react";
import { ZoomIn, ZoomOut, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccessibilityToolbar = () => {
  const [fontSize, setFontSize] = useState(20);
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 32);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 18);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
  };

  return (
    <div className="fixed bottom-6 right-6 flex gap-2 bg-card border border-border rounded-2xl p-2 shadow-elegant z-50">
      <Button
        onClick={decreaseFontSize}
        variant="outline"
        size="icon"
        className="hover:bg-primary hover:text-primary-foreground"
        aria-label="Decrease font size"
      >
        <ZoomOut className="w-5 h-5" aria-hidden="true" />
      </Button>
      
      <Button
        onClick={increaseFontSize}
        variant="outline"
        size="icon"
        className="hover:bg-primary hover:text-primary-foreground"
        aria-label="Increase font size"
      >
        <ZoomIn className="w-5 h-5" aria-hidden="true" />
      </Button>
      
      <Button
        onClick={toggleHighContrast}
        variant={highContrast ? "default" : "outline"}
        size="icon"
        className={highContrast ? "" : "hover:bg-primary hover:text-primary-foreground"}
        aria-label="Toggle high contrast mode"
        aria-pressed={highContrast}
      >
        <Contrast className="w-5 h-5" aria-hidden="true" />
      </Button>
    </div>
  );
};

export default AccessibilityToolbar;
