import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main>{children}</main><SiteFooter /></>;
}
