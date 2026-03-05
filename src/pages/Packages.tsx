import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cruises } from "@/services/mockData";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

export default function Packages() {
  const allPackages = cruises.flatMap(c => c.packages.map(p => ({ ...p, cruiseName: c.name, cruiseId: c.id })));
  const unique = allPackages.filter((p, i, arr) => arr.findIndex(x => x.name === p.name && x.cruiseName === p.cruiseName) === i);

  return (
    <div>
      <section className="gradient-hero py-16 md:py-20 text-center relative overflow-hidden">
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display text-4xl md:text-5xl font-black text-secondary-foreground">
              Tour <span className="text-gradient">Packages</span>
            </h1>
            <p className="mt-3 text-secondary-foreground/60 max-w-md mx-auto">Choose the perfect package for your journey</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {unique.length === 0 ? (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center py-20">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Custom Packages Available</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">We offer tailored cruise packages for every group size and budget. Contact us to get a custom quote.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gradient-primary text-primary-foreground font-bold rounded-xl gap-2">Request Package</Button>
                </a>
                <Link to="/cruises">
                  <Button size="lg" variant="outline" className="border-2 border-primary/30 text-primary rounded-xl font-bold gap-2">
                    View Cruises <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {unique.map((pkg, i) => (
                <motion.div key={`${pkg.cruiseId}-${pkg.id}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.06 }}>
                  <Card className="border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 h-full bg-card">
                    <CardContent className="p-7">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{pkg.cruiseName}</span>
                      <h3 className="mt-3 font-display text-xl font-bold text-foreground">{pkg.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{pkg.route}</p>
                      <p className="text-xs text-muted-foreground/70">Seat: {pkg.seatType}</p>
                      <ul className="mt-5 space-y-2">
                        {pkg.inclusions.map(inc => (
                          <li key={inc} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" /> {inc}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
                        <div>
                          <span className="text-2xl font-display font-black text-primary">৳{pkg.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground block">per person</span>
                        </div>
                        <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                          <Button className="gradient-primary text-primary-foreground font-bold rounded-xl gap-1">
                            Book <ArrowRight className="h-4 w-4" />
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
