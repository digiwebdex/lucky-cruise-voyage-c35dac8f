import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { cruises } from "@/services/mockData";

export default function MediaLibrary() {
  const allImages = cruises.flatMap(c => c.images);
  const [images, setImages] = useState(allImages);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Media Library</h1>
        <span className="text-sm text-muted-foreground">{images.length} images</span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {images.map((img, i) => (
          <Card key={i} className="group relative overflow-hidden border-border">
            <CardContent className="p-0">
              <div className="watermark-container aspect-square">
                <img src={img} alt={`Media ${i}`} className="h-full w-full object-cover" draggable={false} />
              </div>
              <Button size="icon" variant="destructive" className="absolute right-1 top-1 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100" onClick={() => setImages(images.filter((_, j) => j !== i))}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
