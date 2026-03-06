import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cruises } from "@/services/mockData";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

export default function Packages() {
  const { t } = useLanguage();
  const allPackages = cruises.flatMap(c => c.packages.map(p => ({ ...p, cruiseName: c.name, cruiseId: c.id })));

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
              {allPackages.map((pkg, i) => (
                <motion.div key={`${pkg.cruiseId}-${pkg.id}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.06 }}>
                  <Card className="border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 h-full bg-card">
                    <CardContent className="p-7">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{pkg.cruiseName}</span>
                      <h3 className="mt-3 font-display text-xl font-bold text-foreground">{pkg.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{pkg.duration}</p>
                      <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
                        <div>
                          <span className="text-2xl font-display font-black text-primary">৳{pkg.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground block">{t.packages.perPerson}</span>
                        </div>
                        <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                          <Button className="gradient-primary text-primary-foreground font-bold rounded-xl gap-1">
                            {t.packages.book} <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
