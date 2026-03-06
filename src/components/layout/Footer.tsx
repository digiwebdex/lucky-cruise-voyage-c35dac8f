import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Ship, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { to: "/", label: t.footer.home },
    { to: "/cruises", label: t.footer.ourCruises },
    { to: "/packages", label: t.footer.tourPackages },
    { to: "/gallery", label: t.footer.photoGallery },
    { to: "/about", label: t.footer.aboutUs },
    { to: "/contact", label: t.footer.contactLink },
  ];

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
      
      <div className="gradient-navy text-secondary-foreground">
        <div className="container py-16">
          <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
                {t.footer.tagline}
              </p>
              <div className="mt-4 flex gap-3">
                <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
                  <Phone className="h-4 w-4" />
                </a>
                <a href="mailto:luckytoursandtravels70@gmail.com" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-5 font-display font-bold text-sm uppercase tracking-wider text-primary/80">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {footerLinks.map(link => (
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
              <h4 className="mb-5 font-display font-bold text-sm uppercase tracking-wider text-primary/80">{t.footer.contactTitle}</h4>
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
                  <span className="break-all">luckytoursandtravels70@gmail.com</span>
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
              <h4 className="mb-5 font-display font-bold text-sm uppercase tracking-wider text-primary/80">{t.footer.businessHours}</h4>
              <div className="rounded-xl border border-secondary-foreground/10 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-foreground/50">{(t.footer as Record<string, string>).everyday}</span>
                  <span className="font-semibold text-primary">{(t.footer as Record<string, string>).alwaysOpen}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/8 py-5">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-secondary-foreground/40">
            <span>© {new Date().getFullYear()} Lucky Tours & Travels. {t.footer.allRights}</span>
            <span>{t.footer.designBy} <a href="https://digiwebdex.com/bn" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors font-medium">DigiWebDex</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
