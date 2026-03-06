import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Cruise } from "@/services/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookingModalProps {
  cruise: Cruise;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingModal({ cruise, open, onOpenChange }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [persons, setPersons] = useState("1");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [seatType, setSeatType] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) return;

    const msg = encodeURIComponent(
      `*Booking Request*\n\nName: ${name.trim()}\nPhone: ${phone.trim()}\nCruise: ${cruise.name}\nTravel Date: ${format(date, "PPP")}\nPersons: ${persons}\nPackage: ${selectedPackage || "Not selected"}\nSeat Type: ${seatType || "Not selected"}`
    );
    window.open(`https://wa.me/8801711871072?text=${msg}`, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-secondary">{t.booking.bookCruise} {cruise.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t.booking.name}</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder={t.booking.namePlaceholder} required />
          </div>
          <div>
            <Label htmlFor="phone">{t.booking.phone}</Label>
            <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.booking.phonePlaceholder} required />
          </div>
          <div className="flex flex-col">
            <Label>{t.booking.travelDate}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("mt-1 justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : t.booking.pickDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} disabled={d => d < new Date()} initialFocus className="pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="persons">{t.booking.totalPersons}</Label>
            <Input id="persons" type="number" min="1" max="50" value={persons} onChange={e => setPersons(e.target.value)} />
          </div>
          <div>
            <Label>{t.booking.package}</Label>
            <Select onValueChange={setSelectedPackage}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={t.booking.selectPackage} /></SelectTrigger>
              <SelectContent>
                {cruise.packages.map(p => (
                  <SelectItem key={p.id} value={p.name}>{p.name} – ৳{p.price}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t.booking.seatType}</Label>
            <Select onValueChange={setSeatType}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={t.booking.selectSeatType} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="AC">{t.booking.ac}</SelectItem>
                <SelectItem value="Non-AC">{t.booking.nonAc}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {t.booking.submitBook}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
