import { useState } from "react";
import type { Deck } from "@/services/mockData";
import { Users, BedDouble, BedSingle, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SeatPlanViewerProps {
  seatPlan: Deck[];
  seatPlanImage?: string;
  shipName?: string;
}

const cabinColors: Record<string, string> = {
  "VIP Couple": "bg-primary/15 border-primary/40 text-primary",
  "VIP Family": "bg-amber-500/15 border-amber-500/40 text-amber-700",
  "Twin": "bg-blue-500/15 border-blue-500/40 text-blue-700",
  "Single": "bg-emerald-500/15 border-emerald-500/40 text-emerald-700",
  "Bunk": "bg-purple-500/15 border-purple-500/40 text-purple-700",
};

const cabinDots: Record<string, string> = {
  "VIP Couple": "bg-primary",
  "VIP Family": "bg-amber-500",
  "Twin": "bg-blue-500",
  "Single": "bg-emerald-500",
  "Bunk": "bg-purple-500",
};

export default function SeatPlanViewer({ seatPlan, seatPlanImage, shipName = "Ship" }: SeatPlanViewerProps) {
  const [showImage, setShowImage] = useState(false);

  const totalCabins = seatPlan.reduce(
    (sum, deck) => sum + deck.rows.reduce((s, r) => s + r.cabins.length, 0),
    0
  );
  const totalCapacity = seatPlan.reduce((sum, d) => sum + d.capacity, 0);

  // Dynamically compute cabin summary
  const cabinSummary: Record<string, { count: number; persons: number }> = {};
  seatPlan.forEach((deck) =>
    deck.rows.forEach((row) =>
      row.cabins.forEach((cabin) => {
        if (!cabinSummary[cabin.type]) cabinSummary[cabin.type] = { count: 0, persons: 0 };
        cabinSummary[cabin.type].count++;
        cabinSummary[cabin.type].persons += cabin.persons;
      })
    )
  );

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
          <p className="text-2xl font-extrabold text-primary">{totalCabins}</p>
          <p className="text-xs text-muted-foreground">Total Cabins</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
          <p className="text-2xl font-extrabold text-primary">{totalCapacity}</p>
          <p className="text-xs text-muted-foreground">Max Persons</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
          <p className="text-2xl font-extrabold text-primary">{seatPlan.length}</p>
          <p className="text-xs text-muted-foreground">Decks</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
          <p className="text-2xl font-extrabold text-primary">AC</p>
          <p className="text-xs text-muted-foreground">All Cabins</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {Object.entries(cabinDots).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1.5">
            <span className={`inline-block h-3 w-3 rounded-full ${color}`} />
            {type}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-muted border border-border" />
          Booked
        </span>
      </div>

      {/* Deck Layouts */}
      {seatPlan.map((deck) => (
        <div key={deck.name} className="rounded-2xl border border-border overflow-hidden">
          <div className="bg-secondary px-5 py-3 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-secondary-foreground">{deck.name}</h4>
              <p className="text-xs text-secondary-foreground/70">{deck.capacity} persons capacity</p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Users className="h-3 w-3 mr-1" /> {deck.capacity}
            </Badge>
          </div>
          <div className="p-4 space-y-4">
            {deck.rows.map((row) => (
              <div key={row.label}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {row.label}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                  {row.cabins.map((cabin) => (
                    <div
                      key={cabin.id}
                      className={`relative rounded-xl border-2 p-3 transition-all hover:shadow-md ${
                        cabin.available
                          ? cabinColors[cabin.type]
                          : "bg-muted/50 border-muted text-muted-foreground opacity-60"
                      }`}
                      title={`Cabin ${cabin.id} – ${cabin.bedType} (${cabin.persons} person${cabin.persons > 1 ? "s" : ""})`}
                    >
                      {!cabin.available && (
                        <span className="absolute -top-1 -right-1 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                          Booked
                        </span>
                      )}
                      <div className="flex items-start justify-between">
                        <span className="text-lg font-extrabold">{cabin.id}</span>
                        {cabin.type.includes("Family") ? (
                          <BedDouble className="h-4 w-4 opacity-60" />
                        ) : cabin.type === "Single" ? (
                          <BedSingle className="h-4 w-4 opacity-60" />
                        ) : (
                          <BedDouble className="h-4 w-4 opacity-60" />
                        )}
                      </div>
                      <p className="text-[11px] font-medium mt-1 leading-tight">{cabin.bedType}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Users className="h-3 w-3 opacity-50" />
                        <span className="text-[11px] font-semibold">{cabin.persons} {cabin.persons > 1 ? "Persons" : "Person"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Cabin Summary Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="bg-secondary/5 px-5 py-3 border-b border-border">
          <h4 className="font-bold text-secondary text-sm">Cabin Summary</h4>
        </div>
        <div className="divide-y divide-border">
          {Object.entries(cabinSummary).map(([type, data]) => (
            <SummaryRow
              key={type}
              label={type}
              count={data.count}
              persons={data.persons}
              color={cabinDots[type] || "bg-muted"}
            />
          ))}
        </div>
        <div className="bg-primary/10 px-5 py-3 flex justify-between items-center">
          <span className="font-bold text-secondary text-sm">Total</span>
          <span className="font-extrabold text-primary text-lg">{totalCabins} Cabins = {totalCapacity} Persons</span>
        </div>
      </div>

      {/* Floor Plan Image Toggle */}
      {seatPlanImage && (
        <div>
          <button
            onClick={() => setShowImage(!showImage)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-3"
          >
            <Eye className="h-4 w-4" />
            {showImage ? "Hide Floor Plan" : "View Original Floor Plan"}
          </button>
          {showImage && (
            <div className="watermark-container rounded-2xl overflow-hidden border border-border shadow-lg">
              <img src={seatPlanImage} alt={`${shipName} Floor Plan`} className="w-full h-auto" draggable={false} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, count, persons, color }: { label: string; count: number; persons: number; color: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-2.5 text-sm">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-foreground">{label}</span>
      </div>
      <span className="text-muted-foreground font-medium">
        {String(count).padStart(2, "0")} = <span className="text-foreground font-bold">{persons} persons</span>
      </span>
    </div>
  );
}
