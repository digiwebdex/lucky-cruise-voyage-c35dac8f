import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, Tag, Image as ImageIcon } from "lucide-react";

interface SeoFieldsPanelProps {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
  onChange: (field: string, value: string) => void;
  /** Optional: page/post title to show as placeholder */
  titlePlaceholder?: string;
}

export default function SeoFieldsPanel({
  seoTitle,
  seoDescription,
  seoKeywords,
  ogImage,
  onChange,
  titlePlaceholder = "",
}: SeoFieldsPanelProps) {
  const titleLen = seoTitle.length;
  const descLen = seoDescription.length;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Search className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-foreground">SEO Settings</h3>
        </div>

        {/* Google Preview */}
        <div className="rounded-lg border border-border bg-background p-4 space-y-1">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Google Preview</p>
          <p className="text-[#1a0dab] text-lg leading-snug truncate font-medium">
            {seoTitle || titlePlaceholder || "Page Title"}
          </p>
          <p className="text-[#006621] text-sm truncate">
            luckycruisevoyage.com/...
          </p>
          <p className="text-sm text-[#545454] line-clamp-2">
            {seoDescription || "Add a meta description to improve search visibility..."}
          </p>
        </div>

        {/* Meta Title */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-1.5 text-sm">
              <FileText className="h-3.5 w-3.5 text-primary" /> Meta Title
            </Label>
            <span className={`text-xs ${titleLen > 60 ? "text-destructive" : "text-muted-foreground"}`}>
              {titleLen}/60
            </span>
          </div>
          <Input
            value={seoTitle}
            onChange={e => onChange("seoTitle", e.target.value)}
            placeholder={titlePlaceholder || "SEO optimized page title"}
            className="bg-background"
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-1.5 text-sm">
              <FileText className="h-3.5 w-3.5 text-primary" /> Meta Description
            </Label>
            <span className={`text-xs ${descLen > 160 ? "text-destructive" : "text-muted-foreground"}`}>
              {descLen}/160
            </span>
          </div>
          <Textarea
            value={seoDescription}
            onChange={e => onChange("seoDescription", e.target.value)}
            placeholder="Brief description for search engines (max 160 chars)"
            rows={3}
            className="bg-background"
          />
        </div>

        {/* Keywords */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5 text-sm">
            <Tag className="h-3.5 w-3.5 text-primary" /> Focus Keywords
          </Label>
          <Input
            value={seoKeywords}
            onChange={e => onChange("seoKeywords", e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
            className="bg-background"
          />
          <p className="text-xs text-muted-foreground">Separate keywords with commas</p>
        </div>

        {/* OG Image */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5 text-sm">
            <ImageIcon className="h-3.5 w-3.5 text-primary" /> OG Image (Social Share)
          </Label>
          <Input
            value={ogImage}
            onChange={e => onChange("ogImage", e.target.value)}
            placeholder="https://... or leave empty to use cover image"
            className="bg-background"
          />
          {ogImage && (
            <img src={ogImage} alt="OG Preview" className="mt-2 h-24 w-full rounded-lg object-cover border border-border" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
