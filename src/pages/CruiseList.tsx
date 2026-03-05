import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ChevronRight, MapPin, Clock, Users, ArrowRight, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { searchCruises } from "@/services/mockData";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

export default function CruiseList() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const results = searchCruises(query, minPrice ? Number(minPrice) : undefined, maxPrice ? Number(maxPrice) : undefined);
  const sorted = [...results].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptLTQtMjh2MmgtNHYtMmg0em0wIDR2MmgtNHYtMmg0em0tOCA4djJoLTR2LTJoNHptMCA0djJoLTR2LTJoNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display text-4xl md:text-5xl font-black text-secondary-foreground">
              Our <span className="text-gradient">Cruises</span>
            </h1>
            <p className="mt-3 text-secondary-foreground/60 max-w-md mx-auto">Find your perfect cruise adventure in the Sundarbans</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          {/* Filters */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="mb-8 rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-end gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search cruises, routes..." className="pl-9 rounded-xl h-11" value={query} onChange={e => setQuery(e.target.value)} />
              </div>
              <Input className="w-28 rounded-xl h-11" placeholder="Min ৳" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
              <Input className="w-28 rounded-xl h-11" placeholder="Max ৳" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              <Select onValueChange={setSort}>
                <SelectTrigger className="w-44 rounded-xl h-11">
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low → High</SelectItem>
                  <SelectItem value="price-desc">Price: High → Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <p className="mb-6 text-sm text-muted-foreground font-medium">{sorted.length} cruise{sorted.length !== 1 ? "s" : ""} found</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((cruise, i) => (
              <motion.div key={cruise.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.06 }}>
                <Link to={`/cruises/${cruise.id}`} className="group block">
                  <Card className="overflow-hidden border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 bg-card">
                    <div className="watermark-container aspect-[16/10] overflow-hidden relative">
                      <img src={cruise.images[0]} alt={cruise.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {cruise.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">⭐ Featured</span>
                        </div>
                      )}
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
        </div>
      </section>
    </div>
  );
}
