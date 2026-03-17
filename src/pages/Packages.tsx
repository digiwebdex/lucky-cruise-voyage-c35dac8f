import { motion } from "framer-motion";
import { ArrowRight, Flame, Percent, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCruises } from "@/services/cmsStore";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHeroBanner from "@/components/PageHeroBanner";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

const bnDays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
const bnMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const toBn = (n: number): string => n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

function formatTripDates(dates: string[]): string {
  const sorted = dates.map(d => new Date(d)).sort((a, b) => a.getTime() - b.getTime());
  const days = sorted.map(d => bnDays[d.getDay()]);
  const dateNums = sorted.map(d => toBn(d.getDate()));
  const month = bnMonths[sorted[0].getMonth()];
  const year = toBn(sorted[0].getFullYear());
  return `${days.join("-")} ${dateNums.join("-")} ${month} ${year}`;
}

function calcDiscount(oldPrice?: number, price?: number): number {
  if (!oldPrice || !price || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function PackageCard({ pkg, i }: { pkg: any; i: number }) {
  const { t } = useLanguage();
  const adultDiscount = calcDiscount(pkg.adultOldPrice, pkg.adultPrice);
  const childDiscount = calcDiscount(pkg.childOldPrice, pkg.childPrice);
  const mainDiscount = adultDiscount || calcDiscount(pkg.oldPrice, pkg.price);
  const thumbSrc = pkg.thumbnail || pkg.cruiseImage;

  return (
    <motion.div key={`${pkg.cruiseId}-${pkg.id}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.06 }}>
      <Card className={`border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 h-full bg-card relative overflow-hidden ${pkg.isOffer ? "ring-2 ring-primary shadow-glow" : ""}`}>
        {/* Thumbnail */}
        {thumbSrc && (
          <div className="relative w-full aspect-square overflow-hidden">
            <img src={thumbSrc} alt={pkg.name} className="w-full h-full object-cover" />
            {/* Discount Badge */}
            {mainDiscount > 0 && (
              <div className="absolute top-0 left-0">
                <Badge className="rounded-none rounded-br-xl bg-emerald-500 text-white font-bold border-0 px-3 py-1.5 gap-1">
                  <Percent className="h-3.5 w-3.5" /> {mainDiscount}% Off
                </Badge>
              </div>
            )}
            {pkg.isOffer && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-xl gradient-primary text-primary-foreground font-bold border-0 px-3 py-1.5 gap-1">
                   <Flame className="h-3.5 w-3.5" /> {t.packages.offerBadge}
                </Badge>
              </div>
            )}
          </div>
        )}
        {!thumbSrc && mainDiscount > 0 && (
          <div className="absolute top-0 left-0">
            <Badge className="rounded-none rounded-br-xl bg-emerald-500 text-white font-bold border-0 px-3 py-1.5 gap-1">
              <Percent className="h-3.5 w-3.5" /> {mainDiscount}% Off
            </Badge>
          </div>
        )}
        {!thumbSrc && pkg.isOffer && (
          <div className="absolute top-0 right-0">
            <Badge className="rounded-none rounded-bl-xl gradient-primary text-primary-foreground font-bold border-0 px-3 py-1.5 gap-1">
              <Flame className="h-3.5 w-3.5" /> {t.packages.offerBadge}
            </Badge>
          </div>
        )}
        <CardContent className={`p-7 ${thumbSrc ? "pt-5" : "pt-10"}`}>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{pkg.cruiseName}</span>
          <h3 className="mt-3 font-display text-xl font-bold text-foreground">{pkg.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{pkg.duration}</p>
          {/* Offer Day & Date Labels */}
          {(pkg.offerDayLabel || pkg.offerDateLabel) && (
            <div className="mt-3 space-y-1">
              {pkg.offerDayLabel && (
                <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  <span>{pkg.offerDayLabel}</span>
                </div>
              )}
              {pkg.offerDateLabel && (
                <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground/80">
                  <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                  <span>{pkg.offerDateLabel}</span>
                </div>
              )}
            </div>
          )}
          {/* Fallback: auto-formatted trip dates */}
          {!pkg.offerDayLabel && !pkg.offerDateLabel && pkg.tripDates && pkg.tripDates.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 text-sm text-primary font-semibold">
              <CalendarDays className="h-4 w-4" />
              <span>{formatTripDates(pkg.tripDates)}</span>
            </div>
          )}

          <div className="mt-6 border-t border-border/50 pt-5">
            <Link to={`/cruises/${pkg.cruiseId}`}>
              <Button className="w-full gradient-primary text-primary-foreground font-bold rounded-xl gap-1">
                বিস্তারিত <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Packages() {
  const { t } = useLanguage();
  const cruises = getCruises();
  const allPackages = cruises
    .flatMap(c => c.packages.map(p => ({
      ...p,
      cruiseName: c.name,
      cruiseId: c.id,
      cruiseImage: c.images[c.featuredImageIndex ?? 0] || "",
    })));

  const offerPackages = allPackages.filter(p => p.isOffer);
  const regularPackages = allPackages.filter(p => !p.isOffer);

  return (
    <div>
      <PageHeroBanner page="packages">
            <h1 className="font-display text-4xl md:text-5xl font-black text-secondary-foreground">
              {t.packages.title} <span className="text-gradient">{t.packages.titleHighlight}</span>
            </h1>
            <p className="mt-3 text-secondary-foreground/60 max-w-md mx-auto">{t.packages.subtitle}</p>
      </PageHeroBanner>

      {/* Weekly Offer Section */}
      {offerPackages.length > 0 && (
        <section className="py-12 bg-primary/5">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
                <Flame className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-primary">সাপ্তাহিক অফার প্যাকেজ</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
                চলমান <span className="text-gradient">অফারসমূহ</span>
              </h2>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">সীমিত সময়ের জন্য বিশেষ ছাড়ে আমাদের প্যাকেজ বুক করুন</p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offerPackages.map((pkg, i) => (
                <PackageCard key={`${pkg.cruiseId}-${pkg.id}`} pkg={pkg} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Packages */}
      <section className="py-12">
        <div className="container">
          {allPackages.length === 0 ? (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center py-20">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t.packages.customAvailable}</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t.packages.customDesc}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gradient-primary text-primary-foreground font-bold rounded-xl gap-2">{t.packages.requestPackage}</Button>
                </a>
                <Link to="/cruises">
                  <Button size="lg" variant="outline" className="border-2 border-primary/30 text-primary rounded-xl font-bold gap-2">
                    {t.packages.viewCruises} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {offerPackages.length > 0 && (
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 text-center">
                  <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
                    সকল <span className="text-gradient">প্যাকেজ</span>
                  </h2>
                </motion.div>
              )}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(offerPackages.length > 0 ? regularPackages : allPackages).map((pkg, i) => (
                  <PackageCard key={`${pkg.cruiseId}-${pkg.id}`} pkg={pkg} i={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
