import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Clock, MapPin, Check, Users, DoorOpen, Ship,
  UtensilsCrossed, Shield, TreePine, Backpack, Calendar,
  ChevronRight, Phone, Banknote, MapPinned, Plus, Trash2, X, Save,
  Star, Image as ImageIcon, Flame, Grid3X3, Upload, Search
} from "lucide-react";
import SeoFieldsPanel from "@/components/admin/SeoFieldsPanel";
import SeatPlanViewer from "@/components/SeatPlanViewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getCruises, saveCruises, getCruiseById } from "@/services/cmsStore";
import type { Cruise, ItineraryDay, sundarbanSubCategories } from "@/services/mockData";
import { sundarbanSubCategories as subCatOptions } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";
import { uploadImage, uploadImages } from "@/services/uploadHelper";

const emptyCruise: Cruise = {
  id: "", name: "", subtitle: "", description: "", route: "", duration: "", capacity: "", cabins: "",
  price: 0, priceLabel: "per person (Bangladeshi)", featured: false, destination: "sundarban", featuredImageIndex: 0, images: [], facilities: [],
  touristSpots: [], itinerary: [], menu: [], safetyInfo: [], travelTips: [], thingsToCarry: [],
  additionalCosts: [], packageIncludes: [], packages: [], seatPlan: [],
};

// Inline editable text component
function EditableText({ value, onChange, className = "", multiline = false, placeholder = "Click to edit..." }: {
  value: string; onChange: (v: string) => void; className?: string; multiline?: boolean; placeholder?: string;
}) {
  if (multiline) {
    return <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`bg-primary/5 border-dashed border-primary/30 focus:border-primary ${className}`} />;
  }
  return <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`bg-primary/5 border-dashed border-primary/30 focus:border-primary ${className}`} />;
}

// Editable list component
function EditableList({ items, onChange, placeholder = "Enter item...", icon }: {
  items: string[]; onChange: (items: string[]) => void; placeholder?: string; icon?: React.ReactNode;
}) {
  const add = () => onChange([...items, ""]);
  const update = (i: number, v: string) => { const a = [...items]; a[i] = v; onChange(a); };
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-primary/5 border border-dashed border-primary/20 px-4 py-3 text-sm group">
          {icon || <Check className="h-5 w-5 text-primary flex-shrink-0" />}
          <Input value={item} onChange={e => update(i, e.target.value)} placeholder={placeholder} className="flex-1 border-0 bg-transparent p-0 h-auto shadow-none focus-visible:ring-0" />
          <button onClick={() => remove(i)} className="opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-4 w-4 text-destructive" /></button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add} className="gap-1 border-dashed"><Plus className="h-4 w-4" /> Add</Button>
    </div>
  );
}

