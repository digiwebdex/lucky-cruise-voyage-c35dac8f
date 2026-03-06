import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Lucky Tours & Travels",
    phone: "01711871072",
    whatsapp: "8801711871072",
    email: "luckytoursandtravels70@gmail.com",
    address: "Dhaka, Bangladesh",
  });

  const update = (field: string, value: string) => setSettings({ ...settings, [field]: value });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Settings</h1>
      <Card className="border-border">
        <CardContent className="space-y-4 p-6">
          <div><Label>Site Name</Label><Input value={settings.siteName} onChange={e => update("siteName", e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={settings.phone} onChange={e => update("phone", e.target.value)} /></div>
          <div><Label>WhatsApp Number</Label><Input value={settings.whatsapp} onChange={e => update("whatsapp", e.target.value)} /></div>
          <div><Label>Email</Label><Input value={settings.email} onChange={e => update("email", e.target.value)} /></div>
          <div><Label>Address</Label><Input value={settings.address} onChange={e => update("address", e.target.value)} /></div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
