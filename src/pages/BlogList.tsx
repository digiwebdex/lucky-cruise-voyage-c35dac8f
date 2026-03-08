import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, BookOpen, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBlogs } from "@/services/cmsStore";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function BlogList() {
  const { lang } = useLanguage();
  const allBlogs = getBlogs().filter(b => b.isPublished);
  const [filter, setFilter] = useState<"all" | "sundarban" | "tanguar-haor">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return allBlogs;
    return allBlogs.filter(b => b.category === filter);
  }, [filter, allBlogs]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
              <BookOpen className="h-3.5 w-3.5" /> {lang === "bn" ? "ব্লগ" : "Blog"}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-secondary-foreground">
              {lang === "bn" ? "ভ্রমণ গল্প ও " : "Travel Stories & "}
              <span className="text-primary">{lang === "bn" ? "গাইড" : "Guides"}</span>
            </h1>
            <p className="mt-3 text-secondary-foreground/60 text-sm max-w-md mx-auto">
              {lang === "bn" ? "সুন্দরবন ও টাঙ্গুয়ার হাওর সম্পর্কে আমাদের ভ্রমণ টিপস, গাইড ও গল্প পড়ুন" : "Read our travel tips, guides and stories about Sundarban & Tanguar Haor"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container">
          <div className="flex justify-center mb-8">
            <Tabs value={filter} onValueChange={v => setFilter(v as typeof filter)}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all" className="gap-1.5"><Filter className="h-3 w-3" /> {lang === "bn" ? "সব" : "All"}</TabsTrigger>
                <TabsTrigger value="sundarban">{lang === "bn" ? "সুন্দরবন" : "Sundarban"}</TabsTrigger>
                <TabsTrigger value="tanguar-haor">{lang === "bn" ? "টাঙ্গুয়ার হাওর" : "Tanguar Haor"}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {lang === "bn" ? "কোনো ব্লগ পোস্ট পাওয়া যায়নি" : "No blog posts found"}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.06 }}>
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full bg-card">
                      <div className="aspect-[16/10] overflow-hidden relative bg-muted">
                        {post.coverImage ? (
                          <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20">
                            <BookOpen className="h-12 w-12 text-primary/30" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <Badge className={post.category === "tanguar-haor" ? "bg-emerald text-emerald-foreground" : "bg-primary text-primary-foreground"}>
                            {post.category === "tanguar-haor" ? (lang === "bn" ? "টাঙ্গুয়ার হাওর" : "Tanguar Haor") : (lang === "bn" ? "সুন্দরবন" : "Sundarban")}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between border-t border-border pt-3">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.publishedAt).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
