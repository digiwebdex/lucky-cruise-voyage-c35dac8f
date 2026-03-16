import { useState, useRef } from "react";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Pencil, Trash2, Save, Flame, Package, Percent, Upload, X, CalendarDays } from "lucide-react";
import { useCmsData, getCruises, saveCruises } from "@/services/cmsStore";
import type { Cruise, Package as PackageType } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
    thumbnail: "",
    tripDates: [] as Date[],
    offerDayLabel: "",
    offerDateLabel: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setForm({ name: "", duration: "", cruiseId: cruises[0]?.id || "", isOffer: false, adultPrice: "", adultOldPrice: "", childPrice: "", childOldPrice: "", thumbnail: "", tripDates: [], offerDayLabel: "", offerDateLabel: "" });
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
      thumbnail: pkg.thumbnail || "",
      tripDates: (pkg.tripDates || []).map((d: string) => new Date(d)),
      offerDayLabel: pkg.offerDayLabel || "",
      offerDateLabel: pkg.offerDateLabel || "",
    });
    setEditOpen(true);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({ ...f, thumbnail: reader.result as string }));
    };
    reader.readAsDataURL(file);
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
      thumbnail: form.thumbnail || undefined,
      tripDates: form.tripDates.length > 0 ? form.tripDates.map(d => d.toISOString().split("T")[0]) : undefined,
      offerDayLabel: form.offerDayLabel.trim() || undefined,
      offerDateLabel: form.offerDateLabel.trim() || undefined,
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
                <TableHead>Thumbnail</TableHead>
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
                const thumbSrc = pkg.thumbnail || pkg.cruiseImage;
                return (
                  <TableRow key={`${pkg.cruiseId}-${pkg.id}`}>
                    <TableCell>
                      {thumbSrc ? (
                        <img src={thumbSrc} alt={pkg.name} className="h-12 w-16 rounded object-cover border border-border" />
                      ) : (
                        <div className="h-12 w-16 rounded bg-muted flex items-center justify-center text-muted-foreground">
                          <Upload className="h-4 w-4" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{pkg.name}</span>
                        {pkg.isOffer && <Badge variant="destructive" className="gap-1 text-xs"><Flame className="h-3 w-3" /> Offer</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">{pkg.cruiseName}</span>
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
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No packages yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPkg ? "Edit Package" : "Add Package"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Thumbnail Image</Label>
              {form.thumbnail ? (
                <div className="relative inline-block">
                  <img src={form.thumbnail} alt="Thumbnail" className="h-32 w-full rounded-lg object-cover border border-border" />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => setForm(f => ({ ...f, thumbnail: "" }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div
                  className="h-32 w-full rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload thumbnail</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailUpload}
              />
            </div>

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

            {/* Trip Dates */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" /> Trip Dates (তারিখ নির্বাচন)
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", form.tripDates.length === 0 && "text-muted-foreground")}>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {form.tripDates.length > 0
                      ? form.tripDates.sort((a, b) => a.getTime() - b.getTime()).map(d => format(d, "d MMM", { locale: bn })).join(", ")
                      : "তারিখ নির্বাচন করুন"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="multiple"
                    selected={form.tripDates}
                    onSelect={(dates) => setForm(f => ({ ...f, tripDates: dates || [] }))}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {form.tripDates.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {form.tripDates.sort((a, b) => a.getTime() - b.getTime()).map((d, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {format(d, "EEEE d MMM yyyy", { locale: bn })}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setForm(f => ({ ...f, tripDates: f.tripDates.filter((_, idx) => idx !== i) }))} />
                    </Badge>
                  ))}
                </div>
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
