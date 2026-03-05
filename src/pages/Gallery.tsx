import { useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cruises } from "@/services/mockData";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Gallery() {
  const [lightbox, setLightbox] = useState<{ img: string; idx: number } | null>(null);

  // Collect all cruise images as gallery
  const allImages = cruises.flatMap(c => c.images);

  const navigate = (dir: number) => {
    if (!lightbox) return;
    const newIdx = (lightbox.idx + dir + allImages.length) % allImages.length;
    setLightbox({ img: allImages[newIdx], idx: newIdx });
  };

  return (
    <div>
      <section className="gradient-hero py-16 md:py-20 text-center relative overflow-hidden">
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display text-4xl md:text-5xl font-black text-secondary-foreground">
              Photo <span className="text-gradient">Gallery</span>
            </h1>
            <p className="mt-3 text-secondary-foreground/60 max-w-md mx-auto">Moments captured from our Sundarban adventures</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
            {allImages.map((img, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: (i % 8) * 0.04 }}
                className="watermark-container mb-4 cursor-pointer overflow-hidden rounded-xl break-inside-avoid group relative"
                onClick={() => setLightbox({ img, idx: i })}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" draggable={false} />
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-5xl border-none bg-secondary/95 backdrop-blur-xl p-2 sm:p-4 shadow-2xl">
          {lightbox && (
            <div className="relative">
              <div className="watermark-container">
                <img src={lightbox.img} alt="Gallery" className="w-full rounded-xl max-h-[80vh] object-contain" draggable={false} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="text-center mt-2 text-sm text-secondary-foreground/50">{lightbox.idx + 1} / {allImages.length}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
