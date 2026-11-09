'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MotionEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    const autoMotionSelector = [
      'main > section',
      'main > .content-section',
      'main .service-card',
      'main .work-card',
      'main .process-row',
      'main .case-study-chapter',
      'main .feature-card',
      'main .contact-card',
      'main .portfolio-case-card',
      'footer .footer-brand-column',
      'footer .footer-column',
      'footer .footer-company-bar',
      'footer .footer-bottom',
    ].join(', ');
    const elements = Array.from(document.querySelectorAll<HTMLElement>(`[data-motion], ${autoMotionSelector}`));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('motion-ready');

    elements.forEach((element, index) => {
      element.dataset.motion = '';
      element.style.setProperty('--motion-delay', `${Math.min(index % 6, 5) * 55}ms`);
      element.classList.remove('motion-pending', 'motion-exiting', 'is-entered');
    });
    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-entered'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.classList.add('is-entered');
          element.classList.remove('motion-pending', 'motion-exiting');
          element.style.setProperty('--motion-offset', '28px');
          return;
        }
        element.style.setProperty('--motion-offset', entry.boundingClientRect.top < 0 ? '-24px' : '24px');
        element.classList.remove('is-entered', 'motion-pending');
        element.classList.add('motion-exiting');
      });
    }, { rootMargin: '-8% 0px -10% 0px', threshold: 0.06 });

    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top > window.innerHeight * 0.9) {
        element.style.setProperty('--motion-offset', '28px');
        element.classList.add('motion-pending');
      } else if (bounds.bottom < 0) {
        element.style.setProperty('--motion-offset', '-24px');
        element.classList.add('motion-exiting');
      } else {
        element.classList.add('is-entered');
      }
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove('motion-pending', 'motion-exiting', 'is-entered');
        element.style.removeProperty('--motion-delay');
        element.style.removeProperty('--motion-offset');
      });
    };
  }, [pathname]);

  return null;
}
