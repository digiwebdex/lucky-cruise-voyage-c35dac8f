import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Ship, Shield, Star, Clock, MapPin, Phone, ChevronRight, ArrowRight, Users, Flame, Heart, Search, BookOpen, Calendar as CalendarIcon2, User as UserIcon2, X } from "lucide-react";
import type { PromoAd } from "@/services/cmsStore";
import type { Cruise, sundarbanSubCategories as SubCatType } from "@/services/mockData";
import { sundarbanSubCategories } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { getCruises, getTestimonials, getOffers, getBlogs, getSettings, getPromoAds, getHomepageContent } from "@/services/cmsStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import BookingModal from "@/components/BookingModal";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

// ===== Promo Packages Section with Lightbox =====
function PromoPackagesSection({ promoAds, cruises }: { promoAds: PromoAd[]; cruises: Cruise[] }) {
  const [lightboxAd, setLightboxAd] = useState<PromoAd | null>(null);

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-2">আমাদের প্যাকেজ সমূহ</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">আপকামিং ট্যুর প্যাকেজ ও অফার সমূহ</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {promoAds.map((ad, i) => {
            const cruise = cruises.find(c => c.id === ad.linkedCruiseId);
            return (
              <motion.div
                key={ad.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
              >
                <div className="rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-card">
                  {/* Clickable image - opens lightbox */}
                  <button
                    onClick={() => setLightboxAd(ad)}
                    className="w-full aspect-square overflow-hidden relative block cursor-pointer"
                  >
                    <img
                      src={ad.image}
                      alt={ad.title}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                        {ad.title}
                      </span>
                    </div>
                    {ad.dateLabel && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-card/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                          <CalendarIcon2 className="h-3 w-3 text-primary" />
                          {ad.dateLabel}
                        </span>
                      </div>
                    )}
                    {ad.subtitle && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-sm font-semibold drop-shadow-lg leading-tight">
                          {ad.subtitle}
                        </p>
                      </div>
                    )}
                  </button>
                  {/* Bottom bar with cruise name and details link */}
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      {cruise && (
                        <p className="text-sm font-bold text-foreground">{cruise.name}</p>
                      )}
                      {ad.dateLabel && (
                        <p className="text-xs text-primary font-semibold mt-0.5">{ad.dateLabel}</p>
                      )}
                    </div>
                    <Link
                      to={`/cruises/${ad.linkedCruiseId}`}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      বিস্তারিত <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxAd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxAd(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightboxAd(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={lightboxAd.image}
              alt={lightboxAd.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <Link
                to={`/cruises/${lightboxAd.linkedCruiseId}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                onClick={() => setLightboxAd(null)}
              >
                বিস্তারিত দেখুন <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Index() {
  const { t, lang: language } = useLanguage();
  const cruises = getCruises();
  const testimonials = getTestimonials();
  const settings = getSettings();
  const hc = getHomepageContent();
  const bn = language === "bn";
  const now = new Date().toISOString();
  const offers = getOffers().filter(o => o.isActive && (!o.expiryDate || o.expiryDate >= now));
  const promoAds = getPromoAds().filter(a => a.isActive).slice(0, 15);
  const allCruises = (() => {
    const ids = settings.featuredCruiseIds;
    if (ids && ids.length > 0) {
      const ordered = ids.map(id => cruises.find(c => c.id === id)).filter(Boolean) as typeof cruises;
      return ordered.slice(0, 6);
    }
    return cruises.slice(0, 6);
  })();

  // Quick booking bar state
  const [selectedTour, setSelectedTour] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [selectedCruise, setSelectedCruise] = useState("");
  const [travelDate, setTravelDate] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [bookingCruise, setBookingCruise] = useState<typeof cruises[0] | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const normalizedHero = (settings.heroImages || []).map(item =>
    typeof item === "string" ? { image: item, title: "" } : item
  );
  const fallbackHeroImage = cruises[0]?.images[cruises[0]?.featuredImageIndex ?? 0];
  const heroImages = normalizedHero.length > 0 ? normalizedHero : (fallbackHeroImage ? [{ image: fallbackHeroImage, title: "" }] : []);
  const currentHero = heroImages[heroIndex % heroImages.length] || { image: "", title: "" };
  const heroImage = currentHero.image;
  const heroTitle = currentHero.title;

  // Auto-rotate hero images
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => setHeroIndex(i => i + 1), 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleQuickBook = () => {
    const cruise = cruises.find(c => c.id === selectedCruise);
    if (cruise) {
      setBookingCruise(cruise);
      setBookingOpen(true);
    } else {
      // Send generic WhatsApp message
      const msg = encodeURIComponent(
        `*🚢 Booking Inquiry*\n\n` +
        `${travelDate ? `*Date:* ${format(travelDate, "PPP")}\n` : ""}` +
        `*Guests:* ${guests}\n` +
        `\n_Sent from Lucky Tours website_`
      );
      window.open(`https://wa.me/8801711871072?text=${msg}`, "_blank");
    }
  };

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt={heroTitle || "Sundarban Cruise"} className="h-full w-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/60 to-secondary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-secondary/20" />
          {heroTitle && (
            <div className="absolute bottom-6 left-6 z-10">
              <span className="bg-secondary/70 backdrop-blur-sm text-secondary-foreground text-lg sm:text-xl font-bold px-4 py-2 rounded-lg">
                {heroTitle}
              </span>
            </div>
          )}
        </div>

        <div className="container relative z-10 py-12 sm:py-16">
          <div className="max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-primary mb-5">
                <Star className="h-3.5 w-3.5" /> {bn ? hc.heroBadgeBn : hc.heroBadge}
              </span>
              </span>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-secondary-foreground mb-3">
                {bn ? hc.heroTitleBn : hc.heroTitle}
                <br />
                <span className="text-primary">{bn ? hc.heroHighlightBn : hc.heroHighlight}</span>
              </h1>
              <p className="text-sm sm:text-base text-secondary-foreground/70 max-w-md mb-6 leading-relaxed">
                {bn ? hc.heroSubtitleBn : hc.heroSubtitle}
              </p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap gap-3">
              <Link to="/cruises">
                <Button size="lg" className="bg-primary text-primary-foreground font-bold rounded-xl h-11 px-6 gap-2 hover:bg-primary/90">
                  {t.hero.exploreCruises} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-primary/40 text-primary font-bold rounded-xl h-11 px-6 gap-2 backdrop-blur-sm bg-secondary/20 hover:bg-primary hover:text-primary-foreground">
                  <Phone className="h-4 w-4" /> {t.hero.bookViaWhatsApp}
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 flex gap-8">
              {[
                { value: hc.stat1Value, label: bn ? hc.stat1LabelBn : hc.stat1Label },
                { value: hc.stat2Value, label: bn ? hc.stat2LabelBn : hc.stat2Label },
                { value: hc.stat3Value, label: bn ? hc.stat3LabelBn : hc.stat3Label },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-display font-black text-primary">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-secondary-foreground/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ QUICK BOOKING BAR ============ */}
      <section className="relative -mt-8 z-20 pb-6">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="rounded-xl bg-card border border-border shadow-md p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-end">
                {/* Tour Select */}
                <div className="lg:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {language === "bn" ? "ট্যুর নির্বাচন করুন" : "Select Tour"}
                  </label>
                  <Select value={selectedTour} onValueChange={v => { setSelectedTour(v); setSelectedSubCat(""); setSelectedCruise(""); }}>
                    <SelectTrigger className="h-10 rounded-lg">
                      <SelectValue placeholder={language === "bn" ? "ট্যুর বাছুন" : "Choose tour"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sundarban">{language === "bn" ? "সুন্দরবন ভ্রমণ" : "Sundarban Tour"}</SelectItem>
                      <SelectItem value="tanguar-haor">{language === "bn" ? "টাঙ্গুয়ার হাওর ভ্রমণ" : "Tanguar Haor Tour"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subcategory Select (only for Sundarban) */}
                <div className="lg:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {language === "bn" ? "ক্যাটাগরি" : "Category"}
                  </label>
                  <Select
                    value={selectedSubCat}
                    onValueChange={v => { setSelectedSubCat(v); setSelectedCruise(""); }}
                    disabled={selectedTour !== "sundarban"}
                  >
                    <SelectTrigger className="h-10 rounded-lg">
                      <SelectValue placeholder={language === "bn" ? "ক্যাটাগরি বাছুন" : "Choose category"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === "bn" ? "সকল" : "All"}</SelectItem>
                      {sundarbanSubCategories.map(sc => (
                        <SelectItem key={sc.value} value={sc.value}>{language === "bn" ? sc.labelBn : sc.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cruise Select (filtered by tour + subcategory) */}
                <div className="lg:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {language === "bn" ? "ক্রুজ নির্বাচন করুন" : "Select Cruise"}
                  </label>
                  <Select value={selectedCruise} onValueChange={setSelectedCruise}>
                    <SelectTrigger className="h-10 rounded-lg">
                      <SelectValue placeholder={language === "bn" ? "ক্রুজ বাছুন" : "Choose cruise"} />
                    </SelectTrigger>
                    <SelectContent>
                      {cruises
                        .filter(c => !selectedTour || c.destination === selectedTour)
                        .filter(c => !selectedSubCat || selectedSubCat === "all" || c.subCategory === selectedSubCat)
                        .map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div className="lg:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {language === "bn" ? "তারিখ" : "Travel Date"}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal rounded-lg", !travelDate && "text-muted-foreground")}>
                        {travelDate ? format(travelDate, "dd MMM yyyy") : (language === "bn" ? "তারিখ বাছুন" : "Pick date")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={travelDate}
                        onSelect={setTravelDate}
                        disabled={d => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests */}
                <div className="lg:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    <Users className="h-3 w-3 inline mr-1" />
                    {language === "bn" ? "অতিথি" : "Guests"}
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    className="h-10 rounded-lg"
                  />
                </div>

                {/* WhatsApp */}
                <div className="lg:col-span-1">
                  <a
                    href={`https://wa.me/8801711871072?text=${encodeURIComponent(language === "bn" ? "আমি ক্রুজ সম্পর্কে জানতে চাই" : "I want to book a cruise")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full h-10 rounded-lg border-emerald/30 text-emerald hover:bg-emerald hover:text-emerald-foreground font-semibold gap-2">
                      <Phone className="h-4 w-4" /> WhatsApp
                    </Button>
                  </a>
                </div>

                {/* Search/Book */}
                <div className="lg:col-span-1">
                  <Button onClick={handleQuickBook} className="w-full h-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2">
                    <Search className="h-4 w-4" /> {language === "bn" ? "বুক করুন" : "Book Now"}
                  </Button>
                </div>
              </div>

              {/* Filtered Results */}
              {(selectedTour || selectedSubCat) && (() => {
                const filtered = cruises
                  .filter(c => !selectedTour || c.destination === selectedTour)
                  .filter(c => !selectedSubCat || selectedSubCat === "all" || c.subCategory === selectedSubCat);
                if (filtered.length === 0) return null;
                return (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground mb-3">
                      {language === "bn" ? `${filtered.length}টি ক্রুজ পাওয়া গেছে` : `${filtered.length} cruises found`}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {filtered.map(c => (
                        <Link
                          key={c.id}
                          to={`/cruises/${c.id}`}
                          className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:border-primary/40 hover:shadow-sm transition-all bg-background group"
                        >
                          <img
                            src={c.images[c.featuredImageIndex ?? 0]}
                            alt={c.name}
                            className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{c.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{c.route}</p>
                            <p className="text-xs font-bold text-primary mt-0.5">৳{c.price.toLocaleString()}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ QUICK INFO STRIP ============ */}
      <section className="py-8 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Ship, label: t.whyUs.premiumFleet, value: "6+ Ships" },
              { icon: Shield, label: t.whyUs.maxSafety, value: "100% Safe" },
              { icon: Star, label: t.whyUs.allInclusive, value: "All-Inclusive" },
              { icon: Clock, label: t.whyUs.support247, value: "24/7" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROMO ADS / PACKAGES ============ */}
      {promoAds.length > 0 && (
        <PromoPackagesSection promoAds={promoAds} cruises={cruises} />
      )}

      {/* ============ FEATURED CRUISES ============ */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Ship className="h-3.5 w-3.5" /> {t.featured.ourFleet}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
              {t.featured.title} <span className="text-primary">{t.featured.titleHighlight}</span>
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-md mx-auto">{t.featured.subtitle}</p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allCruises.map((cruise, i) => (
              <motion.div key={cruise.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.06 }}>
                <Link to={`/cruises/${cruise.id}`} className="group block">
                  <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow duration-300 bg-card">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={cruise.images[cruise.featuredImageIndex ?? 0]} alt={cruise.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" draggable={false} />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {cruise.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                            <Star className="h-3 w-3" /> {t.featured.featured}
                          </span>
                        )}
                        {cruise.packages?.some(p => p.isOffer) && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-bold text-destructive-foreground">
                            🔥 অফার
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-card/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-foreground">
                          <Users className="h-3 w-3" /> {cruise.capacity}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors">{cruise.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{cruise.route}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />{cruise.duration}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                        <div>
                          {cruise.oldPrice && (
                            <span className="text-xs text-muted-foreground line-through mr-1.5">৳{cruise.oldPrice.toLocaleString()}</span>
                          )}
                          <span className="text-lg font-display font-black text-primary">৳{cruise.price.toLocaleString()}</span>
                          <span className="text-[10px] text-muted-foreground block">{t.featured.perPerson}</span>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                      <a
                        href={`https://wa.me/8801711871072?text=${encodeURIComponent(`আমি ${cruise.name} ক্রুজ সম্পর্কে জানতে চাই`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald/20 bg-emerald/5 px-3 py-2 text-xs font-bold text-emerald hover:bg-emerald hover:text-emerald-foreground transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" /> {t.hero.bookViaWhatsApp}
                      </a>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 text-center">
            <Link to="/cruises">
              <Button variant="outline" size="lg" className="rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold gap-2 px-6">
                {t.featured.viewAll} <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ OFFERS (DISABLED) ============ */}
      {false && offers.length > 0 && (
        <section className="py-14 md:py-20 bg-muted/20">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Flame className="h-3.5 w-3.5" /> {t.offers?.sectionLabel || "Now Running"}
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                {t.offers?.title || "Running"} <span className="text-primary">{t.offers?.titleHighlight || "Offers"}</span>
              </h2>
              <p className="mt-2 text-muted-foreground text-sm max-w-md mx-auto">{t.offers?.subtitle || "Don't miss our latest cruise deals"}</p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer, i) => {
                const linkedCruise = cruises.find(c => c.id === offer.linkedCruiseId);
                return (
                  <motion.div key={offer.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                    <Link to={`/cruises/${offer.linkedCruiseId}`} className="group block">
                      <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow duration-300 bg-card">
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img src={offer.posterImage} alt={offer.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" draggable={false} />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-bold text-destructive-foreground">
                              🔥 {t.offers?.offerBadge || "Offer"}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-display font-bold text-base text-secondary-foreground">{offer.title}</h3>
                            {linkedCruise && (
                              <p className="text-xs text-secondary-foreground/70 flex items-center gap-1 mt-0.5">
                                <Ship className="h-3 w-3 text-primary" /> {linkedCruise.name}
                              </p>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          {offer.description && (
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{offer.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            {linkedCruise && (
                              <div>
                                {linkedCruise.oldPrice && (
                                  <span className="text-xs text-muted-foreground line-through mr-1.5">৳{linkedCruise.oldPrice.toLocaleString()}</span>
                                )}
                                <span className="text-lg font-display font-black text-primary">৳{linkedCruise.price.toLocaleString()}</span>
                                <span className="text-[10px] text-muted-foreground block">{t.common?.perPerson || "per person"}</span>
                              </div>
                            )}
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Shield className="h-3.5 w-3.5" /> {t.whyUs.sectionLabel}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
              {t.whyUs.title} <span className="text-primary">{t.whyUs.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Ship, title: t.whyUs.premiumFleet, desc: t.whyUs.premiumFleetDesc },
              { icon: Shield, title: t.whyUs.maxSafety, desc: t.whyUs.maxSafetyDesc },
              { icon: Star, title: t.whyUs.allInclusive, desc: t.whyUs.allInclusiveDesc },
              { icon: Clock, title: t.whyUs.support247, desc: t.whyUs.support247Desc },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                <div className="rounded-xl border border-border bg-card p-5 text-center h-full">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Heart className="h-3.5 w-3.5" /> {t.testimonials.sectionLabel}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
              {t.testimonials.title} <span className="text-primary">{t.testimonials.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testi, i) => (
              <motion.div key={testi.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                <Card className="border-border hover:shadow-md transition-shadow h-full bg-card">
                  <CardContent className="p-5">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: testi.rating }, (_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">"{testi.text}"</p>
                    <div className="flex items-center gap-3 border-t border-border pt-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                        {testi.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-foreground">{testi.name}</span>
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

      {/* ============ BLOG ============ */}
      {(() => {
        const blogPosts = getBlogs().filter(b => b.isPublished).slice(0, 3);
        if (blogPosts.length === 0) return null;
        return (
          <section className="py-14 md:py-20 bg-muted/20">
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <BookOpen className="h-3.5 w-3.5" /> {language === "bn" ? "ব্লগ" : "Blog"}
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                  {language === "bn" ? "ভ্রমণ গল্প ও " : "Travel Stories & "}<span className="text-primary">{language === "bn" ? "গাইড" : "Guides"}</span>
                </h2>
                <p className="mt-2 text-muted-foreground text-sm max-w-md mx-auto">
                  {language === "bn" ? "আমাদের সর্বশেষ ভ্রমণ টিপস এবং গাইড পড়ুন" : "Read our latest travel tips and guides"}
                </p>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post, i) => (
                  <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                    <Link to={`/blog/${post.slug}`} className="group block">
                      <Card className="overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full bg-card">
                        <div className="aspect-[16/10] overflow-hidden relative bg-muted">
                          {post.coverImage ? (
                            <img src={post.coverImage} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20">
                              <BookOpen className="h-12 w-12 text-primary/30" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${post.category === "tanguar-haor" ? "bg-emerald text-emerald-foreground" : "bg-primary text-primary-foreground"}`}>
                              {post.category === "tanguar-haor" ? (language === "bn" ? "টাঙ্গুয়ার হাওর" : "Tanguar Haor") : (language === "bn" ? "সুন্দরবন" : "Sundarban")}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1.5">{post.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-3 text-[10px] text-muted-foreground border-t border-border pt-2.5">
                            <span className="flex items-center gap-1"><UserIcon2 className="h-3 w-3" />{post.author}</span>
                            <span className="flex items-center gap-1"><CalendarIcon2 className="h-3 w-3" />{new Date(post.publishedAt).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", { day: "numeric", month: "short" })}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 text-center">
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold gap-2 px-6">
                    {language === "bn" ? "সব ব্লগ দেখুন" : "View All Posts"} <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        );
      })()}

      {/* ============ CTA ============ */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-secondary-foreground mb-4">
              {t.cta.title}{" "}
              <span className="text-primary">{t.cta.titleHighlight}</span>
            </h2>
            <p className="mx-auto max-w-lg text-sm sm:text-base text-secondary-foreground/60 mb-8">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground font-bold rounded-xl h-11 px-8 gap-2 hover:bg-primary/90">
                  <Phone className="h-4 w-4" /> {t.cta.whatsappUs}
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary/40 text-primary font-bold rounded-xl h-11 px-8 gap-2 hover:bg-primary hover:text-primary-foreground">
                  <MapPin className="h-4 w-4" /> {t.cta.contactPage}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {bookingCruise && (
        <BookingModal cruise={bookingCruise} open={bookingOpen} onOpenChange={setBookingOpen} />
      )}
    </div>
  );
}
