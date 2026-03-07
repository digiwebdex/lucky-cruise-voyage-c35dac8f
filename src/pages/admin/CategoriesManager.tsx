import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Save, Tag } from "lucide-react";
import { useBookingStore, getCategories, saveCategories, type PackageCategory } from "@/services/bookingStore";
import { toast } from "@/hooks/use-toast";

export default function CategoriesManager() {
  const [categories, setCategories] = useBookingStore(getCategories, saveCategories);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<PackageCategory | null>(null);
  const [form, setForm] = useState({ name: "", nameBn: "", description: "" });

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", nameBn: "", description: "" });
    setEditOpen(true);
  };

  const openEdit = (cat: PackageCategory) => {
    setEditing(cat);
    setForm({ name: cat.name, nameBn: cat.nameBn || "", description: cat.description || "" });
    setEditOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (editing) {
      setCategories(categories.map(c =>
        c.id === editing.id
          ? { ...c, name: form.name.trim(), nameBn: form.nameBn.trim() || undefined, description: form.description.trim() || undefined }
          : c
      ));
      toast({ title: "Category updated" });
    } else {
      const newCat: PackageCategory = {
        id: `cat-${Date.now()}`,
        name: form.name.trim(),
        nameBn: form.nameBn.trim() || undefined,
        description: form.description.trim() || undefined,
      };
      setCategories([...categories, newCat]);
      toast({ title: "Category created" });
    }
    setEditOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    toast({ title: "Category deleted" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Package Categories</h1>
        <Button onClick={openNew} className="gap-2 gradient-primary text-primary-foreground rounded-xl">
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Name (Bangla)</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      {cat.name}
                    </div>
                  </TableCell>
                  <TableCell>{cat.nameBn || "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{cat.description || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(cat)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(cat.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No categories yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name (English) *</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sundarban Tour" />
            </div>
            <div>
              <Label>Name (Bangla)</Label>
              <Input value={form.nameBn} onChange={e => setForm({ ...form, nameBn: e.target.value })} placeholder="e.g. সুন্দরবন ট্যুর" />
            </div>
            <div>
              <Label>Description</Label>
              <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
            </div>
            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="h-4 w-4" /> {editing ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
