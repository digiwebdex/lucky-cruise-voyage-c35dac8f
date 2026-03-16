import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Clock, CheckCircle, Reply, Trash2 } from "lucide-react";
import { useCmsData, getContactInquiries, saveContactInquiries, type ContactInquiry } from "@/services/cmsStore";
import { format } from "date-fns";
import { toast } from "sonner";

const statusConfig = {
  new: { label: "New", icon: Clock, className: "bg-blue-100 text-blue-800 border-blue-300" },
  read: { label: "Read", icon: CheckCircle, className: "bg-amber-100 text-amber-800 border-amber-300" },
  replied: { label: "Replied", icon: Reply, className: "bg-emerald-100 text-emerald-800 border-emerald-300" },
};

export default function ContactInquiries() {
  const [inquiries, setInquiries] = useCmsData(getContactInquiries, saveContactInquiries);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? inquiries : inquiries.filter(i => i.status === filter);

  const updateStatus = (id: string, status: ContactInquiry["status"]) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
    toast.success("স্ট্যাটাস আপডেট হয়েছে");
  };

  const deleteInquiry = (id: string) => {
    setInquiries(inquiries.filter(i => i.id !== id));
    toast.success("মুছে ফেলা হয়েছে");
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" /> Contact Inquiries
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({inquiries.length})</SelectItem>
              <SelectItem value="new">New ({inquiries.filter(i => i.status === "new").length})</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border">
          <CardContent className="p-8 text-center text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
            <p>No contact inquiries {filter !== "all" ? `with status "${filter}"` : "yet"}.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[160px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(inq => {
                  const sc = statusConfig[inq.status];
                  return (
                    <TableRow key={inq.id}>
                      <TableCell className="font-medium">{inq.name}</TableCell>
                      <TableCell className="text-sm">{inq.email}</TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="text-sm text-muted-foreground line-clamp-2">{inq.message}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={sc.className}>
                          <sc.icon className="h-3 w-3 mr-1" /> {sc.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {format(new Date(inq.createdAt), "MMM dd, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Select value={inq.status} onValueChange={(v) => updateStatus(inq.id, v as ContactInquiry["status"])}>
                            <SelectTrigger className="h-8 text-xs w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="replied">Replied</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={() => deleteInquiry(inq.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {inquiries.length > 0 && (
        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
          <span>Total: {inquiries.length}</span>
          <span>New: {inquiries.filter(i => i.status === "new").length}</span>
          <span>Replied: {inquiries.filter(i => i.status === "replied").length}</span>
        </div>
      )}
    </div>
  );
}
