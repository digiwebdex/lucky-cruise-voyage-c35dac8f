import type { Deck } from "@/services/mockData";

interface SeatPlanViewerProps {
  seatPlan: Deck[];
}

export default function SeatPlanViewer({ seatPlan }: SeatPlanViewerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5"><span className="inline-block h-4 w-4 rounded bg-blue-500" /> AC</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-4 w-4 rounded bg-green-500" /> Non-AC</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-4 w-4 rounded bg-muted" /> Booked</span>
      </div>
      {seatPlan.map(deck => (
        <div key={deck.name} className="rounded-lg border border-border p-4">
          <h4 className="mb-3 font-semibold text-secondary">{deck.name}</h4>
          <div className="space-y-2">
            {deck.rows.map(row => (
              <div key={row.label} className="flex items-center gap-2">
                <span className="w-6 text-center text-xs font-bold text-muted-foreground">{row.label}</span>
                <div className="flex gap-1.5">
                  {row.seats.map(seat => (
                    <div
                      key={seat.id}
                      className={`flex h-10 w-10 items-center justify-center rounded text-xs font-medium ${
                        !seat.available
                          ? "bg-muted text-muted-foreground"
                          : seat.type === "AC"
                          ? "bg-blue-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                      title={`${seat.id} - ${seat.type}${seat.available ? "" : " (Booked)"}`}
                    >
                      {seat.id}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
