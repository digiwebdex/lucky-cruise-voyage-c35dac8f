import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useCmsData, getCruises, saveCruises } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type DestFilter = "all" | "sundarban" | "tanguar-haor";

export default function CruiseManager() {
  const [items, setItems] = useCmsData(getCruises, saveCruises);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<DestFilter>("all");

  const filtered = filter === "all" ? items : items.filter(c => c.destination === filter);

  const remove = (id: string) => {
    setItems(items.filter(x => x.id !== id));
    toast({ title: "Cruise deleted" });
  };

  const tabs: { key: DestFilter; label: string }[] = [
    { key: "all", label: "সব ক্রুজ" },
    { key: "sundarban", label: "সুন্দরবন ভ্রমণ" },
    { key: "tanguar-haor", label: "টাঙ্গুয়ার হাওর ভ্রমণ" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Cruise Manager</h1>
        <Button onClick={() => navigate("/admin/cruises/new")} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Cruise</Button>
      </div>

      {/* Destination filter tabs */}
      <div className="mb-4 flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
              filter === tab.key
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      c.destination === "tanguar-haor"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {c.destination === "tanguar-haor" ? "টাঙ্গুয়ার হাওর" : "সুন্দরবন"}
                    </span>
                  </TableCell>
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
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No cruises found in this category
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
