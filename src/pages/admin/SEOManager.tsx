import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const defaultSEO = [
  { page: "Home", title: "Lucky Tours & Travels – Best Cruise Tours in Bangladesh", description: "Explore Bangladesh by water with Lucky Tours & Travels.", ogImage: "" },
  { page: "About", title: "About Us – Lucky Tours & Travels", description: "Learn about our story, mission, and team.", ogImage: "" },
  { page: "Cruises", title: "Cruise Tours – Lucky Tours & Travels", description: "Browse our fleet of cruise tours across Bangladesh.", ogImage: "" },
  { page: "Contact", title: "Contact Us – Lucky Tours & Travels", description: "Get in touch via WhatsApp, phone, or email.", ogImage: "" },
];

export default function SEOManager() {
  const [seoData, setSeoData] = useState(defaultSEO);

  const update = (index: number, field: string, value: string) => {
    setSeoData(seoData.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">SEO Manager</h1>
      <div className="space-y-4">
        {seoData.map((seo, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-5 space-y-3">
              <h2 className="text-lg font-bold text-secondary">{seo.page}</h2>
              <div><Label>Meta Title</Label><Input value={seo.title} onChange={e => update(i, "title", e.target.value)} /></div>
              <div><Label>Meta Description</Label><Textarea value={seo.description} onChange={e => update(i, "description", e.target.value)} /></div>
              <div><Label>OG Image URL</Label><Input value={seo.ogImage} onChange={e => update(i, "ogImage", e.target.value)} placeholder="https://..." /></div>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Save</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
