import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useCmsData, getTeamMembers, saveTeamMembers, type TeamMember } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";

export default function TeamManager() {
  const [items, setItems] = useCmsData(getTeamMembers, saveTeamMembers);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<TeamMember>({ id: "", name: "", role: "" });

  const openNew = () => { setEditId(null); setForm({ id: `team-${Date.now()}`, name: "", role: "" }); setEditOpen(true); };
  const openEdit = (id: string) => {
    const m = items.find(x => x.id === id);
    if (m) { setEditId(id); setForm({ ...m }); setEditOpen(true); }
  };

  const save = () => {
    if (editId) {
      setItems(items.map(x => x.id === editId ? form : x));
    } else {
      setItems([...items, form]);
    }
    setEditOpen(false);
    toast({ title: editId ? "Member updated" : "Member added" });
  };

  const remove = (id: string) => {
    setItems(items.filter(x => x.id !== id));
    toast({ title: "Member deleted" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Team Members</h1>
        <Button onClick={openNew} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Member</Button>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map(m => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(m.id)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Team Member</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Role</Label><Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div>
            <Button onClick={save} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
