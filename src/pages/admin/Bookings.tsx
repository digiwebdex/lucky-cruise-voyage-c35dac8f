import { Card, CardContent } from "@/components/ui/card";

export default function Bookings() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Bookings</h1>
      <Card className="border-border">
        <CardContent className="p-8 text-center text-muted-foreground">
          <p>No bookings yet. Bookings will appear here once customers start booking through the website.</p>
        </CardContent>
      </Card>
    </div>
  );
}
