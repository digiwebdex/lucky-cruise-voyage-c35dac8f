import ImageZoom from "./ImageZoom";

interface SeatPlanViewerProps {
  seatPlanImage?: string;
  shipName?: string;
}

export default function SeatPlanViewer({ seatPlanImage, shipName = "Ship" }: SeatPlanViewerProps) {
  if (!seatPlanImage) return null;

  return (
    <div className="watermark-container rounded-2xl overflow-hidden border border-border shadow-lg cursor-zoom-in">
      <ImageZoom
        src={seatPlanImage}
        alt={`${shipName} Seat Plan`}
        className="w-full h-auto"
        zoomScale={2.5}
      />
    </div>
  );
}
