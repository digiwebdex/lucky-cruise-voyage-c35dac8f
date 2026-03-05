import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { galleryImages } from "@/services/mockData";

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div>
      <section className="bg-secondary py-12 text-center text-secondary-foreground">
        <div className="container">
          <h1 className="text-3xl font-extrabold md:text-4xl">Photo <span className="text-primary">Gallery</span></h1>
          <p className="mt-2 text-secondary-foreground/80">Moments captured from our tours</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="watermark-container mb-3 cursor-pointer overflow-hidden rounded-lg break-inside-avoid" onClick={() => setLightbox(img)}>
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full object-cover transition-transform hover:scale-105" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          {lightbox && (
            <div className="watermark-container">
              <img src={lightbox} alt="Gallery" className="w-full rounded-lg" draggable={false} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
