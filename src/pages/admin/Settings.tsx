import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCmsData, getSettings, saveSettings } from "@/services/cmsStore";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [settings, setSettings] = useCmsData(getSettings, saveSettings);

  const update = (field: string, value: any) => setSettings({ ...settings, [field]: value });

  const handleSave = () => {
    saveSettings(settings);
    toast({ title: "Settings saved" });
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
            <div><Label>Footer Text</Label><Input value={settings.footerText} onChange={e => update("footerText", e.target.value)} /></div>
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
      </div>
      <Button onClick={handleSave} className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button>
    </div>
  );
}
