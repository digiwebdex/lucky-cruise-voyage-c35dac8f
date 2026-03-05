import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { searchCruises, cruises } from "@/services/mockData";

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
      <section className="bg-secondary py-12 text-center text-secondary-foreground">
        <div className="container">
          <h1 className="text-3xl font-extrabold md:text-4xl">Our <span className="text-primary">Cruises</span></h1>
          <p className="mt-2 text-secondary-foreground/80">Find your perfect cruise adventure</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap items-end gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search cruises, routes..." className="pl-9" value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <Input className="w-28" placeholder="Min ৳" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
            <Input className="w-28" placeholder="Max ৳" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            <Select onValueChange={setSort}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low → High</SelectItem>
                <SelectItem value="price-desc">Price: High → Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">{sorted.length} cruise{sorted.length !== 1 ? "s" : ""} found</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map(cruise => (
              <Card key={cruise.id} className="group overflow-hidden border-border hover:shadow-lg transition-shadow">
                <div className="watermark-container aspect-[16/10] overflow-hidden">
                  <img src={cruise.images[0]} alt={cruise.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" draggable={false} />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-secondary">{cruise.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cruise.route}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{cruise.duration}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">৳{cruise.price.toLocaleString()}</span>
                    <Link to={`/cruises/${cruise.id}`}>
                      <Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        View Details <ChevronRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
