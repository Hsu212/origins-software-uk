import type { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import MotionEnhancements from './MotionEnhancements';

export default function PageShell({ children }: { children: ReactNode }) {
  return <><MotionEnhancements /><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></>;
}
