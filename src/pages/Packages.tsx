import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cruises } from "@/services/mockData";

export default function Packages() {
  const allPackages = cruises.flatMap(c => c.packages.map(p => ({ ...p, cruiseName: c.name, cruiseId: c.id })));
  const unique = allPackages.filter((p, i, arr) => arr.findIndex(x => x.name === p.name && x.cruiseName === p.cruiseName) === i);

  return (
    <div>
      <section className="bg-secondary py-12 text-center text-secondary-foreground">
        <div className="container">
          <h1 className="text-3xl font-extrabold md:text-4xl">Our <span className="text-primary">Packages</span></h1>
          <p className="mt-2 text-secondary-foreground/80">Choose the perfect package for your journey</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unique.map(pkg => (
              <Card key={`${pkg.cruiseId}-${pkg.id}`} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <span className="text-xs font-medium text-primary">{pkg.cruiseName}</span>
                  <h3 className="mt-1 text-xl font-bold text-secondary">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{pkg.route}</p>
                  <p className="text-xs text-muted-foreground">Seat: {pkg.seatType}</p>
                  <ul className="mt-4 space-y-1.5">
                    {pkg.inclusions.map(inc => (
                      <li key={inc} className="flex items-center gap-1.5 text-sm text-muted-foreground"><Check className="h-3 w-3 text-primary" /> {inc}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-primary">৳{pkg.price.toLocaleString()}</span>
                    <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Book Now</Button>
                    </a>
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
