import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, BookOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogs } from "@/services/cmsStore";
import { useLanguage } from "@/contexts/LanguageContext";
import ReviewSection from "@/components/ReviewSection";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function BlogDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const blogs = getBlogs().filter(b => b.isPublished);
  const post = blogs.find(b => b.slug === slug);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground mb-4">
          {lang === "bn" ? "পোস্ট পাওয়া যায়নি" : "Post Not Found"}
        </h1>
        <Link to="/blog">
          <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> {lang === "bn" ? "ব্লগে ফিরুন" : "Back to Blog"}</Button>
        </Link>
      </div>
    );
  }

  const relatedPosts = blogs.filter(b => b.id !== post.id && b.category === post.category).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary py-10 sm:py-14">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary font-semibold mb-4 hover:underline">
              <ArrowLeft className="h-4 w-4" /> {lang === "bn" ? "সব ব্লগ" : "All Blogs"}
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <Badge className={post.category === "tanguar-haor" ? "bg-emerald text-emerald-foreground" : "bg-primary text-primary-foreground"}>
                <Tag className="h-3 w-3 mr-1" />
                {post.category === "tanguar-haor" ? (lang === "bn" ? "টাঙ্গুয়ার হাওর" : "Tanguar Haor") : (lang === "bn" ? "সুন্দরবন" : "Sundarban")}
              </Badge>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-secondary-foreground max-w-3xl leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-secondary-foreground/60">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(post.publishedAt).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {post.coverImage && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}>
                <img src={post.coverImage} alt={post.title} className="w-full rounded-xl mb-8 shadow-md" />
              </motion.div>
            )}

            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.15 }}>
              <p className="text-lg text-primary font-semibold mb-6 border-l-4 border-primary pl-4">{post.excerpt}</p>
            </motion.div>

            <motion.article initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="prose prose-lg max-w-none">
              {post.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed mb-4">{para}</p>
              ))}
            </motion.article>

            {/* CTA */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {lang === "bn" ? "এই ভ্রমণে যেতে চান?" : "Want to go on this trip?"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {lang === "bn" ? "আমাদের সাথে যোগাযোগ করুন এবং আজই বুকিং করুন" : "Contact us and book your trip today"}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/cruises">
                  <Button className="bg-primary text-primary-foreground gap-2">{lang === "bn" ? "ক্রুজ দেখুন" : "Explore Cruises"}</Button>
                </Link>
                <a href="https://wa.me/8801711871072" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary/30 text-primary gap-2">{lang === "bn" ? "হোয়াটসঅ্যাপে মেসেজ করুন" : "WhatsApp Us"}</Button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-14 max-w-3xl mx-auto">
              <h3 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {lang === "bn" ? "সম্পর্কিত পোস্ট" : "Related Posts"}
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map(rp => (
                  <Link key={rp.id} to={`/blog/${rp.slug}`}>
                    <Card className="group hover:shadow-md transition-shadow h-full bg-card border-border">
                      <CardContent className="p-4">
                        <h4 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">{rp.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{rp.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews */}
          <div className="mt-14 max-w-3xl mx-auto">
            <ReviewSection targetType="blog" targetId={post.id} targetName={post.title} />
          </div>
        </div>
      </section>
    </div>
  );
}
