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
import { CalendarIcon, Users, Baby, Clock, CreditCard, Ship, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCruises } from "@/services/cmsStore";
import { getAvailabilityForCruise, addBooking } from "@/services/bookingStore";

interface HeaderBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HeaderBookingModal({ open, onOpenChange }: HeaderBookingModalProps) {
  const { t, lang: language } = useLanguage();
  const allCruises = getCruises();

  const [category, setCategory] = useState("");
  const [cruiseId, setCruiseId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [notes, setNotes] = useState("");

  const categories = [
    { value: "sundarban", label: language === "bn" ? "সুন্দরবন ভ্রমণ" : "Sundarban Tour" },
    { value: "tanguar-haor", label: language === "bn" ? "টাঙ্গুয়ার হাওর ভ্রমণ" : "Tanguar Haor Tour" },
  ];

  const filteredCruises = useMemo(() => {
    if (!category) return allCruises;
    return allCruises.filter(c => c.destination === category);
  }, [category, allCruises]);

  const selectedCruise = useMemo(() => allCruises.find(c => c.id === cruiseId), [cruiseId, allCruises]);

  const availableDates = useMemo(() => {
    if (!cruiseId) return [];
    return getAvailabilityForCruise(cruiseId);
  }, [cruiseId]);

  const isDateAvailable = (d: Date) => {
    if (availableDates.length === 0) return d >= new Date(new Date().setHours(0, 0, 0, 0));
    const iso = format(d, "yyyy-MM-dd");
    return availableDates.includes(iso);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setCruiseId("");
    setSelectedPackage("");
  };

  const handleCruiseChange = (val: string) => {
    setCruiseId(val);
    setSelectedPackage("");
    setDate(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !cruiseId) return;

    const cruise = selectedCruise;
    if (!cruise) return;

    const pkgName = selectedPackage || "Not selected";
    const totalAdults = parseInt(adults) || 1;
    const totalChildren = parseInt(children) || 0;

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

    const catLabel = categories.find(c => c.value === category)?.label || "";
    const msg = encodeURIComponent(
      `*🚢 Booking Request — Book Now, Pay Later*\n\n` +
      `*Name:* ${name.trim()}\n` +
      `*Phone:* ${phone.trim()}\n` +
      `*Category:* ${catLabel}\n` +
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
    setCategory(""); setCruiseId(""); setName(""); setPhone("");
    setDate(undefined); setAdults("1"); setChildren("0");
    setSelectedPackage(""); setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) resetForm(); }}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            {language === "bn" ? "এখনই বুক করুন" : "Book Now"}
          </DialogTitle>
          <Badge variant="outline" className="w-fit border-primary/30 bg-primary/5 text-primary mt-1">
            <Clock className="h-3 w-3 mr-1" />
            {language === "bn" ? "এখন বুক করুন, পরে পে করুন" : "Book Now, Pay Later"}
          </Badge>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="hb-name">{t.booking.name}</Label>
            <Input id="hb-name" value={name} onChange={e => setName(e.target.value)} placeholder={t.booking.namePlaceholder} required />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="hb-phone">{t.booking.phone}</Label>
            <Input id="hb-phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.booking.phonePlaceholder} required />
          </div>

          {/* Category */}
          <div>
            <Label className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {language === "bn" ? "ট্যুর ক্যাটাগরি" : "Tour Category"}
            </Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={language === "bn" ? "ক্যাটাগরি নির্বাচন করুন" : "Select category"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cruise */}
          <div>
            <Label className="flex items-center gap-1.5">
              <Ship className="h-3.5 w-3.5 text-primary" />
              {language === "bn" ? "ক্রুজ নির্বাচন করুন" : "Select Cruise"}
            </Label>
            <Select value={cruiseId} onValueChange={handleCruiseChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={language === "bn" ? "ক্রুজ বাছুন" : "Choose cruise"} />
              </SelectTrigger>
              <SelectContent>
                {filteredCruises.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Package (only if cruise selected) */}
          {selectedCruise && selectedCruise.packages.length > 0 && (
            <div>
              <Label>{t.booking.package}</Label>
              <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t.booking.selectPackage} />
                </SelectTrigger>
                <SelectContent>
                  {selectedCruise.packages.map(p => (
                    <SelectItem key={p.id} value={p.name}>{p.name} – ৳{p.price.toLocaleString()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Travel Date */}
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
              <Label htmlFor="hb-adults" className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                {language === "bn" ? "প্রাপ্তবয়স্ক" : "Adults"}
              </Label>
              <Input id="hb-adults" type="number" min="1" max="50" value={adults} onChange={e => setAdults(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="hb-children" className="flex items-center gap-1.5">
                <Baby className="h-3.5 w-3.5 text-primary" />
                {language === "bn" ? "শিশু" : "Children"}
              </Label>
              <Input id="hb-children" type="number" min="0" max="20" value={children} onChange={e => setChildren(e.target.value)} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="hb-notes">{language === "bn" ? "বার্তা / নোট (ঐচ্ছিক)" : "Message / Notes (optional)"}</Label>
            <Textarea
              id="hb-notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={language === "bn" ? "আপনার কোনো বিশেষ অনুরোধ থাকলে লিখুন..." : "Any special requests or notes..."}
              rows={3}
            />
          </div>

          <Button type="submit" disabled={!cruiseId || !name || !phone || !date} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
            {t.booking.submitBook}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
