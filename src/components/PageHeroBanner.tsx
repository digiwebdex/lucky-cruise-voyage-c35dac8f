import { motion } from "framer-motion";
import { ReactNode } from "react";

import familyTour from "@/assets/hero/family-tour.jpg";
import coupleTour from "@/assets/hero/couple-tour.jpg";
import friendsTour from "@/assets/hero/friends-tour.jpg";
import cruiseLandscape from "@/assets/hero/cruise-landscape.jpg";
import wildlifeTour from "@/assets/hero/wildlife-tour.jpg";
import haorLandscape from "@/assets/hero/haor-landscape.jpg";

const heroImages: Record<string, string> = {
  cruises: cruiseLandscape,
  packages: familyTour,
  gallery: friendsTour,
  blog: wildlifeTour,
  about: coupleTour,
  contact: haorLandscape,
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

interface Props {
  page: keyof typeof heroImages;
  children: ReactNode;
}

export default function PageHeroBanner({ page, children }: Props) {
  const bgImage = heroImages[page];

  return (
    <section className="relative py-16 md:py-20 text-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-secondary/80" />
      <div className="container relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
