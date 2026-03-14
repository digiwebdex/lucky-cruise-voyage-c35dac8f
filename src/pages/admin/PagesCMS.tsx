import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCmsData, getPages, savePages, type CmsPage } from "@/services/cmsStore";
import { toast } from "sonner";
import SeoFieldsPanel from "@/components/admin/SeoFieldsPanel";

export default function PagesCMS() {
  const [pages, save] = useCmsData(getPages, savePages);
  const [editing, setEditing] = useState<string | null>(null);

  const update = (id: string, field: string, value: string) => {
    save(pages.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Pages CMS</h1>
      <div className="space-y-4">
        {pages.map(page => (
          <Card key={page.id} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">{page.title}</h2>
                <Button size="sm" variant="outline" onClick={() => setEditing(editing === page.id ? null : page.id)}>
                  {editing === page.id ? "Close" : "Edit"}
                </Button>
              </div>
              {editing === page.id && (
                <div className="mt-4 space-y-4">
                  <div><Label>Title</Label><Input value={page.title} onChange={e => update(page.id, "title", e.target.value)} /></div>
                  <div><Label>Content</Label><Textarea rows={5} value={page.body || ""} onChange={e => update(page.id, "body", e.target.value)} /></div>
                  
                  {/* SEO Section */}
                  <SeoFieldsPanel
                    seoTitle={page.seoTitle || ""}
                    seoDescription={page.seoDescription || ""}
                    seoKeywords={page.seoKeywords || ""}
                    ogImage={page.ogImage || ""}
                    onChange={(field, value) => update(page.id, field, value)}
                    titlePlaceholder={page.title}
                  />

                  <Button onClick={() => toast.success("Page saved!")} className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
