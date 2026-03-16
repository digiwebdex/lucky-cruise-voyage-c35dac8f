import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, Save, X, Upload, Flame } from "lucide-react";
import { useCmsData, getOffers, saveOffers, getCruises, type Offer } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";
import { uploadImage } from "@/services/uploadHelper";

export default function OffersManager() {
  const [offers, setOffers] = useCmsData(getOffers, saveOffers);
  const cruises = getCruises();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Offer>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const startNew = () => {
    setEditingId("__new__");
    setForm({ title: "", posterImage: "", linkedCruiseId: "", description: "", isActive: true });
  };

  const startEdit = (offer: Offer) => {
    setEditingId(offer.id);
    setForm({ ...offer });
  };

  const cancel = () => {
    setEditingId(null);
    setForm({});
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setForm(f => ({ ...f, posterImage: url }));
    } catch (err) {
      toast({ title: "Image upload failed", variant: "destructive" });
    }
  };

  const save = () => {
    if (!form.title?.trim() || !form.linkedCruiseId) {
      toast({ title: "Title and linked cruise are required", variant: "destructive" });
      return;
    }
    if (editingId === "__new__") {
      const newOffer: Offer = {
        id: `offer-${Date.now()}`,
        title: form.title!,
        posterImage: form.posterImage || "",
        linkedCruiseId: form.linkedCruiseId!,
        description: form.description || "",
        isActive: form.isActive ?? true,
        expiryDate: form.expiryDate || undefined,
      };
      setOffers([...offers, newOffer]);
    } else {
      setOffers(offers.map(o => o.id === editingId ? { ...o, ...form } as Offer : o));
    }
    cancel();
    toast({ title: "Offer saved" });
  };

  const remove = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
    toast({ title: "Offer deleted" });
  };

  const toggleActive = (id: string) => {
    setOffers(offers.map(o => o.id === id ? { ...o, isActive: !o.isActive } : o));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" /> Offers Manager
          </h1>
          <p className="text-muted-foreground text-sm">Manage promotional offers displayed on the homepage</p>
        </div>
        <Button onClick={startNew} className="gap-2"><Plus className="h-4 w-4" /> Add Offer</Button>
      </div>

      {editingId && (
        <Card className="border-primary/30">
          <CardHeader><CardTitle className="text-lg">{editingId === "__new__" ? "New Offer" : "Edit Offer"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title || ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. M.V. Jol Safari Special" />
              </div>
              <div className="space-y-2">
                <Label>Link to Cruise *</Label>
                <Select value={form.linkedCruiseId || ""} onValueChange={v => setForm(f => ({ ...f, linkedCruiseId: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select a cruise" /></SelectTrigger>
                  <SelectContent>
                    {cruises.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short promo text" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Poster Image</Label>
              <div className="flex gap-2">
                <Input value={form.posterImage?.startsWith("data:") ? "(uploaded file)" : form.posterImage || ""} onChange={e => setForm(f => ({ ...f, posterImage: e.target.value }))} placeholder="Paste image URL" className="flex-1" />
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                <Button variant="outline" size="icon" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" /></Button>
              </div>
              {form.posterImage && (
                <img src={form.posterImage} alt="" className="mt-2 h-40 w-auto rounded-lg border object-cover" />
              )}
            </div>
            <div className="space-y-2">
              <Label>Expiry Date (optional)</Label>
              <Input type="date" value={form.expiryDate ? form.expiryDate.split("T")[0] : ""} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value ? new Date(e.target.value + "T23:59:59").toISOString() : undefined }))} />
              <p className="text-xs text-muted-foreground">Offer will auto-hide after this date</p>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isActive ?? true} onCheckedChange={v => setForm(f => ({ ...f, isActive: v }))} />
              <Label>Active</Label>
            </div>
            <div className="flex gap-2">
              <Button onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save</Button>
              <Button variant="outline" onClick={cancel} className="gap-2"><X className="h-4 w-4" /> Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map(offer => {
          const linked = cruises.find(c => c.id === offer.linkedCruiseId);
          return (
            <Card key={offer.id} className={`overflow-hidden ${!offer.isActive || (offer.expiryDate && offer.expiryDate < new Date().toISOString()) ? "opacity-50" : ""}`}>
              {offer.posterImage && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={offer.posterImage} alt={offer.title} className="h-full w-full object-cover" />
                </div>
              )}
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{offer.title}</h3>
                    {linked && <p className="text-sm text-muted-foreground">→ {linked.name}</p>}
                    {offer.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{offer.description}</p>}
                    {offer.expiryDate && (
                      <p className={`text-xs mt-1 font-medium ${offer.expiryDate < new Date().toISOString() ? "text-destructive" : "text-muted-foreground"}`}>
                        {offer.expiryDate < new Date().toISOString() ? "Expired" : `Expires: ${new Date(offer.expiryDate).toLocaleDateString()}`}
                      </p>
                    )}
                  </div>
                  <Switch checked={offer.isActive} onCheckedChange={() => toggleActive(offer.id)} />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(offer)} className="gap-1"><Edit2 className="h-3 w-3" /> Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => remove(offer.id)} className="gap-1 text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /> Delete</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {offers.length === 0 && !editingId && (
        <div className="text-center py-12 text-muted-foreground">
          <Flame className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No offers yet. Click "Add Offer" to create one.</p>
        </div>
      )}
    </div>
  );
}
