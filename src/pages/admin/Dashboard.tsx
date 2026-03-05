import { Ship, FileText, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cruises } from "@/services/mockData";

export default function AdminDashboard() {
  const stats = [
    { icon: Ship, label: "Total Cruises", value: cruises.length, color: "text-primary" },
    { icon: FileText, label: "Pages", value: 7, color: "text-primary" },
    { icon: Users, label: "Users", value: 3, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Dashboard</h1>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s, i) => (
          <Card key={i} className="border-border">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
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
    </div>
  );
}
