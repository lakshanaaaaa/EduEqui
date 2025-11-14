import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  titleTamil: string;
  difficulty: string;
  progress: number;
  onClick: () => void;
}

const CourseCard = ({ title, titleTamil, difficulty, progress, onClick }: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 gradient-card border-2 border-primary/20 rounded-3xl shadow-elegant">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <BookOpen className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary mb-1">{titleTamil}</h3>
            <h4 className="text-xl font-bold mb-2">{title}</h4>
            <p className="text-lg text-muted-foreground">
              Difficulty: <span className="font-semibold">{difficulty}</span>
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-lg mb-2">
            <span>Progress</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" aria-label={`Course progress: ${progress}%`} />
        </div>
        
        <Button 
          onClick={onClick}
          className="w-full text-lg py-6 rounded-2xl"
          aria-label={`Continue learning ${title}`}
        >
          Continue Learning
        </Button>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
