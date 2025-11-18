import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Header = () => {
  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl md:text-3xl font-black text-foreground hover:opacity-80 transition-opacity">
          Aeden Manell
        </Link>
        
        <a
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-[15px] bg-secondary hover:bg-accent transition-colors"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="h-5 w-5 text-foreground" />
        </a>
      </div>
    </header>
  );
};

export default Header;
