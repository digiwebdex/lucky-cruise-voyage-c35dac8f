import { useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon, Link2, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useCmsData, getPromoAds, savePromoAds, getCruises, saveCruises, type PromoAd } from "@/services/cmsStore";
import { toast } from "sonner";

export default function PromoAdsManager() {
  const [ads, saveAll] = useCmsData(getPromoAds, savePromoAds);
  const [cruises] = useCmsData(getCruises, saveCruises);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<PromoAd | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", image: "", linkedCruiseId: "", isActive: true });

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", subtitle: "", image: "", linkedCruiseId: cruises[0]?.id || "", isActive: true });
    setEditOpen(true);
  };

  const openEdit = (ad: PromoAd) => {
    setEditing(ad);
    setForm({ title: ad.title, subtitle: ad.subtitle || "", image: ad.image, linkedCruiseId: ad.linkedCruiseId, isActive: ad.isActive });
    setEditOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.image) {
      toast.error("Title and image are required");
      return;
    }
    if (editing) {
      saveAll(ads.map(a => a.id === editing.id ? { ...editing, ...form } : a));
      toast.success("Promo ad updated!");
    } else {
      const newAd: PromoAd = { id: `promo-${Date.now()}`, ...form };
      saveAll([...ads, newAd]);
      toast.success("Promo ad created!");
    }
    setEditOpen(false);
  };

  const handleDelete = (id: string) => {
    saveAll(ads.filter(a => a.id !== id));
    toast.success("Promo ad deleted!");
  };

  const toggleActive = (id: string) => {
    saveAll(ads.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-primary" /> অফার এডভারটাইজ
          </h1>
          <p className="text-sm text-muted-foreground">হোমপেজে সর্বোচ্চ ১৫টি প্রমো ব্যানার ইমেজ ম্যানেজ করুন (1080×1080)</p>
        </div>
        <Button onClick={openNew} className="gap-2 bg-primary text-primary-foreground">
          <Plus className="h-4 w-4" /> নতুন অফার যোগ করুন
        </Button>
      </div>

      {/* Preview of how it looks */}
      <Card className="border-border">
        <CardContent className="p-5">
          <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">Homepage Preview</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {ads.filter(a => a.isActive).slice(0, 15).map(ad => {
              const cruise = cruises.find(c => c.id === ad.linkedCruiseId);
              return (
                <div key={ad.id} className="aspect-square rounded-xl overflow-hidden border border-border relative group">
                  <img src={ad.image} alt={ad.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div>
                      <p className="text-xs font-bold text-secondary-foreground">{ad.title}</p>
                      {cruise && <p className="text-[10px] text-secondary-foreground/70">→ {cruise.name}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
            {ads.filter(a => a.isActive).length === 0 && (
              <div className="col-span-3 text-center py-8 text-muted-foreground">No active promo ads</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Ads List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ads.map(ad => {
          const cruise = cruises.find(c => c.id === ad.linkedCruiseId);
          return (
            <Card key={ad.id} className={`border-border overflow-hidden ${!ad.isActive ? "opacity-60" : ""}`}>
              <div className="aspect-square overflow-hidden relative">
                <img src={ad.image} alt={ad.title} className="h-full w-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button onClick={() => toggleActive(ad.id)}>
                    <Badge variant="outline" className={`cursor-pointer gap-1 ${ad.isActive ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" : "bg-muted text-muted-foreground"}`}>
                      {ad.isActive ? <><Eye className="h-3 w-3" /> Active</> : <><EyeOff className="h-3 w-3" /> Hidden</>}
                    </Badge>
                  </button>
                </div>
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-foreground">{ad.title}</h3>
                {cruise && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Link2 className="h-3 w-3" /> {cruise.name}
                  </p>
                )}
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => openEdit(ad)} className="gap-1 flex-1">
                    <Pencil className="h-3 w-3" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(ad.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "অফার এডিট করুন" : "নতুন অফার যোগ করুন"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>অফার টাইটেল *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="যেমন: স্পেশাল অফার" />
            </div>
            <div className="space-y-1.5">
              <Label>সাবটাইটেল</Label>
              <Input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="যেমন: সুন্দরবন ক্রুজ ট্যুর" />
            <div className="space-y-1.5">
              <Label>অফার ইমেজ (1080×1080) *</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {form.image && (
                <div className="aspect-square w-48 rounded-xl overflow-hidden border border-border mt-2">
                  <img src={form.image} alt="" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>লিংক করা ক্রুজ *</Label>
              <Select value={form.linkedCruiseId} onValueChange={v => setForm(f => ({ ...f, linkedCruiseId: v }))}>
                <SelectTrigger><SelectValue placeholder="ক্রুজ সিলেক্ট করুন" /></SelectTrigger>
                <SelectContent>
                  {cruises.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isActive} onCheckedChange={v => setForm(f => ({ ...f, isActive: v }))} />
              <Label>{form.isActive ? "Active" : "Hidden"}</Label>
            </div>
            <Button onClick={handleSave} className="w-full gap-2 bg-primary text-primary-foreground">
              <Save className="h-4 w-4" /> {editing ? "আপডেট করুন" : "যোগ করুন"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
