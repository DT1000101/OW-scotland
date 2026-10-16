"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/tickets", label: "Tickets" },
  { href: "/racing", label: "Segments" },
  { href: "/rules", label: "Rules" },
  { href: "/venue", label: "Venue" },
  { href: "/maps", label: "Maps" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-olive-darker/90 backdrop-blur">
      <div className="container-tvs flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/img/senduro-logo.webp"
            alt="Tweed Valley Senduro"
            width={44}
            height={44}
            unoptimized
            className="rounded-full"
          />
          <span className="hidden font-display text-lg text-sand sm:block">
            Tweed Valley <span className="text-send">Senduro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded px-2.5 py-2 text-sm ${
                pathname === item.href
                  ? "text-send"
                  : "text-sand/80 hover:text-send"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {isAdmin && (
            <Link href="/admin" className="hidden text-sm text-send sm:block">
              Ops
            </Link>
          )}
          {user ? (
            <>
              <Link
                href="/account"
                className="btn-ghost whitespace-nowrap px-3 py-1.5 text-sm"
              >
                Account
              </Link>
              <button
                onClick={() => signOut()}
                className="hidden whitespace-nowrap text-sm text-sand/70 hover:text-send sm:block"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="btn-primary whitespace-nowrap px-4 py-1.5 text-sm"
            >
              Log in
            </Link>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded p-2 text-sand xl:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-olive-darker xl:hidden">
          <div className="container-tvs flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sand/80 hover:text-send"
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="py-2 text-send"
              >
                Ops
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
