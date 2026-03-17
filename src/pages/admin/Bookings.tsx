import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClipboardList, Users, Baby, Phone, Calendar, CheckCircle, XCircle, Clock, StickyNote, Eye } from "lucide-react";
import { useBookingStore, getBookings, saveBookings, type Booking } from "@/services/bookingStore";
import { format } from "date-fns";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-amber-100 text-amber-800 border-amber-300" },
  confirmed: { label: "Confirmed", icon: CheckCircle, className: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  cancelled: { label: "Cancelled", icon: XCircle, className: "bg-red-100 text-red-800 border-red-300" },
};

export default function Bookings() {
  const [bookings, setBookings] = useBookingStore(getBookings, saveBookings);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  const updateStatus = (id: string, status: Booking["status"]) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" /> Bookings
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({bookings.length})</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border">
          <CardContent className="p-8 text-center text-muted-foreground">
            <ClipboardList className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
            <p>No bookings {filter !== "all" ? `with status "${filter}"` : "yet"}.</p>
            <p className="text-sm mt-1">Bookings will appear here once customers submit the booking form.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Cruise / Package</TableHead>
                  <TableHead>Travel Date</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(b => {
                  const sc = statusConfig[b.status];
                  return (
                    <TableRow key={b.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelected(b)}>
                      <TableCell>
                        <div className="font-medium">{b.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {b.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">{b.cruiseName}</div>
                        <div className="text-xs text-muted-foreground">{b.packageName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          {b.travelDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {b.adults}</span>
                          <span className="flex items-center gap-1"><Baby className="h-3.5 w-3.5" /> {b.children}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={sc.className}>
                          <sc.icon className="h-3 w-3 mr-1" /> {sc.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {format(new Date(b.createdAt), "MMM dd, yyyy HH:mm")}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v as Booking["status"])}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {bookings.length > 0 && (
        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
          <span>Total: {bookings.length}</span>
          <span>Pending: {bookings.filter(b => b.status === "pending").length}</span>
          <span>Confirmed: {bookings.filter(b => b.status === "confirmed").length}</span>
        </div>
      )}

      {/* Booking Detail Modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" /> Booking Details
            </DialogTitle>
          </DialogHeader>
          {selected && (() => {
            const sc = statusConfig[selected.status];
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Customer</p>
                    <p className="font-semibold">{selected.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Phone</p>
                    <p className="font-semibold flex items-center gap-1"><Phone className="h-3 w-3" /> {selected.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Cruise</p>
                    <p className="font-semibold">{selected.cruiseName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Package</p>
                    <p className="font-semibold">{selected.packageName || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Travel Date</p>
                    <p className="font-semibold flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-primary" /> {selected.travelDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Guests</p>
                    <p className="font-semibold flex items-center gap-2">
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {selected.adults}</span>
                      <span className="flex items-center gap-1"><Baby className="h-3.5 w-3.5" /> {selected.children}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Status</p>
                    <Badge variant="outline" className={sc.className}>
                      <sc.icon className="h-3 w-3 mr-1" /> {sc.label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Submitted</p>
                    <p className="font-semibold text-xs">{format(new Date(selected.createdAt), "MMM dd, yyyy HH:mm")}</p>
                  </div>
                </div>
                {selected.notes && (
                  <div className="border-t pt-3">
                    <p className="text-muted-foreground text-xs flex items-center gap-1 mb-1"><StickyNote className="h-3 w-3" /> Notes</p>
                    <p className="text-sm bg-muted/50 p-2 rounded">{selected.notes}</p>
                  </div>
                )}
                <div className="border-t pt-3">
                  <p className="text-muted-foreground text-xs mb-1">Update Status</p>
                  <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v as Booking["status"])}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}