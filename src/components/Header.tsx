import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-elegant">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <GraduationCap className="w-12 h-12 text-primary" aria-hidden="true" />
          <div>
            <h1 className="text-3xl font-bold text-primary">
              SahayLearn AI
            </h1>
            <p className="text-lg text-muted-foreground">
              கல்வி அனைவருக்கும் – Education for Everyone
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
