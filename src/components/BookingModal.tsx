import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users, Baby, Clock, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Cruise } from "@/services/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAvailabilityForCruise, addBooking, getCategories } from "@/services/bookingStore";

interface BookingModalProps {
  cruise: Cruise;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingModal({ cruise, open, onOpenChange }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [notes, setNotes] = useState("");
  const { t, lang: language } = useLanguage();

  const availableDates = useMemo(() => getAvailabilityForCruise(cruise.id), [cruise.id]);
  const categories = useMemo(() => getCategories(), []);

  const isDateAvailable = (d: Date) => {
    if (availableDates.length === 0) return d >= new Date(new Date().setHours(0, 0, 0, 0));
    const iso = format(d, "yyyy-MM-dd");
    return availableDates.includes(iso);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) return;

    const pkgName = selectedPackage || "Not selected";
    const totalAdults = parseInt(adults) || 1;
    const totalChildren = parseInt(children) || 0;

    // Save booking locally
    addBooking({
      name: name.trim(),
      phone: phone.trim(),
      cruiseId: cruise.id,
      cruiseName: cruise.name,
      packageName: pkgName,
      travelDate: format(date, "yyyy-MM-dd"),
      adults: totalAdults,
      children: totalChildren,
      notes: notes.trim() || undefined,
    });

    // Send to WhatsApp
    const msg = encodeURIComponent(
      `*🚢 Booking Request — Book Now, Pay Later*\n\n` +
      `*Name:* ${name.trim()}\n` +
      `*Phone:* ${phone.trim()}\n` +
      `*Cruise:* ${cruise.name}\n` +
      `*Package:* ${pkgName}\n` +
      `*Travel Date:* ${format(date, "PPP")}\n` +
      `*Adults:* ${totalAdults}\n` +
      `*Children:* ${totalChildren}\n` +
      `${notes.trim() ? `*Notes:* ${notes.trim()}\n` : ""}` +
      `\n_Sent from Lucky Tours website_`
    );
    window.open(`https://wa.me/8801711871072?text=${msg}`, "_blank");
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setName(""); setPhone(""); setDate(undefined);
    setAdults("1"); setChildren("0"); setSelectedPackage(""); setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-secondary flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            {language === "bn" ? "বুক করুন:" : "Book:"} {cruise.name}
          </DialogTitle>
          <Badge variant="outline" className="w-fit border-primary/30 bg-primary/5 text-primary mt-1">
            <Clock className="h-3 w-3 mr-1" />
            {language === "bn" ? "এখন বুক করুন, পরে পে করুন" : "Book Now, Pay Later"}
          </Badge>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">{t.booking.name}</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder={t.booking.namePlaceholder} required />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">{t.booking.phone}</Label>
            <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.booking.phonePlaceholder} required />
          </div>

          {/* Package */}
          <div>
            <Label>{t.booking.package}</Label>
            <Select onValueChange={setSelectedPackage}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={t.booking.selectPackage} /></SelectTrigger>
              <SelectContent>
                {cruise.packages.map(p => (
                  <SelectItem key={p.id} value={p.name}>{p.name} – ৳{p.price.toLocaleString()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Travel Date with availability */}
          <div className="flex flex-col">
            <Label>{t.booking.travelDate}</Label>
            {availableDates.length > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5 mb-1">
                {language === "bn" ? "শুধুমাত্র উপলব্ধ তারিখ নির্বাচনযোগ্য" : "Only available dates are selectable"}
              </p>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("mt-1 justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : t.booking.pickDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={d => !isDateAvailable(d)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Adults & Children */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="adults" className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                {language === "bn" ? "প্রাপ্তবয়স্ক" : "Adults"}
              </Label>
              <Input id="adults" type="number" min="1" max="50" value={adults} onChange={e => setAdults(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="children" className="flex items-center gap-1.5">
                <Baby className="h-3.5 w-3.5 text-primary" />
                {language === "bn" ? "শিশু" : "Children"}
              </Label>
              <Input id="children" type="number" min="0" max="20" value={children} onChange={e => setChildren(e.target.value)} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">{language === "bn" ? "বার্তা / নোট (ঐচ্ছিক)" : "Message / Notes (optional)"}</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={language === "bn" ? "আপনার কোনো বিশেষ অনুরোধ থাকলে লিখুন..." : "Any special requests or notes..."}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {t.booking.submitBook}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
