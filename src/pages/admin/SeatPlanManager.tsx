import { getCruises } from "@/services/cmsStore";
import { Card, CardContent } from "@/components/ui/card";
import SeatPlanViewer from "@/components/SeatPlanViewer";

export default function SeatPlanManager() {
  const cruises = getCruises();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Seat Plan Manager</h1>
      <div className="space-y-6">
        {cruises.filter(c => c.seatPlanImage).map(cruise => (
          <Card key={cruise.id} className="border-border">
            <CardContent className="p-5">
              <h2 className="mb-4 text-lg font-bold text-foreground">{cruise.name}</h2>
              <SeatPlanViewer seatPlanImage={cruise.seatPlanImage} shipName={cruise.name} />
            </CardContent>
          </Card>
        ))}
        {cruises.filter(c => !c.seatPlanImage).length > 0 && (
          <p className="text-sm text-muted-foreground">
            {cruises.filter(c => !c.seatPlanImage).length} cruise(s) have no seat plan image.
          </p>
        )}
      </div>
    </div>
  );
}
