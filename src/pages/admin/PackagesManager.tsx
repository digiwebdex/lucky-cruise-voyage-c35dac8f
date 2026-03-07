import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Save, Flame, Package, Percent } from "lucide-react";
import { useCmsData, getCruises, saveCruises } from "@/services/cmsStore";
import type { Cruise, Package as PackageType } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";

interface PackageRow extends PackageType {
  cruiseId: string;
  cruiseName: string;
  cruiseImage: string;
}

function calcDiscount(oldPrice?: number, price?: number): number {
  if (!oldPrice || !price || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default function PackagesManager() {
  const [cruises, setCruises] = useCmsData(getCruises, saveCruises);
  const [editOpen, setEditOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PackageRow | null>(null);
  const [form, setForm] = useState({
    name: "", duration: "", cruiseId: "", isOffer: false,
    adultPrice: "", adultOldPrice: "",
    childPrice: "", childOldPrice: "",
  });

  const allPackages: PackageRow[] = cruises.flatMap(c =>
    c.packages.map(p => ({
      ...p,
      cruiseId: c.id,
      cruiseName: c.name,
      cruiseImage: c.images[c.featuredImageIndex ?? 0] || "",
    }))
  );

  const openNew = () => {
    setEditingPkg(null);
    setForm({ name: "", duration: "", cruiseId: cruises[0]?.id || "", isOffer: false, adultPrice: "", adultOldPrice: "", childPrice: "", childOldPrice: "" });
    setEditOpen(true);
  };

  const openEdit = (pkg: PackageRow) => {
    setEditingPkg(pkg);
    setForm({
      name: pkg.name,
      duration: pkg.duration,
      cruiseId: pkg.cruiseId,
      isOffer: pkg.isOffer || false,
      adultPrice: String(pkg.adultPrice),
      adultOldPrice: pkg.adultOldPrice ? String(pkg.adultOldPrice) : "",
      childPrice: String(pkg.childPrice),
      childOldPrice: pkg.childOldPrice ? String(pkg.childOldPrice) : "",
    });
    setEditOpen(true);
  };

  const save = () => {
    if (!form.name.trim() || !form.adultPrice || !form.cruiseId) {
      toast({ title: "Name, cruise and adult price are required", variant: "destructive" });
      return;
    }

    const adultPrice = Number(form.adultPrice);
    const adultOldPrice = form.adultOldPrice ? Number(form.adultOldPrice) : undefined;
    const childPrice = Number(form.childPrice) || 0;
    const childOldPrice = form.childOldPrice ? Number(form.childOldPrice) : undefined;

    const newPkg: PackageType = {
      id: editingPkg?.id || `pkg-${Date.now()}`,
      name: form.name.trim(),
      price: adultPrice,
      oldPrice: adultOldPrice,
      adultPrice,
      adultOldPrice,
      childPrice,
      childOldPrice,
      duration: form.duration.trim(),
      isOffer: form.isOffer,
    };

    const updated = cruises.map(c => {
      if (editingPkg) {
        if (c.id === editingPkg.cruiseId && c.id !== form.cruiseId) {
          return { ...c, packages: c.packages.filter(p => p.id !== editingPkg.id) };
        }
        if (c.id === form.cruiseId) {
          const exists = c.packages.find(p => p.id === editingPkg.id);
          if (exists) {
            return { ...c, packages: c.packages.map(p => p.id === editingPkg.id ? newPkg : p) };
          }
          if (editingPkg.cruiseId !== form.cruiseId) {
            return { ...c, packages: [...c.packages, newPkg] };
          }
        }
        return c;
      } else {
        if (c.id === form.cruiseId) {
          return { ...c, packages: [...c.packages, newPkg] };
        }
        return c;
      }
    });

    setCruises(updated);
    setEditOpen(false);
    toast({ title: editingPkg ? "Package updated" : "Package added" });
  };

  const deletePkg = (pkg: PackageRow) => {
    const updated = cruises.map(c =>
      c.id === pkg.cruiseId
        ? { ...c, packages: c.packages.filter(p => p.id !== pkg.id) }
        : c
    );
    setCruises(updated);
    toast({ title: "Package deleted" });
  };

  const adultDiscount = calcDiscount(form.adultOldPrice ? Number(form.adultOldPrice) : undefined, form.adultPrice ? Number(form.adultPrice) : undefined);
  const childDiscount = calcDiscount(form.childOldPrice ? Number(form.childOldPrice) : undefined, form.childPrice ? Number(form.childPrice) : undefined);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" /> Packages Manager
          </h1>
          <p className="text-muted-foreground text-sm">Manage tour packages across all cruises</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Add Package</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package</TableHead>
                <TableHead>Cruise</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Adult Price</TableHead>
                <TableHead className="text-right">Child Price</TableHead>
                <TableHead className="text-right">Discount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPackages.map(pkg => {
                const discount = calcDiscount(pkg.adultOldPrice, pkg.adultPrice);
                return (
                  <TableRow key={`${pkg.cruiseId}-${pkg.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{pkg.name}</span>
                        {pkg.isOffer && <Badge variant="destructive" className="gap-1 text-xs"><Flame className="h-3 w-3" /> Offer</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {pkg.cruiseImage && (
                          <img src={pkg.cruiseImage} alt={pkg.cruiseName} className="h-10 w-14 rounded object-cover border border-border" />
                        )}
                        <span className="text-muted-foreground">{pkg.cruiseName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{pkg.duration}</TableCell>
                    <TableCell className="text-right">
                      {pkg.adultOldPrice && (
                        <span className="text-muted-foreground line-through text-xs mr-2">৳{pkg.adultOldPrice.toLocaleString()}</span>
                      )}
                      <span className="font-bold text-primary">৳{pkg.adultPrice.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      {pkg.childOldPrice && (
                        <span className="text-muted-foreground line-through text-xs mr-2">৳{pkg.childOldPrice.toLocaleString()}</span>
                      )}
                      <span className="font-bold text-primary">৳{pkg.childPrice.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      {discount > 0 && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1">
                          <Percent className="h-3 w-3" /> {discount}% Off
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(pkg)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => deletePkg(pkg)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {allPackages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No packages yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPkg ? "Edit Package" : "Add Package"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Package Name *</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Standard Package" />
            </div>
            <div className="space-y-2">
              <Label>Cruise *</Label>
              <Select value={form.cruiseId} onValueChange={v => setForm({ ...form, cruiseId: v })}>
                <SelectTrigger><SelectValue placeholder="Select cruise" /></SelectTrigger>
                <SelectContent>
                  {cruises.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3 Days / 2 Nights" />
            </div>

            {/* Adult Pricing */}
            <div className="rounded-xl border border-border p-4 space-y-3">
              <p className="font-display font-bold text-sm text-foreground">Adult Pricing</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Original Price (৳)</Label>
                  <Input type="number" value={form.adultOldPrice} onChange={e => setForm({ ...form, adultOldPrice: e.target.value })} placeholder="Old price" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Discounted Price (৳) *</Label>
                  <Input type="number" value={form.adultPrice} onChange={e => setForm({ ...form, adultPrice: e.target.value })} placeholder="Current price" />
                </div>
              </div>
              {adultDiscount > 0 && (
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1">
                  <Percent className="h-3 w-3" /> {adultDiscount}% Off (Adult)
                </Badge>
              )}
            </div>

            {/* Child Pricing */}
            <div className="rounded-xl border border-border p-4 space-y-3">
              <p className="font-display font-bold text-sm text-foreground">Child Pricing</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Original Price (৳)</Label>
                  <Input type="number" value={form.childOldPrice} onChange={e => setForm({ ...form, childOldPrice: e.target.value })} placeholder="Old price" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Discounted Price (৳)</Label>
                  <Input type="number" value={form.childPrice} onChange={e => setForm({ ...form, childPrice: e.target.value })} placeholder="Current price" />
                </div>
              </div>
              {childDiscount > 0 && (
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1">
                  <Percent className="h-3 w-3" /> {childDiscount}% Off (Child)
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={form.isOffer} onCheckedChange={v => setForm({ ...form, isOffer: v })} />
              <Label>Mark as Offer</Label>
              {form.isOffer && <Badge variant="destructive" className="gap-1 text-xs"><Flame className="h-3 w-3" /> Offer</Badge>}
            </div>
            <Button onClick={save} className="w-full gap-2"><Save className="h-4 w-4" /> {editingPkg ? "Update" : "Add"} Package</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
