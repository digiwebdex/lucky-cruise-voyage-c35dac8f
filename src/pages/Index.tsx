import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ship, Shield, Star, Clock, MapPin, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cruises, testimonials, galleryImages } from "@/services/mockData";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Index() {
  const featured = cruises.filter(c => c.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920')] bg-cover bg-center opacity-30" />
        <div className="container relative z-10 py-20 text-center text-secondary-foreground">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }} className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
            Explore Bangladesh<br /><span className="text-primary">By Water</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="mx-auto mb-8 max-w-2xl text-lg text-secondary-foreground/80">
            Discover the rivers, coasts, and the majestic Sundarbans with Lucky Tours & Travels — your trusted cruise partner.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-wrap justify-center gap-4">
            <Link to="/cruises"><Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Cruises</Button></Link>
            <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">Book on WhatsApp</Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Cruises */}
      <section className="bg-warm-bg py-16">
        <div className="container">
          <h2 className="mb-2 text-center text-3xl font-bold text-secondary">Featured Cruises</h2>
          <p className="mb-10 text-center text-muted-foreground">Handpicked experiences for you</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((cruise, i) => (
              <motion.div key={cruise.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="group overflow-hidden border-border hover:shadow-lg transition-shadow">
                  <div className="watermark-container aspect-[4/3] overflow-hidden">
                    <img src={cruise.images[0]} alt={cruise.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" draggable={false} />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-secondary">{cruise.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{cruise.route}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">৳{cruise.price.toLocaleString()}</span>
                      <Link to={`/cruises/${cruise.id}`}><Button size="sm" variant="outline" className="gap-1">Details <ChevronRight className="h-3 w-3" /></Button></Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold text-secondary">Why Choose Us</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Ship, title: "Premium Fleet", desc: "Modern, well-maintained cruise ships for your comfort." },
              { icon: Shield, title: "Safe & Secure", desc: "Full safety equipment and experienced crew on every trip." },
              { icon: Star, title: "Best Packages", desc: "Affordable packages with the best value for your money." },
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock customer support via WhatsApp." },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-secondary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-warm-bg py-16">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold text-secondary">Gallery</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.slice(0, 8).map((img, i) => (
              <div key={i} className="watermark-container aspect-square overflow-hidden rounded-lg">
                <img src={img} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover transition-transform hover:scale-105" draggable={false} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/gallery"><Button variant="outline">View Full Gallery</Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold text-secondary">What Our Guests Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map(t => (
              <Card key={t.id} className="border-border">
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-1">{Array.from({ length: t.rating }, (_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
                  <p className="mb-4 text-sm text-muted-foreground italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{t.avatar}</div>
                    <span className="font-medium text-secondary">{t.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Set Sail?</h2>
          <p className="mx-auto mb-8 max-w-xl text-secondary-foreground/80">Contact us today to book your dream cruise or learn more about our packages.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"><Phone className="h-5 w-5" /> WhatsApp Us</Button>
            </a>
            <Link to="/contact"><Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"><MapPin className="h-5 w-5" /> Contact Page</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
