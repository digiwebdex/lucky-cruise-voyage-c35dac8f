import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ImageIcon, GripVertical } from "lucide-react";
import { getSettings, saveSettings } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";
import { uploadImages } from "@/services/uploadHelper";

type HeroImage = { image: string; title?: string };

function normalizeHeroImages(raw: (string | HeroImage)[]): HeroImage[] {
  return raw.map(item => typeof item === "string" ? { image: item, title: "" } : item);
}

export default function HeroImageManager() {
  const [settings, setSettingsState] = useState(getSettings());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const heroImages = normalizeHeroImages(settings.heroImages || []);

  const save = (imgs: HeroImage[]) => {
    const updated = { ...settings, heroImages: imgs };
    saveSettings(updated);
    setSettingsState(updated);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const urls = await uploadImages(Array.from(files));
      const current = [...heroImages];
      urls.forEach(url => current.push({ image: url, title: "" }));
      save(current);
      toast({ title: `${urls.length}টি ইমেজ যোগ হয়েছে` });
    } catch (err) {
      toast({ title: "Image upload failed", variant: "destructive" });
    }
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    save(heroImages.filter((_, i) => i !== index));
    toast({ title: "ইমেজ মুছে ফেলা হয়েছে" });
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= heroImages.length) return;
    const imgs = [...heroImages];
    const [moved] = imgs.splice(from, 1);
    imgs.splice(to, 0, moved);
    save(imgs);
  };

  const updateTitle = (index: number, title: string) => {
    const imgs = [...heroImages];
    imgs[index] = { ...imgs[index], title };
    save(imgs);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hero Image Manager</h1>
          <p className="text-muted-foreground mt-1">হোমপেজের হিরো ব্যানার ইমেজ পরিচালনা করুন। ইমেজগুলো ৫ সেকেন্ড পর পর অটো-রোটেট হবে।</p>
        </div>
        <Button className="gap-2" onClick={() => fileInputRef.current?.click()}>
          <Plus className="h-4 w-4" /> ইমেজ আপলোড
        </Button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
      </div>

      {heroImages.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ImageIcon className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground">কোনো হিরো ইমেজ নেই</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-md">
              হিরো ইমেজ আপলোড করুন। যদি কোনো ইমেজ না থাকে, প্রথম ক্রুজের ফিচার্ড ইমেজ দেখানো হবে।
            </p>
            <Button variant="outline" className="gap-2" onClick={() => fileInputRef2.current?.click()}>
              <Plus className="h-4 w-4" /> ইমেজ যোগ করুন
            </Button>
            <input ref={fileInputRef2} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {heroImages.map((item, i) => (
            <Card key={i} className="overflow-hidden group">
              <div className="relative aspect-video">
                <img src={item.image} alt={item.title || `Hero ${i + 1}`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-foreground text-xs font-bold px-2 py-1 rounded-md">
                  #{i + 1}
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {i > 0 && (
                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => moveImage(i, i - 1)} title="Move up">
                      <GripVertical className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => removeImage(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <Input
                  placeholder="টাইটেল লিখুন (যেমন: সুন্দরবন ক্রুজ ট্যুর)"
                  value={item.title || ""}
                  onChange={e => updateTitle(i, e.target.value)}
                  className="text-sm"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {heroImages.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2">প্রিভিউ (অটো-রোটেশন)</h3>
            <p className="text-sm text-muted-foreground">মোট {heroImages.length}টি ইমেজ • প্রতি ৫ সেকেন্ডে পরিবর্তন হবে</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
