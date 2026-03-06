import { useState, useRef, type MouseEvent } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  zoomScale?: number;
}

export default function ImageZoom({ src, alt, className = "", zoomScale = 2.5 }: ImageZoomProps) {
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-300"
        style={
          zoomed
            ? {
                transform: `scale(${zoomScale})`,
                transformOrigin: `${position.x}% ${position.y}%`,
              }
            : undefined
        }
      />
    </div>
  );
}
