import { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2, Clock, Eye, Ship, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCmsData, getReviews, saveReviews, type CustomerReview } from "@/services/cmsStore";
import { toast } from "sonner";

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"}`} />
      ))}
    </div>
  );
}

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
  approved: { label: "Approved", icon: CheckCircle, color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-destructive/10 text-destructive border-destructive/30" },
};

export default function ReviewsManager() {
  const [reviews, saveAll] = useCmsData(getReviews, saveReviews);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "cruise" | "blog">("all");

  const filtered = reviews.filter(r => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (typeFilter !== "all" && r.targetType !== typeFilter) return false;
    return true;
  });

  const pendingCount = reviews.filter(r => r.status === "pending").length;
  const approvedCount = reviews.filter(r => r.status === "approved").length;
  const rejectedCount = reviews.filter(r => r.status === "rejected").length;

  const updateStatus = (id: string, status: CustomerReview["status"]) => {
    saveAll(reviews.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Review ${status}`);
  };

  const deleteReview = (id: string) => {
    saveAll(reviews.filter(r => r.id !== id));
    toast.success("Review deleted");
  };

  const bulkApprove = () => {
    const pending = reviews.filter(r => r.status === "pending");
    if (pending.length === 0) return;
    saveAll(reviews.map(r => r.status === "pending" ? { ...r, status: "approved" as const } : r));
    toast.success(`${pending.length} reviews approved`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Star className="h-6 w-6 text-amber-400 fill-amber-400" /> Reviews Manager
          </h1>
          <p className="text-sm text-muted-foreground">Moderate customer reviews across cruises and blog posts</p>
        </div>
        {pendingCount > 0 && (
          <Button onClick={bulkApprove} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <CheckCircle className="h-4 w-4" /> Approve All Pending ({pendingCount})
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-black text-foreground">{reviews.length}</p>
            <p className="text-xs text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <Clock className="h-5 w-5 mx-auto mb-1 text-amber-500" />
            <p className="text-2xl font-black text-amber-500">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-5 w-5 mx-auto mb-1 text-emerald-600" />
            <p className="text-2xl font-black text-emerald-600">{approvedCount}</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <XCircle className="h-5 w-5 mx-auto mb-1 text-destructive" />
            <p className="text-2xl font-black text-destructive">{rejectedCount}</p>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={v => setStatusFilter(v as typeof statusFilter)}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select value={typeFilter} onValueChange={v => setTypeFilter(v as typeof typeFilter)}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="cruise">Cruises</SelectItem>
            <SelectItem value="blog">Blog Posts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews Table */}
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reviewer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="max-w-[250px]">Comment</TableHead>
                <TableHead>For</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(review => {
                const sc = statusConfig[review.status];
                const Icon = sc.icon;
                return (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground">{review.name}</p>
                        {review.email && <p className="text-xs text-muted-foreground">{review.email}</p>}
                      </div>
                    </TableCell>
                    <TableCell><StarDisplay rating={review.rating} /></TableCell>
                    <TableCell className="max-w-[250px]">
                      <p className="text-sm text-foreground/80 line-clamp-2">{review.comment}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1 text-xs">
                        {review.targetType === "cruise" ? <Ship className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                        <span className="truncate max-w-[100px]">{review.targetName}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`gap-1 ${sc.color}`}>
                        <Icon className="h-3 w-3" /> {sc.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {review.status !== "approved" && (
                          <Button size="icon" variant="ghost" onClick={() => updateStatus(review.id, "approved")} title="Approve" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {review.status !== "rejected" && (
                          <Button size="icon" variant="ghost" onClick={() => updateStatus(review.id, "rejected")} title="Reject" className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => deleteReview(review.id)} title="Delete" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    <Star className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p>No reviews found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
