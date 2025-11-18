import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="text-2xl md:text-3xl font-black text-foreground hover:opacity-80 transition-opacity">
          Aeden Manell
        </Link>
      </div>
    </header>
  );
};

export default Header;
