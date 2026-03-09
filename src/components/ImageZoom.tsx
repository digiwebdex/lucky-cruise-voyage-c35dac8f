interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  zoomScale?: number;
}

export default function ImageZoom({ src, alt, className = "", zoomScale = 2.5 }: ImageZoomProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
