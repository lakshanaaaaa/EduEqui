import { useNavigate } from "react-router-dom";
import { Eye, Ear, Accessibility, Brain, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import CategoryCard from "@/components/CategoryCard";
import { speakWithTTS } from "@/lib/tts";
import { useEffect } from "react";

const categories = [
  {
    id: "blind",
    title: "Blind / Visually Impaired",
    titleTamil: "காட்சி குறைபாடு",
    description: "Audio-first learning with screen reader support and voice navigation",
    icon: Eye,
  },
  {
    id: "deaf",
    title: "Deaf / Hard of Hearing",
    titleTamil: "செவித்திறன் குறைபாடு",
    description: "Visual learning with sign language support and text transcripts",
    icon: Ear,
  },
  {
    id: "mobility",
    title: "Mobility Impairment",
    titleTamil: "நடமாட்ட குறைபாடு",
    description: "Hands-free navigation with voice commands and gaze tracking",
    icon: Accessibility,
  },
  {
    id: "cognitive",
    title: "Cognitive Disabilities",
    titleTamil: "அறிவாற்றல் குறைபாடு",
    description: "Simplified content, visual aids, and adaptive learning pace",
    icon: Brain,
  },
];

const CategorySelection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Bilingual welcome message
    const welcomeMessage = async () => {
      await speakWithTTS({
        text: "Please select your accessibility requirement. Choose from the following categories: Blind or Visually Impaired, Deaf or Hard of Hearing, Mobility Impairment, or Cognitive Disabilities.",
        languageCode: 'en-US'
      });
      
      // Tamil translation after a delay
      setTimeout(async () => {
        await speakWithTTS({
          text: "உங்கள் அணுகல் தேவையைத் தேர்ந்தெடுக்கவும். பின்வரும் வகைகளிலிருந்து தேர்வு செய்யவும்: குருட்டுத்தன்மை அல்லது பார்வைக் குறைபாடு, செவிட்டு அல்லது கேட்கும் குறைபாடு, இயக்கக் குறைபாடு அல்லது அறிவாற்றல் குறைபாடு.",
          languageCode: 'ta-IN'
        });
      }, 5000);
    };

    welcomeMessage();
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    navigate("/language", { state: { category: categoryId } });
  };

  const speakCategory = async (text: string) => {
    await speakWithTTS({
      text,
      languageCode: 'en-US' // Default to English for category descriptions
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AccessibilityToolbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                size="lg"
                className="text-lg rounded-2xl"
                aria-label="Go back to home page"
              >
                <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
                Back to Home
              </Button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
              Choose Your Learning Path
            </h1>
            <p className="text-2xl text-center mb-12 text-muted-foreground">
              உங்கள் கற்றல் பாதையை தேர்வு செய்யுங்கள்
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  onMouseEnter={() => speakCategory(`${category.title}. ${category.description}`)}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CategoryCard
                    title={category.title}
                    titleTamil={category.titleTamil}
                    description={category.description}
                    icon={category.icon}
                    onClick={() => {}}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategorySelection;
