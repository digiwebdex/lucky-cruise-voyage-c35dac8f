import { Link } from "react-router-dom";
import { Ship, FileText, Users, Image, Star, Package, Settings, Search, Grid3X3, ArrowRight, MessageSquare, ClipboardList, BookOpen, Megaphone, Home, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getCruises, getPages, getTestimonials, getTeamMembers, getBlogs, getReviews, getPromoAds, getContactInquiries } from "@/services/cmsStore";
import { getBookings } from "@/services/bookingStore";

export default function AdminDashboard() {
  const cruises = getCruises();
  const pages = getPages();
  const testimonials = getTestimonials();
  const team = getTeamMembers();
  const blogs = getBlogs();
  const reviews = getReviews();
  const promoAds = getPromoAds();
  const bookings = getBookings();
  const contactInquiries = getContactInquiries();
  const totalPackages = cruises.reduce((sum, c) => sum + c.packages.length, 0);
  const totalImages = cruises.reduce((sum, c) => sum + c.images.length, 0);
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const newContacts = contactInquiries.filter(i => i.status === "new").length;
  const pendingReviews = reviews.filter(r => r.status === "pending").length;

  const stats = [
    { icon: ClipboardList, label: "Bookings", value: bookings.length, sub: pendingBookings > 0 ? `${pendingBookings} pending` : undefined, color: "text-primary", bg: "bg-primary/10" },
    { icon: Mail, label: "Contact Messages", value: contactInquiries.length, sub: newContacts > 0 ? `${newContacts} new` : undefined, color: "text-blue-600", bg: "bg-blue-500/10" },
    { icon: Ship, label: "Total Cruises", value: cruises.length, color: "text-primary", bg: "bg-primary/10" },
    { icon: Package, label: "Packages", value: totalPackages, color: "text-emerald", bg: "bg-emerald/10" },
    { icon: BookOpen, label: "Blog Posts", value: blogs.length, color: "text-gold", bg: "bg-gold/10" },
    { icon: Star, label: "Reviews", value: reviews.length, sub: pendingReviews > 0 ? `${pendingReviews} pending` : undefined, color: "text-primary", bg: "bg-primary/10" },
    { icon: Megaphone, label: "Promo Ads", value: promoAds.filter(a => a.isActive).length, color: "text-emerald", bg: "bg-emerald/10" },
    { icon: Image, label: "Images", value: totalImages, color: "text-gold", bg: "bg-gold/10" },
    { icon: MessageSquare, label: "Testimonials", value: testimonials.length, color: "text-primary", bg: "bg-primary/10" },
    { icon: Users, label: "Team Members", value: team.length, color: "text-emerald", bg: "bg-emerald/10" },
    { icon: FileText, label: "Pages", value: pages.length, color: "text-gold", bg: "bg-gold/10" },
  ];

  const quickActions = [
    { to: "/admin/bookings", label: "Manage Bookings", icon: ClipboardList },
    { to: "/admin/contact-inquiries", label: "Contact Messages", icon: Mail },
    { to: "/admin/cruises", label: "Manage Cruises", icon: Ship },
    { to: "/admin/packages", label: "Manage Packages", icon: Package },
    { to: "/admin/promo-ads", label: "অফার এডভারটাইজ", icon: Megaphone },
    { to: "/admin/blogs", label: "Blog Posts", icon: BookOpen },
    { to: "/admin/reviews", label: "Reviews", icon: Star },
    { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/admin/team", label: "Team Members", icon: Users },
    { to: "/admin/homepage-content", label: "হোমপেজ কন্টেন্ট", icon: Home },
    { to: "/admin/hero-images", label: "Hero Images", icon: Image },
    { to: "/admin/featured-cruises", label: "ফিচার্ড ক্রুজ", icon: Star },
    { to: "/admin/seat-plans", label: "Seat Plans", icon: Grid3X3 },
    { to: "/admin/media", label: "Gallery", icon: Image },
    { to: "/admin/pages", label: "Pages CMS", icon: FileText },
    { to: "/admin/seo", label: "SEO Manager", icon: Search },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={i} className="border-border">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                {s.sub && <p className="text-xs text-primary font-semibold">{s.sub}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-bold text-foreground">Quick Actions</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map(a => (
          <Link key={a.to} to={a.to}>
            <Card className="border-border hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <a.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">{a.label}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
