'use client';

import Link from 'next/link';
import { useState } from 'react';

const clientPortalUrl = process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.origins-software.com';

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="company-site-header" id="top">
      <div className="site-nav-inner">
        <Link href="/" className="brand" aria-label="Origins home" onClick={() => setOpen(false)}>
          <img src="/origins-logo.png" alt="Origins" className="site-logo" />
          <span className="brand-name">ORIGINS</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>

        <div className="desktop-nav-actions">
          <a href={clientPortalUrl} className="nav-quiet">
            Client portal
          </a>
          <Link href="/contact" className="nav-cta">
            Start a project <span>↗</span>
          </Link>
        </div>

        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((v) => !v)}
        >
          <span /> <span />
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="mobile-nav-panel">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}

          <a href={clientPortalUrl} onClick={() => setOpen(false)}>
            Client portal ↗
          </a>

          <Link href="/contact" className="nav-cta mobile-cta" onClick={() => setOpen(false)}>
            Start a project <span>↗</span>
          </Link>
        </div>
      )}
    </header>
  );
}
