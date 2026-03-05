import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">Lucky Tours & Travels</h3>
            <p className="text-sm text-secondary-foreground/80">
              Your trusted cruise tour partner in Bangladesh. Explore rivers, coasts, and the majestic Sundarbans with us.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/cruises" className="hover:text-primary">Cruises</Link></li>
              <li><Link to="/packages" className="hover:text-primary">Packages</Link></li>
              <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Contact Info</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 01711871072</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@luckytoursbd.com</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Dhaka, Bangladesh</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Business Hours</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>Saturday – Thursday</li>
              <li>9:00 AM – 8:00 PM</li>
              <li className="text-primary font-medium">Friday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 py-4 text-center text-xs text-secondary-foreground/60">
        © {new Date().getFullYear()} Lucky Tours & Travels. All rights reserved.
      </div>
    </footer>
  );
}
