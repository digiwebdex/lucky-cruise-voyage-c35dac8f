import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { cruises as initialCruises } from "@/services/mockData";

export default function CruiseManager() {
  const [items, setItems] = useState(initialCruises);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", route: "", price: "", duration: "", description: "" });

  const openNew = () => { setEditId(null); setForm({ name: "", route: "", price: "", duration: "", description: "" }); setEditOpen(true); };
  const openEdit = (id: string) => {
    const c = items.find(x => x.id === id);
    if (c) { setEditId(id); setForm({ name: c.name, route: c.route, price: String(c.price), duration: c.duration, description: c.description }); setEditOpen(true); }
  };
  const save = () => {
    if (editId) {
      setItems(items.map(x => x.id === editId ? { ...x, ...form, price: Number(form.price) } : x));
    } else {
      setItems([...items, { ...items[0], id: `new-${Date.now()}`, ...form, price: Number(form.price), images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800"], featured: false }]);
    }
    setEditOpen(false);
  };
  const remove = (id: string) => setItems(items.filter(x => x.id !== id));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Cruise Manager</h1>
        <Button onClick={openNew} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Cruise</Button>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Route</TableHead><TableHead>Price</TableHead><TableHead>Duration</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.route}</TableCell>
                  <TableCell>৳{c.price.toLocaleString()}</TableCell>
                  <TableCell>{c.duration}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(c.id)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Cruise</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Route</Label><Input value={form.route} onChange={e => setForm({ ...form, route: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Price (৳)</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
              <div><Label>Duration</Label><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} /></div>
            </div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            <Button onClick={save} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
