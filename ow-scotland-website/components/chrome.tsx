import Link from "next/link";

const links = [
  { href: "/riding", label: "Riding" },
  { href: "/events", label: "Events" },
  { href: "/venues", label: "Venues" },
  { href: "/contact", label: "Contact" },
];

export function Header({ current }: { current?: string }) {
  return (
    <header className="site-header">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="header-inner">
        <Link className="brand" href="/">
          <img src="/logo.jpg" alt="" width={58} height={58} />
          <span className="brand-name">
            Onewheel Scotland
            <span>No stress, just stoke</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>Onewheel Scotland</div>
        <div>
          <a href="mailto:onewheelscotland@gmail.com">onewheelscotland@gmail.com</a>
          {" · "}
          <a href="https://www.instagram.com/onewheel.scot/">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
