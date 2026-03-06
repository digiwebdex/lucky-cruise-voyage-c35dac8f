import { useParams, Link } from "react-router-dom";
import ImageZoom from "@/components/ImageZoom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, MapPin, Check, Users, DoorOpen, Ship,
  UtensilsCrossed, Shield, TreePine, Backpack, Calendar,
  ChevronRight, Phone, Banknote, MapPinned, ChevronLeft, ZoomIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getCruiseById } from "@/services/cmsStore";
import SeatPlanViewer from "@/components/SeatPlanViewer";
import BookingModal from "@/components/BookingModal";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function CruiseDetail() {
  const { id } = useParams();
  const cruise = getCruiseById(id || "");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const { t } = useLanguage();

  if (!cruise) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-3xl font-black text-foreground">{t.cruiseDetail.cruiseNotFound}</h1>
        <Link to="/cruises"><Button className="mt-4 gradient-primary text-primary-foreground rounded-xl">{t.cruiseDetail.backToCruises}</Button></Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[40vh] sm:min-h-[55vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={cruise.images[selectedImg]} alt={cruise.name} className="h-full w-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-transparent" />
        </div>
        <div className="container relative z-10 pb-8 sm:pb-12 pt-20 sm:pt-28">
          <Link to="/cruises" className="mb-5 inline-flex items-center gap-2 rounded-xl bg-secondary/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-secondary-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t.cruiseDetail.backToCruises}
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <Badge className="mb-3 rounded-full gradient-primary text-primary-foreground font-bold border-0 px-4 py-1">{cruise.duration}</Badge>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-secondary-foreground leading-tight">{cruise.name}</h1>
            <p className="mt-2 text-sm sm:text-lg font-semibold text-primary">{cruise.subtitle}</p>
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-secondary-foreground/70">
              <span className="flex items-center gap-1.5 sm:gap-2 bg-secondary/40 backdrop-blur-sm rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5"><MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> {cruise.route}</span>
              <span className="flex items-center gap-1.5 sm:gap-2 bg-secondary/40 backdrop-blur-sm rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5"><Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> {cruise.duration}</span>
              <span className="flex items-center gap-1.5 sm:gap-2 bg-secondary/40 backdrop-blur-sm rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5"><Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> {cruise.capacity}</span>
              <span className="flex items-center gap-1.5 sm:gap-2 bg-secondary/40 backdrop-blur-sm rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5"><DoorOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> {cruise.cabins}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container py-6 sm:py-10">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8 sm:space-y-10 min-w-0">
            {/* Image Gallery */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="watermark-container aspect-[16/10] overflow-hidden rounded-2xl shadow-elevated cursor-pointer group relative" onClick={() => setLightbox(true)}>
                <ImageZoom src={cruise.images[selectedImg]} alt={cruise.name} className="h-full w-full" zoomScale={2.5} />
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-all flex items-center justify-center pointer-events-none">
                  <ZoomIn className="h-10 w-10 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              {cruise.images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {cruise.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImg(i)} className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${i === selectedImg ? "border-primary shadow-glow scale-105" : "border-transparent opacity-60 hover:opacity-100 hover:border-border"}`}>
                      <img src={img} alt="" className="h-full w-full object-cover" draggable={false} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="mb-3 font-display text-xl sm:text-2xl font-black text-foreground flex items-center gap-2"><Ship className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> {t.cruiseDetail.aboutThisCruise}</h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{cruise.description}</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="mb-4 font-display text-xl sm:text-2xl font-black text-foreground">{t.cruiseDetail.shipFacilities}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {cruise.facilities.map(f => (
                  <div key={f} className="flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3.5 text-sm hover:bg-primary/10 transition-colors">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {cruise.touristSpots && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="mb-4 font-display text-xl sm:text-2xl font-black text-foreground flex items-center gap-2"><MapPinned className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> {t.cruiseDetail.touristSpots}</h2>
                <div className="flex flex-wrap gap-2">
                  {cruise.touristSpots.map(spot => (
                    <Badge key={spot} variant="outline" className="border-primary/30 bg-primary/5 text-foreground px-4 py-2 text-sm font-medium rounded-xl">{spot}</Badge>
                  ))}
                </div>
              </motion.div>
            )}

            <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50 rounded-xl h-10 sm:h-12 p-1">
                <TabsTrigger value="itinerary" className="gap-1 sm:gap-1.5 text-[10px] sm:text-sm rounded-lg font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"><Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 hidden xs:block" /> {t.cruiseDetail.itinerary}</TabsTrigger>
                <TabsTrigger value="menu" className="gap-1 sm:gap-1.5 text-[10px] sm:text-sm rounded-lg font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"><UtensilsCrossed className="h-3.5 w-3.5 sm:h-4 sm:w-4 hidden xs:block" /> {t.cruiseDetail.menu}</TabsTrigger>
                <TabsTrigger value="safety" className="gap-1 sm:gap-1.5 text-[10px] sm:text-sm rounded-lg font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"><Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 hidden xs:block" /> {t.cruiseDetail.safety}</TabsTrigger>
                <TabsTrigger value="tips" className="gap-1 sm:gap-1.5 text-[10px] sm:text-sm rounded-lg font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"><Backpack className="h-3.5 w-3.5 sm:h-4 sm:w-4 hidden xs:block" /> {t.cruiseDetail.tips}</TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary" className="mt-6 space-y-6">
                {cruise.itinerary?.map((day, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                    <Card className="border-l-4 border-l-primary overflow-hidden border-border/50 bg-card">
                       <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground font-display font-black text-xs sm:text-sm">{day.day.replace("Day ", "")}</span>
                          <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-wider">{day.day}</p>
                            <h3 className="font-display text-base sm:text-lg font-bold text-foreground">{day.title}</h3>
                          </div>
                        </div>
                        <ul className="space-y-3 ml-1">
                          {day.activities.map((act, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{act}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="menu" className="mt-6 space-y-6">
                {cruise.menu?.map((day, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                    <Card className="overflow-hidden border-border/50 bg-card">
                      <CardContent className="p-6">
                        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                          <UtensilsCrossed className="h-5 w-5 text-primary" /> {day.day}
                        </h3>
                        <div className="space-y-3">
                          {day.meals.map((meal, j) => (
                            <div key={j} className="rounded-xl bg-muted/30 border border-border/30 p-4">
                              <p className="font-display font-bold text-sm text-primary mb-1">{meal.name}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{meal.items}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                <Card className="border-primary/20 bg-primary/5 border-border/50">
                  <CardContent className="p-5 text-sm text-muted-foreground">
                    <p className="font-display font-bold text-foreground mb-1">{t.cruiseDetail.menuNote}</p>
                    {t.cruiseDetail.menuNoteText}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="safety" className="mt-6 space-y-4">
                <Card className="border-l-4 border-l-emerald border-border/50 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-emerald" /> {t.cruiseDetail.securityMeasures}</h3>
                    <ul className="space-y-3">
                      {cruise.safetyInfo?.map((info, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-emerald flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{info}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="mt-6 space-y-6">
                {cruise.travelTips && (
                  <Card className="border-border/50 bg-card">
                    <CardContent className="p-6">
                      <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2"><TreePine className="h-5 w-5 text-emerald" /> {t.cruiseDetail.travelTips}</h3>
                      <ul className="space-y-3">
                        {cruise.travelTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="text-lg leading-none">🌿</span>
                            <span className="leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {cruise.thingsToCarry && (
                  <Card className="border-border/50 bg-card">
                    <CardContent className="p-6">
                      <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Backpack className="h-5 w-5 text-primary" /> {t.cruiseDetail.thingsToCarry}</h3>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {cruise.thingsToCarry.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-xl bg-muted/30 border border-border/30 px-4 py-3 text-sm text-foreground">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" /> {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            <section>
              <h2 className="mb-6 font-display text-2xl font-black text-foreground">{t.cruiseDetail.seatPlan}</h2>
              <SeatPlanViewer seatPlanImage={cruise.seatPlanImage} shipName={cruise.name} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24 border-border/50 shadow-elevated overflow-hidden bg-card">
              <div className="gradient-primary px-6 py-5">
                <p className="text-primary-foreground/80 text-sm font-medium">{t.cruiseDetail.startingFrom}</p>
                {cruise.oldPrice && (
                  <p className="text-primary-foreground/60 text-lg font-display font-bold line-through">৳{cruise.oldPrice.toLocaleString()}</p>
                )}
                <p className="text-4xl font-display font-black text-primary-foreground">৳{cruise.price.toLocaleString()}</p>
                <p className="text-primary-foreground/70 text-xs mt-1">{cruise.priceLabel}</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <Button size="lg" className="w-full gradient-primary text-primary-foreground font-bold text-base rounded-xl h-13 shadow-glow hover:scale-[1.02] transition-transform" onClick={() => setBookingOpen(true)}>
                  {t.cruiseDetail.bookNow}
                </Button>
                <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer" className="block">
                  <Button size="lg" variant="outline" className="w-full border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground gap-2 rounded-xl h-13 font-bold">
                    <Phone className="h-4 w-4" /> {t.cruiseDetail.whatsappUs}
                  </Button>
                </a>

                {cruise.additionalCosts && (
                  <div className="pt-3 border-t border-border/30">
                    <p className="text-xs font-display font-bold text-foreground mb-2 flex items-center gap-1"><Banknote className="h-3.5 w-3.5 text-primary" /> {t.cruiseDetail.additionalCosts}</p>
                    {cruise.additionalCosts.map((cost, i) => (
                      <div key={i} className="flex justify-between text-xs text-muted-foreground py-1.5">
                        <span>{cost.label}</span>
                        <span className="font-bold text-foreground">{cost.amount}</span>
                      </div>
                    ))}
                  </div>
                )}

                {cruise.packageIncludes && (
                  <div className="pt-3 border-t border-border/30">
                    <p className="text-xs font-display font-bold text-foreground mb-2">{t.cruiseDetail.packageIncludes}</p>
                    <ul className="space-y-2">
                      {cruise.packageIncludes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-3 border-t border-border/30 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {cruise.route}</div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground"><Clock className="h-4 w-4 text-primary" /> {cruise.duration}</div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground"><Users className="h-4 w-4 text-primary" /> {cruise.capacity}</div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground"><DoorOpen className="h-4 w-4 text-primary" /> {cruise.cabins}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 text-center">
                <p className="font-display font-bold text-foreground mb-2">{t.cruiseDetail.sundarbanBooking}</p>
                <a href="tel:+8801711871072" className="text-2xl font-display font-black text-primary hover:underline">+880 1711-871072</a>
                <p className="text-xs text-muted-foreground mt-2">{t.cruiseDetail.callOrWhatsApp}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={lightbox} onOpenChange={setLightbox}>
        <DialogContent className="max-w-5xl border-none bg-secondary/95 backdrop-blur-xl p-2 sm:p-4 shadow-2xl">
          <div className="relative">
            <div className="watermark-container">
              <img src={cruise.images[selectedImg]} alt={cruise.name} className="w-full rounded-xl max-h-[80vh] object-contain" draggable={false} />
            </div>
            {cruise.images.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground" onClick={() => setSelectedImg((selectedImg - 1 + cruise.images.length) % cruise.images.length)}>
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground" onClick={() => setSelectedImg((selectedImg + 1) % cruise.images.length)}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            <div className="text-center mt-2 text-sm text-secondary-foreground/50">{selectedImg + 1} / {cruise.images.length}</div>
          </div>
        </DialogContent>
      </Dialog>

      <BookingModal cruise={cruise} open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
