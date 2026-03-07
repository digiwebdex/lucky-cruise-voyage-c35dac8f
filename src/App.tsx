import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import CruiseList from "./pages/CruiseList";
import CruiseDetail from "./pages/CruiseDetail";
import Packages from "./pages/Packages";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import CruiseManager from "./pages/admin/CruiseManager";
import CruiseEditor from "./pages/admin/CruiseEditor";
import PackagesManager from "./pages/admin/PackagesManager";
import MediaLibrary from "./pages/admin/MediaLibrary";
import PagesCMS from "./pages/admin/PagesCMS";
import SEOManager from "./pages/admin/SEOManager";
import UsersPage from "./pages/admin/Users";
import SettingsPage from "./pages/admin/Settings";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import TeamManager from "./pages/admin/TeamManager";
import OffersManager from "./pages/admin/OffersManager";
import Bookings from "./pages/admin/Bookings";
import CategoriesManager from "./pages/admin/CategoriesManager";
import AvailabilityManager from "./pages/admin/AvailabilityManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/cruises" element={<CruiseList />} />
              <Route path="/cruises/:id" element={<CruiseDetail />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="cruises" element={<CruiseManager />} />
              <Route path="cruises/new" element={<CruiseEditor />} />
              <Route path="cruises/:id" element={<CruiseEditor />} />
              <Route path="packages" element={<PackagesManager />} />
              <Route path="categories" element={<CategoriesManager />} />
              <Route path="availability" element={<AvailabilityManager />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="testimonials" element={<TestimonialsManager />} />
              <Route path="offers" element={<OffersManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="media" element={<MediaLibrary />} />
              
              <Route path="pages" element={<PagesCMS />} />
              <Route path="seo" element={<SEOManager />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
