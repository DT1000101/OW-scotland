import { SOCIALS } from "@/lib/event";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M13.5 21v-7h2.3l.4-2.9h-2.7V9.2c0-.8.3-1.4 1.5-1.4h1.3V5.2c-.6-.1-1.4-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9v2.2H7.7V14h2.2v7h3.6z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function Socials({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={SOCIALS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="OneWheel Scotland on Instagram"
        className="text-sand/70 hover:text-send"
      >
        <InstagramIcon />
      </a>
      <a
        href={SOCIALS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="OneWheel Scotland Facebook group"
        className="text-sand/70 hover:text-send"
      >
        <FacebookIcon />
      </a>
      <a
        href={`mailto:${SOCIALS.email}`}
        aria-label="Email OneWheel Scotland"
        className="text-sand/70 hover:text-send"
      >
        <MailIcon />
      </a>
    </div>
  );
}