export default function CruiseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [form, setForm] = useState<Cruise>(() => {
    if (isNew) return { ...emptyCruise, id: `cruise-${Date.now()}` };
    const existing = getCruiseById(id);
    return existing ? { ...existing } : { ...emptyCruise, id: `cruise-${Date.now()}` };
  });

  const [selectedImg, setSelectedImg] = useState(0);

  const updateField = (field: keyof Cruise, value: any) => setForm({ ...form, [field]: value });

  const save = () => {
    if (!form.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    const cruises = getCruises();
    if (isNew) {
      saveCruises([...cruises, form]);
    } else {
      saveCruises(cruises.map(c => c.id === id ? form : c));
    }
    toast({ title: isNew ? "Cruise created!" : "Cruise updated!" });
    navigate("/admin/cruises");
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Save Bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/admin/cruises")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Cruises
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <select
              value={form.destination}
              onChange={e => {
                updateField("destination", e.target.value);
                if (e.target.value !== "sundarban") updateField("subCategory", undefined);
              }}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            >
              <option value="sundarban">সুন্দরবন ভ্রমণ</option>
              <option value="tanguar-haor">টাঙ্গুয়ার হাওর ভ্রমণ</option>
            </select>
            {form.destination === "sundarban" && (
              <select
                value={form.subCategory || ""}
                onChange={e => updateField("subCategory", e.target.value || undefined)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              >
                <option value="">-- সাবক্যাটাগরি --</option>
                {subCatOptions.map(sc => (
                  <option key={sc.value} value={sc.value}>{sc.labelBn}</option>
                ))}
              </select>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={form.featured} onCheckedChange={v => updateField("featured", v)} />
            <Label className="text-sm flex items-center gap-1"><Star className="h-4 w-4" /> Featured</Label>
          </div>
          <Button onClick={save} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="h-4 w-4" /> Save Cruise
          </Button>
        </div>
      </div>

      {/* Hero Banner - Editable */}
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-muted">
        {form.images.length > 0 ? (
          <div className="absolute inset-0">
            <img src={form.images[selectedImg] || ""} alt={form.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="h-16 w-16 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">Add images below to see hero preview</p>
            </div>
          </div>
        )}
        <div className="container relative z-10 pb-10 pt-24">
          <Badge className="mb-3 rounded-full gradient-primary text-primary-foreground font-bold border-0 px-4 py-1">
            <EditableText value={form.duration} onChange={v => updateField("duration", v)} placeholder="3 Days / 2 Nights" className="bg-transparent border-0 text-primary-foreground placeholder:text-primary-foreground/50 h-auto p-0 w-40 shadow-none focus-visible:ring-0" />
          </Badge>
          <EditableText value={form.name} onChange={v => updateField("name", v)} placeholder="Cruise Name" className="text-3xl md:text-4xl font-black text-secondary-foreground bg-transparent border-0 h-auto p-0 shadow-none focus-visible:ring-0 font-display" />
          <EditableText value={form.subtitle} onChange={v => updateField("subtitle", v)} placeholder="Subtitle" className="mt-2 text-lg font-semibold text-primary bg-transparent border-0 h-auto p-0 shadow-none focus-visible:ring-0" />
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-2 bg-secondary/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-secondary-foreground/70">
              <MapPin className="h-4 w-4 text-primary" />
              <EditableText value={form.route} onChange={v => updateField("route", v)} placeholder="Route" className="bg-transparent border-0 h-auto p-0 w-48 text-secondary-foreground/70 shadow-none focus-visible:ring-0" />
            </span>
            <span className="flex items-center gap-2 bg-secondary/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-secondary-foreground/70">
              <Users className="h-4 w-4 text-primary" />
              <EditableText value={form.capacity} onChange={v => updateField("capacity", v)} placeholder="Capacity" className="bg-transparent border-0 h-auto p-0 w-28 text-secondary-foreground/70 shadow-none focus-visible:ring-0" />
            </span>
            <span className="flex items-center gap-2 bg-secondary/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-secondary-foreground/70">
              <DoorOpen className="h-4 w-4 text-primary" />
              <EditableText value={form.cabins} onChange={v => updateField("cabins", v)} placeholder="Cabins" className="bg-transparent border-0 h-auto p-0 w-28 text-secondary-foreground/70 shadow-none focus-visible:ring-0" />
            </span>
          </div>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">

            {/* Image Gallery Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2"><ImageIcon className="h-5 w-5 text-primary" /> Images</h2>
                {form.images.length > 0 && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Star className="h-3 w-3 text-primary" fill="currentColor" /> Click star on thumbnail to set cover image</span>
                )}
              </div>
              {form.images.length > 0 && (
                <>
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-elevated relative group">
                    <img src={form.images[selectedImg]} alt="" className="h-full w-full object-cover" />
                    <button onClick={() => { const imgs = form.images.filter((_, j) => j !== selectedImg); updateField("images", imgs); setSelectedImg(Math.max(0, selectedImg - 1)); }} className="absolute top-3 right-3 bg-destructive text-destructive-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative flex-shrink-0">
                        <button onClick={() => setSelectedImg(i)} className={`h-16 w-24 overflow-hidden rounded-xl border-2 transition-all ${i === selectedImg ? "border-primary shadow-glow scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); updateField("featuredImageIndex", i); }}
                          title={i === (form.featuredImageIndex ?? 0) ? "Cover image" : "Set as cover image"}
                          className={`absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full flex items-center justify-center text-[10px] transition-all ${i === (form.featuredImageIndex ?? 0) ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-primary/20 border border-border"}`}
                        >
                          <Star className="h-3 w-3" fill={i === (form.featuredImageIndex ?? 0) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="mt-3 flex gap-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id={`cruise-img-upload`}
                  onChange={async e => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;
                    try {
                      const urls = await uploadImages(Array.from(files));
                      updateField("images", [...form.images, ...urls]);
                    } catch (err) {
                      toast({ title: "Image upload failed", variant: "destructive" });
                    }
                    e.target.value = "";
                  }}
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById('cruise-img-upload')?.click()} className="gap-1.5">
                  <Upload className="h-4 w-4" /> Upload Images
                </Button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-3 font-display text-2xl font-black text-foreground flex items-center gap-2"><Ship className="h-6 w-6 text-primary" /> About This Cruise</h2>
              <EditableText value={form.description} onChange={v => updateField("description", v)} multiline placeholder="Describe the cruise experience..." className="text-lg min-h-[120px]" />
            </div>

            {/* Facilities */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-black text-foreground">Ship Facilities</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="col-span-full">
                  <EditableList items={form.facilities || []} onChange={v => updateField("facilities", v)} placeholder="Facility name..." />
                </div>
              </div>
            </div>

            {/* Tourist Spots */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-black text-foreground flex items-center gap-2"><MapPinned className="h-6 w-6 text-primary" /> Tourist Spots</h2>
              <EditableList items={form.touristSpots || []} onChange={v => updateField("touristSpots", v)} placeholder="Spot name..." icon={<MapPin className="h-4 w-4 text-primary flex-shrink-0" />} />
            </div>

            {/* Tabbed Content */}
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50 rounded-xl h-12 p-1">
                <TabsTrigger value="itinerary" className="gap-1.5 text-xs sm:text-sm rounded-lg font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"><Calendar className="h-4 w-4 hidden sm:block" /> Itinerary</TabsTrigger>
                <TabsTrigger value="menu" className="gap-1.5 text-xs sm:text-sm rounded-lg font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"><UtensilsCrossed className="h-4 w-4 hidden sm:block" /> Menu</TabsTrigger>
                <TabsTrigger value="safety" className="gap-1.5 text-xs sm:text-sm rounded-lg font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"><Shield className="h-4 w-4 hidden sm:block" /> Safety</TabsTrigger>
                <TabsTrigger value="tips" className="gap-1.5 text-xs sm:text-sm rounded-lg font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"><Backpack className="h-4 w-4 hidden sm:block" /> Tips</TabsTrigger>
              </TabsList>

              {/* Itinerary */}
              <TabsContent value="itinerary" className="mt-6 space-y-6">
                {(form.itinerary || []).map((day, i) => (
                  <Card key={i} className="border-l-4 border-l-primary overflow-hidden border-border/50 bg-card group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground font-display font-black text-sm">{i + 1}</span>
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <EditableText value={day.day} onChange={v => { const arr = [...(form.itinerary || [])]; arr[i] = { ...arr[i], day: v }; updateField("itinerary", arr); }} placeholder="Day 1" />
                          <EditableText value={day.title} onChange={v => { const arr = [...(form.itinerary || [])]; arr[i] = { ...arr[i], title: v }; updateField("itinerary", arr); }} placeholder="Title" />
                        </div>
                        <button onClick={() => updateField("itinerary", (form.itinerary || []).filter((_, j) => j !== i))} className="opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4 text-destructive" /></button>
                      </div>
                      <div className="space-y-2 ml-1">
                        {day.activities.map((act, j) => (
                          <div key={j} className="flex items-start gap-3 text-sm group/act">
                            <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-2.5" />
                            <Input value={act} onChange={e => { const arr = [...(form.itinerary || [])]; const acts = [...arr[i].activities]; acts[j] = e.target.value; arr[i] = { ...arr[i], activities: acts }; updateField("itinerary", arr); }} className="flex-1 border-dashed border-primary/20 bg-transparent" placeholder="Activity..." />
                            <button onClick={() => { const arr = [...(form.itinerary || [])]; arr[i] = { ...arr[i], activities: arr[i].activities.filter((_, k) => k !== j) }; updateField("itinerary", arr); }} className="opacity-0 group-hover/act:opacity-100 mt-2"><X className="h-4 w-4 text-destructive" /></button>
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="gap-1 text-primary ml-6" onClick={() => { const arr = [...(form.itinerary || [])]; arr[i] = { ...arr[i], activities: [...arr[i].activities, ""] }; updateField("itinerary", arr); }}><Plus className="h-3 w-3" /> Activity</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="gap-1 border-dashed" onClick={() => updateField("itinerary", [...(form.itinerary || []), { day: `Day ${(form.itinerary?.length || 0) + 1}`, title: "", activities: [] }])}><Plus className="h-4 w-4" /> Add Day</Button>
              </TabsContent>

              {/* Menu */}
              <TabsContent value="menu" className="mt-6 space-y-6">
                {(form.menu || []).map((day, i) => (
                  <Card key={i} className="overflow-hidden border-border/50 bg-card group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <UtensilsCrossed className="h-5 w-5 text-primary" />
                        <EditableText value={day.day} onChange={v => { const arr = [...(form.menu || [])]; arr[i] = { ...arr[i], day: v }; updateField("menu", arr); }} placeholder="Day 1" className="w-32" />
                        <div className="flex-1" />
                        <button onClick={() => updateField("menu", (form.menu || []).filter((_, j) => j !== i))} className="opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4 text-destructive" /></button>
                      </div>
                      <div className="space-y-3">
                        {day.meals.map((meal, j) => (
                          <div key={j} className="rounded-xl bg-muted/30 border border-dashed border-border/50 p-4 group/meal relative">
                            <EditableText value={meal.name} onChange={v => { const arr = [...(form.menu || [])]; const meals = [...arr[i].meals]; meals[j] = { ...meals[j], name: v }; arr[i] = { ...arr[i], meals }; updateField("menu", arr); }} placeholder="Meal name (e.g. Breakfast)" className="font-bold text-sm text-primary mb-1 bg-transparent border-0 p-0 h-auto shadow-none" />
                            <EditableText value={meal.items} onChange={v => { const arr = [...(form.menu || [])]; const meals = [...arr[i].meals]; meals[j] = { ...meals[j], items: v }; arr[i] = { ...arr[i], meals }; updateField("menu", arr); }} placeholder="Items..." className="text-sm bg-transparent border-0 p-0 h-auto shadow-none" />
                            <button onClick={() => { const arr = [...(form.menu || [])]; arr[i] = { ...arr[i], meals: arr[i].meals.filter((_, k) => k !== j) }; updateField("menu", arr); }} className="absolute top-2 right-2 opacity-0 group-hover/meal:opacity-100"><X className="h-4 w-4 text-destructive" /></button>
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="gap-1 text-primary" onClick={() => { const arr = [...(form.menu || [])]; arr[i] = { ...arr[i], meals: [...arr[i].meals, { name: "", items: "" }] }; updateField("menu", arr); }}><Plus className="h-3 w-3" /> Add Meal</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="gap-1 border-dashed" onClick={() => updateField("menu", [...(form.menu || []), { day: `Day ${(form.menu?.length || 0) + 1}`, meals: [] }])}><Plus className="h-4 w-4" /> Add Day</Button>
              </TabsContent>

              {/* Safety */}
              <TabsContent value="safety" className="mt-6 space-y-4">
                <Card className="border-l-4 border-l-emerald border-border/50 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-emerald" /> Security Measures</h3>
                    <EditableList items={form.safetyInfo || []} onChange={v => updateField("safetyInfo", v)} placeholder="Safety measure..." icon={<Check className="h-4 w-4 text-emerald flex-shrink-0" />} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tips */}
              <TabsContent value="tips" className="mt-6 space-y-6">
                <Card className="border-border/50 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2"><TreePine className="h-5 w-5 text-emerald" /> Travel Tips</h3>
                    <EditableList items={form.travelTips || []} onChange={v => updateField("travelTips", v)} placeholder="Travel tip..." icon={<span className="text-lg leading-none">🌿</span>} />
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Backpack className="h-5 w-5 text-primary" /> Things to Carry</h3>
                    <EditableList items={form.thingsToCarry || []} onChange={v => updateField("thingsToCarry", v)} placeholder="Item..." />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Packages */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-black text-foreground flex items-center gap-2"><Banknote className="h-6 w-6 text-primary" /> Packages</h2>
              <div className="space-y-4">
                {form.packages.map((pkg, i) => (
                  <Card key={i} className={`border-border/50 bg-card group relative overflow-hidden ${pkg.isOffer ? "ring-2 ring-primary" : ""}`}>
                    {pkg.isOffer && (
                      <div className="absolute top-0 right-0">
                        <Badge className="rounded-none rounded-bl-xl gradient-primary text-primary-foreground font-bold border-0 px-2 py-1 text-xs gap-1">
                          <Flame className="h-3 w-3" /> Offer
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
                        <EditableText value={pkg.name} onChange={v => { const arr = [...form.packages]; arr[i] = { ...arr[i], name: v }; updateField("packages", arr); }} placeholder="Package name" />
                        <EditableText value={pkg.duration} onChange={v => { const arr = [...form.packages]; arr[i] = { ...arr[i], duration: v }; updateField("packages", arr); }} placeholder="Duration" />
                        <div className="flex gap-2 items-center">
                          <div className="flex-1">
                            <Label className="text-xs text-muted-foreground">Old Price</Label>
                            <Input type="number" value={pkg.oldPrice || ""} onChange={e => { const arr = [...form.packages]; arr[i] = { ...arr[i], oldPrice: e.target.value ? Number(e.target.value) : undefined }; updateField("packages", arr); }} placeholder="Old ৳" className="h-8 text-sm border-dashed" />
                          </div>
                          <div className="flex-1">
                            <Label className="text-xs text-muted-foreground">Price</Label>
                            <Input type="number" value={pkg.price} onChange={e => { const arr = [...form.packages]; arr[i] = { ...arr[i], price: Number(e.target.value) }; updateField("packages", arr); }} placeholder="৳" className="h-8 text-sm border-dashed font-bold" />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Switch checked={pkg.isOffer || false} onCheckedChange={v => { const arr = [...form.packages]; arr[i] = { ...arr[i], isOffer: v }; updateField("packages", arr); }} />
                            <Label className="text-xs">Offer</Label>
                          </div>
                          <button onClick={() => updateField("packages", form.packages.filter((_, j) => j !== i))} className="opacity-0 group-hover:opacity-100 ml-auto"><Trash2 className="h-4 w-4 text-destructive" /></button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="gap-1 border-dashed" onClick={() => updateField("packages", [...form.packages, { id: `pkg-${Date.now()}`, name: "", price: 0, duration: "", isOffer: false }])}><Plus className="h-4 w-4" /> Add Package</Button>
              </div>
            </div>

            {/* Seat Plan */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-black text-foreground flex items-center gap-2"><Grid3X3 className="h-6 w-6 text-primary" /> Seat Plan</h2>
              {form.seatPlanImage ? (
                <div className="relative group">
                  <SeatPlanViewer seatPlanImage={form.seatPlanImage} shipName={form.name} />
                  <button
                    onClick={() => updateField("seatPlanImage", undefined)}
                    className="absolute top-3 right-3 bg-destructive text-destructive-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block rounded-2xl border-2 border-dashed border-border/50 bg-muted/30 p-10 text-center hover:border-primary/40 hover:bg-muted/50 transition-colors">
                  <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
                  <p className="text-muted-foreground text-sm font-medium">Click to upload seat plan image</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">JPG, PNG supported</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const url = await uploadImage(file);
                        updateField("seatPlanImage", url);
                      } catch (err) {
                        toast({ title: "Seat plan upload failed", variant: "destructive" });
                      }
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>

            {/* SEO Section */}
            <SeoFieldsPanel
              seoTitle={form.seoTitle || ""}
              seoDescription={form.seoDescription || ""}
              seoKeywords={form.seoKeywords || ""}
              ogImage={form.ogImage || ""}
              onChange={(field, value) => updateField(field as keyof Cruise, value)}
              titlePlaceholder={form.name}
            />
          </div>

          {/* Sidebar - Pricing & Extras */}
          <div className="space-y-6">
            <Card className="sticky top-20 border-border/50 shadow-elevated overflow-hidden bg-card">
              <div className="gradient-primary px-6 py-5">
                <p className="text-primary-foreground/80 text-sm font-medium">Starting From</p>
                <div className="flex items-center gap-2">
                  <span className="text-primary-foreground/60 text-xs">Old Price ৳</span>
                  <Input type="number" value={form.oldPrice || ""} onChange={e => updateField("oldPrice", e.target.value ? Number(e.target.value) : undefined)} placeholder="Old price" className="text-lg font-display text-primary-foreground/60 line-through bg-transparent border-0 h-auto p-0 shadow-none focus-visible:ring-0 w-24" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-primary-foreground text-2xl font-bold">৳</span>
                  <Input type="number" value={form.price} onChange={e => updateField("price", Number(e.target.value))} className="text-3xl font-display font-black text-primary-foreground bg-transparent border-0 h-auto p-0 shadow-none focus-visible:ring-0 w-full" />
                </div>
                <EditableText value={form.priceLabel} onChange={v => updateField("priceLabel", v)} placeholder="Price label" className="text-primary-foreground/70 bg-transparent border-0 text-xs h-auto p-0 mt-1 shadow-none focus-visible:ring-0" />
              </div>
              <CardContent className="p-6 space-y-4">
                {/* Additional Costs */}
                <div className="border-t border-border/30 pt-3">
                  <p className="text-xs font-display font-bold text-foreground mb-2 flex items-center gap-1"><Banknote className="h-3.5 w-3.5 text-primary" /> Additional Costs</p>
                  {(form.additionalCosts || []).map((cost, i) => (
                    <div key={i} className="flex gap-2 text-xs py-1 group items-center">
                      <Input value={cost.label} onChange={e => { const arr = [...(form.additionalCosts || [])]; arr[i] = { ...arr[i], label: e.target.value }; updateField("additionalCosts", arr); }} placeholder="Label" className="flex-1 h-7 text-xs border-dashed" />
                      <Input value={cost.amount} onChange={e => { const arr = [...(form.additionalCosts || [])]; arr[i] = { ...arr[i], amount: e.target.value }; updateField("additionalCosts", arr); }} placeholder="Amount" className="w-24 h-7 text-xs border-dashed" />
                      <button onClick={() => updateField("additionalCosts", (form.additionalCosts || []).filter((_, j) => j !== i))} className="opacity-0 group-hover:opacity-100"><X className="h-3 w-3 text-destructive" /></button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="text-xs gap-1 h-6 text-primary" onClick={() => updateField("additionalCosts", [...(form.additionalCosts || []), { label: "", amount: "" }])}><Plus className="h-3 w-3" /> Add</Button>
                </div>

                {/* Package Includes */}
                <div className="border-t border-border/30 pt-3">
                  <p className="text-xs font-display font-bold text-foreground mb-2">Package Includes</p>
                  {(form.packageIncludes || []).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs py-1 group">
                      <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <Input value={item} onChange={e => { const arr = [...(form.packageIncludes || [])]; arr[i] = e.target.value; updateField("packageIncludes", arr); }} className="flex-1 h-7 text-xs border-dashed border-0 bg-transparent p-0 shadow-none" placeholder="Include item..." />
                      <button onClick={() => updateField("packageIncludes", (form.packageIncludes || []).filter((_, j) => j !== i))} className="opacity-0 group-hover:opacity-100"><X className="h-3 w-3 text-destructive" /></button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="text-xs gap-1 h-6 text-primary" onClick={() => updateField("packageIncludes", [...(form.packageIncludes || []), ""])}><Plus className="h-3 w-3" /> Add</Button>
                </div>

                {/* Info fields - Editable */}
                <div className="pt-3 border-t border-border/30 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <Input value={form.route} onChange={e => updateField("route", e.target.value)} placeholder="Route (e.g. Khulna → Sundarban)" className="h-7 text-xs border-dashed" />
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <Input value={form.duration} onChange={e => updateField("duration", e.target.value)} placeholder="Duration (e.g. 3 Days / 2 Nights)" className="h-7 text-xs border-dashed" />
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Users className="h-4 w-4 text-primary flex-shrink-0" />
                    <Input value={form.capacity} onChange={e => updateField("capacity", e.target.value)} placeholder="Capacity (e.g. 40 Passengers)" className="h-7 text-xs border-dashed" />
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <DoorOpen className="h-4 w-4 text-primary flex-shrink-0" />
                    <Input value={form.cabins} onChange={e => updateField("cabins", e.target.value)} placeholder="Cabins (e.g. 10 AC Cabins)" className="h-7 text-xs border-dashed" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
