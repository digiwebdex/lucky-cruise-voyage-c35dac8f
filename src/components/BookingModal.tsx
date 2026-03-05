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
          <DialogTitle className="text-secondary">Book: {cruise.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="01XXXXXXXXX" required />
          </div>
          <div className="flex flex-col">
            <Label>Travel Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("mt-1 justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} disabled={d => d < new Date()} initialFocus className="pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="persons">Total Persons</Label>
            <Input id="persons" type="number" min="1" max="50" value={persons} onChange={e => setPersons(e.target.value)} />
          </div>
          <div>
            <Label>Package</Label>
            <Select onValueChange={setSelectedPackage}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select a package" /></SelectTrigger>
              <SelectContent>
                {cruise.packages.map(p => (
                  <SelectItem key={p.id} value={p.name}>{p.name} – ৳{p.price}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Seat Type</Label>
            <Select onValueChange={setSeatType}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select seat type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="AC">AC</SelectItem>
                <SelectItem value="Non-AC">Non-AC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Submit & Book via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
