import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClipboardList, Users, Baby, Phone, Calendar, CheckCircle, XCircle, Clock, StickyNote, Eye, Printer, Search, Filter } from "lucide-react";
import { useBookingStore, getBookings, saveBookings, type Booking } from "@/services/bookingStore";
import { format } from "date-fns";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-amber-100 text-amber-800 border-amber-300" },
  confirmed: { label: "Confirmed", icon: CheckCircle, className: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  cancelled: { label: "Cancelled", icon: XCircle, className: "bg-red-100 text-red-800 border-red-300" },
};

function printBookingsPDF(bookings: Booking[], title: string) {
  const win = window.open("", "_blank");
  if (!win) return;
  const rows = bookings.map((b, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${b.name}<br/><small>${b.phone}</small></td>
      <td>${b.cruiseName}<br/><small>${b.packageName || "-"}</small></td>
      <td>${b.travelDate}</td>
      <td>${b.adults} Adult, ${b.children} Child</td>
      <td>${b.status.charAt(0).toUpperCase() + b.status.slice(1)}</td>
      <td>${format(new Date(b.createdAt), "MMM dd, yyyy HH:mm")}</td>
    </tr>
  `).join("");

  win.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      body{font-family:Arial,sans-serif;padding:20px;font-size:12px}
      h2{color:#333;margin-bottom:4px}
      .meta{color:#888;font-size:11px;margin-bottom:16px}
      table{width:100%;border-collapse:collapse}
      th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}
      th{background:#f5f5f5;font-weight:600}
      small{color:#888}
      @media print{body{padding:0}}
    </style>
  </head><body>
    <h2>Lucky Tours & Travels — ${title}</h2>
    <p class="meta">Generated: ${format(new Date(), "MMM dd, yyyy HH:mm")} | Total: ${bookings.length}</p>
    <table>
      <thead><tr><th>#</th><th>Customer</th><th>Cruise/Package</th><th>Travel Date</th><th>Guests</th><th>Status</th><th>Submitted</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 300);
}

export default function Bookings() {
  const [bookings, setBookings] = useBookingStore(getBookings, saveBookings);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [cruiseFilter, setCruiseFilter] = useState("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const cruiseNames = useMemo(() => {
    const names = new Set(bookings.map(b => b.cruiseName));
    return Array.from(names).sort();
  }, [bookings]);

  const filtered = useMemo(() => {
    let list = bookings;
    if (filter !== "all") list = list.filter(b => b.status === filter);
    if (cruiseFilter !== "all") list = list.filter(b => b.cruiseName === cruiseFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b => b.name.toLowerCase().includes(q) || b.phone.includes(q));
    }
    if (dateFrom) list = list.filter(b => b.travelDate >= dateFrom);
    if (dateTo) list = list.filter(b => b.travelDate <= dateTo);
    return list;
  }, [bookings, filter, cruiseFilter, search, dateFrom, dateTo]);

  const updateStatus = (id: string, status: Booking["status"]) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const filterLabel = filter === "all" ? "All Bookings" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Bookings`;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" /> Bookings
        </h1>
        <Button variant="outline" size="sm" onClick={() => printBookingsPDF(filtered, filterLabel)} disabled={filtered.length === 0}>
          <Printer className="h-4 w-4 mr-1" /> Print PDF
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border mb-4">
        <CardContent className="p-3">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
              <label className="text-xs text-muted-foreground mb-1 block"><Search className="h-3 w-3 inline mr-1" />Search</label>
              <Input placeholder="Name or phone..." value={search} onChange={e => setSearch(e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="min-w-[130px]">
              <label className="text-xs text-muted-foreground mb-1 block"><Filter className="h-3 w-3 inline mr-1" />Status</label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ({bookings.length})</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[150px]">
              <label className="text-xs text-muted-foreground mb-1 block">Cruise</label>
              <Select value={cruiseFilter} onValueChange={setCruiseFilter}>
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cruises</SelectItem>
                  {cruiseNames.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[130px]">
              <label className="text-xs text-muted-foreground mb-1 block">Date From</label>
              <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="min-w-[130px]">
              <label className="text-xs text-muted-foreground mb-1 block">Date To</label>
              <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="h-8 text-sm" />
            </div>
            {(search || filter !== "all" || cruiseFilter !== "all" || dateFrom || dateTo) && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setSearch(""); setFilter("all"); setCruiseFilter("all"); setDateFrom(""); setDateTo(""); }}>
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <Card className="border-border">
          <CardContent className="p-8 text-center text-muted-foreground">
            <ClipboardList className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
            <p>No bookings found.</p>
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
          <span>Showing: {filtered.length}</span>
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