import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useCmsData, getCruises, saveCruises } from "@/services/cmsStore";
import type { Cruise, ItineraryDay, MenuDay, Package as CruisePackage } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";

const emptyCruise: Cruise = {
  id: "", name: "", subtitle: "", description: "", route: "", duration: "", capacity: "", cabins: "",
  price: 0, priceLabel: "per person (Bangladeshi)", featured: false, images: [], facilities: [],
  touristSpots: [], itinerary: [], menu: [], safetyInfo: [], travelTips: [], thingsToCarry: [],
  additionalCosts: [], packageIncludes: [], packages: [], seatPlan: [],
};

export default function CruiseManager() {
  const [items, setItems] = useCmsData(getCruises, saveCruises);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Cruise>({ ...emptyCruise });

  const openNew = () => { setEditId(null); setForm({ ...emptyCruise, id: `cruise-${Date.now()}` }); setEditOpen(true); };
  const openEdit = (id: string) => {
    const c = items.find(x => x.id === id);
    if (c) { setEditId(id); setForm({ ...c }); setEditOpen(true); }
  };

  const save = () => {
    if (editId) {
      setItems(items.map(x => x.id === editId ? { ...form } : x));
    } else {
      setItems([...items, form]);
    }
    setEditOpen(false);
    toast({ title: editId ? "Cruise updated" : "Cruise added" });
  };

  const remove = (id: string) => {
    setItems(items.filter(x => x.id !== id));
    toast({ title: "Cruise deleted" });
  };

  const updateField = (field: keyof Cruise, value: any) => setForm({ ...form, [field]: value });

  // List helpers
  const addListItem = (field: keyof Cruise) => updateField(field, [...(form[field] as string[] || []), ""]);
  const updateListItem = (field: keyof Cruise, idx: number, val: string) => {
    const arr = [...(form[field] as string[])]; arr[idx] = val; updateField(field, arr);
  };
  const removeListItem = (field: keyof Cruise, idx: number) => {
    updateField(field, (form[field] as string[]).filter((_, i) => i !== idx));
  };

  // Itinerary helpers
  const addItineraryDay = () => updateField("itinerary", [...(form.itinerary || []), { day: `Day ${(form.itinerary?.length || 0) + 1}`, title: "", activities: [] }]);
  const updateItinerary = (idx: number, field: keyof ItineraryDay, val: any) => {
    const arr = [...(form.itinerary || [])]; arr[idx] = { ...arr[idx], [field]: val }; updateField("itinerary", arr);
  };
  const removeItineraryDay = (idx: number) => updateField("itinerary", (form.itinerary || []).filter((_, i) => i !== idx));

  // Menu helpers
  const addMenuDay = () => updateField("menu", [...(form.menu || []), { day: `Day ${(form.menu?.length || 0) + 1}`, meals: [] }]);
  const removeMenuDay = (idx: number) => updateField("menu", (form.menu || []).filter((_, i) => i !== idx));

  // Package helpers
  const addPackage = () => updateField("packages", [...form.packages, { id: `pkg-${Date.now()}`, name: "", price: 0, duration: "" }]);
  const updatePackage = (idx: number, field: keyof CruisePackage, val: any) => {
    const arr = [...form.packages]; arr[idx] = { ...arr[idx], [field]: val }; updateField("packages", arr);
  };
  const removePackage = (idx: number) => updateField("packages", form.packages.filter((_, i) => i !== idx));

  // Additional costs helpers
  const addCost = () => updateField("additionalCosts", [...(form.additionalCosts || []), { label: "", amount: "" }]);
  const updateCost = (idx: number, field: string, val: string) => {
    const arr = [...(form.additionalCosts || [])]; arr[idx] = { ...arr[idx], [field]: val }; updateField("additionalCosts", arr);
  };
  const removeCost = (idx: number) => updateField("additionalCosts", (form.additionalCosts || []).filter((_, i) => i !== idx));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Cruise Manager</h1>
        <Button onClick={openNew} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Cruise</Button>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Route</TableHead><TableHead>Price</TableHead><TableHead>Duration</TableHead><TableHead>Featured</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.route}</TableCell>
                  <TableCell>৳{c.price.toLocaleString()}</TableCell>
                  <TableCell>{c.duration}</TableCell>
                  <TableCell>{c.featured ? "⭐" : "—"}</TableCell>
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
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Cruise</DialogTitle></DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto">
              <TabsTrigger value="basic" className="text-xs">Basic</TabsTrigger>
              <TabsTrigger value="images" className="text-xs">Images</TabsTrigger>
              <TabsTrigger value="facilities" className="text-xs">Facilities</TabsTrigger>
              <TabsTrigger value="itinerary" className="text-xs">Itinerary</TabsTrigger>
              <TabsTrigger value="menu" className="text-xs">Menu</TabsTrigger>
              <TabsTrigger value="packages" className="text-xs">Packages</TabsTrigger>
              <TabsTrigger value="safety" className="text-xs">Safety/Tips</TabsTrigger>
              <TabsTrigger value="spots" className="text-xs">Spots</TabsTrigger>
            </TabsList>

            {/* Basic Info */}
            <TabsContent value="basic" className="space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Name</Label><Input value={form.name} onChange={e => updateField("name", e.target.value)} /></div>
                <div><Label>Subtitle</Label><Input value={form.subtitle} onChange={e => updateField("subtitle", e.target.value)} /></div>
              </div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => updateField("description", e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Route</Label><Input value={form.route} onChange={e => updateField("route", e.target.value)} /></div>
                <div><Label>Duration</Label><Input value={form.duration} onChange={e => updateField("duration", e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label>Capacity</Label><Input value={form.capacity} onChange={e => updateField("capacity", e.target.value)} /></div>
                <div><Label>Cabins</Label><Input value={form.cabins} onChange={e => updateField("cabins", e.target.value)} /></div>
                <div><Label>Price (৳)</Label><Input type="number" value={form.price} onChange={e => updateField("price", Number(e.target.value))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Price Label</Label><Input value={form.priceLabel} onChange={e => updateField("priceLabel", e.target.value)} /></div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch checked={form.featured} onCheckedChange={v => updateField("featured", v)} />
                  <Label>Featured Cruise</Label>
                </div>
              </div>
            </TabsContent>

            {/* Images */}
            <TabsContent value="images" className="space-y-3 mt-4">
              <p className="text-sm text-muted-foreground">Add image URLs. On VPS migration, file upload will replace this.</p>
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <img src={img} alt="" className="h-10 w-14 rounded object-cover flex-shrink-0" />
                  <Input value={img} onChange={e => { const arr = [...form.images]; arr[i] = e.target.value; updateField("images", arr); }} className="flex-1" />
                  <Button size="icon" variant="ghost" onClick={() => updateField("images", form.images.filter((_, j) => j !== i))}><X className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateField("images", [...form.images, ""])}><Plus className="h-4 w-4 mr-1" /> Add Image URL</Button>
            </TabsContent>

            {/* Facilities */}
            <TabsContent value="facilities" className="space-y-3 mt-4">
              {(form.facilities || []).map((f, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={f} onChange={e => updateListItem("facilities", i, e.target.value)} />
                  <Button size="icon" variant="ghost" onClick={() => removeListItem("facilities", i)}><X className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addListItem("facilities")}><Plus className="h-4 w-4 mr-1" /> Add Facility</Button>
            </TabsContent>

            {/* Itinerary */}
            <TabsContent value="itinerary" className="space-y-4 mt-4">
              {(form.itinerary || []).map((day, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="grid grid-cols-2 gap-2 flex-1 mr-2">
                        <Input value={day.day} onChange={e => updateItinerary(i, "day", e.target.value)} placeholder="Day 1" />
                        <Input value={day.title} onChange={e => updateItinerary(i, "title", e.target.value)} placeholder="Title" />
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => removeItineraryDay(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                    {day.activities.map((act, j) => (
                      <div key={j} className="flex gap-2 ml-4">
                        <Input value={act} onChange={e => { const acts = [...day.activities]; acts[j] = e.target.value; updateItinerary(i, "activities", acts); }} />
                        <Button size="icon" variant="ghost" onClick={() => updateItinerary(i, "activities", day.activities.filter((_, k) => k !== j))}><X className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="ml-4" onClick={() => updateItinerary(i, "activities", [...day.activities, ""])}><Plus className="h-4 w-4 mr-1" /> Add Activity</Button>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" size="sm" onClick={addItineraryDay}><Plus className="h-4 w-4 mr-1" /> Add Day</Button>
            </TabsContent>

            {/* Menu */}
            <TabsContent value="menu" className="space-y-4 mt-4">
              {(form.menu || []).map((day, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <Input value={day.day} onChange={e => { const arr = [...(form.menu || [])]; arr[i] = { ...arr[i], day: e.target.value }; updateField("menu", arr); }} className="w-40" />
                      <Button size="icon" variant="ghost" onClick={() => removeMenuDay(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                    {day.meals.map((meal, j) => (
                      <div key={j} className="flex gap-2 ml-4">
                        <Input value={meal.name} className="w-32" onChange={e => { const m = [...day.meals]; m[j] = { ...m[j], name: e.target.value }; const arr = [...(form.menu || [])]; arr[i] = { ...arr[i], meals: m }; updateField("menu", arr); }} placeholder="Meal name" />
                        <Input value={meal.items} className="flex-1" onChange={e => { const m = [...day.meals]; m[j] = { ...m[j], items: e.target.value }; const arr = [...(form.menu || [])]; arr[i] = { ...arr[i], meals: m }; updateField("menu", arr); }} placeholder="Items" />
                        <Button size="icon" variant="ghost" onClick={() => { const m = day.meals.filter((_, k) => k !== j); const arr = [...(form.menu || [])]; arr[i] = { ...arr[i], meals: m }; updateField("menu", arr); }}><X className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="ml-4" onClick={() => { const arr = [...(form.menu || [])]; arr[i] = { ...arr[i], meals: [...arr[i].meals, { name: "", items: "" }] }; updateField("menu", arr); }}><Plus className="h-4 w-4 mr-1" /> Add Meal</Button>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" size="sm" onClick={addMenuDay}><Plus className="h-4 w-4 mr-1" /> Add Day</Button>
            </TabsContent>

            {/* Packages */}
            <TabsContent value="packages" className="space-y-3 mt-4">
              {form.packages.map((pkg, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input value={pkg.name} onChange={e => updatePackage(i, "name", e.target.value)} placeholder="Package name" />
                  <Input type="number" value={pkg.price} onChange={e => updatePackage(i, "price", Number(e.target.value))} placeholder="Price" className="w-28" />
                  <Input value={pkg.duration} onChange={e => updatePackage(i, "duration", e.target.value)} placeholder="Duration" className="w-40" />
                  <Button size="icon" variant="ghost" onClick={() => removePackage(i)}><X className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addPackage}><Plus className="h-4 w-4 mr-1" /> Add Package</Button>
            </TabsContent>

            {/* Safety & Tips */}
            <TabsContent value="safety" className="space-y-4 mt-4">
              <div>
                <h3 className="font-bold text-sm mb-2">Safety Info</h3>
                {(form.safetyInfo || []).map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input value={s} onChange={e => updateListItem("safetyInfo", i, e.target.value)} />
                    <Button size="icon" variant="ghost" onClick={() => removeListItem("safetyInfo", i)}><X className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addListItem("safetyInfo")}><Plus className="h-4 w-4 mr-1" /> Add</Button>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-2">Travel Tips</h3>
                {(form.travelTips || []).map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input value={s} onChange={e => updateListItem("travelTips", i, e.target.value)} />
                    <Button size="icon" variant="ghost" onClick={() => removeListItem("travelTips", i)}><X className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addListItem("travelTips")}><Plus className="h-4 w-4 mr-1" /> Add</Button>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-2">Things to Carry</h3>
                {(form.thingsToCarry || []).map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input value={s} onChange={e => updateListItem("thingsToCarry", i, e.target.value)} />
                    <Button size="icon" variant="ghost" onClick={() => removeListItem("thingsToCarry", i)}><X className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addListItem("thingsToCarry")}><Plus className="h-4 w-4 mr-1" /> Add</Button>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-2">Package Includes</h3>
                {(form.packageIncludes || []).map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input value={s} onChange={e => updateListItem("packageIncludes", i, e.target.value)} />
                    <Button size="icon" variant="ghost" onClick={() => removeListItem("packageIncludes", i)}><X className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addListItem("packageIncludes")}><Plus className="h-4 w-4 mr-1" /> Add</Button>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-2">Additional Costs</h3>
                {(form.additionalCosts || []).map((c, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input value={c.label} onChange={e => updateCost(i, "label", e.target.value)} placeholder="Label" />
                    <Input value={c.amount} onChange={e => updateCost(i, "amount", e.target.value)} placeholder="Amount" className="w-32" />
                    <Button size="icon" variant="ghost" onClick={() => removeCost(i)}><X className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addCost}><Plus className="h-4 w-4 mr-1" /> Add Cost</Button>
              </div>
            </TabsContent>

            {/* Tourist Spots */}
            <TabsContent value="spots" className="space-y-3 mt-4">
              {(form.touristSpots || []).map((s, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={s} onChange={e => updateListItem("touristSpots", i, e.target.value)} />
                  <Button size="icon" variant="ghost" onClick={() => removeListItem("touristSpots", i)}><X className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addListItem("touristSpots")}><Plus className="h-4 w-4 mr-1" /> Add Spot</Button>
            </TabsContent>
          </Tabs>

          <Button onClick={save} className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">Save Cruise</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
