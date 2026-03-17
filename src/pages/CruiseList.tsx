import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ChevronRight, MapPin, Clock, Users, ArrowRight, SlidersHorizontal, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { searchCruises } from "@/services/cmsStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { sundarbanSubCategories } from "@/services/mockData";
import PageHeroBanner from "@/components/PageHeroBanner";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

export default function CruiseList() {
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination") || "all";
  const [query, setQuery] = useState("");
  const [subCat, setSubCat] = useState(searchParams.get("sub") || "all");
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const allResults = searchCruises(query);
  const results = allResults.filter(c => {
    if (destination !== "all" && c.destination !== destination) return false;
    if (destination === "sundarban" && subCat !== "all" && c.subCategory !== subCat) return false;
    if (minPrice && c.price < Number(minPrice)) return false;
    if (maxPrice && c.price > Number(maxPrice)) return false;
    return true;
  });
  const sorted = [...results].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const pageTitle = destination === "tanguar-haor"
    ? t.nav.tanguarHaorTour
    : destination === "sundarban"
      ? t.nav.sundarbanTour
      : `${t.cruiseList.title} ${t.cruiseList.titleHighlight}`;

  const pageSubtitle = destination === "tanguar-haor"
    ? t.cruiseList.tanguarSubtitle || t.cruiseList.subtitle
    : t.cruiseList.subtitle;

  return (
    <div>
      <PageHeroBanner page="cruises">
            <h1 className="font-display text-4xl md:text-5xl font-black text-secondary-foreground">
              {destination === "all" ? (
                <>{t.cruiseList.title} <span className="text-gradient">{t.cruiseList.titleHighlight}</span></>
              ) : (
                <span className="text-gradient">{pageTitle}</span>
              )}
            </h1>
            <p className="mt-3 text-secondary-foreground/60 max-w-md mx-auto">{pageSubtitle}</p>
            
            {/* Destination tabs */}
            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              {[
                { key: "all", label: t.cruiseList.allCruises || "All" },
                { key: "sundarban", label: t.nav.sundarbanTour },
                { key: "tanguar-haor", label: t.nav.tanguarHaorTour },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (tab.key === "all") {
                      searchParams.delete("destination");
                    } else {
                      searchParams.set("destination", tab.key);
                    }
                    setSearchParams(searchParams);
                    setSubCat("all");
                  }}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                    destination === tab.key || (tab.key === "all" && destination === "all")
                      ? "gradient-primary text-primary-foreground shadow-md"
                      : "bg-secondary-foreground/10 text-secondary-foreground/70 hover:bg-secondary-foreground/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sundarban subcategory tabs */}
            {destination === "sundarban" && (
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                <button
                  onClick={() => setSubCat("all")}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    subCat === "all"
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : "bg-secondary-foreground/5 text-secondary-foreground/60 hover:bg-secondary-foreground/10 border border-transparent"
                  }`}
                >
                  {t.cruiseList.allSubCat}
                </button>
                {sundarbanSubCategories.map(sc => (
                  <button
                    key={sc.value}
                    onClick={() => setSubCat(sc.value)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                      subCat === sc.value
                        ? "bg-primary/20 text-primary border border-primary/40"
                        : "bg-secondary-foreground/5 text-secondary-foreground/60 hover:bg-secondary-foreground/10 border border-transparent"
                    }`}
                  >
                    {lang === "bn" ? sc.labelBn : sc.label}
                  </button>
                ))}
              </div>
            )}
      </PageHeroBanner>

      <section className="py-10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="mb-8 rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end gap-3">
              <div className="relative flex-1 min-w-0 sm:min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder={t.cruiseList.searchPlaceholder} className="pl-9 rounded-xl h-11" value={query} onChange={e => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <Input className="flex-1 sm:w-28 rounded-xl h-11" placeholder={t.cruiseList.minPrice} type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <Input className="flex-1 sm:w-28 rounded-xl h-11" placeholder={t.cruiseList.maxPrice} type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              </div>
              <Select onValueChange={setSort}>
                <SelectTrigger className="w-full sm:w-44 rounded-xl h-11">
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  <SelectValue placeholder={t.cruiseList.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{t.cruiseList.default}</SelectItem>
                  <SelectItem value="price-asc">{t.cruiseList.priceLowHigh}</SelectItem>
                  <SelectItem value="price-desc">{t.cruiseList.priceHighLow}</SelectItem>
                  <SelectItem value="name">{t.cruiseList.name}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <p className="mb-6 text-sm text-muted-foreground font-medium">{sorted.length} {t.cruiseList.cruisesFound}</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((cruise, i) => (
              <motion.div key={cruise.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.06 }}>
                <Link to={`/cruises/${cruise.id}`} className="group block">
                  <Card className="overflow-hidden border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 bg-card">
                    <div className="watermark-container aspect-[16/10] overflow-hidden relative">
                      <img src={cruise.images[cruise.featuredImageIndex ?? 0]} alt={cruise.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {cruise.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">{t.featured.featured}</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                          cruise.destination === "tanguar-haor" 
                            ? "bg-emerald/90 text-white" 
                            : "bg-primary/90 text-primary-foreground"
                        }`}>
                          {cruise.destination === "tanguar-haor" ? t.nav.tanguarHaorTour : t.nav.sundarbanTour}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">{cruise.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{cruise.route}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground/70">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{cruise.duration}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{cruise.capacity}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                        <div>
                          <span className="text-2xl font-display font-black text-primary">৳{cruise.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground block">{t.featured.perPerson}</span>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground group-hover:scale-110 transition-transform">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                      <a
                        href={`https://wa.me/8801711871072?text=${encodeURIComponent(`${t.booking?.whatsappInquiry || "I want to book a cruise"} - ${cruise.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald/10 border border-emerald/20 px-4 py-2.5 text-sm font-bold text-emerald hover:bg-emerald hover:text-emerald-foreground transition-all duration-300"
                      >
                        <Phone className="h-4 w-4" /> {t.hero.bookViaWhatsApp}
                      </a>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
