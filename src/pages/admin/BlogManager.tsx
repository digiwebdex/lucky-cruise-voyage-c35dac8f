import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCmsData, getBlogs, saveBlogs, type BlogPost } from "@/services/cmsStore";
import { toast } from "sonner";
import SeoFieldsPanel from "@/components/admin/SeoFieldsPanel";

const emptyPost: Omit<BlogPost, "id"> = {
  title: "",
  slug: "",
  category: "sundarban",
  excerpt: "",
  body: "",
  coverImage: "",
  youtubeUrl: "",
  author: "Lucky Tours",
  publishedAt: new Date().toISOString(),
  isPublished: true,
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  ogImage: "",
};

export default function BlogManager() {
  const [blogs, saveAll] = useCmsData(getBlogs, saveBlogs);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [filter, setFilter] = useState<"all" | "sundarban" | "tanguar-haor">("all");

  const filtered = filter === "all" ? blogs : blogs.filter(b => b.category === filter);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyPost, publishedAt: new Date().toISOString() });
    setEditOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({ ...post });
    setEditOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, coverImage: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || `post-${Date.now()}`;

  const handleSave = () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    const slug = form.slug || generateSlug(form.title);
    if (editing) {
      const updated = blogs.map(b => b.id === editing.id ? { ...form, id: editing.id, slug } : b);
      saveAll(updated);
      toast.success("Blog post updated!");
    } else {
      const newPost: BlogPost = { ...form, id: `blog-${Date.now()}`, slug };
      saveAll([newPost, ...blogs]);
      toast.success("Blog post created!");
    }
    setEditOpen(false);
  };

  const handleDelete = (id: string) => {
    saveAll(blogs.filter(b => b.id !== id));
    toast.success("Blog post deleted!");
  };

  const togglePublish = (id: string) => {
    saveAll(blogs.map(b => b.id === id ? { ...b, isPublished: !b.isPublished } : b));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Blog Manager</h1>
          <p className="text-sm text-muted-foreground">Manage travel stories and guides</p>
        </div>
        <Button onClick={openNew} className="gap-2 bg-primary text-primary-foreground">
          <Plus className="h-4 w-4" /> New Blog Post
        </Button>
      </div>

      <Tabs value={filter} onValueChange={v => setFilter(v as typeof filter)}>
        <TabsList>
          <TabsTrigger value="all">সব ({blogs.length})</TabsTrigger>
          <TabsTrigger value="sundarban">সুন্দরবন ({blogs.filter(b => b.category === "sundarban").length})</TabsTrigger>
          <TabsTrigger value="tanguar-haor">টাঙ্গুয়ার হাওর ({blogs.filter(b => b.category === "tanguar-haor").length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(post => (
              <TableRow key={post.id}>
                <TableCell>
                  {post.coverImage ? (
                    <img src={post.coverImage} alt="" className="h-12 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="h-12 w-16 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">No img</div>
                  )}
                </TableCell>
                <TableCell className="font-semibold max-w-[200px] truncate">{post.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={post.category === "tanguar-haor" ? "border-emerald/30 bg-emerald/5 text-emerald" : "border-primary/30 bg-primary/5 text-primary"}>
                    {post.category === "tanguar-haor" ? "টাঙ্গুয়ার হাওর" : "সুন্দরবন"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <button onClick={() => togglePublish(post.id)}>
                    {post.isPublished ? (
                      <Badge className="bg-emerald/10 text-emerald border-emerald/30 gap-1 cursor-pointer"><Eye className="h-3 w-3" /> Published</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground gap-1 cursor-pointer"><EyeOff className="h-3 w-3" /> Draft</Badge>
                    )}
                  </button>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString("bn-BD")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(post)} className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(post.id)} className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No blog posts found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Blog Post" : "New Blog Post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Blog post title" />
            </div>
            <div>
              <Label>Slug (auto-generated if empty)</Label>
              <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="url-friendly-slug" />
            </div>
            <div>
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as BlogPost["category"] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sundarban">সুন্দরবন</SelectItem>
                  <SelectItem value="tanguar-haor">টাঙ্গুয়ার হাওর</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cover Image</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {form.coverImage && <img src={form.coverImage} alt="" className="mt-2 h-32 w-full rounded-lg object-cover" />}
            </div>
            <div>
              <Label>YouTube Video URL</Label>
              <Input value={form.youtubeUrl || ""} onChange={e => setForm(f => ({ ...f, youtubeUrl: e.target.value }))} placeholder="https://www.youtube.com/watch?v=..." />
              <p className="text-xs text-muted-foreground mt-1">ব্লগ পোস্টে YouTube ভিডিও এম্বেড করতে লিঙ্ক দিন</p>
            </div>
            <div>
              <Label>Excerpt *</Label>
              <Textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary..." rows={2} />
            </div>
            <div>
              <Label>Body *</Label>
              <Textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Full blog content..." rows={8} />
            </div>
            <div>
              <Label>Author</Label>
              <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isPublished} onCheckedChange={v => setForm(f => ({ ...f, isPublished: v }))} />
              <Label>{form.isPublished ? "Published" : "Draft"}</Label>
            </div>

            {/* SEO Section */}
            <SeoFieldsPanel
              seoTitle={form.seoTitle || ""}
              seoDescription={form.seoDescription || ""}
              seoKeywords={form.seoKeywords || ""}
              ogImage={form.ogImage || ""}
              onChange={(field, value) => setForm(f => ({ ...f, [field]: value }))}
              titlePlaceholder={form.title}
            />

            <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground">
              {editing ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
