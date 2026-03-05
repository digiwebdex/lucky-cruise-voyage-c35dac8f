import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/cruises", label: "Cruises" },
  { to: "/packages", label: "Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Lucky Tours & Travels" className="h-10 w-auto" />
          <span className="hidden text-lg font-bold text-secondary sm:inline">Lucky Tours & Travels</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary ${
                location.pathname === link.to ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="hidden gap-1.5 bg-green-600 text-white hover:bg-green-700 sm:flex">
              <Phone className="h-4 w-4" /> WhatsApp
            </Button>
          </a>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer" className="mt-2 block">
            <Button size="sm" className="w-full gap-1.5 bg-green-600 text-white hover:bg-green-700">
              <Phone className="h-4 w-4" /> WhatsApp
            </Button>
          </a>
        </nav>
      )}
    </header>
  );
}
