import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import { speakWithTTS } from "@/lib/tts";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Bilingual voice greeting on load
    const greetUser = async () => {
      // Speak English first
      await speakWithTTS({
        text: "Welcome to SahayLearn AI! Education for everyone.",
        languageCode: 'en-US'
      });
      
      // Then speak Tamil after a short delay
      setTimeout(async () => {
        await speakWithTTS({
          text: "வணக்கம்! அனைவருக்கும் கல்வி!",
          languageCode: 'ta-IN'
        });
      }, 3500);
    };

    greetUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AccessibilityToolbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 gradient-hero text-primary-foreground">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                வணக்கம்! Welcome!
              </h1>
              <p className="text-2xl md:text-3xl mb-8 opacity-95">
                Empowering Every Learner Through AI
              </p>
              <p className="text-xl md:text-2xl mb-12 opacity-90">
                அனைவருக்கும் கல்வி – Education Without Barriers
              </p>
              
              <Button
                onClick={() => navigate("/category")}
                size="lg"
                className="text-2xl py-8 px-12 rounded-3xl bg-card text-primary hover:bg-card/90 shadow-glow animate-pulse-glow"
                aria-label="Start your learning journey"
              >
                <Sparkles className="w-8 h-8 mr-3" aria-hidden="true" />
                Start Learning
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-center mb-16 text-primary">
                Our Inclusive Features
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={BookOpen}
                  title="Multilingual Support"
                  titleTamil="பல மொழி ஆதரவு"
                  description="Learn in Tamil, English, or both languages simultaneously"
                />
                
                <FeatureCard
                  icon={Users}
                  title="For All Abilities"
                  titleTamil="அனைத்து திறன்களும்"
                  description="Designed for blind, deaf, mobility, and cognitive needs"
                />
                
                <FeatureCard
                  icon={Award}
                  title="AI-Powered"
                  titleTamil="AI வழங்கும்"
                  description="Personalized learning paths adapted to your pace"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Motivational Quote */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-2xl md:text-3xl font-semibold text-primary italic"
            >
              "கல்வி என்பது வாழ்க்கையின் வெற்றிக்கான திறவுகோல்"
              <br />
              <span className="text-foreground">"Education is the key to life's success"</span>
            </motion.blockquote>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, titleTamil, description }: {
  icon: any;
  title: string;
  titleTamil: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-8 bg-card rounded-3xl border-2 border-primary/20 shadow-elegant"
  >
    <div className="flex flex-col items-center text-center gap-4">
      <div className="p-6 bg-primary/10 rounded-full">
        <Icon className="w-12 h-12 text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-primary">{titleTamil}</h3>
      <h4 className="text-2xl font-bold">{title}</h4>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export default Home;
