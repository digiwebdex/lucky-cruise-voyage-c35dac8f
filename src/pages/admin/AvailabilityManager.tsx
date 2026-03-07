import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Ship, Save, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useBookingStore, getAvailability, saveAvailability, type ShipAvailability } from "@/services/bookingStore";
import { getCruises } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";

export default function AvailabilityManager() {
  const cruises = getCruises();
  const [availability, setAvailability] = useBookingStore(getAvailability, saveAvailability);
  const [selectedCruise, setSelectedCruise] = useState<string>("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const cruise = cruises.find(c => c.id === selectedCruise);

  // Load existing dates when cruise changes
  const existingEntry = useMemo(() => {
    if (!selectedCruise) return null;
    return availability.find(a => a.cruiseId === selectedCruise && !a.packageId);
  }, [selectedCruise, availability]);

  const handleCruiseChange = (id: string) => {
    setSelectedCruise(id);
    const entry = availability.find(a => a.cruiseId === id && !a.packageId);
    if (entry) {
      setSelectedDates(entry.availableDates.map(d => new Date(d + "T00:00:00")));
    } else {
      setSelectedDates([]);
    }
  };

  const handleSave = () => {
    if (!selectedCruise) return;
    const dateStrings = selectedDates.map(d => format(d, "yyyy-MM-dd")).sort();

    const updated = availability.filter(a => !(a.cruiseId === selectedCruise && !a.packageId));
    if (dateStrings.length > 0) {
      updated.push({
        id: existingEntry?.id || `avail-${Date.now()}`,
        cruiseId: selectedCruise,
        availableDates: dateStrings,
      });
    }

    setAvailability(updated);
    toast({ title: "Availability saved", description: `${dateStrings.length} dates set for ${cruise?.name}` });
  };

  const handleClearAll = () => {
    setSelectedDates([]);
    const updated = availability.filter(a => !(a.cruiseId === selectedCruise && !a.packageId));
    setAvailability(updated);
    toast({ title: "Availability cleared" });
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary flex items-center gap-2">
        <CalendarDays className="h-6 w-6 text-primary" /> Availability Manager
      </h1>

      <Card className="border-border mb-6">
        <CardContent className="p-6">
          <Label className="text-base font-semibold">Select Cruise Ship</Label>
          <Select onValueChange={handleCruiseChange} value={selectedCruise}>
            <SelectTrigger className="mt-2 max-w-md">
              <SelectValue placeholder="Choose a cruise..." />
            </SelectTrigger>
            <SelectContent>
              {cruises.map(c => (
                <SelectItem key={c.id} value={c.id}>
                  <div className="flex items-center gap-2">
                    <Ship className="h-4 w-4" /> {c.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedCruise && cruise && (
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">{cruise.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Click dates to toggle availability. Selected dates = bookable.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleClearAll} className="gap-1 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" /> Clear All
                </Button>
                <Button size="sm" onClick={handleSave} className="gap-1">
                  <Save className="h-3.5 w-3.5" /> Save
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="border rounded-xl p-2">
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => setSelectedDates(dates || [])}
                  disabled={d => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="pointer-events-auto"
                  numberOfMonths={2}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-3">
                  Selected Dates ({selectedDates.length})
                </h3>
                {selectedDates.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No dates selected. All future dates will be available for booking.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
                    {selectedDates
                      .sort((a, b) => a.getTime() - b.getTime())
                      .map(d => (
                        <Badge
                          key={d.toISOString()}
                          variant="outline"
                          className="border-primary/30 bg-primary/5 cursor-pointer hover:bg-destructive/10 hover:border-destructive/30 transition-colors"
                          onClick={() => setSelectedDates(prev => prev.filter(pd => pd.getTime() !== d.getTime()))}
                        >
                          {format(d, "MMM dd, yyyy")} ✕
                        </Badge>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
