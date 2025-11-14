import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Pause, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import VoiceButton from "@/components/VoiceButton";

const courseContents: Record<string, { title: string; titleTamil: string; content: string; contentTamil: string }> = {
  math: {
    title: "Introduction to Mathematics",
    titleTamil: "கணிதத்தின் அறிமுகம்",
    content: `
      Mathematics is the science of numbers, quantities, and shapes. 
      It helps us understand patterns and solve problems in everyday life.
      From counting money to measuring ingredients for cooking, math is everywhere!
    `,
    contentTamil: `
      கணிதம் என்பது எண்கள், அளவுகள் மற்றும் வடிவங்களின் அறிவியல்.
      இது வடிவங்களைப் புரிந்துகொள்ளவும் அன்றாட வாழ்வில் பிரச்சனைகளைத் தீர்க்கவும் உதவுகிறது.
      பணத்தை எண்ணுவது முதல் சமையலுக்கான பொருட்களை அளவிடுவது வரை, கணிதம் எல்லா இடத்திலும் உள்ளது!
    `,
  },
  science: {
    title: "Introduction to Science",
    titleTamil: "அறிவியலின் அறிமுகம்",
    content: `
      Science is the systematic study of the natural world through observation and experimentation.
      It helps us understand how things work, from the smallest particles to the vast universe.
      Science is all around us - in the food we eat, the air we breathe, and the technology we use!
    `,
    contentTamil: `
      அறிவியல் என்பது கவனிப்பு மற்றும் சோதனைகள் மூலம் இயற்கை உலகத்தை முறையாக ஆய்வு செய்வது.
      இது எல்லாம் எவ்வாறு செயல்படுகின்றன என்பதைப் புரிந்துகொள்ள உதவுகிறது, சிறிய துகள்கள் முதல் விண்வெளி வரை.
      அறிவியல் நம்மைச் சுற்றியுள்ளது - நாம் உண்ணும் உணவில், நாம் சுவாசிக்கும் காற்றில், நாம் பயன்படுத்தும் தொழில்நுட்பத்தில்!
    `,
  },
  language: {
    title: "Introduction to Language Arts",
    titleTamil: "மொழி கலைகளின் அறிமுகம்",
    content: `
      Language Arts is the study of reading, writing, speaking, and listening.
      It helps us communicate effectively and express our thoughts and ideas clearly.
      Through stories, poetry, and literature, we explore new worlds and understand different perspectives!
    `,
    contentTamil: `
      மொழி கலைகள் என்பது வாசிப்பு, எழுதுதல், பேசுதல் மற்றும் கேட்டல் பற்றிய ஆய்வு.
      இது நமக்கு திறம்பட தொடர்பு கொள்ளவும் நமது எண்ணங்கள் மற்றும் கருத்துகளை தெளிவாக வெளிப்படுத்தவும் உதவுகிறது.
      கதைகள், கவிதைகள் மற்றும் இலக்கியம் மூலம், நாம் புதிய உலகங்களை ஆராய்கிறோம் மற்றும் வெவ்வேறு பார்வைகளைப் புரிந்துகொள்கிறோம்!
    `,
  },
  history: {
    title: "Introduction to History",
    titleTamil: "வரலாற்றின் அறிமுகம்",
    content: `
      History is the study of past events, people, and civilizations.
      It helps us understand how the world has changed over time and learn from the experiences of those who came before us.
      By studying history, we can better understand the present and make informed decisions about the future!
    `,
    contentTamil: `
      வரலாறு என்பது கடந்த கால நிகழ்வுகள், மக்கள் மற்றும் நாகரிகங்களைப் பற்றிய ஆய்வு.
      இது காலப்போக்கில் உலகம் எவ்வாறு மாறியுள்ளது என்பதைப் புரிந்துகொள்ளவும் நமக்கு முன் வந்தவர்களின் அனுபவங்களிலிருந்து கற்றுக்கொள்ளவும் உதவுகிறது.
      வரலாற்றைப் படிப்பதன் மூலம், நாம் தற்போதைய நிலையை சிறப்பாக புரிந்துகொண்டு எதிர்காலத்தைப் பற்றி நன்கு தெரிந்த முடிவுகளை எடுக்க முடியும்!
    `,
  },
};

const CoursePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);

  const courseId = location.state?.courseId || "math";
  const courseContent = courseContents[courseId] || courseContents.math;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying && 'speechSynthesis' in window) {
      const text = `${courseContent.contentTamil} ${courseContent.content}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const handleTakeQuiz = () => {
    navigate("/quiz", { state: { courseId: location.state?.courseId } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AccessibilityToolbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                size="lg"
                className="text-lg rounded-2xl"
                aria-label="Go back to dashboard"
              >
                <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
                Back to Dashboard
              </Button>
            </div>

            {/* Course Header */}
            <div className="text-center mb-12">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" aria-hidden="true" />
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
                {courseContent.titleTamil}
              </h1>
              <h2 className="text-3xl font-bold text-muted-foreground">
                {courseContent.title}
              </h2>
            </div>

            {/* Audio Player Section */}
            <Card className="p-8 mb-8 gradient-card border-2 border-primary/20 rounded-3xl shadow-elegant">
              <div className="flex flex-col items-center gap-6">
                <h3 className="text-2xl font-bold">Audio Lesson / ஒலி பாடம்</h3>
                
                <Button
                  onClick={handlePlayPause}
                  size="lg"
                  className="w-32 h-32 rounded-full text-2xl shadow-glow"
                  aria-label={isPlaying ? "Pause audio lesson" : "Play audio lesson"}
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12" aria-hidden="true" />
                  ) : (
                    <Play className="w-12 h-12 ml-2" aria-hidden="true" />
                  )}
                </Button>
                
                <p className="text-xl text-center text-muted-foreground">
                  {isPlaying ? "Playing... / இயங்குகிறது..." : "Click to listen / கேட்க கிளிக் செய்யவும்"}
                </p>
              </div>
            </Card>

            {/* Text Content Section */}
            <Card className="p-8 mb-8 gradient-card border-2 border-primary/20 rounded-3xl">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">Lesson Content / பாட உள்ளடக்கம்</h3>
                <VoiceButton 
                  englishText={courseContent.content}
                  tamilText={courseContent.contentTamil}
                />
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-primary/5 rounded-2xl">
                  <p className="text-xl leading-relaxed text-foreground font-medium">
                    {courseContent.contentTamil}
                  </p>
                </div>
                
                <div className="p-6 bg-accent/5 rounded-2xl">
                  <p className="text-xl leading-relaxed text-foreground">
                    {courseContent.content}
                  </p>
                </div>
              </div>
            </Card>

            {/* ISL Video Placeholder */}
            <Card className="p-8 mb-8 gradient-card border-2 border-primary/20 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">
                Sign Language Video / சைகை மொழி வீடியோ
              </h3>
              <div className="bg-muted/50 rounded-2xl aspect-video flex items-center justify-center">
                <p className="text-xl text-muted-foreground">
                  ISL Video Placeholder
                </p>
              </div>
            </Card>

            {/* Take Quiz Button */}
            <div className="text-center">
              <Button
                onClick={handleTakeQuiz}
                size="lg"
                className="text-2xl py-8 px-12 rounded-3xl shadow-elegant"
                aria-label="Take quiz to test your knowledge"
              >
                Take Quiz / வினாடி வினா எடுங்கள்
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursePage;
