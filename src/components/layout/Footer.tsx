import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Ship, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
      
      <div className="gradient-navy text-secondary-foreground">
        <div className="container py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Ship className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-display font-bold text-primary">Lucky Tours</h3>
                  <p className="text-xs text-secondary-foreground/50 font-medium -mt-0.5">& Travels</p>
                </div>
              </div>
              <p className="text-sm text-secondary-foreground/60 leading-relaxed">
                Your trusted cruise tour partner in Bangladesh. Explore rivers, coasts, and the majestic Sundarbans with us.
              </p>
              <div className="mt-4 flex gap-3">
                <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
                  <Phone className="h-4 w-4" />
                </a>
                <a href="mailto:info@luckytoursbd.com" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-5 font-display font-bold text-sm uppercase tracking-wider text-primary/80">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/cruises", label: "Our Cruises" },
                  { to: "/packages", label: "Tour Packages" },
                  { to: "/gallery", label: "Photo Gallery" },
                  { to: "/about", label: "About Us" },
                  { to: "/contact", label: "Contact" },
                ].map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="flex items-center gap-2 text-sm text-secondary-foreground/60 hover:text-primary transition-colors group">
                      <ExternalLink className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-5 font-display font-bold text-sm uppercase tracking-wider text-primary/80">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-secondary-foreground/60">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span>01711-871072</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-secondary-foreground/60">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span>info@luckytoursbd.com</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-secondary-foreground/60">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span>Dhaka, Bangladesh</span>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="mb-5 font-display font-bold text-sm uppercase tracking-wider text-primary/80">Business Hours</h4>
              <div className="rounded-xl border border-secondary-foreground/10 p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-foreground/50">Sat – Thu</span>
                  <span className="font-semibold text-secondary-foreground/80">9AM – 8PM</span>
                </div>
                <div className="h-px bg-secondary-foreground/10" />
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-foreground/50">Friday</span>
                  <span className="font-semibold text-primary">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/8 py-5">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-secondary-foreground/40">
            <span>© {new Date().getFullYear()} Lucky Tours & Travels. All rights reserved.</span>
            <span>Design & Developed by <a href="https://digiwebdex.com/bn" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors font-medium">DigiWebDex</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
