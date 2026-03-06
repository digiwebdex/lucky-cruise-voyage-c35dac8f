import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { useCmsData, getTestimonials, saveTestimonials, type Testimonial } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";

export default function TestimonialsManager() {
  const [items, setItems] = useCmsData(getTestimonials, saveTestimonials);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Testimonial>({ id: "", name: "", text: "", rating: 5 });

  const openNew = () => { setEditId(null); setForm({ id: `testimonial-${Date.now()}`, name: "", text: "", rating: 5 }); setEditOpen(true); };
  const openEdit = (id: string) => {
    const t = items.find(x => x.id === id);
    if (t) { setEditId(id); setForm({ ...t }); setEditOpen(true); }
  };

  const save = () => {
    if (editId) {
      setItems(items.map(x => x.id === editId ? form : x));
    } else {
      setItems([...items, form]);
    }
    setEditOpen(false);
    toast({ title: editId ? "Testimonial updated" : "Testimonial added" });
  };

  const remove = (id: string) => {
    setItems(items.filter(x => x.id !== id));
    toast({ title: "Testimonial deleted" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Testimonials</h1>
        <Button onClick={openNew} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Testimonial</Button>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Text</TableHead><TableHead>Rating</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{t.text}</TableCell>
                  <TableCell><div className="flex">{Array.from({ length: t.rating }, (_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(t.id)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Testimonial</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Text</Label><Textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} /></div>
            <div><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} /></div>
            <Button onClick={save} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
