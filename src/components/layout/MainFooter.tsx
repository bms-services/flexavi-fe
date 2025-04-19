import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";

export const MainFooter = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="text-muted-foreground text-sm mt-4">
              Het complete platform voor dakdekkersbedrijven
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Prijzen</Link></li>
              <li><Link to="/auth/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">Aanmelden</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Voorwaarden</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DakLeadHub. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};
