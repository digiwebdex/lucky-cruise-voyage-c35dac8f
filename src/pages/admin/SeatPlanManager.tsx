import { cruises } from "@/services/mockData";
import { Card, CardContent } from "@/components/ui/card";
import SeatPlanViewer from "@/components/SeatPlanViewer";

export default function SeatPlanManager() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Seat Plan Manager</h1>
      <div className="space-y-6">
        {cruises.slice(0, 4).map(cruise => (
          <Card key={cruise.id} className="border-border">
            <CardContent className="p-5">
              <h2 className="mb-4 text-lg font-bold text-secondary">{cruise.name}</h2>
              <SeatPlanViewer seatPlan={cruise.seatPlan} seatPlanImage={cruise.seatPlanImage} shipName={cruise.name} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
