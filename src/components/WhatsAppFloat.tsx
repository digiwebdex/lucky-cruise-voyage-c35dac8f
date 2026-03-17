import { MessageCircle, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppFloat() {
  const [showTop, setShowTop] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/8801711871072"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float group"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" />
        <span className="absolute left-[72px] whitespace-nowrap rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {t.whatsapp.tooltip}
        </span>
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
