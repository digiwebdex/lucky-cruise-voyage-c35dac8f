import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCmsData, getSettings, saveSettings } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";
import { Lock, Upload, X, Image as ImageIcon } from "lucide-react";

const DEFAULT_PASSWORD = "admin123";

function getStoredPassword(): string {
  return localStorage.getItem("admin_password") || DEFAULT_PASSWORD;
}

function setStoredPassword(pw: string) {
  localStorage.setItem("admin_password", pw);
}

export default function SettingsPage() {
  const [settings, setSettings] = useCmsData(getSettings, saveSettings);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const heroFileRef = useRef<HTMLInputElement>(null);

  const update = (field: string, value: any) => setSettings({ ...settings, [field]: value });

  const handleSave = () => {
    saveSettings(settings);
    toast({ title: "Settings saved" });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPw !== getStoredPassword()) {
      toast({ title: "Error", description: "Current password is incorrect", variant: "destructive" });
      return;
    }
    if (newPw.length < 6) {
      toast({ title: "Error", description: "New password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPw !== confirmPw) {
      toast({ title: "Error", description: "New passwords do not match", variant: "destructive" });
      return;
    }
    setStoredPassword(newPw);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    toast({ title: "Password updated successfully" });
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const currentImages = [...(settings.heroImages || [])];
    let loaded = 0;
    const total = files.length;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        currentImages.push(reader.result as string);
        loaded++;
        if (loaded === total) {
          setSettings({ ...settings, heroImages: currentImages });
        }
      };
      reader.readAsDataURL(file);
    });
    if (heroFileRef.current) heroFileRef.current.value = "";
  };

  const removeHeroImage = (index: number) => {
    setSettings({
      ...settings,
      heroImages: (settings.heroImages || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Settings</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardContent className="space-y-4 p-6">
            <h2 className="font-bold text-foreground">General</h2>
            <div><Label>Site Name</Label><Input value={settings.siteName} onChange={e => update("siteName", e.target.value)} /></div>
            <div><Label>Phone</Label><Input value={settings.phone} onChange={e => update("phone", e.target.value)} /></div>
            <div><Label>WhatsApp Number</Label><Input value={settings.whatsapp} onChange={e => update("whatsapp", e.target.value)} /></div>
            <div><Label>Email</Label><Input value={settings.email} onChange={e => update("email", e.target.value)} /></div>
            <div><Label>Address</Label><Input value={settings.address} onChange={e => update("address", e.target.value)} /></div>
            <div><Label>Address (বাংলা)</Label><Input value={settings.addressBn || ""} onChange={e => update("addressBn", e.target.value)} placeholder="e.g. ঢাকা, বাংলাদেশ" /></div>
            <div><Label>Footer Text</Label><Input value={settings.footerText} onChange={e => update("footerText", e.target.value)} /></div>
            <div><Label>Footer Text (বাংলা)</Label><Input value={settings.footerTextBn || ""} onChange={e => update("footerTextBn", e.target.value)} placeholder="e.g. © লাকি ট্যুরস..." /></div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="space-y-4 p-6">
            <h2 className="font-bold text-foreground">Social Media</h2>
            <div><Label>Facebook URL</Label><Input value={settings.facebookUrl} onChange={e => update("facebookUrl", e.target.value)} placeholder="https://facebook.com/..." /></div>
            <div><Label>YouTube URL</Label><Input value={settings.youtubeUrl} onChange={e => update("youtubeUrl", e.target.value)} placeholder="https://youtube.com/..." /></div>
            <div><Label>Instagram URL</Label><Input value={settings.instagramUrl} onChange={e => update("instagramUrl", e.target.value)} placeholder="https://instagram.com/..." /></div>
          </CardContent>
        </Card>

        {/* Hero Banner Images */}
        <Card className="border-border border-l-4 border-l-emerald lg:col-span-2">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-emerald" />
              <h2 className="font-bold text-foreground">হিরো ব্যানার ইমেজ</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              হোমপেজের হিরো সেকশনে যেসব ইমেজ দেখাবে সেগুলো এখানে আপলোড করুন। খালি থাকলে প্রথম ক্রুজের ফিচার্ড ইমেজ দেখাবে।
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {(settings.heroImages || []).map((img, i) => (
                <div key={i} className="relative group aspect-video rounded-xl overflow-hidden border border-border">
                  <img src={img} alt={`Hero ${i + 1}`} className="h-full w-full object-cover" />
                  <button
                    onClick={() => removeHeroImage(i)}
                    className="absolute top-2 right-2 rounded-full bg-destructive/90 p-1 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-1 left-2 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                    {i + 1}
                  </div>
                </div>
              ))}

              <button
                onClick={() => heroFileRef.current?.click()}
                className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Upload className="h-6 w-6" />
                <span className="text-xs font-medium">আপলোড</span>
              </button>
            </div>

            <input
              ref={heroFileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleHeroImageUpload}
            />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="space-y-4 p-6">
            <h2 className="font-bold text-foreground">Embeds</h2>
            <div><Label>Google Maps Embed URL</Label><Input value={settings.googleMapsUrl} onChange={e => update("googleMapsUrl", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="space-y-4 p-6">
            <h2 className="font-bold text-foreground">Feature Toggles</h2>
            <div className="flex items-center justify-between">
              <Label>WhatsApp Float Button</Label>
              <Switch checked={settings.whatsappFloatEnabled} onCheckedChange={v => update("whatsappFloatEnabled", v)} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Language Switcher</Label>
              <Switch checked={settings.languageSwitcherEnabled} onCheckedChange={v => update("languageSwitcherEnabled", v)} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border border-l-4 border-l-primary">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-foreground">Change Admin Password</h2>
            </div>
            <p className="text-sm text-muted-foreground">Default password: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">admin123</code></p>
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div>
                <Label>Current Password</Label>
                <Input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="Enter current password" required />
              </div>
              <div>
                <Label>New Password</Label>
                <Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Enter new password" required />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Confirm new password" required />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Button onClick={handleSave} className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button>
    </div>
  );
}
