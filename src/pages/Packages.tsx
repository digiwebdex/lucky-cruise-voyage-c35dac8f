import { motion } from "framer-motion";
import { ArrowRight, Flame, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCruises } from "@/services/cmsStore";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

function calcDiscount(oldPrice?: number, price?: number): number {
  if (!oldPrice || !price || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default function Packages() {
  const { t } = useLanguage();
  const cruises = getCruises();
  const allPackages = cruises
    .flatMap(c => c.packages.map(p => ({ ...p, cruiseName: c.name, cruiseId: c.id })))
    .sort((a, b) => {
      if (a.isOffer && !b.isOffer) return -1;
      if (!a.isOffer && b.isOffer) return 1;
      return 0;
    });

  return (
    <div>
      <section className="gradient-hero py-16 md:py-20 text-center relative overflow-hidden">
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display text-4xl md:text-5xl font-black text-secondary-foreground">
              {t.packages.title} <span className="text-gradient">{t.packages.titleHighlight}</span>
            </h1>
            <p className="mt-3 text-secondary-foreground/60 max-w-md mx-auto">{t.packages.subtitle}</p>
          </motion.div>
        </div>
      </section>

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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allPackages.map((pkg, i) => {
                const adultDiscount = calcDiscount(pkg.adultOldPrice, pkg.adultPrice);
                const childDiscount = calcDiscount(pkg.childOldPrice, pkg.childPrice);
                const mainDiscount = adultDiscount || calcDiscount(pkg.oldPrice, pkg.price);

                return (
                  <motion.div key={`${pkg.cruiseId}-${pkg.id}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.06 }}>
                    <Card className={`border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 h-full bg-card relative overflow-hidden ${pkg.isOffer ? "ring-2 ring-primary shadow-glow" : ""}`}>
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
                            <Flame className="h-3.5 w-3.5" /> অফার
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-7 pt-10">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{pkg.cruiseName}</span>
                        <h3 className="mt-3 font-display text-xl font-bold text-foreground">{pkg.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{pkg.duration}</p>

                        <div className="mt-6 border-t border-border/50 pt-5 space-y-3">
                          {/* Adult Price */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Adult</span>
                            <div className="text-right">
                              {pkg.adultOldPrice && pkg.adultOldPrice > pkg.adultPrice && (
                                <span className="text-sm font-medium text-muted-foreground line-through mr-2">৳{pkg.adultOldPrice.toLocaleString()}</span>
                              )}
                              <span className="text-xl font-display font-black text-primary">৳{pkg.adultPrice.toLocaleString()}</span>
                            </div>
                          </div>
                          {/* Child Price */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Child</span>
                            <div className="text-right">
                              {pkg.childOldPrice && pkg.childOldPrice > pkg.childPrice && (
                                <span className="text-sm font-medium text-muted-foreground line-through mr-2">৳{pkg.childOldPrice.toLocaleString()}</span>
                              )}
                              <span className="text-xl font-display font-black text-primary">৳{pkg.childPrice.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="pt-3">
                            <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                              <Button className="w-full gradient-primary text-primary-foreground font-bold rounded-xl gap-1">
                                {t.packages.book} <ArrowRight className="h-4 w-4" />
                              </Button>
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
