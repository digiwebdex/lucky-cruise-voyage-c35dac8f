import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/cruises", label: t.nav.cruises },
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

  const toggleLang = () => setLang(lang === "bn" ? "en" : "bn");

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-secondary/98 backdrop-blur-lg shadow-lg shadow-secondary/10" : "bg-secondary/90 backdrop-blur-md"}`}>
      <div className="container flex h-16 items-center justify-between md:h-18">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Lucky Tours & Travels" className="h-14 w-auto transition-transform group-hover:scale-105" />
          <span className="text-lg font-black tracking-wide text-primary" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.05em' }}>Lucky Tours & Travels</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(link => {
            const active = location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to));
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
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all border border-primary/30 bg-primary/5 text-primary hover:bg-primary/15"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className={lang === "bn" ? "opacity-50" : ""}>{lang === "bn" ? "EN" : ""}</span>
            {lang === "bn" ? "" : <span className="opacity-50">বাং</span>}
            {lang === "bn" ? (
              <span>বাংলা → EN</span>
            ) : (
              <span>English → বাং</span>
            )}
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
                const active = location.pathname === link.to;
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
