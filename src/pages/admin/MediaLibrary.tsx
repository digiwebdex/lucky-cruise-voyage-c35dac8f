import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Ship, Plus, Minus, Trash2, ZoomIn, ChevronLeft, ChevronRight, ImageIcon, Save, GripVertical, CheckSquare, X, Upload } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getCruises, saveCruises } from "@/services/cmsStore";
import type { Cruise } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";

export default function MediaLibrary() {
  const [cruises, setCruises] = useState<Cruise[]>(() => getCruises());
  const [activeCruise, setActiveCruise] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set(cruises.map(c => c.id)));
  const [lightbox, setLightbox] = useState<{ img: string; images: string[]; idx: number } | null>(null);
  const [newUrls, setNewUrls] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Record<string, Set<number>>>({});
  const [dragState, setDragState] = useState<{ cruiseId: string; fromIdx: number } | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const toggleSelect = (cruiseId: string, idx: number) => {
    setSelected(prev => {
      const s = new Set(prev[cruiseId] || []);
      s.has(idx) ? s.delete(idx) : s.add(idx);
      return { ...prev, [cruiseId]: s };
    });
  };

  const selectedCount = Object.values(selected).reduce((sum, s) => sum + s.size, 0);

  const bulkDelete = () => {
    setCruises(prev => prev.map(c => {
      const sel = selected[c.id];
      if (!sel || sel.size === 0) return c;
      return { ...c, images: c.images.filter((_, i) => !sel.has(i)) };
    }));
    setHasChanges(true);
    toast({ title: `${selectedCount} images deleted` });
    setSelected({});
    setSelectMode(false);
  };

  const exitSelectMode = () => {
    setSelectMode(false);
    setSelected({});
  };

  const handleDragStart = (cruiseId: string, idx: number) => {
    setDragState({ cruiseId, fromIdx: idx });
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOverIdx(idx);
  };

  const handleDrop = (cruiseId: string, toIdx: number) => {
    if (!dragState || dragState.cruiseId !== cruiseId) return;
    const { fromIdx } = dragState;
    if (fromIdx === toIdx) { setDragState(null); setDragOverIdx(null); return; }
    const cruise = cruises.find(c => c.id === cruiseId);
    if (!cruise) return;
    const imgs = [...cruise.images];
    const [moved] = imgs.splice(fromIdx, 1);
    imgs.splice(toIdx, 0, moved);
    updateCruiseImages(cruiseId, imgs);
    setDragState(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDragState(null);
    setDragOverIdx(null);
  };

  const filteredCruises = activeCruise
    ? cruises.filter(c => c.id === activeCruise)
    : cruises;

  const totalImages = cruises.reduce((sum, c) => sum + c.images.length, 0);

  const updateCruiseImages = (cruiseId: string, images: string[]) => {
    setCruises(prev => prev.map(c => c.id === cruiseId ? { ...c, images } : c));
    setHasChanges(true);
  };

  const deleteImage = (cruiseId: string, imgIdx: number) => {
    const cruise = cruises.find(c => c.id === cruiseId);
    if (!cruise) return;
    updateCruiseImages(cruiseId, cruise.images.filter((_, j) => j !== imgIdx));
  };

  const addImage = (cruiseId: string) => {
    const url = (newUrls[cruiseId] || "").trim();
    if (!url) return;
    const cruise = cruises.find(c => c.id === cruiseId);
    if (!cruise) return;
    updateCruiseImages(cruiseId, [...cruise.images, url]);
    setNewUrls(prev => ({ ...prev, [cruiseId]: "" }));
  };

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileUpload = async (cruiseId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const cruise = cruises.find(c => c.id === cruiseId);
    if (!cruise) return;
    try {
      const { uploadImages } = await import("@/services/uploadHelper");
      const urls = await uploadImages(Array.from(files));
      updateCruiseImages(cruiseId, [...cruise.images, ...urls]);
      toast({ title: `${urls.length} image(s) added` });
    } catch (err) {
      toast({ title: "Image upload failed", variant: "destructive" });
    }
  };

  const saveAll = () => {
    saveCruises(cruises);
    setHasChanges(false);
    toast({ title: "Gallery saved!" });
  };

  const navigateLightbox = (dir: number) => {
    if (!lightbox) return;
    const { images, idx } = lightbox;
    const newIdx = (idx + dir + images.length) % images.length;
    setLightbox({ img: images[newIdx], images, idx: newIdx });
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Save Bar */}
      {hasChanges && (
        <div className="sticky top-0 z-50 bg-primary/10 backdrop-blur-md border-b border-primary/20 px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-primary">You have unsaved changes</span>
          <Button onClick={saveAll} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="h-4 w-4" /> Save Gallery
          </Button>
        </div>
      )}

      {/* Header matching public Gallery */}
      <div className="bg-muted/30 py-10 text-center border-b border-border">
        <h1 className="font-display text-3xl md:text-4xl font-black text-foreground">
          ফটো <span className="text-primary">গ্যালারি</span>
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">{totalImages} total images across {cruises.length} cruises</p>
      </div>

      {/* Cruise Filter Tabs */}
      <div className="py-4 border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur-md">
        <div className="px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={activeCruise === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCruise(null)}
              className="gap-1.5"
            >
              <Ship className="h-4 w-4" />
              সব ক্রুজ
            </Button>
            {cruises.map(c => (
              <Button
                key={c.id}
                variant={activeCruise === c.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCruise(c.id)}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery by Cruise */}
      <div className="p-4 md:p-6 space-y-10">
        {filteredCruises.map(cruise => (
          <div key={cruise.id}>
            {/* Cruise header - collapsible */}
            <button
              className="mb-4 flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity"
              onClick={() => {
                const next = new Set(expandedSections);
                next.has(cruise.id) ? next.delete(cruise.id) : next.add(cruise.id);
                setExpandedSections(next);
              }}
            >
              <div className="h-1 w-8 rounded-full bg-primary" />
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                {cruise.name}
              </h2>
              <span className="text-sm text-muted-foreground">({cruise.images.length} photos)</span>
              <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-border">
                {expandedSections.has(cruise.id) ? <Minus className="h-4 w-4 text-muted-foreground" /> : <Plus className="h-4 w-4 text-primary" />}
              </div>
            </button>

            {expandedSections.has(cruise.id) && (
              <div>
                {/* Toolbar: Add image + Select mode */}
                <div className="mb-4 flex gap-2 items-center flex-wrap">
                  <div className="flex gap-2 items-center max-w-lg flex-1">
                    <Input
                      placeholder="Paste image URL..."
                      value={newUrls[cruise.id] || ""}
                      onChange={e => setNewUrls(prev => ({ ...prev, [cruise.id]: e.target.value }))}
                      onKeyDown={e => { if (e.key === "Enter") addImage(cruise.id); }}
                    />
                    <Button variant="outline" size="sm" onClick={() => addImage(cruise.id)} className="gap-1 flex-shrink-0">
                      <Plus className="h-4 w-4" /> URL
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    ref={el => { fileInputRefs.current[cruise.id] = el; }}
                    onChange={e => { handleFileUpload(cruise.id, e.target.files); e.target.value = ""; }}
                  />
                  <Button variant="outline" size="sm" onClick={() => fileInputRefs.current[cruise.id]?.click()} className="gap-1 flex-shrink-0">
                    <Upload className="h-4 w-4" /> Upload
                  </Button>
                  {!selectMode ? (
                    <Button variant="outline" size="sm" onClick={() => setSelectMode(true)} className="gap-1 flex-shrink-0">
                      <CheckSquare className="h-4 w-4" /> Select
                    </Button>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Button variant="destructive" size="sm" onClick={bulkDelete} disabled={selectedCount === 0} className="gap-1">
                        <Trash2 className="h-4 w-4" /> Delete ({selectedCount})
                      </Button>
                      <Button variant="ghost" size="sm" onClick={exitSelectMode} className="gap-1">
                        <X className="h-4 w-4" /> Cancel
                      </Button>
                    </div>
                  )}
                </div>

                {cruise.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {cruise.images.map((img, i) => {
                      const isSelected = selected[cruise.id]?.has(i) || false;
                      return (
                      <div
                        key={`${cruise.id}-${i}`}
                        draggable={!selectMode}
                        onDragStart={() => !selectMode && handleDragStart(cruise.id, i)}
                        onDragOver={(e) => !selectMode && handleDragOver(e, i)}
                        onDrop={() => !selectMode && handleDrop(cruise.id, i)}
                        onDragEnd={handleDragEnd}
                        onClick={() => selectMode && toggleSelect(cruise.id, i)}
                        className={`overflow-hidden rounded-xl group relative transition-all duration-200 ${
                          selectMode ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
                        } ${dragState?.cruiseId === cruise.id && dragOverIdx === i ? "ring-2 ring-primary scale-105" : ""
                        } ${dragState?.cruiseId === cruise.id && dragState.fromIdx === i ? "opacity-40" : ""
                        } ${isSelected ? "ring-2 ring-destructive" : ""}`}
                      >
                        <img
                          src={img}
                          alt={`${cruise.name} ${i + 1}`}
                          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                          draggable={false}
                          onClick={(e) => { if (!selectMode) { e.stopPropagation(); setLightbox({ img, images: cruise.images, idx: i }); } }}
                        />
                        {/* Select checkbox */}
                        {selectMode && (
                          <div className="absolute top-2 left-2 z-20">
                            <Checkbox checked={isSelected} className="h-5 w-5 border-2 border-background bg-background/80 data-[state=checked]:bg-destructive data-[state=checked]:border-destructive" />
                          </div>
                        )}
                        {/* Drag handle indicator */}
                        {!selectMode && (
                          <div className="absolute top-2 left-2 bg-secondary/70 text-secondary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <GripVertical className="h-3.5 w-3.5" />
                          </div>
                        )}
                        {/* Overlay */}
                        {!selectMode && (
                          <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-all duration-300 flex items-center justify-center pointer-events-none">
                            <ZoomIn className="h-6 w-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                        {selectMode && isSelected && (
                          <div className="absolute inset-0 bg-destructive/20 transition-all duration-200" />
                        )}
                        {!selectMode && (
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteImage(cruise.id, i); }}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <span className="absolute bottom-2 left-2 bg-secondary/70 text-secondary-foreground text-xs px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                          {i + 1}
                        </span>
                      </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-border/50 bg-muted/30 p-10 text-center">
                    <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-muted-foreground text-sm">No images yet — add one above</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-5xl border-none bg-secondary/95 backdrop-blur-xl p-2 sm:p-4 shadow-2xl">
          {lightbox && (
            <div className="relative">
              <img src={lightbox.img} alt="Gallery" className="w-full rounded-xl max-h-[80vh] object-contain" draggable={false} />
              <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}>
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="text-center mt-2 text-sm text-secondary-foreground/50">{lightbox.idx + 1} / {lightbox.images.length}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
