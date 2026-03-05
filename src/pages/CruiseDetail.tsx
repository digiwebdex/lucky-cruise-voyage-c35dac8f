import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, MapPin, Check, Users, DoorOpen, Ship,
  UtensilsCrossed, Shield, TreePine, Backpack, Calendar,
  ChevronRight, Phone, Banknote, MapPinned
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getCruiseById } from "@/services/mockData";
import SeatPlanViewer from "@/components/SeatPlanViewer";
import BookingModal from "@/components/BookingModal";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function CruiseDetail() {
  const { id } = useParams();
  const cruise = getCruiseById(id || "");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  if (!cruise) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-secondary">Cruise not found</h1>
        <Link to="/cruises"><Button className="mt-4" variant="outline">Back to Cruises</Button></Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <img src={cruise.images[selectedImg]} alt={cruise.name} className="h-full w-full object-cover opacity-40" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
        </div>
        <div className="container relative z-10 pb-10 pt-24">
          <Link to="/cruises" className="mb-4 inline-flex items-center gap-1 text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Cruises
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">{cruise.duration}</Badge>
            <h1 className="text-4xl font-extrabold text-secondary-foreground md:text-5xl">{cruise.name}</h1>
            <p className="mt-1 text-lg text-primary font-semibold">{cruise.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-secondary-foreground/80">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {cruise.route}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {cruise.duration}</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> {cruise.capacity}</span>
              <span className="flex items-center gap-1.5"><DoorOpen className="h-4 w-4 text-primary" /> {cruise.cabins}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content – Left 2 cols */}
          <div className="lg:col-span-2 space-y-10">
            {/* Image Gallery */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="watermark-container aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
                <img src={cruise.images[selectedImg]} alt={cruise.name} className="h-full w-full object-cover" draggable={false} />
              </div>
              {cruise.images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {cruise.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImg(i)} className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === selectedImg ? "border-primary shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}>
                      <img src={img} alt="" className="h-full w-full object-cover" draggable={false} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="mb-3 text-2xl font-bold text-secondary flex items-center gap-2"><Ship className="h-6 w-6 text-primary" /> About This Cruise</h2>
              <p className="text-muted-foreground leading-relaxed">{cruise.description}</p>
            </motion.div>

            {/* Facilities */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="mb-4 text-2xl font-bold text-secondary">Ship Facilities</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {cruise.facilities.map(f => (
                  <div key={f} className="flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tourist Spots */}
            {cruise.touristSpots && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="mb-4 text-2xl font-bold text-secondary flex items-center gap-2"><MapPinned className="h-6 w-6 text-primary" /> Tourist Spots</h2>
                <div className="flex flex-wrap gap-2">
                  {cruise.touristSpots.map(spot => (
                    <Badge key={spot} variant="outline" className="border-primary/30 text-foreground px-3 py-1.5 text-sm">{spot}</Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tabs: Itinerary / Menu / Safety / Tips */}
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger value="itinerary" className="gap-1 text-xs sm:text-sm"><Calendar className="h-3.5 w-3.5 hidden sm:block" /> Itinerary</TabsTrigger>
                <TabsTrigger value="menu" className="gap-1 text-xs sm:text-sm"><UtensilsCrossed className="h-3.5 w-3.5 hidden sm:block" /> Menu</TabsTrigger>
                <TabsTrigger value="safety" className="gap-1 text-xs sm:text-sm"><Shield className="h-3.5 w-3.5 hidden sm:block" /> Safety</TabsTrigger>
                <TabsTrigger value="tips" className="gap-1 text-xs sm:text-sm"><Backpack className="h-3.5 w-3.5 hidden sm:block" /> Tips</TabsTrigger>
              </TabsList>

              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="mt-6 space-y-6">
                {cruise.itinerary?.map((day, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                    <Card className="border-l-4 border-l-primary overflow-hidden">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">{day.day.replace("Day ", "")}</span>
                          <div>
                            <p className="text-xs font-semibold text-primary uppercase tracking-wide">{day.day}</p>
                            <h3 className="text-lg font-bold text-secondary">{day.title}</h3>
                          </div>
                        </div>
                        <ul className="space-y-2 ml-1">
                          {day.activities.map((act, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Menu Tab */}
              <TabsContent value="menu" className="mt-6 space-y-6">
                {cruise.menu?.map((day, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-5">
                        <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                          <UtensilsCrossed className="h-5 w-5 text-primary" /> {day.day}
                        </h3>
                        <div className="space-y-3">
                          {day.meals.map((meal, j) => (
                            <div key={j} className="rounded-lg bg-muted/50 p-3">
                              <p className="font-semibold text-sm text-primary mb-1">{meal.name}</p>
                              <p className="text-sm text-muted-foreground">{meal.items}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">📝 Important Note</p>
                    Corporate groups or large parties can customize the menu. Menu items may change based on season and availability. Please confirm the menu during booking.
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Safety Tab */}
              <TabsContent value="safety" className="mt-6 space-y-4">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Security Measures</h3>
                    <ul className="space-y-2">
                      {cruise.safetyInfo?.map((info, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tips Tab */}
              <TabsContent value="tips" className="mt-6 space-y-6">
                {cruise.travelTips && (
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2"><TreePine className="h-5 w-5 text-primary" /> Travel Tips</h3>
                      <ul className="space-y-2">
                        {cruise.travelTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary font-bold">🌿</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {cruise.thingsToCarry && (
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2"><Backpack className="h-5 w-5 text-primary" /> Things to Carry</h3>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {cruise.thingsToCarry.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" /> {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Seat Plan */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-secondary">Seat Plan</h2>
              <SeatPlanViewer seatPlan={cruise.seatPlan} seatPlanImage={cruise.seatPlanImage} shipName={cruise.name} />
            </section>
          </div>

          {/* Sidebar – Right col */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="sticky top-24 border-primary/20 shadow-lg overflow-hidden">
              <div className="bg-primary px-6 py-4">
                <p className="text-primary-foreground/80 text-sm font-medium">Starting from</p>
                <p className="text-3xl font-extrabold text-primary-foreground">৳{cruise.price.toLocaleString()}</p>
                <p className="text-primary-foreground/80 text-xs">{cruise.priceLabel}</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold" onClick={() => setBookingOpen(true)}>
                  Book Now
                </Button>
                <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer" className="block">
                  <Button size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
                    <Phone className="h-4 w-4" /> WhatsApp Us
                  </Button>
                </a>

                {/* Additional Costs */}
                {cruise.additionalCosts && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs font-semibold text-secondary mb-2 flex items-center gap-1"><Banknote className="h-3.5 w-3.5" /> Additional Costs</p>
                    {cruise.additionalCosts.map((cost, i) => (
                      <div key={i} className="flex justify-between text-xs text-muted-foreground py-1">
                        <span>{cost.label}</span>
                        <span className="font-semibold text-foreground">{cost.amount}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Package Includes */}
                {cruise.packageIncludes && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs font-semibold text-secondary mb-2">Package Includes</p>
                    <ul className="space-y-1.5">
                      {cruise.packageIncludes.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <Check className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick Info */}
                <div className="pt-2 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-primary" /> {cruise.route}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5 text-primary" /> {cruise.duration}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5 text-primary" /> {cruise.capacity}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><DoorOpen className="h-3.5 w-3.5 text-primary" /> {cruise.cabins}</div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-border">
              <CardContent className="p-5 text-center">
                <p className="text-sm font-semibold text-secondary mb-1">Sundarban Tour Booking</p>
                <a href="tel:+8801711871072" className="text-xl font-bold text-primary hover:underline">+880 1711-871072</a>
                <p className="text-xs text-muted-foreground mt-2">Call or WhatsApp for booking</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal cruise={cruise} open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
