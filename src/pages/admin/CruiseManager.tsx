import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useCmsData, getCruises, saveCruises } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function CruiseManager() {
  const [items, setItems] = useCmsData(getCruises, saveCruises);
  const navigate = useNavigate();

  const remove = (id: string) => {
    setItems(items.filter(x => x.id !== id));
    toast({ title: "Cruise deleted" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Cruise Manager</h1>
        <Button onClick={() => navigate("/admin/cruises/new")} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Cruise</Button>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Route</TableHead><TableHead>Price</TableHead><TableHead>Duration</TableHead><TableHead>Featured</TableHead><TableHead className="w-32">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.route}</TableCell>
                  <TableCell>৳{c.price.toLocaleString()}</TableCell>
                  <TableCell>{c.duration}</TableCell>
                  <TableCell>{c.featured ? "⭐" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => navigate(`/admin/cruises/${c.id}`)} title="Edit"><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => window.open(`/cruises/${c.id}`, "_blank")} title="Preview"><Eye className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}