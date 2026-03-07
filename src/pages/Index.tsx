import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Ship, Shield, Star, Clock, MapPin, Phone, ChevronRight, Anchor, Waves, ArrowRight, Users, ChevronLeft, Compass, Sparkles, Heart, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCruises, getTestimonials, getOffers } from "@/services/cmsStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flame } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { count, ref };
}

export default function Index() {
  const { t } = useLanguage();
  const cruises = getCruises();
  const testimonials = getTestimonials();
  const offers = getOffers().filter(o => o.isActive);
  const allCruises = cruises.slice(0, 6);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stat1 = useCounter(6, 1500);
  const stat2 = useCounter(5000, 2000);
  const stat3 = useCounter(15, 1500);

  const heroSlides = [
    { image: cruises[0]?.images[cruises[0]?.featuredImageIndex ?? 0] },
    { image: cruises[1]?.images[cruises[1]?.featuredImageIndex ?? 0] },
    { image: cruises[2]?.images[cruises[2]?.featuredImageIndex ?? 0] },
    { image: cruises[3]?.images[cruises[3]?.featuredImageIndex ?? 0] },
    { image: cruises[4]?.images[cruises[4]?.featuredImageIndex ?? 0] },
  ];

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

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % Math.min(testimonials.length, 5));
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 1.1 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-50%" : "50%", opacity: 0, scale: 0.95 }),
  };

  const slide = heroSlides[currentSlide];
  const slideText = t.hero.slides[currentSlide];

  return (
    <div className="overflow-hidden">
      {/* ============ HERO SLIDER ============ */}
      <section ref={heroRef} className="relative min-h-[80vh] sm:min-h-[95vh] flex items-center overflow-hidden">
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
            <motion.div style={{ y: heroY }} className="absolute inset-0">
              <img src={slide.image} alt="" className="h-full w-full object-cover scale-110" draggable={false} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/50 to-secondary/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-secondary/30" />
          </motion.div>
        </AnimatePresence>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 opacity-[0.06] hidden lg:block pointer-events-none">
          <Anchor className="h-56 w-56 text-primary animate-float" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-[0.04] hidden lg:block pointer-events-none">
          <Waves className="h-72 w-72 text-primary" />
        </div>
        <div className="absolute top-1/3 right-1/4 hidden lg:block pointer-events-none">
          <Compass className="h-20 w-20 text-primary/10 animate-[spin_20s_linear_infinite]" />
        </div>

        {/* Particles */}
        <div className="particle h-3 w-3 top-[20%] left-[15%]" style={{ animationDelay: "0s" }} />
        <div className="particle h-2 w-2 top-[40%] right-[20%]" style={{ animationDelay: "2s" }} />
        <div className="particle h-4 w-4 bottom-[30%] left-[60%]" style={{ animationDelay: "4s" }} />

        <motion.div style={{ opacity: heroOpacity }} className="container relative z-10 py-12 sm:py-20">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md px-5 py-2 text-sm font-semibold text-primary mb-6 shadow-lg shadow-primary/5">
                <Sparkles className="h-4 w-4" /> {t.hero.badge}
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
                <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-black leading-[1.05] text-secondary-foreground mb-3 sm:mb-5">
                  {slideText.title}
                  <br />
                  <span className="text-gradient">{slideText.highlight}</span>
                </h1>
                <p className="text-sm sm:text-lg md:text-xl text-secondary-foreground/60 max-w-xl mb-6 sm:mb-10 leading-relaxed">
                  {slideText.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, delay: 0.35 }} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link to="/cruises">
                <Button size="lg" className="w-full sm:w-auto gradient-primary text-primary-foreground font-bold text-sm sm:text-base px-6 sm:px-8 h-12 sm:h-14 rounded-2xl shadow-glow hover:scale-105 transition-transform gap-2 shimmer">
                  {t.hero.exploreCruises} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary/40 text-primary font-bold text-sm sm:text-base px-6 sm:px-8 h-12 sm:h-14 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all gap-2 backdrop-blur-md bg-secondary/20">
                  <Phone className="h-5 w-5" /> {t.hero.bookViaWhatsApp}
                </Button>
              </a>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, delay: 0.5 }} className="mt-10 sm:mt-16">
              <div className="inline-flex flex-wrap gap-6 sm:gap-10 rounded-2xl bg-secondary/40 backdrop-blur-xl border border-secondary-foreground/10 px-6 sm:px-10 py-4 sm:py-6">
                {[
                  { ref: stat1.ref, count: stat1.count, suffix: "+", label: t.hero.cruiseShips },
                  { ref: stat2.ref, count: stat2.count, suffix: "+", label: t.hero.happyTravellers },
                  { ref: stat3.ref, count: stat3.count, suffix: "+", label: t.hero.yearsExperience },
                ].map((stat, i) => (
                  <div key={i} ref={stat.ref} className="text-left">
                    <div className="text-2xl sm:text-4xl font-display font-black text-primary stat-glow">{stat.count}{stat.suffix}</div>
                    <div className="text-[10px] sm:text-sm text-secondary-foreground/50 font-medium mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Slide navigation */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-3">
          <button onClick={prevSlide} className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-secondary/50 backdrop-blur-xl text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all border border-secondary-foreground/10 hover:scale-110">
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="flex gap-1.5 sm:gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 sm:w-10 bg-primary shadow-glow" : "w-2 sm:w-2.5 bg-secondary-foreground/30 hover:bg-secondary-foreground/50"}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-secondary/50 backdrop-blur-xl text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all border border-secondary-foreground/10 hover:scale-110">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 z-20 hidden md:flex items-center gap-3">
          <span className="text-5xl font-display font-black text-primary stat-glow">0{currentSlide + 1}</span>
          <div className="flex flex-col">
            <span className="text-secondary-foreground/30 text-xs font-medium">/ 0{heroSlides.length}</span>
            <div className="h-0.5 w-12 bg-secondary-foreground/10 rounded-full mt-1">
              <motion.div 
                className="h-full bg-primary rounded-full" 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                key={currentSlide}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUICK INFO BAR ============ */}
      <section className="relative -mt-8 sm:-mt-12 z-20 pb-8">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Ship, label: t.whyUs.premiumFleet, value: "6+ Ships", color: "from-primary to-primary-glow" },
              { icon: Shield, label: t.whyUs.maxSafety, value: "100%", color: "from-emerald to-accent" },
              { icon: Star, label: t.whyUs.allInclusive, value: "5★", color: "from-gold to-primary" },
              { icon: Clock, label: t.whyUs.support247, value: "24/7", color: "from-accent to-emerald" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.1 }} className="group">
                <div className="rounded-2xl bg-card border border-border/50 p-4 sm:p-5 shadow-elevated hover:shadow-glow transition-all duration-500 hover:-translate-y-1 text-center">
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-primary-foreground group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display font-black text-lg text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURED CRUISES ============ */}
      <section className="py-16 md:py-24 bg-background relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 animated-line" />
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
              <Ship className="h-4 w-4" /> {t.featured.ourFleet}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-black text-foreground">
              {t.featured.title} <span className="text-gradient">{t.featured.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t.featured.subtitle}</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allCruises.map((cruise, i) => (
              <motion.div key={cruise.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.08 }}>
                <Link to={`/cruises/${cruise.id}`} className="group block">
                  <Card className="overflow-hidden border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-3 bg-card hover:border-primary/20">
                    <div className="watermark-container aspect-[4/3] overflow-hidden relative">
                      <img src={cruise.images[cruise.featuredImageIndex ?? 0]} alt={cruise.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Hover overlay content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 text-secondary-foreground text-sm font-medium">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{cruise.route}</span>
                        </div>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 backdrop-blur-sm px-3 py-1 text-xs font-bold text-primary shadow-lg">
                          <Users className="h-3 w-3" /> {cruise.capacity}
                        </span>
                      </div>
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {cruise.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                            <Star className="h-3 w-3" /> {t.featured.featured}
                          </span>
                        )}
                        {cruise.packages?.some(p => p.isOffer) && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground animate-pulse shadow-lg">
                            🔥 অফার
                          </span>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">{cruise.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{cruise.route}</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground group-hover:scale-110 group-hover:shadow-glow transition-all flex-shrink-0">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground/70 flex items-center gap-1"><Clock className="h-3 w-3" />{cruise.duration}</p>
                      <div className="mt-4 flex items-center gap-3 border-t border-border/50 pt-4">
                        <div className="flex-1">
                          {cruise.oldPrice && (
                            <span className="text-sm text-muted-foreground line-through mr-2">৳{cruise.oldPrice.toLocaleString()}</span>
                          )}
                          <span className="text-2xl font-display font-black text-primary">৳{cruise.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground block">{t.featured.perPerson}</span>
                        </div>
                      </div>
                      <a
                        href={`https://wa.me/8801711871072?text=${encodeURIComponent(`আমি ${cruise.name} ক্রুজ সম্পর্কে জানতে চাই`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald/10 border border-emerald/20 px-4 py-2.5 text-sm font-bold text-emerald hover:bg-emerald hover:text-emerald-foreground transition-all duration-300 hover:shadow-lg"
                      >
                        <Phone className="h-4 w-4" /> {t.hero.bookViaWhatsApp}
                      </a>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-12 text-center">
            <Link to="/cruises">
              <Button variant="outline" size="lg" className="rounded-2xl border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold gap-2 px-8 hover:shadow-glow transition-all">
                {t.featured.viewAll} <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ EXPERIENCE SHOWCASE ============ */}
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(28_100%_52%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,hsl(170_65%_40%/0.06),transparent_50%)]" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary mb-4">
                <Camera className="h-4 w-4" /> {t.whyUs.sectionLabel}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-secondary-foreground leading-tight">
                {t.whyUs.title}
                <br />
                <span className="text-gradient">{t.whyUs.titleHighlight}</span>
              </h2>
              <p className="mt-6 text-secondary-foreground/60 leading-relaxed text-lg max-w-md">
                {t.whyUs.premiumFleetDesc}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Ship, title: t.whyUs.premiumFleet, desc: t.whyUs.premiumFleetDesc },
                  { icon: Shield, title: t.whyUs.maxSafety, desc: t.whyUs.maxSafetyDesc },
                  { icon: Star, title: t.whyUs.allInclusive, desc: t.whyUs.allInclusiveDesc },
                  { icon: Clock, title: t.whyUs.support247, desc: t.whyUs.support247Desc },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.1 }} className="group">
                    <div className="rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 backdrop-blur-sm p-4 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                      <item.icon className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="font-display font-bold text-sm text-secondary-foreground">{item.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight} className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img src={cruises[0]?.images[1]} alt="" loading="lazy" className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img src={cruises[2]?.images[2]} alt="" loading="lazy" className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img src={cruises[1]?.images[2]} alt="" loading="lazy" className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img src={cruises[3]?.images[1]} alt="" loading="lazy" className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-8 bg-card rounded-2xl p-4 shadow-elevated border border-border/50 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display font-black text-xl text-foreground">5000+</div>
                    <div className="text-xs text-muted-foreground">{t.hero.happyTravellers}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CRUISE COMPARISON ============ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
              <Compass className="h-4 w-4" /> {t.compare.sectionLabel}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-black text-foreground">
              {t.compare.title} <span className="text-gradient">{t.compare.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t.compare.subtitle}</p>
          </motion.div>

          {/* Desktop Table */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="hidden md:block overflow-x-auto rounded-2xl border border-border/50 shadow-elevated bg-card">
            <table className="w-full">
              <thead>
                <tr className="gradient-navy text-secondary-foreground">
                  <th className="px-6 py-4 text-left text-sm font-display font-bold">{t.compare.cruise}</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold">{t.compare.price}</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold">{t.compare.capacity}</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold">{t.compare.cabins}</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold">{t.compare.duration}</th>
                  <th className="px-6 py-4 text-center text-sm font-display font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {cruises.map((c, i) => (
                  <tr key={c.id} className={`border-t border-border/30 hover:bg-primary/5 transition-colors ${i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={c.images[0]} alt={c.name} loading="lazy" className="h-12 w-16 rounded-lg object-cover shadow-sm" />
                        <div>
                          <p className="font-display font-bold text-foreground text-sm">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.route}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {c.oldPrice && <span className="text-xs text-muted-foreground line-through block">৳{c.oldPrice.toLocaleString()}</span>}
                      <span className="font-display font-black text-primary text-lg">৳{c.price.toLocaleString()}</span>
                      {c.packages?.some(p => p.isOffer) && <span className="text-xs text-destructive font-bold block">🔥 অফার</span>}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">{c.capacity}</td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">{c.cabins}</td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">{c.duration}</td>
                    <td className="px-6 py-4 text-center">
                      <Link to={`/cruises/${c.id}`}>
                        <Button size="sm" className="gradient-primary text-primary-foreground rounded-lg font-semibold text-xs gap-1 hover:shadow-glow transition-all">
                          {t.compare.view} <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {cruises.map((c, i) => (
              <motion.div key={c.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.05 }}>
                <Link to={`/cruises/${c.id}`}>
                  <Card className={`border-border/50 hover:shadow-md transition-all bg-card hover:border-primary/20 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <img src={c.images[0]} alt={c.name} loading="lazy" className="h-16 w-20 rounded-xl object-cover flex-shrink-0 shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-foreground text-sm truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{c.route}</p>
                        <div className="mt-1 flex items-center gap-2 flex-wrap">
                          {c.oldPrice && <span className="text-xs text-muted-foreground line-through">৳{c.oldPrice.toLocaleString()}</span>}
                          <span className="font-display font-black text-primary text-lg leading-tight">৳{c.price.toLocaleString()}</span>
                          {c.packages?.some(p => p.isOffer) && <span className="text-xs text-destructive font-bold">🔥 অফার</span>}
                        </div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-primary-foreground flex-shrink-0">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 md:py-28 bg-warm-bg relative overflow-hidden">
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald/5 blur-3xl" />
        <div className="container relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
              <Heart className="h-4 w-4" /> {t.testimonials.sectionLabel}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-black text-foreground">
              {t.testimonials.title} <span className="text-gradient">{t.testimonials.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testi, i) => (
              <motion.div key={testi.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.1 }}>
                <Card className="border-border/50 hover:shadow-elevated transition-all duration-500 h-full bg-card hover:border-primary/20 hover:-translate-y-1">
                  <CardContent className="p-7 relative">
                    {/* Quote mark */}
                    <div className="absolute top-4 right-4 text-6xl font-display font-black text-primary/10 leading-none">"</div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testi.rating }, (_, i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed mb-6 relative z-10">"{testi.text}"</p>
                    <div className="flex items-center gap-3 border-t border-border/30 pt-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-sm font-bold text-primary-foreground shadow-lg">
                        {testi.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <span className="font-display font-bold text-foreground">{testi.name}</span>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Shield className="h-3 w-3 text-emerald" /> {t.testimonials.verifiedGuest}
                        </p>
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
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(28_100%_52%/0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(170_65%_40%/0.08),transparent_50%)]" />
        
        {/* Animated decorative elements */}
        <div className="absolute top-10 left-10 opacity-[0.06] pointer-events-none">
          <Ship className="h-32 w-32 text-primary animate-float" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-[0.06] pointer-events-none">
          <Anchor className="h-24 w-24 text-primary animate-float" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 px-6 py-2 text-sm font-semibold text-primary mb-8"
            >
              <Sparkles className="h-4 w-4" /> {t.hero.badge}
            </motion.div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black text-secondary-foreground mb-6 leading-tight">
              {t.cta.title}
              <br />
              <span className="text-gradient">{t.cta.titleHighlight}</span>
            </h2>
            <p className="mx-auto max-w-xl text-base sm:text-lg text-secondary-foreground/60 mb-10 leading-relaxed">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-10 h-14 rounded-2xl shadow-glow hover:scale-105 transition-transform gap-2 shimmer">
                  <Phone className="h-5 w-5" /> {t.cta.whatsappUs}
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-primary/40 text-primary font-bold text-base px-10 h-14 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all gap-2 backdrop-blur-md bg-secondary/20">
                  <MapPin className="h-5 w-5" /> {t.cta.contactPage}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
