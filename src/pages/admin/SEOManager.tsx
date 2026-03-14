import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, FileText, Tag, Image as ImageIcon, Save } from "lucide-react";
import { useCmsData, getSeo, saveSeo, getPages, savePages, getBlogs, saveBlogs, getCruises, saveCruises, type SeoEntry } from "@/services/cmsStore";
import { toast } from "sonner";
import SeoFieldsPanel from "@/components/admin/SeoFieldsPanel";

export default function SEOManager() {
  const [seoData, saveSeoData] = useCmsData(getSeo, saveSeo);
  const [pages] = useCmsData(getPages, savePages);
  const [blogs] = useCmsData(getBlogs, saveBlogs);
  const [cruises] = useCmsData(getCruises, saveCruises);

  const updateSeo = (index: number, field: string, value: string) => {
    const updated = seoData.map((s, i) => i === index ? { ...s, [field]: value } : s);
    saveSeoData(updated);
  };

  const handleSave = (pageSlug: string) => {
    toast.success(`SEO saved for "${pageSlug}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" /> SEO Manager
        </h1>
        <p className="text-sm text-muted-foreground">Manage search engine optimization for all pages, blogs, and cruises</p>
      </div>

      <Tabs defaultValue="pages">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages" className="gap-1.5">
            <Globe className="h-4 w-4" /> Pages ({seoData.length})
          </TabsTrigger>
          <TabsTrigger value="blogs" className="gap-1.5">
            <FileText className="h-4 w-4" /> Blogs ({blogs.length})
          </TabsTrigger>
          <TabsTrigger value="cruises" className="gap-1.5">
            <Tag className="h-4 w-4" /> Cruises ({cruises.length})
          </TabsTrigger>
        </TabsList>

        {/* Pages SEO */}
        <TabsContent value="pages" className="mt-6 space-y-4">
          {seoData.map((seo, i) => (
            <Card key={i} className="border-border">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" /> {seo.pageSlug}
                  </h2>
                  <Badge variant="outline" className="text-xs">/{seo.pageSlug}</Badge>
                </div>

                {/* Google Preview */}
                <div className="rounded-lg border border-border bg-background p-4 space-y-1">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Google Preview</p>
                  <p className="text-[#1a0dab] text-lg leading-snug truncate font-medium">
                    {seo.title || "Page Title"}
                  </p>
                  <p className="text-[#006621] text-sm truncate">luckycruisevoyage.com/{seo.pageSlug}</p>
                  <p className="text-sm text-[#545454] line-clamp-2">{seo.description || "No description"}</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label>Meta Title</Label>
                      <span className={`text-xs ${seo.title.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>{seo.title.length}/60</span>
                    </div>
                    <Input value={seo.title} onChange={e => updateSeo(i, "title", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label>Meta Description</Label>
                      <span className={`text-xs ${seo.description.length > 160 ? "text-destructive" : "text-muted-foreground"}`}>{seo.description.length}/160</span>
                    </div>
                    <Textarea value={seo.description} onChange={e => updateSeo(i, "description", e.target.value)} rows={2} />
                  </div>
                  <div>
                    <Label>Keywords</Label>
                    <Input value={seo.keywords} onChange={e => updateSeo(i, "keywords", e.target.value)} placeholder="keyword1, keyword2" />
                  </div>
                </div>
                <Button size="sm" onClick={() => handleSave(seo.pageSlug)} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-3.5 w-3.5" /> Save
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Blogs SEO */}
        <TabsContent value="blogs" className="mt-6 space-y-4">
          {blogs.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No blog posts yet. Create posts from the Blog Manager.</p>
          )}
          {blogs.map(blog => (
            <Card key={blog.id} className="border-border">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground truncate max-w-[70%]">{blog.title}</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant={blog.isPublished ? "default" : "outline"} className={blog.isPublished ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" : ""}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">/blog/{blog.slug}</Badge>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground space-y-0.5">
                  <p><strong>SEO Title:</strong> {blog.seoTitle || <span className="italic">Not set (using post title)</span>}</p>
                  <p><strong>SEO Description:</strong> {blog.seoDescription || <span className="italic">Not set (using excerpt)</span>}</p>
                  <p><strong>Keywords:</strong> {blog.seoKeywords || <span className="italic">Not set</span>}</p>
                </div>
                <p className="text-xs text-muted-foreground">Edit SEO fields from <strong>Blog Manager → Edit Post</strong></p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Cruises SEO */}
        <TabsContent value="cruises" className="mt-6 space-y-4">
          {cruises.map(cruise => (
            <Card key={cruise.id} className="border-border">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground truncate max-w-[70%]">{cruise.name}</h2>
                  <Badge variant="outline" className="text-xs">/cruises/{cruise.id}</Badge>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground space-y-0.5">
                  <p><strong>SEO Title:</strong> {cruise.seoTitle || <span className="italic">Not set (using cruise name)</span>}</p>
                  <p><strong>SEO Description:</strong> {cruise.seoDescription || <span className="italic">Not set (using description)</span>}</p>
                  <p><strong>Keywords:</strong> {cruise.seoKeywords || <span className="italic">Not set</span>}</p>
                </div>
                <p className="text-xs text-muted-foreground">Edit SEO fields from <strong>Cruise Editor</strong></p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
