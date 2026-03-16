import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Ship, Package, Image, FileText, Search, Users, Settings, LogOut, Menu, X, ExternalLink, MessageSquare, UserCheck, Flame, ClipboardList, Tag, CalendarDays, BookOpen, Star, Megaphone, ImageIcon, Crown, Grid3X3, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthToken, apiLogout } from "@/services/apiSync";

const sidebarLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { to: "/admin/contact-inquiries", label: "Contact Messages", icon: Mail },
  { to: "/admin/cruises", label: "Cruises", icon: Ship },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/availability", label: "Availability", icon: CalendarDays },
  { to: "/admin/offers", label: "Offers", icon: Flame },
  { to: "/admin/promo-ads", label: "অফার এডভারটাইজ", icon: Megaphone },
  { to: "/admin/blogs", label: "Blog Posts", icon: BookOpen },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/team", label: "Team Members", icon: UserCheck },
  { to: "/admin/hero-images", label: "Hero Images", icon: ImageIcon },
  { to: "/admin/featured-cruises", label: "ফিচার্ড ক্রুজ", icon: Star },
  { to: "/admin/homepage-content", label: "হোমপেজ কন্টেন্ট", icon: Home },
  { to: "/admin/seat-plans", label: "Seat Plans", icon: Grid3X3 },
  { to: "/admin/media", label: "Gallery", icon: Image },
  { to: "/admin/pages", label: "Pages CMS", icon: FileText },
  { to: "/admin/seo", label: "SEO Manager", icon: Search },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth guard: redirect to login if not authenticated
  useEffect(() => {
    const token = getAuthToken();
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (!token && !loggedIn) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    apiLogout();
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_user");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col gradient-navy text-secondary-foreground">
          <div className="flex h-16 items-center justify-between border-b border-secondary-foreground/10 px-5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Ship className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-primary">Admin Panel</span>
            </div>
            <button className="md:hidden p-1 rounded-lg hover:bg-secondary-foreground/10" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {sidebarLinks.map(link => {
              const active = link.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "gradient-primary text-primary-foreground shadow-md"
                      : "text-secondary-foreground/60 hover:bg-secondary-foreground/8 hover:text-secondary-foreground"
                  }`}
                >
                  <link.icon className="h-5 w-5" /> {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-secondary-foreground/10 p-3 space-y-1">
            <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-secondary-foreground/50 hover:bg-secondary-foreground/8 hover:text-primary transition-colors">
              <ExternalLink className="h-4 w-4" /> View Website
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-3 text-secondary-foreground/50 hover:bg-destructive/10 hover:text-destructive rounded-xl px-4 py-3 h-auto font-medium" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-16 items-center gap-4 border-b border-border/50 bg-card px-6">
          <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-display font-bold text-foreground">Lucky Tours & Travels</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">— Admin Dashboard</span>
        </header>
        <main className="flex-1 overflow-y-auto bg-warm-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
