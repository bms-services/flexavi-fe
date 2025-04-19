
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const MainHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            DakLeadHub
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="text-sm hover:text-primary transition-colors">
              Prijzen
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="sm">Inloggen</Button>
            </Link>
            <Link to="/auth/register">
              <Button size="sm">Gratis proberen</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
