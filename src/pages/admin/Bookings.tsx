import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBookings } from "@/services/mockData";

export default function Bookings() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Bookings</h1>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Cruise</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Persons</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Seat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBookings.map(b => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.id}</TableCell>
                  <TableCell>{b.name}</TableCell>
                  <TableCell>{b.phone}</TableCell>
                  <TableCell>{b.cruiseName}</TableCell>
                  <TableCell>{b.travelDate}</TableCell>
                  <TableCell>{b.persons}</TableCell>
                  <TableCell>{b.packageName}</TableCell>
                  <TableCell><Badge variant={b.seatType === "AC" ? "default" : "secondary"}>{b.seatType}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
