/** Instant poster frame — plain img with fallback if small webp is missing. */
export default function VideoPoster({
  src,
  fallback,
  alt = "",
  className = "",
  eager = false,
}: {
  src: string;
  fallback?: string;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={(e) => {
        if (fallback && e.currentTarget.src !== fallback) {
          e.currentTarget.src = fallback;
        }
      }}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
