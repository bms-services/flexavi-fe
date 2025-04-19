
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
      Flexavi
    </Link>
  );
}
