'use client';

import Image from 'next/image';
import Link from '@/app/components/LocaleLink';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { processStages, serviceSpecialties, workPatterns } from '@/app/data/siteContent';
import { localeNames, locales, localePath, translate, type Locale } from '@/app/i18n';
import { useLocale } from './LocaleProvider';

const clientPortalUrl = process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.origins-software.com';
type MenuKey = 'services' | 'work' | 'process';

type MenuItem = { href: string; title: string; description: string; number: string };
const menuGroups: { key: MenuKey; href: string; label: string; eyebrow: string; title: string; description: string; items: MenuItem[] }[] = [
  {
    key: 'services', href: '/services', label: 'Services', eyebrow: 'Capabilities / 09 disciplines',
    title: 'The right expertise for the real problem.',
    description: 'From discovery through production, connect the work to the right technical discipline.',
    items: serviceSpecialties.map((item) => ({ href: `/services/${item.slug}`, title: item.title, description: item.category, number: item.number })),
  },
  {
    key: 'work', href: '/portfolio', label: 'Work', eyebrow: 'Portfolio / selected case studies',
    title: 'Explore the problems behind the work.',
    description: 'Browse representative case studies across software, platforms, cloud and AI. The examples explain our approach without claiming named client results.',
    items: workPatterns.map((item) => ({ href: `/work/${item.slug}`, title: item.title, description: item.sector, number: item.number })),
  },
  {
    key: 'process', href: '/process', label: 'Process', eyebrow: 'Delivery / 04 stages',
    title: 'Progress made visible, decisions made clear.',
    description: 'A considered path from understanding the challenge to handing over something your team can operate.',
    items: processStages.map((item) => ({ href: `/process/${item.slug}`, title: item.title, description: item.subtitle, number: item.number })),
  },
];

function BrandLockup() {
  return (
    <span className="brand-lockup">
      <Image src="/origins-icon.png" alt="" width={84} height={84} className="brand-icon" priority />
      <span className="brand-lockup-type"><span className="brand-origins">ORIGINS</span><span className="brand-software">SOFTWARE</span></span>
    </span>
  );
}

function pathIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function groupIsActive(pathname: string, group: typeof menuGroups[number], locale: Locale) {
  return pathIsActive(pathname, localePath(group.href, locale)) ||
    (group.key === 'work' && pathIsActive(pathname, localePath('/work', locale)));
}

