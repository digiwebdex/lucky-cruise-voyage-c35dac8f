import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronRight, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import HeaderBookingModal from "@/components/HeaderBookingModal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cruiseDropdownOpen, setCruiseDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const cruiseSubLinks = [
    { to: "/cruises?destination=sundarban", label: t.nav.sundarbanTour },
    { to: "/cruises?destination=tanguar-haor", label: t.nav.tanguarHaorTour },
  ];

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/cruises", label: t.nav.cruises, hasDropdown: true },
    { to: "/packages", label: t.nav.packages },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCruiseDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLang = () => setLang(lang === "bn" ? "en" : "bn");

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-secondary/98 backdrop-blur-lg shadow-lg shadow-secondary/10" : "bg-secondary/90 backdrop-blur-md"}`}>
      <div className="container flex h-16 items-center justify-between md:h-18">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
          <img src={logo} alt="Lucky Tours & Travels" className="h-10 sm:h-14 w-auto flex-shrink-0 transition-transform group-hover:scale-105" />
          <span className="text-xs sm:text-lg font-black tracking-wide text-primary whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.05em' }}>Lucky Tours & Travels</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(link => {
            const active = location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to.split("?")[0]));
            
            if (link.hasDropdown) {
              return (
                <div key={link.to} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setCruiseDropdownOpen(!cruiseDropdownOpen)}
                    className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 flex items-center gap-1 ${
                      active
                        ? "text-primary"
                        : "text-secondary-foreground/70 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${cruiseDropdownOpen ? "rotate-180" : ""}`} />
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full gradient-primary"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {cruiseDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-border/50 bg-card shadow-elevated overflow-hidden z-50"
                      >
                        {cruiseSubLinks.map(sub => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setCruiseDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "text-primary"
                    : "text-secondary-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full gradient-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-xs font-bold transition-all border border-primary/30 bg-primary/5 text-primary hover:bg-primary/15"
          >
            <Globe className="h-3.5 w-3.5 hidden sm:block" />
            <span>{lang === "bn" ? "EN" : "বাং"}</span>
          </button>

          <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="hidden gap-2 gradient-primary text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-105 sm:flex font-semibold">
              <Phone className="h-4 w-4" /> {t.nav.bookNow}
              <ChevronRight className="h-3 w-3" />
            </Button>
          </a>
          <button className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors text-secondary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-secondary-foreground/10 bg-secondary md:hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => {
                const active = location.pathname === link.to.split("?")[0];
                
                if (link.hasDropdown) {
                  return (
                    <div key={link.to}>
                      <div className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                        active ? "bg-primary/15 text-primary" : "text-secondary-foreground/70"
                      }`}>
                        {link.label}
                      </div>
                      <div className="ml-4 space-y-1">
                        {cruiseSubLinks.map(sub => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-secondary-foreground/60 hover:bg-primary/5 hover:text-primary transition-all"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      active ? "bg-primary/15 text-primary" : "text-secondary-foreground/70 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-secondary-foreground/70 hover:bg-primary/5 hover:text-primary transition-all"
              >
                <Globe className="h-4 w-4" />
                {lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
              </button>
              <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer" className="block pt-2">
                <Button size="lg" className="w-full gap-2 gradient-primary text-primary-foreground font-bold">
                  <Phone className="h-4 w-4" /> {t.nav.bookOnWhatsApp}
                </Button>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
