export default function VideoLoadingIndicator({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-label="Loading video"
      className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center ${className}`}
    >
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-sand/25 border-t-sand/70" />
    </div>
  );
}
