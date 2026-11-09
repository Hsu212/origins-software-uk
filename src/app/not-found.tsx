import Link from '@/app/components/LocaleLink';
import LocalizedText from './components/LocalizedText';
import PageShell from './components/PageShell';

export default function NotFound() {
  return <PageShell><section className="inner-hero"><div className="eyebrow"><LocalizedText text="404 · Page not found" /></div><h1><LocalizedText text="This route no longer exists." /></h1><p><LocalizedText text="The page may have moved, or the link may be out of date. Head back to Origins and continue from there." /></p><Link className="button-primary" href="/"><LocalizedText text="Back to Origins" /> <span>↗</span></Link></section></PageShell>;
}
