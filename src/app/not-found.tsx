import Link from 'next/link';
import PageShell from './components/PageShell';

export default function NotFound() {
  return <PageShell><section className="inner-hero"><div className="eyebrow">404 · Page not found</div><h1>This route no longer exists.</h1><p>The page may have moved, or the link may be out of date. Head back to Origins and continue from there.</p><Link className="button-primary" href="/">Back to Origins <span>↗</span></Link></section></PageShell>;
}
