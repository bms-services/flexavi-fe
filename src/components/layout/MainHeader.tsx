
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Menu } from "lucide-react";
import React, { useState } from "react";

export const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change or Escape (for better UX)
  React.useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16 relative">
          {/* Menu icon: always visible on mobile, optional on desktop */}
          <button
            className="flex items-center justify-center md:hidden mr-2 p-2 rounded-md hover:bg-accent transition-colors"
            aria-label={menuOpen ? "Sluit menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>
          {/* Logo altijd links */}
          <Logo />

          {/* Desktop nav */}
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

          {/* Mobile nav: slide down menu, overlay */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/40 md:hidden"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <nav
                className="absolute top-full left-0 w-full z-50 bg-background border-b shadow-md flex flex-col gap-1 py-4 px-6 md:hidden animate-in fade-in slide-in-from-top-8"
                role="menu"
              >
                <Link
                  to="/"
                  className="text-sm py-2 hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/pricing"
                  className="text-sm py-2 hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Prijzen
                </Link>
                <Link to="/auth/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Inloggen
                  </Button>
                </Link>
                <Link to="/auth/register" onClick={() => setMenuOpen(false)}>
                  <Button size="sm" className="w-full text-left justify-start mt-2">
                    Gratis proberen
                  </Button>
                </Link>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
