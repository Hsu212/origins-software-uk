'use client';

import Link from 'next/link';
import { useState } from 'react';

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
          <span className="brand-mark">O</span>
          <span className="brand-name">ORIGINS</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className="desktop-nav-actions">
          <Link href="/company" className="nav-quiet">Company</Link>
          <Link href="/contact" className="nav-cta">Start a project <span>↗</span></Link>
        </div>

        <button className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((v) => !v)}>
          <span /> <span />
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="mobile-nav-panel">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link href="/company" onClick={() => setOpen(false)}>Company</Link>
          <Link href="/contact" className="nav-cta mobile-cta" onClick={() => setOpen(false)}>Start a project <span>↗</span></Link>
        </div>
      )}
    </header>
  );
}
