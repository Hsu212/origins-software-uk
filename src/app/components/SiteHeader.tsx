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
    <header className="landing-header" id="top">
      <div className="landing-header-inner">
        <Link href="/" className="brand-mark" aria-label="Origins home" onClick={() => setOpen(false)}>
          <span className="brand-icon">O</span>
          <span>ORIGINS</span>
        </Link>

        <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/company" className="nav-quiet" onClick={() => setOpen(false)}>Company</Link>
          <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>
            Start a project <span>↗</span>
          </Link>
        </nav>

        <button 
          className="mobile-menu-button" 
          aria-expanded={open} 
          aria-controls="mobile-navigation" 
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /> <span /> <span />
        </button>
      </div>
    </header>
  );
}
