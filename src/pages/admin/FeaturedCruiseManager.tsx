import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Plus, Trash2, GripVertical, Star, Ship } from "lucide-react";
import { getCruises, getSettings, saveSettings } from "@/services/cmsStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function FeaturedCruiseManager() {
  const allCruises = getCruises();
  const [settings, setSettings] = useState(getSettings);
  const [selectedCruise, setSelectedCruise] = useState("");

  const featuredIds: string[] = settings.featuredCruiseIds || [];
  const featuredCruises = featuredIds
    .map(id => allCruises.find(c => c.id === id))
    .filter(Boolean) as typeof allCruises;

  const availableCruises = allCruises.filter(c => !featuredIds.includes(c.id));

  const updateIds = (newIds: string[]) => {
    const updated = { ...settings, featuredCruiseIds: newIds };
    saveSettings(updated);
    setSettings(updated);
  };

  const addCruise = () => {
    if (!selectedCruise) return;
    updateIds([...featuredIds, selectedCruise]);
    setSelectedCruise("");
    toast({ title: "ক্রুজ যোগ করা হয়েছে" });
  };

  const removeCruise = (id: string) => {
    updateIds(featuredIds.filter(x => x !== id));
    toast({ title: "ক্রুজ সরানো হয়েছে" });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newIds = [...featuredIds];
    [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
    updateIds(newIds);
  };

  const moveDown = (index: number) => {
    if (index >= featuredIds.length - 1) return;
    const newIds = [...featuredIds];
    [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
    updateIds(newIds);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
          <Star className="h-6 w-6 text-primary" /> ফিচার্ড ক্রুজ পজিশন ম্যানেজার
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          হোমপেজে কোন ক্রুজগুলো দেখাবে এবং কোন ক্রমে দেখাবে তা এখান থেকে সেট করুন। সর্বোচ্চ ৬টি ক্রুজ দেখানো হবে।
        </p>
      </div>

      {/* Add cruise */}
      <Card className="mb-6 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">নতুন ক্রুজ যোগ করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Select value={selectedCruise} onValueChange={setSelectedCruise}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="ক্রুজ নির্বাচন করুন..." />
              </SelectTrigger>
              <SelectContent>
                {availableCruises.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex items-center gap-2">
                      <Ship className="h-3.5 w-3.5" /> {c.name}
                      <span className="text-xs text-muted-foreground">
                        ({c.destination === "tanguar-haor" ? "টাঙ্গুয়ার হাওর" : "সুন্দরবন"})
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addCruise} disabled={!selectedCruise || featuredIds.length >= 6} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> যোগ করুন
            </Button>
          </div>
          {featuredIds.length >= 6 && (
            <p className="text-xs text-destructive mt-2">সর্বোচ্চ ৬টি ক্রুজ যোগ করা যাবে</p>
          )}
        </CardContent>
      </Card>

      {/* Ordered list */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">বর্তমান ক্রম ({featuredCruises.length}টি)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {featuredCruises.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>কোনো ক্রুজ সেট করা হয়নি।</p>
              <p className="text-xs mt-1">উপরে থেকে ক্রুজ যোগ করুন, না হলে ডিফল্ট ক্রম দেখাবে।</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {featuredCruises.map((cruise, index) => (
                <div key={cruise.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                  <GripVertical className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
                  
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </span>

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={cruise.images[cruise.featuredImageIndex ?? 0]}
                      alt={cruise.name}
                      className="h-12 w-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">{cruise.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{cruise.route}</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold flex-shrink-0 ${
                    cruise.destination === "tanguar-haor"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {cruise.destination === "tanguar-haor" ? "টাঙ্গুয়ার হাওর" : "সুন্দরবন"}
                  </span>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => moveUp(index)} disabled={index === 0} className="h-8 w-8">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => moveDown(index)} disabled={index === featuredCruises.length - 1} className="h-8 w-8">
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => removeCruise(cruise.id)} className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
