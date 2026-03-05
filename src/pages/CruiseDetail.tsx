import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCruiseById } from "@/services/mockData";
import SeatPlanViewer from "@/components/SeatPlanViewer";
import BookingModal from "@/components/BookingModal";

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
      <div className="container py-8">
        <Link to="/cruises" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Cruises
        </Link>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Images */}
          <div className="lg:col-span-3">
            <div className="watermark-container aspect-[16/10] overflow-hidden rounded-xl">
              <img src={cruise.images[selectedImg]} alt={cruise.name} className="h-full w-full object-cover" draggable={false} />
            </div>
            {cruise.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {cruise.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImg(i)} className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 ${i === selectedImg ? "border-primary" : "border-transparent"}`}>
                    <img src={img} alt="" className="h-full w-full object-cover" draggable={false} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold text-secondary">{cruise.name}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" /> {cruise.route}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" /> {cruise.duration}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cruise.description}</p>

            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-secondary">Facilities</h3>
              <div className="flex flex-wrap gap-2">
                {cruise.facilities.map(f => (
                  <span key={f} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"><Check className="h-3 w-3" /> {f}</span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <span className="text-3xl font-extrabold text-primary">From ৳{cruise.price.toLocaleString()}</span>
            </div>

            <Button size="lg" className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setBookingOpen(true)}>
              Book Now
            </Button>
          </div>
        </div>

        {/* Packages */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-secondary">Packages</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cruise.packages.map(pkg => (
              <Card key={pkg.id} className="border-border">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-secondary">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.route}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Seat: {pkg.seatType}</p>
                  <ul className="mt-3 space-y-1">
                    {pkg.inclusions.map(inc => (
                      <li key={inc} className="flex items-center gap-1.5 text-sm text-muted-foreground"><Check className="h-3 w-3 text-primary" /> {inc}</li>
                    ))}
                  </ul>
                  <div className="mt-4 text-xl font-bold text-primary">৳{pkg.price.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Seat Plan */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-secondary">Seat Plan</h2>
          <SeatPlanViewer seatPlan={cruise.seatPlan} />
        </section>
      </div>

      <BookingModal cruise={cruise} open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