function LanguagePicker({ locale, pathname, mobile = false, onOpen }: { locale: Locale; pathname: string; mobile?: boolean; onOpen?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opensAbove, setOpensAbove] = useState(false);
  const [menuMaxHeight, setMenuMaxHeight] = useState<number | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const languageLabel = translate(locale, 'Language');
  const menuId = mobile ? 'language-picker-menu-mobile' : 'language-picker-menu';

  const toggleMenu = () => {
    if (!isOpen) onOpen?.(); 
    
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    if (mobile && triggerRef.current) {
      const triggerBounds = triggerRef.current.getBoundingClientRect();
      const headerBottom = document.querySelector('.site-nav-inner')?.getBoundingClientRect().bottom ?? 0;
      const availableAbove = triggerBounds.top - headerBottom - 18;
      const availableBelow = window.innerHeight - triggerBounds.bottom - 18;
      const placeAbove = availableBelow < 306 && availableAbove > availableBelow;
      setOpensAbove(placeAbove);
      setMenuMaxHeight(Math.max(160, Math.min(306, (placeAbove ? availableAbove : availableBelow) - 12)));
    }

    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [isOpen]);

  const chooseLanguage = (language: Locale) => {
    setIsOpen(false);
    if (language !== locale) window.location.assign(localePath(pathname || '/', language));
  };

  return (
    <div className={`language-picker${mobile ? ' mobile-language-picker' : ''}`} ref={pickerRef}>
      {mobile && <span className="mobile-language-label">{languageLabel}</span>}
      <button
        type="button"
        className={`language-picker-control${isOpen ? ' is-open' : ''}`}
        aria-label={`${languageLabel}: ${localeNames[locale]}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={toggleMenu}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && isOpen) {
            event.stopPropagation();
            setIsOpen(false);
            triggerRef.current?.focus();
          }
        }}
        ref={triggerRef}
      >
        <span className="language-picker-globe-wrap">
          <svg className="language-picker-globe" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="8.25" />
            <path d="M3.9 12h16.2M12 3.75c2.05 2.25 3.08 5 3.08 8.25s-1.03 6-3.08 8.25C9.95 18 8.92 15.25 8.92 12S9.95 6 12 3.75Z" />
          </svg>
        </span>
        <span className="language-picker-copy">
          <span className="language-picker-caption">{languageLabel}</span>
          <span className="language-picker-value">{localeNames[locale]}</span>
        </span>
        <span className="language-picker-code">{locale.toUpperCase()}</span>
        <svg className="language-picker-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="m3 4.5 3 3 3-3" />
        </svg>
      </button>
      {isOpen && (
        <div
          className={`language-picker-menu${mobile && opensAbove ? ' opens-above' : ''}`}
          id={menuId}
          role="menu"
          aria-label={languageLabel}
          style={mobile && menuMaxHeight !== null ? { maxHeight: `${menuMaxHeight}px` } : undefined}
        >
          <div className="language-picker-menu-heading">
            <span>{translate(locale, 'Select language')}</span>
            <span className="language-picker-menu-count">{String(locales.length).padStart(2, '0')}</span>
          </div>
          {locales.map((language) => (
            <button
              key={language}
              type="button"
              className={`language-picker-option${language === locale ? ' is-selected' : ''}`}
              role="menuitemradio"
              aria-checked={language === locale}
              onClick={() => chooseLanguage(language)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.stopPropagation();
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }
              }}
            >
              <span className="language-picker-option-code">{language.toUpperCase()}</span>
              <span className="language-picker-option-name">{localeNames[language]}</span>
              <span className="language-picker-option-check" aria-hidden="true">
                {language === locale && <svg viewBox="0 0 16 16" fill="none"><path d="m3.5 8 3 3 6-6" /></svg>}
              </span>
            </button>
          ))}
          <div className="language-picker-menu-foot"><span className="language-picker-menu-dot" />{translate(locale, 'Available across the site')}</div>
        </div>
      )}
    </div>
  );
}

export default function SiteHeader() {
  const locale = useLocale();
  const localized = (text: string) => translate(locale, text);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuTriggerRefs = useRef<Record<MenuKey, HTMLButtonElement | null>>({ services: null, work: null, process: null });
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null);
  const suppressFocusOpen = useRef<MenuKey | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpenMenu(null);
    setOpenMobileGroup(null);
    setMobileOpen(false);
    suppressFocusOpen.current = null;
  }, [pathname]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    if (openMenu) {
      const closingMenu = openMenu;
      setOpenMenu(null);
      setOpenMobileGroup(null);
      const trigger = menuTriggerRefs.current[closingMenu];
      if (trigger && document.activeElement !== trigger) {
        suppressFocusOpen.current = closingMenu;
        trigger.focus();
      }
    } else if (mobileOpen) {
      setOpenMobileGroup(null);
      setMobileOpen(false);
      mobileTriggerRef.current?.focus();
    } else {
      setOpenMobileGroup(null);
    }
  };

  const activeGroup = menuGroups.find((group) => group.key === openMenu);

  return (
    <>
      <a className="skip-link" href="#main-content">{localized('Skip to content')}</a>
      
      {/* 
        We added "floating-capsule" to trigger the new desktop styles, 
        and refactored the inner structure to logically group Left / Center / Right
      */}
      <header
        className={`company-site-header floating-capsule ${openMenu ? ' has-open-menu' : ''}`}
        id="top"
        onMouseLeave={() => setOpenMenu(null)}
        onKeyDown={handleKeyDown}
        onBlur={(event) => {
          if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
        }}
      >
        <div className="site-nav-inner">
          
          {/* LEFT: Logo Area */}
          <div className="header-left">
            <Link 
              href="/" 
              className="brand" 
              aria-label={localized('Origins Software home')} 
              onClick={(e) => { 
                // If already on the homepage, scroll to the top smoothly
                if (pathname === '/' || pathname === `/${locale}`) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                setOpenMenu(null); 
                setMobileOpen(false); 
              }}
            >
              <BrandLockup />
            </Link>
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="desktop-nav glass-nav-pill" aria-label={localized('Primary navigation')}>
            {menuGroups.map((group) => (
              <div
                className={`desktop-nav-item${groupIsActive(pathname, group, locale) ? ' is-active' : ''}${openMenu === group.key ? ' is-open' : ''}`}
                key={group.key}
                onMouseEnter={() => setOpenMenu(group.key)}
                onFocus={() => {
                  if (suppressFocusOpen.current === group.key) { suppressFocusOpen.current = null; return; }
                  setOpenMenu(group.key);
                }}
              >
                <Link href={group.href} className="desktop-nav-link" aria-haspopup="true" aria-expanded={openMenu === group.key}>
                  {localized(group.label)}
                </Link>
                <button
                  type="button"
                  className="nav-menu-toggle"
                  aria-label={`${localized('Open')} ${localized(group.label)} ${localized('menu')}`}
                  aria-expanded={openMenu === group.key}
                  aria-controls={openMenu === group.key ? 'desktop-mega-menu' : undefined}
                  ref={(element) => { menuTriggerRefs.current[group.key] = element; }}
                  onClick={() => setOpenMenu(group.key)}
                ><span aria-hidden="true">⌄</span></button>
              </div>
            ))}
            <Link href="/about" className={`desktop-nav-link desktop-nav-about${pathIsActive(pathname, localePath('/about', locale)) ? ' is-active' : ''}`}>{localized('About')}</Link>
          </nav>

          {/* RIGHT: Actions */}
          <div className="header-right desktop-nav-actions" onMouseEnter={() => setOpenMenu(null)}>
            <span className="nav-status"><span className="nav-status-dot" /> {localized('UK / Global delivery')}</span>
            <LanguagePicker locale={locale} pathname={pathname || '/'} onOpen={() => setOpenMenu(null)} />
            <a href={clientPortalUrl} className="nav-quiet" target="_blank" rel="noreferrer">{localized('Client portal')} <span aria-hidden="true">↗</span></a>
            <Link href="/contact" className="nav-cta">{localized('Start a project')} <span aria-hidden="true">↗</span></Link>
          </div>

          {/* MOBILE ONLY: Hamburger Menu */}
          <button
            type="button"
            className="menu-button"
            ref={mobileTriggerRef}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={localized(mobileOpen ? 'Close navigation' : 'Open navigation')}
            onClick={() => { if (mobileOpen) setOpenMobileGroup(null); setMobileOpen(!mobileOpen); }}
          >
            <span /> <span />
          </button>
        </div>

        {/* MEGA MENU: Drops down seamlessly from the capsule */}
        {activeGroup && (
          <div className={`mega-menu mega-menu-${activeGroup.key} is-open`} id="desktop-mega-menu" role="region" aria-label={`${localized(activeGroup.label)} ${localized('quick navigation')}`}>
            <div className="mega-menu-inner">
              <div className="mega-menu-intro">
                <div className="mega-menu-eyebrow">{activeGroup.eyebrow}</div>
                <h2>{localized(activeGroup.title)}</h2>
                <p>{localized(activeGroup.description)}</p>
                <Link className="mega-menu-all" href={activeGroup.href} onClick={() => setOpenMenu(null)}>
                  {localized(`Explore ${activeGroup.label.toLowerCase()}`)} <span aria-hidden="true">↗</span>
                </Link>
                {activeGroup.key === 'services' && <Link className="mega-menu-secondary" href="/features" onClick={() => setOpenMenu(null)}>{localized('Engineering standards')} <span aria-hidden="true">↗</span></Link>}
                {activeGroup.key === 'work' && <Link className="mega-menu-secondary" href="/work" onClick={() => setOpenMenu(null)}>{localized('Case studies')} <span aria-hidden="true">↗</span></Link>}
              </div>
              <div className="mega-menu-links">
                {activeGroup.items.map((item) => (
                  <Link href={item.href} key={item.href} className="mega-menu-link" onClick={() => setOpenMenu(null)}>
                    <span className="mega-menu-number">{item.number}</span>
                    <span className="mega-menu-link-copy"><strong>{localized(item.title)}</strong><small>{localized(item.description)}</small></span>
                    <span className="mega-menu-arrow" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MOBILE MENU */}
        <nav id="mobile-navigation" className={`mobile-nav-panel ${mobileOpen ? 'is-open' : ''}`} aria-label={localized('Mobile navigation')} aria-hidden={!mobileOpen}>
          {menuGroups.map((group) => (
            <div className="mobile-nav-group" key={group.key}>
              <div className="mobile-nav-group-row">
                <Link href={group.href} className={groupIsActive(pathname, group, locale) ? 'is-active' : undefined} tabIndex={mobileOpen ? 0 : -1}>{localized(group.label)}</Link>
                <button type="button" aria-label={`${localized(openMobileGroup === group.key ? 'Collapse' : 'Expand')} ${localized(group.label)} ${localized('links')}`} aria-expanded={openMobileGroup === group.key} aria-controls={openMobileGroup === group.key ? `mobile-${group.key}-submenu` : undefined} onClick={() => setOpenMobileGroup((current) => current === group.key ? null : group.key)} tabIndex={mobileOpen ? 0 : -1}>{openMobileGroup === group.key ? '−' : '+'}</button>
              </div>
              {openMobileGroup === group.key && (
                <div className="mobile-subnav-wrapper" id={`mobile-${group.key}-submenu`}>
                  <div className="mobile-subnav">
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>
                        {localized(item.title)}<span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mobile-subnav-secondary">
                    <Link href={group.href} className="mobile-explore-link" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>
                      {localized(`Explore ${group.label.toLowerCase()}`)} <span aria-hidden="true">↗</span>
                    </Link>
                    {group.key === 'services' && (
                      <Link href="/features" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>
                        {localized('Engineering standards')} <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                    {group.key === 'work' && (
                      <Link href="/work" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>
                        {localized('Case studies')} <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="/about" className={pathIsActive(pathname, localePath('/about', locale)) ? 'is-active' : undefined} onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>{localized('About')}</Link>
          <a href={clientPortalUrl} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>{localized('Client portal')} ↗</a>
          <LanguagePicker locale={locale} pathname={pathname || '/'} mobile onOpen={() => setOpenMobileGroup(null)} />
          <Link href="/contact" className="nav-cta mobile-cta" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>{localized('Start a project')} <span>↗</span></Link>
        </nav>
      </header>
    </>
  );
}
