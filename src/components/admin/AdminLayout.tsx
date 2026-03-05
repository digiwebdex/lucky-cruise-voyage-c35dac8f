import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Ship, Package, BookOpen, Image, Grid3X3, FileText, Search, Users, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/cruises", label: "Cruises", icon: Ship },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { to: "/admin/media", label: "Media Library", icon: Image },
  { to: "/admin/seat-plans", label: "Seat Plans", icon: Grid3X3 },
  { to: "/admin/pages", label: "Pages CMS", icon: FileText },
  { to: "/admin/seo", label: "SEO Manager", icon: Search },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-foreground/30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-secondary text-secondary-foreground transition-transform md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-14 items-center justify-between border-b border-secondary-foreground/10 px-4">
          <Link to="/admin" className="text-lg font-bold text-primary">Admin Panel</Link>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-1 p-3">
          {sidebarLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary-foreground/10 ${
                (link.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(link.to)) ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <link.icon className="h-4 w-4" /> {link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-secondary-foreground/10 p-3">
          <Button variant="ghost" className="w-full justify-start gap-2 text-secondary-foreground hover:bg-secondary-foreground/10" onClick={() => navigate("/admin/login")}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
          <span className="text-sm font-medium text-muted-foreground">Lucky Tours & Travels — Admin</span>
          <Link to="/" className="ml-auto text-sm text-primary hover:underline">View Website →</Link>
        </header>
        <main className="flex-1 overflow-y-auto bg-warm-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
