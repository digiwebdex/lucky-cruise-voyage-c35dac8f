import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCmsData, getHomepageContent, saveHomepageContent, type HomepageContent } from "@/services/cmsStore";
import { toast } from "sonner";
import { Home, Star, Shield, MessageSquare, Megaphone, BarChart3, Save } from "lucide-react";

function FieldPair({ label, enValue, bnValue, onEnChange, onBnChange, multiline = false }: {
  label: string;
  enValue: string;
  bnValue: string;
  onEnChange: (v: string) => void;
  onBnChange: (v: string) => void;
  multiline?: boolean;
}) {
  const Comp = multiline ? Textarea : Input;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label className="text-xs text-muted-foreground">{label} (English)</Label>
        <Comp value={enValue} onChange={(e: any) => onEnChange(e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">{label} (বাংলা)</Label>
        <Comp value={bnValue} onChange={(e: any) => onBnChange(e.target.value)} className="mt-1" />
      </div>
    </div>
  );
}

export default function HomepageContentManager() {
  const [content, setContent] = useCmsData(getHomepageContent, saveHomepageContent);

  const update = (field: keyof HomepageContent, value: string) => {
    setContent({ ...content, [field]: value });
  };

  const handleSave = () => {
    saveHomepageContent(content);
    toast.success("হোমপেজ কন্টেন্ট সেভ হয়েছে!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" /> হোমপেজ কন্টেন্ট ম্যানেজার
          </h1>
          <p className="text-sm text-muted-foreground mt-1">হোমপেজের সকল সেকশনের টেক্সট এডিট করুন</p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="h-4 w-4" /> সেভ করুন
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="hero" className="gap-1 text-xs"><Star className="h-3 w-3" /> হিরো</TabsTrigger>
          <TabsTrigger value="stats" className="gap-1 text-xs"><BarChart3 className="h-3 w-3" /> স্ট্যাটস</TabsTrigger>
          <TabsTrigger value="featured" className="gap-1 text-xs"><Star className="h-3 w-3" /> ফিচার্ড</TabsTrigger>
          <TabsTrigger value="whyus" className="gap-1 text-xs"><Shield className="h-3 w-3" /> কেন আমরা</TabsTrigger>
          <TabsTrigger value="testimonials" className="gap-1 text-xs"><MessageSquare className="h-3 w-3" /> টেস্টিমোনিয়াল</TabsTrigger>
          <TabsTrigger value="cta" className="gap-1 text-xs"><Megaphone className="h-3 w-3" /> CTA & প্রোমো</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="mt-6 space-y-4">
          <Card className="border-border">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-foreground">হিরো সেকশন</h2>
              <FieldPair label="ব্যাজ টেক্সট" enValue={content.heroBadge} bnValue={content.heroBadgeBn} onEnChange={v => update("heroBadge", v)} onBnChange={v => update("heroBadgeBn", v)} />
              <FieldPair label="শিরোনাম" enValue={content.heroTitle} bnValue={content.heroTitleBn} onEnChange={v => update("heroTitle", v)} onBnChange={v => update("heroTitleBn", v)} />
              <FieldPair label="হাইলাইট টেক্সট" enValue={content.heroHighlight} bnValue={content.heroHighlightBn} onEnChange={v => update("heroHighlight", v)} onBnChange={v => update("heroHighlightBn", v)} />
              <FieldPair label="সাবটাইটেল" enValue={content.heroSubtitle} bnValue={content.heroSubtitleBn} onEnChange={v => update("heroSubtitle", v)} onBnChange={v => update("heroSubtitleBn", v)} multiline />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats */}
        <TabsContent value="stats" className="mt-6 space-y-4">
          <Card className="border-border">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-foreground">হিরো স্ট্যাটস ও কুইক ইনফো স্ট্রিপ</h2>
              <h3 className="text-sm font-semibold text-muted-foreground mt-4">হিরো স্ট্যাটস</h3>
              {[1, 2, 3].map(n => (
                <div key={n} className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-3 border-b border-border last:border-0">
                  <div>
                    <Label className="text-xs">মান (Value)</Label>
                    <Input value={(content as any)[`stat${n}Value`]} onChange={e => update(`stat${n}Value` as any, e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">লেবেল (English)</Label>
                    <Input value={(content as any)[`stat${n}Label`]} onChange={e => update(`stat${n}Label` as any, e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">লেবেল (বাংলা)</Label>
                    <Input value={(content as any)[`stat${n}LabelBn`]} onChange={e => update(`stat${n}LabelBn` as any, e.target.value)} className="mt-1" />
                  </div>
                </div>
              ))}
              <h3 className="text-sm font-semibold text-muted-foreground mt-6">কুইক ইনফো স্ট্রিপ</h3>
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-3 border-b border-border last:border-0">
                  <div>
                    <Label className="text-xs">মান (Value)</Label>
                    <Input value={(content as any)[`strip${n}Value`]} onChange={e => update(`strip${n}Value` as any, e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">লেবেল (English)</Label>
                    <Input value={(content as any)[`strip${n}Label`]} onChange={e => update(`strip${n}Label` as any, e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">লেবেল (বাংলা)</Label>
                    <Input value={(content as any)[`strip${n}LabelBn`]} onChange={e => update(`strip${n}LabelBn` as any, e.target.value)} className="mt-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Section */}
        <TabsContent value="featured" className="mt-6 space-y-4">
          <Card className="border-border">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-foreground">ফিচার্ড ক্রুজ সেকশন</h2>
              <FieldPair label="সেকশন লেবেল" enValue={content.featuredSectionLabel} bnValue={content.featuredSectionLabelBn} onEnChange={v => update("featuredSectionLabel", v)} onBnChange={v => update("featuredSectionLabelBn", v)} />
              <FieldPair label="শিরোনাম" enValue={content.featuredTitle} bnValue={content.featuredTitleBn} onEnChange={v => update("featuredTitle", v)} onBnChange={v => update("featuredTitleBn", v)} />
              <FieldPair label="হাইলাইট" enValue={content.featuredHighlight} bnValue={content.featuredHighlightBn} onEnChange={v => update("featuredHighlight", v)} onBnChange={v => update("featuredHighlightBn", v)} />
              <FieldPair label="সাবটাইটেল" enValue={content.featuredSubtitle} bnValue={content.featuredSubtitleBn} onEnChange={v => update("featuredSubtitle", v)} onBnChange={v => update("featuredSubtitleBn", v)} multiline />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Why Us */}
        <TabsContent value="whyus" className="mt-6 space-y-4">
          <Card className="border-border">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-foreground">কেন আমাদের বেছে নেবেন সেকশন</h2>
              <FieldPair label="শিরোনাম" enValue={content.whyUsTitle} bnValue={content.whyUsTitleBn} onEnChange={v => update("whyUsTitle", v)} onBnChange={v => update("whyUsTitleBn", v)} />
              <FieldPair label="হাইলাইট" enValue={content.whyUsHighlight} bnValue={content.whyUsHighlightBn} onEnChange={v => update("whyUsHighlight", v)} onBnChange={v => update("whyUsHighlightBn", v)} />
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="space-y-2 p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs font-bold text-primary">আইটেম {n}</p>
                  <FieldPair label="শিরোনাম" enValue={(content as any)[`whyUs${n}Title`]} bnValue={(content as any)[`whyUs${n}TitleBn`]} onEnChange={v => update(`whyUs${n}Title` as any, v)} onBnChange={v => update(`whyUs${n}TitleBn` as any, v)} />
                  <FieldPair label="বর্ণনা" enValue={(content as any)[`whyUs${n}Desc`]} bnValue={(content as any)[`whyUs${n}DescBn`]} onEnChange={v => update(`whyUs${n}Desc` as any, v)} onBnChange={v => update(`whyUs${n}DescBn` as any, v)} multiline />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials */}
        <TabsContent value="testimonials" className="mt-6 space-y-4">
          <Card className="border-border">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-foreground">টেস্টিমোনিয়াল সেকশন</h2>
              <FieldPair label="শিরোনাম" enValue={content.testimonialsTitle} bnValue={content.testimonialsTitleBn} onEnChange={v => update("testimonialsTitle", v)} onBnChange={v => update("testimonialsTitleBn", v)} />
              <FieldPair label="হাইলাইট" enValue={content.testimonialsHighlight} bnValue={content.testimonialsHighlightBn} onEnChange={v => update("testimonialsHighlight", v)} onBnChange={v => update("testimonialsHighlightBn", v)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA & Promo */}
        <TabsContent value="cta" className="mt-6 space-y-4">
          <Card className="border-border">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-foreground">CTA (কল টু অ্যাকশন) সেকশন</h2>
              <FieldPair label="শিরোনাম" enValue={content.ctaTitle} bnValue={content.ctaTitleBn} onEnChange={v => update("ctaTitle", v)} onBnChange={v => update("ctaTitleBn", v)} />
              <FieldPair label="হাইলাইট" enValue={content.ctaHighlight} bnValue={content.ctaHighlightBn} onEnChange={v => update("ctaHighlight", v)} onBnChange={v => update("ctaHighlightBn", v)} />
              <FieldPair label="সাবটাইটেল" enValue={content.ctaSubtitle} bnValue={content.ctaSubtitleBn} onEnChange={v => update("ctaSubtitle", v)} onBnChange={v => update("ctaSubtitleBn", v)} multiline />
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-foreground">প্রোমো প্যাকেজ সেকশন শিরোনাম</h2>
              <FieldPair label="শিরোনাম" enValue={content.promoTitle} bnValue={content.promoTitleBn} onEnChange={v => update("promoTitle", v)} onBnChange={v => update("promoTitleBn", v)} />
              <FieldPair label="সাবটাইটেল" enValue={content.promoSubtitle} bnValue={content.promoSubtitleBn} onEnChange={v => update("promoSubtitle", v)} onBnChange={v => update("promoSubtitleBn", v)} multiline />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="h-4 w-4" /> সব সেভ করুন
        </Button>
      </div>
    </div>
  );
}
