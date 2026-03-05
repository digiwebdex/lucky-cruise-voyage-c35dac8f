import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const defaultPages = [
  { id: "home", title: "Homepage", content: "Welcome to Lucky Tours & Travels..." },
  { id: "about", title: "About Us", content: "Lucky Tours & Travels was founded..." },
  { id: "contact", title: "Contact", content: "Get in touch with us..." },
  { id: "gallery", title: "Gallery", content: "Browse our photo gallery..." },
];

export default function PagesCMS() {
  const [pages, setPages] = useState(defaultPages);
  const [editing, setEditing] = useState<string | null>(null);

  const update = (id: string, field: string, value: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Pages CMS</h1>
      <div className="space-y-4">
        {pages.map(page => (
          <Card key={page.id} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-secondary">{page.title}</h2>
                <Button size="sm" variant="outline" onClick={() => setEditing(editing === page.id ? null : page.id)}>
                  {editing === page.id ? "Close" : "Edit"}
                </Button>
              </div>
              {editing === page.id && (
                <div className="mt-4 space-y-3">
                  <div><Label>Title</Label><Input value={page.title} onChange={e => update(page.id, "title", e.target.value)} /></div>
                  <div><Label>Content</Label><Textarea rows={5} value={page.content} onChange={e => update(page.id, "content", e.target.value)} /></div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
