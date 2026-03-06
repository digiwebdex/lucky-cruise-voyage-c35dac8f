import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockUsers = [
  { id: 1, name: "Admin User", email: "luckytoursandtravels70@gmail.com", role: "Admin" },
  { id: 2, name: "Manager", email: "luckytoursandtravels70@gmail.com", role: "Editor" },
  { id: 3, name: "Staff User", email: "luckytoursandtravels70@gmail.com", role: "Viewer" },
];

export default function UsersPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Users</h1>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell><Badge>{u.role}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
