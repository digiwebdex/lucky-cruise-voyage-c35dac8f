import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ship, Shield, Star, Clock, MapPin, Phone, ChevronRight, Anchor, Waves, ArrowRight, Users, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cruises, testimonials } from "@/services/mockData";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

// Pick best hero images from different cruises
const heroSlides = [
  { image: cruises[0]?.images[0], title: "Explore the Wild", highlight: "Sundarbans", subtitle: "Premium cruise through the world's largest mangrove forest" },
  { image: cruises[1]?.images[0], title: "Luxury Awaits on", highlight: "Every Voyage", subtitle: "AC cabins, gourmet cuisine, and breathtaking wildlife encounters" },
  { image: cruises[2]?.images[0], title: "Adventure Meets", highlight: "Comfort", subtitle: "Modern fleet with top-tier safety and unforgettable experiences" },
  { image: cruises[3]?.images[1], title: "Discover Hidden", highlight: "Treasures", subtitle: "Royal Bengal Tigers, spotted deer, and exotic birds in their natural habitat" },
  { image: cruises[4]?.images[0], title: "Set Sail Into", highlight: "The Unknown", subtitle: "Guided tours through mysterious waterways and enchanting forests" },
];

export default function Index() {
  const featured = cruises.filter(c => c.featured).slice(0, 4);
  const allCruises = cruises.slice(0, 6);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToSlide = useCallback((idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 1.1 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-50%" : "50%", opacity: 0, scale: 0.95 }),
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="overflow-hidden">
      {/* ============ HERO SLIDER ============ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Sliding backgrounds */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <img src={slide.image} alt="" className="h-full w-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-secondary/20" />
          </motion.div>
        </AnimatePresence>

        {/* Decorative */}
        <div className="absolute top-20 right-10 opacity-[0.07] hidden lg:block pointer-events-none">
          <Anchor className="h-48 w-48 text-primary animate-float" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-[0.04] hidden lg:block pointer-events-none">
          <Waves className="h-64 w-64 text-primary" />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                <Ship className="h-4 w-4" /> Bangladesh's Premium Cruise Experience
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05] text-secondary-foreground mb-4">
                  {slide.title}
                  <br />
                  <span className="text-gradient">{slide.highlight}</span>
                </h1>
                <p className="text-lg md:text-xl text-secondary-foreground/60 max-w-xl mb-10 leading-relaxed">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, delay: 0.35 }} className="flex flex-wrap gap-4">
              <Link to="/cruises">
                <Button size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-8 h-14 rounded-xl shadow-glow hover:scale-105 transition-transform gap-2">
                  Explore Cruises <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-2 border-primary/40 text-primary font-bold text-base px-8 h-14 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all gap-2 backdrop-blur-sm">
                  <Phone className="h-5 w-5" /> Book via WhatsApp
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, delay: 0.5 }} className="mt-14 flex flex-wrap gap-8">
              {[
                { value: "6+", label: "Cruise Ships" },
                { value: "5000+", label: "Happy Travellers" },
                { value: "15+", label: "Years Experience" },
              ].map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-3xl font-display font-black text-primary">{stat.value}</div>
                  <div className="text-sm text-secondary-foreground/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
          <button onClick={prevSlide} className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/60 backdrop-blur-md text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all border border-secondary-foreground/10">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-primary" : "w-2.5 bg-secondary-foreground/30 hover:bg-secondary-foreground/50"}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/60 backdrop-blur-md text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all border border-secondary-foreground/10">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 left-8 z-20 hidden md:flex items-center gap-3">
          <span className="text-4xl font-display font-black text-primary">0{currentSlide + 1}</span>
          <span className="text-secondary-foreground/30 text-sm">/</span>
          <span className="text-sm text-secondary-foreground/40 font-medium">0{heroSlides.length}</span>
        </div>
      </section>

      {/* ============ FEATURED CRUISES ============ */}
      <section className="py-20 md:py-28 bg-background relative">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Our Fleet</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-black text-foreground">
              Featured <span className="text-gradient">Cruises</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Handpicked vessels for an unforgettable Sundarban experience</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allCruises.map((cruise, i) => (
              <motion.div key={cruise.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.08 }}>
                <Link to={`/cruises/${cruise.id}`} className="group block">
                  <Card className="overflow-hidden border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 bg-card">
                    <div className="watermark-container aspect-[4/3] overflow-hidden relative">
                      <img src={cruise.images[0]} alt={cruise.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 backdrop-blur-sm px-3 py-1 text-xs font-bold text-primary">
                          <Users className="h-3 w-3" /> {cruise.capacity}
                        </span>
                      </div>
                      {cruise.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                            ⭐ Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">{cruise.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{cruise.route}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground/70 flex items-center gap-1"><Clock className="h-3 w-3" />{cruise.duration}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                        <div>
                          <span className="text-2xl font-display font-black text-primary">৳{cruise.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground block">per person</span>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground group-hover:scale-110 transition-transform">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/cruises">
              <Button variant="outline" size="lg" className="rounded-xl border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold gap-2 px-8">
                View All Cruises <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-20 md:py-28 bg-warm-bg relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Why Us</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-black text-foreground">
              Why Choose <span className="text-gradient">Lucky Tours</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Ship, title: "Premium Fleet", desc: "Modern, well-maintained cruise ships with luxurious interiors for your comfort.", color: "bg-primary/10 text-primary" },
              { icon: Shield, title: "Maximum Safety", desc: "Armed forest guards, life jackets, GPS, VHF radio & fire safety on every trip.", color: "bg-emerald/10 text-emerald" },
              { icon: Star, title: "All-Inclusive", desc: "Meals, forest fees, guides, and activities — everything included in one price.", color: "bg-gold/10 text-gold" },
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock customer support via WhatsApp for bookings & inquiries.", color: "bg-accent/10 text-accent" },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 h-full text-center group bg-card">
                  <CardContent className="p-7">
                    <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CRUISE COMPARISON ============ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Compare</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-black text-foreground">
              Compare Our <span className="text-gradient">Cruises</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Find the perfect cruise that matches your budget and preferences</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="overflow-x-auto rounded-2xl border border-border/50 shadow-elevated bg-card">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="gradient-navy text-secondary-foreground">
                  <th className="px-6 py-4 text-left text-sm font-display font-bold">Cruise</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold">Price</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold">Capacity</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold">Cabins</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold">Duration</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {cruises.map((c, i) => (
                  <tr key={c.id} className={`border-t border-border/30 hover:bg-primary/3 transition-colors ${i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={c.images[0]} alt={c.name} className="h-12 w-16 rounded-lg object-cover" />
                        <div>
                          <p className="font-display font-bold text-foreground text-sm">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.route}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-display font-black text-primary text-lg">৳{c.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">{c.capacity}</td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">{c.cabins}</td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">{c.duration}</td>
                    <td className="px-6 py-4 text-center">
                      <Link to={`/cruises/${c.id}`}>
                        <Button size="sm" className="gradient-primary text-primary-foreground rounded-lg font-semibold text-xs gap-1">
                          View <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 md:py-28 bg-warm-bg relative overflow-hidden">
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Testimonials</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-black text-foreground">
              What Our <span className="text-gradient">Guests Say</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.1 }}>
                <Card className="border-border/50 hover:shadow-elevated transition-all duration-500 h-full bg-card">
                  <CardContent className="p-7">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }, (_, i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed mb-6">"{t.text}"</p>
                    <div className="flex items-center gap-3 border-t border-border/30 pt-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-sm font-bold text-primary-foreground">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <span className="font-display font-bold text-foreground">{t.name}</span>
                        <p className="text-xs text-muted-foreground">Verified Guest</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptLTQtMjh2MmgtNHYtMmg0em0wIDR2MmgtNHYtMmg0em0tOCA4djJoLTR2LTJoNHptMCA0djJoLTR2LTJoNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-display text-4xl md:text-6xl font-black text-secondary-foreground mb-6">
              Ready to <span className="text-gradient">Set Sail?</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg text-secondary-foreground/60 mb-10">
              Book your dream Sundarban cruise today. Contact us for custom packages, group tours, and special offers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-10 h-14 rounded-xl shadow-glow hover:scale-105 transition-transform gap-2 animate-pulse-glow">
                  <Phone className="h-5 w-5" /> WhatsApp Us Now
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-primary/40 text-primary font-bold text-base px-10 h-14 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all gap-2">
                  <MapPin className="h-5 w-5" /> Contact Page
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
