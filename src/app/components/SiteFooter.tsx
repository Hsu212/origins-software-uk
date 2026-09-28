import Link from 'next/link';

const columns = [
  { title: 'Explore', links: [['About', '/about'], ['Services', '/services'], ['Work', '/work'], ['Process', '/process'], ['Company', '/company']] },
  { title: 'Get in touch', links: [['Start a project', '/contact'], ['Client portal', process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.originsltd.com'], ['hello@originsltd.com', 'mailto:hello@originsltd.com']] },
  { title: 'Legal', links: [['Privacy policy', '/legal/privacy'], ['Terms of service', '/legal/terms'], ['Service terms', '/legal/service-terms'], ['Cookie policy', '/legal/cookies'], ['Security', '/legal/security'], ['Accessibility', '/legal/accessibility'], ['Acceptable use', '/legal/acceptable-use']] },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">O</span><span className="brand-name">ORIGINS</span></div>
          <p className="footer-lead">Senior-led digital engineering for ambitious teams. Strategy, product, software and infrastructure under one roof.</p>
          <div className="footer-status"><span className="status-dot" /> Accepting selected projects</div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <div className="footer-heading">{column.title}</div>
            <div className="footer-links">
              {column.links.map(([label, href]) => (href.startsWith('mailto:') || href.startsWith('http')) ? <a key={href} href={href}>{label}</a> : <Link key={href} href={href}>{label}</Link>)}
            </div>
          </div>
        ))}
      </div>

      <div className="footer-company-bar">
        <div>
          <strong>Origins Ltd.</strong>
          <span>Registered company details should be shown here.</span>
        </div>
        <div className="footer-small-links">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/cookies">Cookies</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Origins Ltd. All rights reserved.</span>
        <span>Built for clarity. Engineered for growth.</span>
      </div>
    </footer>
  );
}
