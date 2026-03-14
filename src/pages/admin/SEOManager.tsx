import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Search, Globe, FileText, Ship, Save, ChevronDown,
  CheckCircle2, AlertTriangle, XCircle, BarChart3
} from "lucide-react";
import {
  useCmsData, getSeo, saveSeo, getPages, savePages,
  getBlogs, saveBlogs, getCruises, saveCruises,
  type SeoEntry, type BlogPost, type CmsPage
} from "@/services/cmsStore";
import type { Cruise } from "@/services/mockData";
import { toast } from "sonner";

// SEO Score calculator
function calcSeoScore(title: string, description: string, keywords: string): { score: number; issues: string[]; color: string; label: string } {
  const issues: string[] = [];
  let score = 0;

  if (title.length > 0) score += 25; else issues.push("Missing meta title");
  if (title.length > 10 && title.length <= 60) score += 10; else if (title.length > 60) issues.push("Title too long (>60 chars)");
  if (description.length > 0) score += 25; else issues.push("Missing meta description");
  if (description.length > 50 && description.length <= 160) score += 10; else if (description.length > 160) issues.push("Description too long (>160 chars)");
  if (keywords.length > 0) score += 20; else issues.push("Missing keywords");
  if (keywords.split(",").filter(k => k.trim()).length >= 3) score += 10; else if (keywords.length > 0) issues.push("Add at least 3 keywords");

  const color = score >= 80 ? "text-emerald-600" : score >= 50 ? "text-amber-500" : "text-destructive";
  const label = score >= 80 ? "Good" : score >= 50 ? "Needs Work" : "Poor";
  return { score, issues, color, label };
}

function ScoreBadge({ score, color, label }: { score: number; color: string; label: string }) {
  const Icon = score >= 80 ? CheckCircle2 : score >= 50 ? AlertTriangle : XCircle;
  const bg = score >= 80 ? "bg-emerald-500/10 border-emerald-500/30" : score >= 50 ? "bg-amber-500/10 border-amber-500/30" : "bg-destructive/10 border-destructive/30";
  return (
    <Badge variant="outline" className={`${bg} ${color} gap-1 font-bold`}>
      <Icon className="h-3 w-3" /> {score}% — {label}
    </Badge>
  );
}

function GooglePreview({ title, url, description }: { title: string; url: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4 space-y-1">
      <p className="text-xs text-muted-foreground mb-2 font-medium">Google Preview</p>
      <p className="text-[#1a0dab] text-lg leading-snug truncate font-medium">{title || "Page Title"}</p>
      <p className="text-[#006621] text-sm truncate">{url}</p>
      <p className="text-sm text-[#545454] line-clamp-2">{description || "No description set"}</p>
    </div>
  );
}

