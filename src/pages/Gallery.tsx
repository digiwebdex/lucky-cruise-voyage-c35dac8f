import { useState } from "react";
import ImageZoom from "@/components/ImageZoom";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ChevronLeft, ChevronRight, Ship, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getCruises } from "@/services/cmsStore";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHeroBanner from "@/components/PageHeroBanner";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Gallery() {
  const { t } = useLanguage();
  const cruises = getCruises();
  const [activeCruise, setActiveCruise] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set(cruises.map(c => c.id)));
  const [lightbox, setLightbox] = useState<{ img: string; images: string[]; idx: number } | null>(null);

  const filteredCruises = activeCruise
    ? cruises.filter(c => c.id === activeCruise)
    : cruises;

  const navigate = (dir: number) => {
    if (!lightbox) return;
    const { images, idx } = lightbox;
    const newIdx = (idx + dir + images.length) % images.length;
    setLightbox({ img: images[newIdx], images, idx: newIdx });
  };

  return (
    <div>
      <PageHeroBanner page="gallery">
            <h1 className="font-display text-4xl md:text-5xl font-black text-secondary-foreground">
              {t.gallery.title} <span className="text-gradient">{t.gallery.titleHighlight}</span>
            </h1>
            <p className="mt-3 text-secondary-foreground/60 max-w-md mx-auto">{t.gallery.subtitle}</p>
      </PageHeroBanner>

      {/* Cruise Filter Tabs */}
      <section className="py-4 sm:py-6 border-b border-border sticky top-16 z-30 bg-background/95 backdrop-blur-md">
        <div className="container">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            <Button
              variant={activeCruise === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCruise(null)}
              className="gap-1.5"
            >
              <Ship className="h-4 w-4" />
              {t.gallery.allCruises}
            </Button>
            {cruises.map(c => (
              <Button
                key={c.id}
                variant={activeCruise === c.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCruise(c.id)}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery by Cruise */}
      <section className="py-12">
        <div className="container space-y-16">
          {filteredCruises.map(cruise => (
            <motion.div
              key={cruise.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <button
                className="mb-4 flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity"
                onClick={() => {
                  const next = new Set(expandedSections);
                  next.has(cruise.id) ? next.delete(cruise.id) : next.add(cruise.id);
                  setExpandedSections(next);
                }}
              >
                <div className="h-1 w-8 rounded-full bg-primary" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {cruise.name}
                </h2>
                <span className="text-sm text-muted-foreground">({cruise.images.length} photos)</span>
                <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-border">
                  {expandedSections.has(cruise.id) ? <Minus className="h-4 w-4 text-muted-foreground" /> : <Plus className="h-4 w-4 text-primary" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expandedSections.has(cruise.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="columns-2 gap-2 sm:gap-4 md:columns-3 lg:columns-4">
                      {cruise.images.map((img, i) => (
                        <motion.div
                          key={i}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={fadeUp}
                          transition={{ delay: (i % 8) * 0.04 }}
                          className="watermark-container mb-4 cursor-pointer overflow-hidden rounded-xl break-inside-avoid group relative"
                          onClick={() => setLightbox({ img, images: cruise.images, idx: i })}
                        >
                          <img src={img} alt={`${cruise.name} ${i + 1}`} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-110" draggable={false} />
                          <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-all duration-300 flex items-center justify-center">
                            <ZoomIn className="h-8 w-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-5xl border-none bg-secondary/95 backdrop-blur-xl p-2 sm:p-4 shadow-2xl">
          {lightbox && (
            <div className="relative">
              <div className="watermark-container">
                <ImageZoom src={lightbox.img} alt="Gallery" className="w-full rounded-xl max-h-[80vh]" zoomScale={2.5} />
              </div>
              <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground" onClick={(e) => { e.stopPropagation(); navigate(-1); }}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground" onClick={(e) => { e.stopPropagation(); navigate(1); }}>
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="text-center mt-2 text-sm text-secondary-foreground/50">{lightbox.idx + 1} / {lightbox.images.length}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
