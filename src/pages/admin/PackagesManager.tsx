import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { cruises } from "@/services/mockData";

export default function PackagesManager() {
  const allPkgs = cruises.flatMap(c => c.packages.map(p => ({ ...p, cruiseName: c.name })));
  const [packages, setPackages] = useState(allPkgs);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", duration: "", cruiseName: "" });

  const openNew = () => { setForm({ name: "", price: "", duration: "", cruiseName: "" }); setEditOpen(true); };
  const save = () => {
    setPackages([...packages, { id: `pkg-${Date.now()}`, name: form.name, price: Number(form.price), duration: form.duration, cruiseName: form.cruiseName }]);
    setEditOpen(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Packages Manager</h1>
        <Button onClick={openNew} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Package</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-5">
              <span className="text-xs text-primary font-medium">{p.cruiseName}</span>
              <h3 className="font-bold text-secondary">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.duration}</p>
              <p className="mt-2 text-lg font-bold text-primary">৳{p.price.toLocaleString()}</p>
              <div className="mt-3 flex gap-1">
                <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setPackages(packages.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Package</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Cruise</Label><Input value={form.cruiseName} onChange={e => setForm({ ...form, cruiseName: e.target.value })} /></div>
            <div><Label>Duration</Label><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} /></div>
            <div><Label>Price (৳)</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
            <Button onClick={save} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