function SeoEditCard({
  title, url, seoTitle, seoDescription, seoKeywords, ogImage,
  onChange, onSave, extraBadge,
}: {
  title: string; url: string;
  seoTitle: string; seoDescription: string; seoKeywords: string; ogImage?: string;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  extraBadge?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const seo = calcSeoScore(seoTitle, seoDescription, seoKeywords);

  return (
    <Card className="border-border overflow-hidden">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full text-left p-5 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <h2 className="font-bold text-foreground truncate">{title}</h2>
              {extraBadge}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <ScoreBadge score={seo.score} color={seo.color} label={seo.label} />
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="px-5 pb-5 pt-0 space-y-4 border-t border-border">
            <GooglePreview
              title={seoTitle || title}
              url={`luckycruisevoyage.com${url}`}
              description={seoDescription}
            />

            {/* Issues */}
            {seo.issues.length > 0 && (
              <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3 space-y-1">
                <p className="text-xs font-bold text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Issues</p>
                {seo.issues.map((issue, i) => (
                  <p key={i} className="text-xs text-destructive/80">• {issue}</p>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Meta Title</Label>
                  <span className={`text-xs ${seoTitle.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>{seoTitle.length}/60</span>
                </div>
                <Input value={seoTitle} onChange={e => onChange("seoTitle", e.target.value)} placeholder={title} />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Meta Description</Label>
                  <span className={`text-xs ${seoDescription.length > 160 ? "text-destructive" : "text-muted-foreground"}`}>{seoDescription.length}/160</span>
                </div>
                <Textarea value={seoDescription} onChange={e => onChange("seoDescription", e.target.value)} placeholder="Brief description for search engines" rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Focus Keywords</Label>
                <Input value={seoKeywords} onChange={e => onChange("seoKeywords", e.target.value)} placeholder="keyword1, keyword2, keyword3" />
                <p className="text-xs text-muted-foreground">Separate with commas. Aim for 3–5 keywords.</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">OG Image URL</Label>
                <Input value={ogImage || ""} onChange={e => onChange("ogImage", e.target.value)} placeholder="https://..." />
              </div>
            </div>
            <Button size="sm" onClick={onSave} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-3.5 w-3.5" /> Save SEO
            </Button>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default function SEOManager() {
  const [seoData, saveSeoData] = useCmsData(getSeo, saveSeo);
  const [pages, saveAllPages] = useCmsData(getPages, savePages);
  const [blogs, saveAllBlogs] = useCmsData(getBlogs, saveBlogs);
  const [cruises, saveAllCruises] = useCmsData(getCruises, saveCruises);

  // Page SEO
  const updatePageSeo = (index: number, field: string, value: string) => {
    saveSeoData(seoData.map((s, i) => i === index ? { ...s, [field === "seoTitle" ? "title" : field === "seoDescription" ? "description" : field === "seoKeywords" ? "keywords" : field]: value } : s));
  };

  // Blog SEO
  const updateBlogSeo = (id: string, field: string, value: string) => {
    saveAllBlogs(blogs.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  // Cruise SEO
  const updateCruiseSeo = (id: string, field: string, value: string) => {
    saveAllCruises(cruises.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Overall stats
  const allItems = [
    ...seoData.map(s => calcSeoScore(s.title, s.description, s.keywords)),
    ...blogs.map(b => calcSeoScore(b.seoTitle || "", b.seoDescription || "", b.seoKeywords || "")),
    ...cruises.map(c => calcSeoScore(c.seoTitle || "", c.seoDescription || "", c.seoKeywords || "")),
  ];
  const avgScore = allItems.length > 0 ? Math.round(allItems.reduce((a, b) => a + b.score, 0) / allItems.length) : 0;
  const goodCount = allItems.filter(i => i.score >= 80).length;
  const needsWorkCount = allItems.filter(i => i.score >= 50 && i.score < 80).length;
  const poorCount = allItems.filter(i => i.score < 50).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" /> SEO Manager
        </h1>
        <p className="text-sm text-muted-foreground">Review and edit SEO for every page, blog post, and cruise</p>
      </div>

      {/* Overview Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-5 w-5 mx-auto mb-1 text-primary" />
            <p className="text-2xl font-black text-foreground">{avgScore}%</p>
            <p className="text-xs text-muted-foreground">Average Score</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-emerald-600" />
            <p className="text-2xl font-black text-emerald-600">{goodCount}</p>
            <p className="text-xs text-muted-foreground">Good (80%+)</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-amber-500" />
            <p className="text-2xl font-black text-amber-500">{needsWorkCount}</p>
            <p className="text-xs text-muted-foreground">Needs Work</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <XCircle className="h-5 w-5 mx-auto mb-1 text-destructive" />
            <p className="text-2xl font-black text-destructive">{poorCount}</p>
            <p className="text-xs text-muted-foreground">{"Poor (<50%)"}</p>
          </CardContent>
        </Card>
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
            <Ship className="h-4 w-4" /> Cruises ({cruises.length})
          </TabsTrigger>
        </TabsList>

        {/* Pages SEO */}
        <TabsContent value="pages" className="mt-6 space-y-3">
          {seoData.map((seo, i) => (
            <SeoEditCard
              key={i}
              title={seo.pageSlug.charAt(0).toUpperCase() + seo.pageSlug.slice(1)}
              url={`/${seo.pageSlug === "home" ? "" : seo.pageSlug}`}
              seoTitle={seo.title}
              seoDescription={seo.description}
              seoKeywords={seo.keywords}
              onChange={(field, value) => updatePageSeo(i, field, value)}
              onSave={() => toast.success(`SEO saved for "${seo.pageSlug}"`)}
              extraBadge={<Badge variant="outline" className="text-xs hidden sm:inline-flex">/{seo.pageSlug}</Badge>}
            />
          ))}
        </TabsContent>

        {/* Blogs SEO */}
        <TabsContent value="blogs" className="mt-6 space-y-3">
          {blogs.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No blog posts yet. Create posts from the Blog Manager.</p>
          )}
          {blogs.map(blog => (
            <SeoEditCard
              key={blog.id}
              title={blog.title}
              url={`/blog/${blog.slug}`}
              seoTitle={blog.seoTitle || ""}
              seoDescription={blog.seoDescription || ""}
              seoKeywords={blog.seoKeywords || ""}
              ogImage={blog.ogImage}
              onChange={(field, value) => updateBlogSeo(blog.id, field, value)}
              onSave={() => toast.success(`SEO saved for "${blog.title}"`)}
              extraBadge={
                <Badge variant={blog.isPublished ? "default" : "outline"}
                  className={blog.isPublished ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs" : "text-xs"}>
                  {blog.isPublished ? "Published" : "Draft"}
                </Badge>
              }
            />
          ))}
        </TabsContent>

        {/* Cruises SEO */}
        <TabsContent value="cruises" className="mt-6 space-y-3">
          {cruises.map(cruise => (
            <SeoEditCard
              key={cruise.id}
              title={cruise.name}
              url={`/cruises/${cruise.id}`}
              seoTitle={cruise.seoTitle || ""}
              seoDescription={cruise.seoDescription || ""}
              seoKeywords={cruise.seoKeywords || ""}
              ogImage={cruise.ogImage}
              onChange={(field, value) => updateCruiseSeo(cruise.id, field, value)}
              onSave={() => toast.success(`SEO saved for "${cruise.name}"`)}
              extraBadge={
                cruise.featured ? <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">Featured</Badge> : undefined
              }
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
