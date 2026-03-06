import { Link } from "react-router-dom";
import { Ship, FileText, Users, Image, Star, Package, Settings, Search, Grid3X3, ArrowRight, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getCruises, getPages, getTestimonials, getTeamMembers, getSeo } from "@/services/cmsStore";

export default function AdminDashboard() {
  const cruises = getCruises();
  const pages = getPages();
  const testimonials = getTestimonials();
  const team = getTeamMembers();
  const totalPackages = cruises.reduce((sum, c) => sum + c.packages.length, 0);
  const totalImages = cruises.reduce((sum, c) => sum + c.images.length, 0);

  const stats = [
    { icon: Ship, label: "Total Cruises", value: cruises.length, color: "text-primary", bg: "bg-primary/10" },
    { icon: Package, label: "Packages", value: totalPackages, color: "text-emerald", bg: "bg-emerald/10" },
    { icon: Image, label: "Images", value: totalImages, color: "text-gold", bg: "bg-gold/10" },
    { icon: Star, label: "Testimonials", value: testimonials.length, color: "text-primary", bg: "bg-primary/10" },
    { icon: Users, label: "Team Members", value: team.length, color: "text-emerald", bg: "bg-emerald/10" },
    { icon: FileText, label: "Pages", value: pages.length, color: "text-gold", bg: "bg-gold/10" },
  ];

  const quickActions = [
    { to: "/admin/cruises", label: "Manage Cruises", icon: Ship },
    { to: "/admin/packages", label: "Manage Packages", icon: Package },
    { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/admin/team", label: "Team Members", icon: Users },
    { to: "/admin/media", label: "Media Library", icon: Image },
    { to: "/admin/seat-plans", label: "Seat Plans", icon: Grid3X3 },
    { to: "/admin/pages", label: "Pages CMS", icon: FileText },
    { to: "/admin/seo", label: "SEO Manager", icon: Search },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Dashboard</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s, i) => (
          <Card key={i} className="border-border">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-bold text-secondary">Quick Actions</h2>
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
