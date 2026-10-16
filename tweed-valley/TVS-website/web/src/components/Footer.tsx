import Link from "next/link";
import { EVENT } from "@/lib/event";
import Socials from "@/components/Socials";
import PoweredBy from "@/components/PoweredBy";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-olive-darker">
      <div className="container-tvs grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg text-sand">
            Tweed Valley <span className="text-send">Senduro</span>
          </p>
          <p className="mt-2 text-sm text-sand/60">
            {EVENT.venue}, {EVENT.region}
          </p>
          <PoweredBy size="sm" className="mt-4" />
          <p className="mt-4 text-sm font-semibold text-sand">Follow us</p>
          <Socials className="mt-2" />
        </div>
        <div className="text-sm">
          <p className="mb-2 font-semibold text-sand">Event</p>
          <ul className="space-y-1 text-sand/70">
            <li><Link href="/schedule" className="hover:text-send">Schedule</Link></li>
            <li><Link href="/tickets" className="hover:text-send">Tickets</Link></li>
            <li><Link href="/racing" className="hover:text-send">Segments</Link></li>
            <li><Link href="/rules" className="hover:text-send">Rules</Link></li>
            <li><Link href="/venue" className="hover:text-send">Venue</Link></li>
            <li><Link href="/maps" className="hover:text-send">Maps</Link></li>
            <li><Link href="/volunteer" className="hover:text-send">Volunteer</Link></li>
            <li><Link href="/things-to-do" className="hover:text-send">Things to do</Link></li>
            <li><Link href="/faq" className="hover:text-send">FAQ</Link></li>
            <li><Link href="/about" className="hover:text-send">About</Link></li>
            <li><Link href="/contact" className="hover:text-send">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-semibold text-sand">Get in touch</p>
          <p className="text-sand/70">
            <a href={`mailto:${EVENT.contactEmail}`} className="hover:text-send">
              {EVENT.contactEmail}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="container-tvs text-xs text-sand/50">
          &copy; {new Date().getFullYear()} Tweed Valley Senduro. A Community Interest Company.
        </p>
      </div>
    </footer>
  );
}
