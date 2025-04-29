
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";

export const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change or Escape key press
  useEffect(() => {
    if (!menuOpen) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    
    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    document.addEventListener("click", handleClickOutside);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on window resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Prijzen" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16 relative">
          <div className="flex items-center">
            {/* Menu button */}
            <button
              className="menu-button flex md:hidden items-center justify-center p-2 rounded-md hover:bg-accent transition-colors mr-2"
              aria-label={menuOpen ? "Sluit menu" : "Open menu"}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              type="button"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-primary" />
              )}
            </button>
            
            {/* Logo */}
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-sm hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <Link to="/auth/login">
                <Button variant="outline" size="sm">Inloggen</Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm">Gratis proberen</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      {menuOpen && (
        <div className="mobile-menu fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div 
            className="fixed top-16 inset-x-0 bottom-0 bg-background p-6 overflow-y-auto transform transition-transform duration-300"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/auth/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Inloggen
                  </Button>
                </Link>
                <Link to="/auth/register" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full justify-center">
                    Gratis proberen
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
