'use client';

import Image from 'next/image';
import Link from '@/app/components/LocaleLink';
import { translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';
import { useEffect } from 'react';
import SiteFooter from '@/app/components/SiteFooter';
import SiteHeader from '@/app/components/SiteHeader';

const clientPortalUrl = process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.origins-software.com';

const capabilities = [
  { number: '01', title: 'Product engineering', text: 'Digital products built around real users, sound architecture and the work that needs to get done.', scope: 'PRODUCT · WEB · MOBILE' },
  { number: '02', title: 'Software architecture', text: 'Clear system boundaries, dependable APIs and integrations that make complexity easier to manage.', scope: 'PLATFORMS · APIS · INTEGRATION' },
  { number: '03', title: 'Cloud & operations', text: 'Practical infrastructure, delivery pipelines and observability designed for day-to-day reliability.', scope: 'CLOUD · DEVOPS · RELIABILITY' },
  { number: '04', title: 'AI & automation', text: 'Useful AI capabilities and automated workflows, shaped around real constraints rather than hype.', scope: 'AI SYSTEMS · DATA · AUTOMATION' },
  { number: '05', title: 'Security engineering', text: 'Threat-aware design, safer defaults and engineering practices that make risk visible early.', scope: 'APPLICATION SECURITY · REVIEW' },
  { number: '06', title: 'Modernisation', text: 'Incremental improvement for legacy systems, performance bottlenecks and accumulated technical debt.', scope: 'MIGRATION · REFACTORING · PERFORMANCE' },
];

const projectTypes = [
  { number: '01', sector: 'COMPUTER VISION', title: 'Turning visual data into dependable decisions', text: 'Detection and classification pipelines designed for variable environments, practical evaluation and real operating conditions.', disciplines: 'Applied machine learning / Data pipelines / Deployment' },
  { number: '02', sector: 'CONNECTED WORKFLOWS', title: 'Bringing fragmented operations into one workspace', text: 'Product experiences that connect communication, tasks, projects and the operational information teams rely on.', disciplines: 'Product engineering / Realtime systems / Integrations' },
  { number: '03', sector: 'AI & AUTOMATION', title: 'Making automated systems useful and governable', text: 'Agent-assisted workflows with explicit permissions, useful observability and human escalation when judgement matters.', disciplines: 'AI systems / Workflow orchestration / Access controls' },
];

const principles = [
  ['Accountable ownership', 'The people shaping the solution stay close to delivery, decisions and handover.'],
  ['Production before theatre', 'Testing, security, observability and maintainability belong in the work from the beginning.'],
  ['Commercial clarity', 'Scope, assumptions, milestones and trade-offs are made visible before they become surprises.'],
  ['Respect for what exists', 'We work with your business context, current systems and team—not against them.'],
];

const deliverySteps = [
  ['01', 'Understand', 'Clarify the problem, outcomes, constraints, users and existing systems.'],
  ['02', 'Design the approach', 'Agree scope, architecture, milestones, responsibilities and success measures.'],
  ['03', 'Build in increments', 'Deliver reviewable changes, test assumptions and keep decisions visible.'],
  ['04', 'Launch & hand over', 'Harden, document, release and leave your team with a system it can operate.'],
];

const mapBounds = {
  west: -169.110266,
  east: 190.486279,
  north: 83.600842,
  south: -58.508473,
};
// Convert latitude into Mercator map coordinates
const mercatorY = (latitude: number): number => {
  const radians = (latitude * Math.PI) / 180;

  return Math.log(
    Math.tan(Math.PI / 4 + radians / 2)
  );
};

// Project geographic coordinates onto the actual world.svg
const projectMapCoordinate = (
  latitude: number,
  longitude: number
) => {
  const safeLatitude = Math.max(
    mapBounds.south,
    Math.min(mapBounds.north, latitude)
  );

  const northY = mercatorY(mapBounds.north);
  const southY = mercatorY(mapBounds.south);
  const currentY = mercatorY(safeLatitude);

  return {
    left:
      ((longitude - mapBounds.west) /
        (mapBounds.east - mapBounds.west)) * 100,

    top:
      ((northY - currentY) /
        (northY - southY)) * 100,
  };
};

const supportedMarkets = [
  { label: 'United Kingdom', region: 'Europe', latitude: 51.5072, longitude: -0.1276 },
  { label: 'Ireland', region: 'Europe', latitude: 53.3498, longitude: -6.2603 },
  { label: 'Iceland', region: 'Europe', latitude: 64.1466, longitude: -21.9426 },
  { label: 'Norway', region: 'Europe', latitude: 59.9139, longitude: 10.7522 },
  { label: 'Finland', region: 'Europe', latitude: 60.1699, longitude: 24.9384 },
  { label: 'Germany', region: 'Europe', latitude: 52.5200, longitude: 13.4050 },
  { label: 'France', region: 'Europe', latitude: 48.8566, longitude: 2.3522 },
  { label: 'Slovakia', region: 'Europe', latitude: 48.1486, longitude: 17.1077 },
  { label: 'Serbia', region: 'Europe', latitude: 44.7866, longitude: 20.4489 },
  { label: 'Japan', region: 'Asia Pacific', latitude: 35.6762, longitude: 139.6503 },
  { label: 'Myanmar', region: 'Asia Pacific', latitude: 16.8409, longitude: 96.1735 },
  { label: 'Thailand', region: 'Asia Pacific', latitude: 13.7563, longitude: 100.5018 },
  { label: 'Singapore', region: 'Asia Pacific', latitude: 1.3521, longitude: 103.8198 },
  { label: 'Australia', region: 'Oceania', latitude: -33.8688, longitude: 151.2093 },
  { label: 'New Zealand', region: 'Oceania', latitude: -41.2865, longitude: 174.7762 },
];

const marketRegions = ['Europe', 'Asia Pacific', 'Oceania'] as const;

const partnerGroups = [
  { label: 'AI platforms', partners: [
    { name: 'Gemini', icon: 'gemini' },
    { name: 'Claude', icon: 'claude' },
    { name: 'ChatGPT', icon: 'chatgpt' },
    { name: 'Microsoft Copilot', icon: 'copilot' },
  ] },
  { label: 'Cloud & technology', partners: [
    { name: 'Microsoft', icon: 'microsoft' },
    { name: 'AWS', icon: 'aws' },
    { name: 'Alibaba Cloud', icon: 'alibaba-cloud' },
  ] },
];

export default function PremiumLanding() {
  const locale = useLocale();
  const localized = (text: string) => translate(locale, text);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    elements.forEach((element) => {
      element.classList.add('reveal-pending');
      const delay = element.getAttribute('data-delay') || '0';
      if (delay) element.style.transitionDelay = `${delay}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.1 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="origins-landing premium-override" id="main-content">
      <SiteHeader/>

      {/* --- HERO SECTION --- */}
      <section className="home-hero premium-hero" aria-labelledby="hero-title">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-layout shell compact-hero">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow" data-reveal><span className="status-dot pulse" /> {localized('INDEPENDENT SOFTWARE COMPANY')}</div>
            <h1 id="hero-title" className="massive-title" data-reveal data-delay="100">
              {localized('Software for')}<br />
              {localized('the work that')} <span className="lime-underline highlight-sweep">{localized('matters.')}</span>
            </h1>
            <p className="hero-lede" data-reveal data-delay="200">
              {localized('We design, build and run digital products, business platforms and cloud systems—bringing clear thinking and careful engineering to every stage.')}
            </p>
            <div className="hero-actions" data-reveal data-delay="300">
              <a className="button button-primary premium-btn" href={clientPortalUrl} target="_blank" rel="noreferrer">
                {localized('Open client portal')} <span className="button-arrow icon-smooth" aria-hidden="true">↗</span>
              </a>
              <Link className="button button-ghost premium-btn-ghost" href="/services">
                {localized('Explore capabilities')} <span className="button-arrow icon-smooth" aria-hidden="true">↘</span>
              </Link>
            </div>
          </div>

          <div className="hero-visual software-showcase" data-reveal data-delay="300" role="region" aria-label={localized('Client starting points')}>
            <div className="showcase-window">
              <div className="showcase-window-bar">
                <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="showcase-window-label">ORIGINS / CLIENT STARTING POINTS</span>
                <span className="showcase-window-index">01—03</span>
              </div>
              <div className="showcase-content">
                <div className="showcase-intro">
                  <div className="showcase-heading">
                    <span className="showcase-eyebrow">{localized('A PRACTICAL PLACE TO START')}</span>
                    <h2 className="showcase-kicker">{localized('What do you need to move forward?')}</h2>
                  </div>
                  <span className="showcase-live"><i /> {localized('CLEAR NEXT STEPS')}</span>
                </div>
                <p className="showcase-description">{localized('Choose the closest fit. We’ll help define a practical next step.')}</p>
                <nav className="showcase-pathways" aria-label={localized('Choose a project starting point')}>
                  <Link className="showcase-pathway" href="/contact">
                    <span className="pathway-index">01</span>
                    <span className="pathway-copy">
                      <strong>{localized('Starting a new product?')}</strong>
                      <small>{localized('Product scope, architecture and a delivery plan.')}</small>
                    </span>
                    <span className="pathway-action">{localized('Start a project')}<i aria-hidden="true">↗</i></span>
                  </Link>
                  <Link className="showcase-pathway" href="/services">
                    <span className="pathway-index">02</span>
                    <span className="pathway-copy">
                      <strong>{localized('Improving a live system?')}</strong>
                      <small>{localized('Cloud, security, AI, modernisation and performance.')}</small>
                    </span>
                    <span className="pathway-action">{localized('Explore services')}<i aria-hidden="true">↗</i></span>
                  </Link>
                  <a className="showcase-pathway" href={clientPortalUrl} target="_blank" rel="noreferrer">
                    <span className="pathway-index">03</span>
                    <span className="pathway-copy">
                      <strong>{localized('Already working with us?')}</strong>
                      <small>{localized('Review quotations, service fees, invoices, documents and payment status in the secure client portal.')}</small>
                    </span>
                    <span className="pathway-action">{localized('Open client portal')}<i aria-hidden="true">↗</i></span>
                  </a>
                </nav>
                <div className="showcase-footnote">
                  <span>{localized('START WITH THE OUTCOME')}</span>
                  <span><i /> {localized('GOALS · USERS · CONSTRAINTS')}</span>
                </div>
              </div>
            </div>
            <div className="showcase-orbit showcase-orbit-one" aria-hidden="true" />
            <div className="showcase-orbit showcase-orbit-two" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* --- PREMIUM PARTNERSHIP / ECOSYSTEM SECTION --- */}
      <section className="ecosystem-section" aria-label={localized('Technology Partners')} data-reveal>
        <div className="ecosystem-inner shell">
          <p className="mono-accent ecosystem-title">{localized('Technology Partners')}</p>
          <div className="partner-groups">
            {partnerGroups.map(({ label, partners }) => (
              <div className="partner-group" key={label}>
                <h3 className="partner-group-label">{localized(label)}</h3>
                <div className="partner-chip-list">
                  {partners.map((partner) => (
                    <span className="partner-chip" key={partner.name}>
                      <Image src={`/partner-logos/${partner.icon}.svg`} alt="" aria-hidden="true" width={18} height={18} className={`partner-chip-icon partner-chip-icon-${partner.icon}`} />
                      <span>{partner.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GLOBAL MARKETS (WORLD MAP) --- */}
      <section className="markets-section shell tight-section" id="markets">
        <div className="section-heading split-heading align-top" data-reveal>
          <div className="heading-left">
            <div className="eyebrow mono-accent">{localized('Global Reach')}</div>
            <h2 className="premium-h2">{localized('Supported')}<br /><em className="italic-accent">{localized('Markets.')}</em></h2>
          </div>
          <p className="heading-right-text">{localized('We operate and deploy infrastructure seamlessly across key strategic regions, ensuring low-latency delivery and localized engineering compliance.')}</p>
        </div>

        <div className="map-wrapper" data-reveal data-delay="100">
          <div className="map-canvas">
            <Image
              src="/world.svg"
              alt={localized("Map showing Origins' supported markets")}
              width={1010}
              height={666}
              className="world-map-svg"
              priority
            />
            {supportedMarkets.map((market) => {
  const position = projectMapCoordinate(
    market.latitude,
    market.longitude
  );

  return (
    <div
      key={market.label}
      className="world-map-marker"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
      }}
      title={market.label}
    />
  );
})}
          </div>
          <aside className="map-market-list" aria-label={localized('Supported countries')}>
            {marketRegions.map((region) => {
              const regionId = `market-region-${region.replace(/\s+/g, '-').toLowerCase()}`;
              return (
                <section className="map-market-region" key={region} aria-labelledby={regionId}>
                  <h3 id={regionId}>
                    <span className="map-market-region-dot" aria-hidden="true" />
                    {localized(region)}
                    <span className="map-market-count">
                      {String(supportedMarkets.filter((market) => market.region === region).length).padStart(2, '0')}
                    </span>
                  </h3>
                  <ul>
                    {supportedMarkets.filter((market) => market.region === region).map(({ label }) => (
                      <li key={label}>{localized(label)}</li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </aside>
        </div>
      </section>

      {/* --- CAPABILITIES --- */}
      <section className="section capabilities-section shell tight-section" id="capabilities">
        <div className="section-heading split-heading align-top" data-reveal>
          <div className="heading-left">
            <div className="eyebrow mono-accent">{localized('Capabilities')}</div>
            <h2 className="premium-h2">{localized('Deep technical work.')}<br /><em className="italic-accent">{localized('Clear ownership.')}</em></h2>
          </div>
          <p className="heading-right-text">{localized('Bring us the whole product, a complex technical layer or the system that needs to become dependable. We shape the team around the work—not the other way around.')}</p>
        </div>

        <div className="capability-list sleek-accordion">
          {capabilities.map((item, i) => (
            <article className="capability-row premium-row" key={item.number} data-reveal data-delay={i * 50}>
              <div className="row-left">
                <span className="capability-number mono-accent">{item.number}</span>
                <h3 className="row-title">{localized(item.title)}</h3>
              </div>
              <div className="capability-main">
                <p className="row-text">{localized(item.text)}</p>
              </div>
              <div className="row-right">
                <div className="capability-scope mono-tag">{localized(item.scope)}</div>
                <Link className="row-link arrow-hover" aria-label={`${localized('Learn about')} ${localized(item.title)}`} href="/services"><span>↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- WORK SECTION --- */}
      <section className="work-section bento-section tight-section" id="work">
        <div className="shell">
          <div className="section-heading split-heading work-heading" data-reveal>
            <div>
              <div className="eyebrow mono-accent">{localized('The work')}</div>
              <h2 className="premium-h2">{localized('Problems first.')}<br /><em className="italic-accent">{localized('Technology second.')}</em></h2>
            </div>
            <div className="work-heading-aside">
              <p>{localized('Good engineering starts with the job the system needs to do. These are representative problem areas across product, platform and automation work.')}</p>
              <Link className="text-link premium-text-link" href="/work">{localized('Explore our approach')} <span className="icon-smooth">↗</span></Link>
            </div>
          </div>

          <div className="project-list bento-grid">
            {projectTypes.map((project, i) => (
              <article className="project-row bento-card" key={project.number} data-reveal data-delay={i * 100}>
                <div className="card-top">
                  <div className="project-number mono-accent">{project.number}</div>
                  <div className="eyebrow project-sector mono-tag">{localized(project.sector)}</div>
                </div>
                <div className="project-content">
                  <h3 className="card-title">{localized(project.title)}</h3>
                  <p className="card-text">{localized(project.text)}</p>
                </div>
                <div className="card-bottom">
                  <div className="project-disciplines">{localized(project.disciplines)}</div>
                  <div className="project-symbol bento-arrow" aria-hidden="true">↗</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- METHOD --- */}
      <section className="method-section timeline-section shell tight-section" id="approach">
        <div className="method-layout method-split">
          <div className="method-intro sticky-side" data-reveal>
            <div className="eyebrow mono-accent">{localized('A considered process')}</div>
            <h2 className="premium-h2">{localized('Less uncertainty.')}<br /><em className="italic-accent">{localized('Better decisions.')}</em></h2>
            <p>{localized('Clear stages create room for good engineering. At each step, we make the next decision easier to see—and easier to explain.')}</p>
            <Link className="text-link premium-text-link mt-4" href="/process">{localized('Our delivery process')} <span className="icon-smooth">↗</span></Link>
          </div>
          <div className="delivery-list timeline-list">
            {deliverySteps.map(([number, title, text], i) => (
              <article className="delivery-step timeline-step" key={number} data-reveal data-delay={i * 100}>
                <div className="timeline-node"></div>
                <span className="delivery-number massive-number">{number}</span>
                <div className="timeline-content">
                  <h3 className="timeline-title">{localized(title)}</h3>
                  <p className="timeline-text">{localized(text)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRINCIPLES --- */}
      <section className="principles-section shell clean-grid tight-section" id="about">
        <div className="section-heading centered-heading" data-reveal>
          <div className="eyebrow mono-accent">{localized('The Origins standard')}</div>
          <h2 className="premium-h2">{localized('Trust is earned in')}<br /><em className="italic-accent">{localized('the details.')}</em></h2>
        </div>
        <div className="principles-list bento-grid-2x2">
          {principles.map(([title, body], index) => (
            <article className="principle-row bento-card subtle-card" key={title} data-reveal data-delay={index * 100}>
              <div className="card-header">
                <span className="principle-index mono-accent">0{index + 1}</span>
                <div className="tech-line"></div>
              </div>
              <h3 className="card-title">{localized(title)}</h3>
              <p className="card-text">{localized(body)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="cta-section brutalist-cta" id="contact">
        <div className="shell cta-layout" data-reveal>
          <div className="cta-grid-bg" aria-hidden="true"></div>
          <div className="cta-content-wrapper">
            <div className="eyebrow mono-accent pulse-text">{localized('Start with a conversation')}</div>
            <h2 className="massive-title">{localized('Bring us the')}<br /><em className="italic-accent">{localized('difficult part.')}</em></h2>
            <p className="cta-p">{localized('Tell us what you are building, what is not working or what needs to happen next. We will help turn the problem into a practical plan.')}</p>
            <div className="hero-actions cta-actions">
              <a className="button button-primary premium-btn" href={clientPortalUrl} target="_blank" rel="noreferrer">{localized('Open client portal')} <span className="button-arrow icon-smooth" aria-hidden="true">↗</span></a>
              <a href="mailto:support@origins-software.com" className="button button-ghost premium-btn-ghost">{localized('Email the team')} <span className="button-arrow icon-smooth" aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="cta-footer-metrics">
            <span className="mono-accent">ORIGINS SOFTWARE</span>
            <span className="mono-accent right-align">{localized('ENGINEERED WITH INTENT.')}</span>
          </div>
        </div>
      </section>

      <SiteFooter/>

      {/* --- PREMIUM STYLES --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --premium-ease: cubic-bezier(0.16, 1, 0.3, 1);
          --surface-bg: #050b0d;
          --surface-border: rgba(169, 188, 199, 0.13);
          --text-primary: #ffffff;
          --text-secondary: #9aabb2;
        }

        .premium-override {
          background:
            radial-gradient(ellipse at 50% 0%, rgba(25, 56, 63, .18), transparent 46%),
            var(--surface-bg);
          color: var(--text-primary);
          overflow-x: hidden;
        }

        .reveal-pending { opacity: 0; transform: translateY(20px); }
        .is-visible { opacity: 1; transform: translateY(0); transition: opacity 0.8s var(--premium-ease), transform 0.8s var(--premium-ease); will-change: opacity, transform; }

        /* TIGHTER OVERALL SPACING */
        .tight-section { padding: 4rem 0; }
        .split-heading { margin-bottom: 2rem; }

        .massive-title { font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.05; letter-spacing: -0.03em; font-weight: 400; margin-bottom: 1.5rem; }
        .premium-h2 { font-size: clamp(2rem, 3.5vw, 3.5rem); line-height: 1.1; letter-spacing: -0.02em; font-weight: 400; }
        .italic-accent { font-style: italic; color: var(--text-secondary); font-weight: 300; }
        .mono-accent { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-secondary); }

        /* HERO LAYOUT */
        .premium-hero { position: relative; padding-top: 10vh; padding-bottom: 2rem; display: flex; align-items: center; }
        .compact-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .hero-noise { position: absolute; inset: 0; opacity: 0.03; pointer-events: none; background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E'); }

        .premium-hero {
          min-height: min(860px, calc(100svh - 84px));
          padding: clamp(3.5rem, 8vh, 6.5rem) 0 4rem;
          border-bottom: 1px solid rgba(169,188,199,.1);
          background:
            linear-gradient(90deg, transparent 49.95%, rgba(169,188,199,.035) 50%, transparent 50.05%),
            radial-gradient(ellipse at 78% 45%, rgba(205,220,57,.11), transparent 40%);
        }
        .compact-hero { min-height: min(760px, calc(100svh - 84px)); grid-template-columns: 1.02fr .98fr; gap: clamp(2rem, 5vw, 5rem); padding-block: 2rem; }
        .hero-copy { max-width: 680px; }
        .hero-copy .hero-eyebrow { letter-spacing: .17em; }
        .premium-override .massive-title { max-width: 760px; font-size: clamp(3.3rem, 7vw, 6.4rem); line-height: .98; letter-spacing: -.065em; }
        .premium-override .hero-lede { max-width: 530px; font-size: clamp(1rem, 1.35vw, 1.15rem); line-height: 1.8; }
        .software-showcase { position: relative; min-width: 0; padding: 1.5rem 0 1.5rem 1.5rem; perspective: 1200px; }
        .software-showcase::before {
          position: absolute; inset: 8% -4% 5% 2%; content: ""; border: 1px solid rgba(205,220,57,.13);
          background: radial-gradient(ellipse at 60% 45%, rgba(205,220,57,.08), transparent 62%);
          transform: rotate(-5deg); pointer-events: none;
        }
        .showcase-window {
          position: relative; z-index: 1; overflow: hidden; border: 1px solid rgba(169,188,199,.22);
          background: linear-gradient(145deg, rgba(15,35,42,.98), rgba(5,15,19,.99) 72%);
          box-shadow: 0 42px 100px rgba(0,0,0,.52), inset 0 1px rgba(255,255,255,.07);
          transform: rotateY(-4deg) rotateX(1deg);
          transition: transform .7s var(--premium-ease), box-shadow .7s var(--premium-ease);
        }
        .software-showcase:hover .showcase-window {
          transform: rotateY(0) rotateX(0) translateY(-4px);
          box-shadow: 0 52px 110px rgba(0,0,0,.58), inset 0 1px rgba(255,255,255,.08);
        }
        .showcase-window-bar, .showcase-intro, .showcase-footnote { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .showcase-window-bar { min-height: 50px; padding: 0 1.2rem; border-bottom: 1px solid var(--surface-border); background: rgba(255,255,255,.018); }
        .window-dots { display: flex; gap: 5px; }
        .window-dots i { width: 6px; height: 6px; border-radius: 50%; background: #48606a; }
        .window-dots i:first-child { background: var(--lime); }
        .showcase-window-label, .showcase-window-index, .showcase-footnote { color: #718893; font: 8px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .11em; }
        .showcase-content { padding: clamp(1.5rem, 3vw, 2.25rem); }
        .showcase-intro { align-items: flex-start; }
        .showcase-heading { display: grid; min-width: 0; gap: .55rem; }
        .showcase-eyebrow { color: #82969e; font: 7px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .12em; }
        .showcase-kicker { margin: 0; color: #f2f5f7; font-size: clamp(1rem, 1.7vw, 1.3rem); font-weight: 500; line-height: 1.25; letter-spacing: -.035em; }
        .showcase-live { display: inline-flex; align-items: center; gap: 7px; color: var(--lime); font: 7px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .08em; }
        .showcase-live i, .showcase-footnote i { width: 5px; height: 5px; border-radius: 50%; background: var(--lime); box-shadow: 0 0 9px rgba(205,220,57,.7); }
        .showcase-description { margin: .85rem 0 1.15rem; color: #93a6ae; font-size: 10px; line-height: 1.6; }
        .showcase-pathways { display: grid; gap: 8px; }
        .showcase-pathway { display: grid; grid-template-columns: 27px minmax(0, 1fr) max-content; align-items: center; gap: 10px; padding: 12px; border: 1px solid rgba(169,188,199,.13); background: linear-gradient(100deg, rgba(255,255,255,.035), rgba(255,255,255,.008)); text-decoration: none; transition: border-color .2s ease, background .2s ease, transform .2s ease; }
        .showcase-pathway:hover { transform: translateX(3px); border-color: rgba(205,220,57,.35); background: linear-gradient(100deg, rgba(205,220,57,.055), rgba(255,255,255,.012)); }
        .pathway-index { align-self: start; padding-top: 1px; color: var(--lime); font: 8px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .pathway-copy { display: grid; min-width: 0; gap: 3px; }
        .pathway-copy strong { color: #e5ecef; font-size: 10px; font-weight: 500; line-height: 1.35; }
        .pathway-copy small { color: #82969e; font-size: 8px; line-height: 1.45; }
        .pathway-action { display: inline-flex; align-items: center; gap: 7px; color: #c9d46a; font: 7px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: nowrap; }
        .pathway-action i { color: #e2e9ec; font-size: 11px; font-style: normal; }
        .showcase-footnote { justify-content: space-between; margin-top: 1.2rem; font-size: 7px; }
        .showcase-footnote > span:last-child { display: inline-flex; align-items: center; gap: 7px; }
        .showcase-orbit { position: absolute; border: 1px solid rgba(205,220,57,.12); border-radius: 50%; pointer-events: none; }
        .showcase-orbit-one { width: 100px; height: 100px; top: -14px; right: -20px; }
        .showcase-orbit-two { width: 58px; height: 58px; top: 7px; right: 1px; border-color: rgba(205,220,57,.2); }

        /* TECHNOLOGY PARTNERS */
        .ecosystem-section { position: relative; padding: 3.5rem 0 4rem; border-bottom: 1px solid var(--surface-border); margin-bottom: 1rem; background: linear-gradient(180deg, rgba(255,255,255,.012), transparent); }
        .ecosystem-title { margin: 0 0 1.6rem; opacity: .8; font-size: .7rem; }
        .partner-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
        .partner-group { display: grid; grid-template-columns: minmax(105px, .3fr) 1fr; align-items: center; gap: 1rem; padding: 1.25rem 1.4rem; border: 1px solid var(--surface-border); background: linear-gradient(135deg, rgba(255,255,255,.035), rgba(255,255,255,.008)); transition: border-color .25s ease, transform .25s ease; }
        .partner-group:hover { border-color: rgba(205,220,57,.28); transform: translateY(-2px); }
        .partner-group-label { margin: 0; color: #8fa2aa; font: 8px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .1em; text-transform: uppercase; }
        .partner-chip-list { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; }
        .partner-chip { display: inline-flex; align-items: center; gap: .55rem; padding: .42rem .72rem; border: 1px solid rgba(169,188,199,.14); color: #d4dde1; background: rgba(4,15,19,.5); font-size: .75rem; font-weight: 500; white-space: nowrap; transition: color .2s ease, border-color .2s ease, background .2s ease; }
        .partner-chip-icon { width: 18px; height: 18px; flex: 0 0 auto; object-fit: contain; filter: brightness(0) invert(.88); }
        .partner-chip-icon-copilot { filter: none; }
        .partner-chip:hover { color: var(--lime); border-color: rgba(205,220,57,.4); background: rgba(205,220,57,.055); }

        .tight-section { padding-top: clamp(4rem, 8vw, 7rem); padding-bottom: clamp(4rem, 8vw, 7rem); }
        .premium-h2 { font-size: clamp(2.2rem, 4vw, 4rem); letter-spacing: -.045em; }
        .bento-card { position: relative; overflow: hidden; border-color: rgba(169,188,199,.12); background: linear-gradient(145deg, rgba(15,35,42,.72), rgba(6,16,20,.9)); }
        .bento-card::before { position: absolute; inset: 0; content: ""; pointer-events: none; opacity: 0; background: radial-gradient(circle at 90% 8%, rgba(205,220,57,.09), transparent 34%); transition: opacity .4s ease; }
        .bento-card:hover::before { opacity: 1; }
        .bento-card > * { position: relative; }
        .map-wrapper { border-color: rgba(169,188,199,.14); background: radial-gradient(ellipse at 50% 50%, #0b1c22, #03090c 72%); box-shadow: inset 0 1px rgba(255,255,255,.035); }
        .brutalist-cta { background: radial-gradient(ellipse at 50% 100%, rgba(205,220,57,.08), transparent 55%); }
        .cta-grid-bg { opacity: .12; }

        /* --- GLOBAL MAP WIDGET --- */
        .map-wrapper { 
          position: relative; width: 100%; height: 500px; margin-top: 2.5rem;
          border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;
          background: #000;
          overflow: hidden; display: flex; justify-content: center; align-items: center;
        }
        .map-canvas { position: relative; flex: none; width: min(100%, 757px); aspect-ratio: 1009.6727 / 665.96301; }
        .world-map-svg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; filter: brightness(0) invert(1); opacity: 0.35; }
        
        .map-node { position: absolute; z-index: 10; width: 0; height: 0; }
        
        /* The glowing lime dot */
        .node-core { 
          width: 5px; height: 5px; 
          background: #c8ff00; 
          border-radius: 50%; 
          box-shadow: 0 0 10px #c8ff00; 
          position: absolute; 
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          z-index: 2; 
        }

        .world-map {
  position: relative;
  width: 100%;
  aspect-ratio: 1009.6727 / 665.96301;
}

.world-map img {
  object-fit: contain;
}

/* Visible country location markers */
.world-map-marker {
  position: absolute;
  z-index: 20;
  display: block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #c8ff00;
  border: 1.5px solid #f4ffc0;
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 3px rgba(200, 255, 0, 0.15),
    0 0 12px rgba(200, 255, 0, 0.95),
    0 0 22px rgba(200, 255, 0, 0.35);
  cursor: pointer;
}

/* Animated outer ring */
.world-map-marker::after {
  content: "";
  position: absolute;
  inset: -7px;
  border: 1px solid rgba(200, 255, 0, 0.75);
  border-radius: 50%;
  animation: market-marker-pulse 2.8s ease-out infinite;
  pointer-events: none;
}

@keyframes market-marker-pulse {
  0% {
    opacity: 0.8;
    transform: scale(0.55);
  }
  70%, 100% {
    opacity: 0;
    transform: scale(1.7);
  }
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  .world-map-marker::after {
    animation: none;
  }
}

        /* The offset hollow ring matching the screenshot perfectly */
        .node-ring { 
          position: absolute; 
          width: 22px; height: 22px; 
          border: 1.5px solid #c8ff00; 
          border-radius: 50%; 
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          opacity: 0.7; 
        }
        
        /* BUTTONS & LINKS */
        .premium-btn { background: #ffffff; color: #000000; border-radius: 99px; padding: 0.85rem 1.75rem; font-weight: 500; transition: transform 0.4s var(--premium-ease), box-shadow 0.4s var(--premium-ease); font-size: 0.95rem; }
        .premium-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255,255,255,0.1); }
        .premium-btn-ghost { border: 1px solid var(--surface-border); border-radius: 99px; padding: 0.85rem 1.75rem; transition: background 0.4s var(--premium-ease); font-size: 0.95rem; }
        .premium-btn-ghost:hover { background: rgba(255,255,255,0.05); }
        .icon-smooth { display: inline-block; transition: transform 0.4s var(--premium-ease); }
        .premium-btn:hover .icon-smooth, .premium-btn-ghost:hover .icon-smooth, .premium-text-link:hover .icon-smooth { transform: translate(3px, -3px); }

        /* BENTO GRIDS (Tightened) */
        .bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 2rem; }
        .bento-card { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--surface-border); padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; min-height: 280px; transition: transform 0.4s var(--premium-ease), background 0.4s var(--premium-ease); border-radius: 8px; }
        .bento-card:hover { background: rgba(255, 255, 255, 0.04); transform: translateY(-3px); }
        
       .card-top { 
  display: flex; 
  align-items: center; 
  justify-content: flex-start; 
  gap: 1rem; 
  margin-bottom: 1.25rem; 
}

/* Fixes the vertical alignment by removing hidden margins and locking line-heights */
.card-top .project-sector {
  margin-bottom: 0 !important;
}

.card-top .project-number {
  line-height: 1;
  margin-top: 2px; /* Fine-tunes the number to sit perfectly level with the text inside the tag */
}
        .card-title { font-size: 1.25rem; font-weight: 400; margin-bottom: 0.5rem; }
        .card-text { color: var(--text-secondary); line-height: 1.5; font-size: 0.9rem; }
        .card-bottom { margin-top: 1rem; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid var(--surface-border); padding-top: 1rem; }
        .bento-arrow { font-size: 1.2rem; color: var(--text-secondary); transition: transform 0.3s; }
        .bento-card:hover .bento-arrow { transform: translate(3px, -3px); color: #fff; }

        .bento-grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2rem; }
        .subtle-card { min-height: 180px; }
        .tech-line { height: 1px; background: var(--surface-border); flex-grow: 1; margin-left: 1rem; }
        .card-header { display: flex; align-items: center; margin-bottom: 1rem; }

        /* ROW ACCORDION (Tightened) */
        .sleek-accordion { display: flex; flex-direction: column; margin-top: 2rem; }
        .premium-row { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1.5rem; padding: 1.75rem 0; border-bottom: 1px solid var(--surface-border); align-items: center; transition: background 0.3s ease, padding 0.3s ease; }
        .premium-row:first-child { border-top: 1px solid var(--surface-border); }
        .premium-row:hover { background: rgba(255,255,255,0.015); padding-left: 1rem; padding-right: 1rem; }
        .row-left { display: flex; gap: 1.5rem; align-items: baseline; }
        .row-title { font-size: 1.25rem; font-weight: 400; }
        .row-text { color: var(--text-secondary); font-size: 0.95rem; max-width: 500px; line-height: 1.5; }
        .row-right { display: flex; justify-content: space-between; align-items: center; }
        .mono-tag { font-family: monospace; font-size: 0.65rem; padding: 0.3rem 0.6rem; border: 1px solid var(--surface-border); border-radius: 4px; color: var(--text-secondary); }

        /* TIMELINE (Tightened) */
        .method-split { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; position: relative; }
        .sticky-side { position: sticky; top: 15vh; height: fit-content; }
        .timeline-list { position: relative; border-left: 1px solid var(--surface-border); padding-left: 2rem; margin-top: 1rem; }
        .timeline-step { 
          display: block; /* Overrides the tight global grid */
          position: relative; 
          margin-bottom: 3rem; 
          padding: 0; /* Clears global padding */
          border: none; /* Clears global borders */
        }
        .timeline-step:last-child { margin-bottom: 0; }
        .timeline-node { position: absolute; left: -2rem; top: 0; width: 9px; height: 9px; background: var(--surface-bg); border: 1px solid #fff; border-radius: 50%; transform: translateX(-50%); }
        .massive-number { font-size: 2.5rem; font-weight: 300; line-height: 1; color: rgba(255,255,255,0.05); display: block; margin-bottom: 0.5rem; }
        .timeline-title { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .timeline-text { color: var(--text-secondary); line-height: 1.5; font-size: 0.95rem; }

        /* BRUTALIST CTA */
        .brutalist-cta { padding: 6rem 0; position: relative; overflow: hidden; }
        .cta-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--surface-border) 1px, transparent 1px), linear-gradient(90deg, var(--surface-border) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.2; mask-image: radial-gradient(circle at center, black, transparent 70%); }
        .cta-content-wrapper { position: relative; z-index: 1; text-align: center; max-width: 800px; margin: 0 auto; }
        .cta-content-wrapper .eyebrow {
          justify-content: center;
          margin-bottom: 1.5rem; /* Creates breathing room above the title */
        }

        .cta-content-wrapper .massive-title {
          margin-top: 0; /* Resets any default spacing pulling it upward */
        }
        .cta-p { font-size: 1.05rem; color: var(--text-secondary); margin: 1.25rem auto 2rem; max-width: 600px; line-height: 1.5; }
        .cta-actions { justify-content: center; }
        .cta-footer-metrics { display: flex; justify-content: space-between; border-top: 1px solid var(--surface-border); margin-top: 4rem; padding-top: 1.5rem; position: relative; z-index: 1; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .compact-hero { grid-template-columns: 1fr; gap: 3rem; }
          .premium-hero, .compact-hero { min-height: auto; }
          .hero-copy { max-width: 760px; padding-bottom: 0; }
          .software-showcase { width: min(100%, 760px); justify-self: center; }
          .premium-row { grid-template-columns: 1fr; gap: 1rem; padding: 1.5rem 0; }
          .row-left { display: flex; flex-direction: column; gap: 0.25rem; }
          .bento-grid, .bento-grid-2x2 { grid-template-columns: 1fr 1fr; }
          .method-split { grid-template-columns: 1fr; }
          .sticky-side { position: static; margin-bottom: 2rem; }
          .partner-groups { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .premium-hero { padding: 3rem 0 3.5rem; }
          .compact-hero { gap: 2rem; padding-block: 0; }
          .premium-override .massive-title { font-size: clamp(3rem, 11vw, 5rem); }
          .software-showcase { padding: .5rem 0 .5rem .5rem; }
          .showcase-window { transform: none; }
          .showcase-content { padding: 1rem; }
          .showcase-live { max-width: 110px; text-align: right; }
          .partner-group { grid-template-columns: 1fr; gap: .75rem; }
          .partner-chip { font-size: .7rem; }
          .map-wrapper { height: 350px; }
          .map-canvas { max-width: 530px; }
          .bento-grid, .bento-grid-2x2 { grid-template-columns: 1fr; }
          .timeline-list { padding-left: 1.5rem; }
          .timeline-node { left: -1.5rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .showcase-window, .showcase-pathway, .partner-group, .partner-chip, .bento-card::before {
            transition: none;
          }
          .software-showcase:hover .showcase-window, .showcase-pathway:hover, .partner-group:hover {
            transform: none;
          }
        }

        /* Refined software-company visual system */
        .premium-override {
          --surface-bg: #071116;
          --surface-border: rgba(157, 184, 194, .16);
          --text-secondary: #aab9bf;
          background:
            radial-gradient(ellipse at 82% 7%, rgba(205, 220, 57, .08), transparent 30rem),
            linear-gradient(180deg, #081419 0%, #061014 45%, #071116 100%);
        }
        .premium-hero {
          min-height: min(790px, calc(100svh - 84px));
          border-bottom-color: rgba(157,184,194,.16);
          background:
            linear-gradient(rgba(174,198,205,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(174,198,205,.035) 1px, transparent 1px),
            radial-gradient(ellipse at 74% 44%, rgba(205,220,57,.09), transparent 36%);
          background-size: 64px 64px, 64px 64px, auto;
          background-position: center center;
        }
        .premium-hero::after {
          position: absolute;
          inset: auto 0 0;
          height: 1px;
          content: "";
          background: linear-gradient(90deg, transparent, rgba(205,220,57,.38), transparent);
        }
        .premium-hero > .hero-noise { display: none; }
        .compact-hero { min-height: min(690px, calc(100svh - 84px)); }
        .hero-copy .hero-eyebrow { color: #b7c5c9; }
        .premium-override .massive-title {
          font-size: clamp(3.5rem, 6.4vw, 6.2rem);
          line-height: .99;
          letter-spacing: -.075em;
          text-wrap: balance;
        }
        .premium-override .hero-lede {
          margin-top: 1.65rem;
          color: #aab9bf;
          font-size: clamp(1.05rem, 1.35vw, 1.18rem);
          line-height: 1.75;
        }
        .hero-actions { gap: .8rem; }
        .premium-btn {
          border: 1px solid var(--lime);
          background: var(--lime);
          color: #10170a;
          box-shadow: 0 8px 26px rgba(205,220,57,.14);
        }
        .premium-btn:hover { background: #dce96a; box-shadow: 0 12px 32px rgba(205,220,57,.2); }
        .premium-btn-ghost {
          border-color: rgba(173,194,201,.24);
          background: rgba(7,17,22,.55);
          color: #e8edef;
        }
        .premium-btn-ghost:hover { border-color: rgba(205,220,57,.42); background: rgba(205,220,57,.06); }
        .software-showcase { padding: 1.1rem 0 1.1rem 1.1rem; }
        .software-showcase::before {
          inset: 5% -5% 4% 1%;
          border-color: rgba(205,220,57,.2);
          background: radial-gradient(ellipse at 72% 38%, rgba(205,220,57,.1), transparent 58%);
          transform: rotate(-3deg);
        }
        .showcase-window {
          border-color: rgba(166,193,201,.22);
          border-radius: 12px;
          background: linear-gradient(145deg, rgba(15,35,42,.98), rgba(6,17,22,.99) 76%);
          box-shadow: 0 36px 100px rgba(0,0,0,.48), inset 0 1px rgba(255,255,255,.07);
        }
        .showcase-window-bar { min-height: 48px; }
        .showcase-content { padding: clamp(1.5rem, 3vw, 2rem); }
        .showcase-window-label, .showcase-window-index { font-size: 9px; }
        .showcase-kicker { font-size: 1.1rem; }
        .showcase-live { font-size: 8px; }
        .showcase-pathway { border-radius: 6px; }
        .pathway-copy strong { font-size: 12px; }
        .pathway-copy small { font-size: 10px; }
        .pathway-action { font-size: 8px; }
        .showcase-footnote { font-size: 8px; }
        .ecosystem-section {
          padding: 2rem 0 2.4rem;
          border-bottom-color: var(--surface-border);
          background: linear-gradient(180deg, rgba(255,255,255,.018), transparent);
        }
        .partner-group {
          min-height: 88px;
          border-radius: 8px;
          border-color: var(--surface-border);
          background: linear-gradient(135deg, rgba(18,39,48,.65), rgba(8,20,25,.5));
        }
        .partner-group-label { font-size: 9px; }
        .partner-chip { border-radius: 5px; }
        .tight-section { padding-top: clamp(4.5rem, 8vw, 7rem); padding-bottom: clamp(4.5rem, 8vw, 7rem); }
        .split-heading { align-items: end; gap: clamp(2rem, 5vw, 5rem); margin-bottom: 2.75rem; }
        .heading-right-text, .work-heading-aside > p {
          max-width: 470px;
          color: #aab9bf;
          font-size: 1rem;
          line-height: 1.8;
        }
        .premium-h2 { text-wrap: balance; }
        .italic-accent { color: #bdc9ce; }
        .map-wrapper {
          display: grid;
          height: auto;
          min-height: 430px;
          grid-template-columns: minmax(0, 1fr) minmax(220px, .36fr);
          align-items: stretch;
          gap: .5rem;
          padding: clamp(1rem, 2.4vw, 2rem);
          margin-top: 0;
          border-color: var(--surface-border);
          border-radius: 12px;
          background:
            linear-gradient(rgba(174,198,205,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(174,198,205,.025) 1px, transparent 1px),
            radial-gradient(ellipse at 50% 50%, #10242b, #071116 72%);
          background-size: 40px 40px, 40px 40px, auto;
        }
        .map-canvas { width: min(100%, 757px); justify-self: center; align-self: center; }
        .map-market-list {
          display: grid;
          align-content: center;
          gap: 1.15rem;
          min-width: 0;
          padding: 1.25rem 1.4rem;
          border-left: 1px solid var(--surface-border);
        }
        .map-market-region h3 {
          display: flex;
          align-items: center;
          gap: .55rem;
          margin: 0 0 .6rem;
          color: #b7c5c9;
          font: 9px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .map-market-region-dot { width: 6px; height: 6px; flex: 0 0 auto; border-radius: 50%; background: var(--lime); box-shadow: 0 0 9px rgba(205,220,57,.48); }
        .map-market-count { margin-left: auto; color: #667d86; }
        .map-market-region ul { display: flex; flex-wrap: wrap; gap: .38rem; margin: 0; padding: 0; list-style: none; }
        .map-market-region li { padding: .3rem .48rem; border: 1px solid rgba(169,188,199,.13); border-radius: 4px; background: rgba(255,255,255,.025); color: #c1cdd1; font-size: 10px; line-height: 1.35; white-space: nowrap; }
        .world-map-svg { opacity: .27; }
        .node-ring { animation: market-pulse 3s ease-out infinite; }
        .premium-row {
          grid-template-columns: minmax(205px, .95fr) minmax(250px, 1.35fr) minmax(215px, .9fr);
          padding: 1.8rem 1rem;
          border-color: var(--surface-border);
          border-radius: 6px;
        }
        .premium-row:first-child { border-top: 1px solid var(--surface-border); }
        .premium-row:hover { background: linear-gradient(90deg, rgba(205,220,57,.045), rgba(255,255,255,.012)); }
        .row-left { gap: 1.2rem; }
        .row-title { font-size: 1.2rem; letter-spacing: -.025em; }
        .row-text { font-size: .98rem; line-height: 1.7; }
        .row-right { gap: 1rem; }
        .mono-tag { line-height: 1.5; }
        .bento-grid { gap: 1rem; }
        .bento-card {
          min-height: 300px;
          padding: 1.75rem;
          border-radius: 10px;
          border-color: var(--surface-border);
          background: linear-gradient(145deg, rgba(17,37,44,.78), rgba(7,18,23,.82));
        }
        .bento-card:hover { border-color: rgba(205,220,57,.27); background: linear-gradient(145deg, rgba(21,43,49,.92), rgba(8,20,25,.92)); }
        .card-title { font-size: 1.35rem; letter-spacing: -.03em; line-height: 1.25; }
        .card-text { font-size: .96rem; line-height: 1.7; }
        .subtle-card { min-height: 205px; }
        .method-split { gap: clamp(3rem, 8vw, 8rem); }
        .sticky-side > p {
          max-width: 470px;
          margin-top: 1.25rem;
          color: #aab9bf;
          font-size: 1rem;
          line-height: 1.8;
        }
        .timeline-list { border-left-color: rgba(157,184,194,.2); }
        .timeline-step { margin-bottom: 3.5rem; }
        .massive-number { color: rgba(205,220,57,.22); font-size: 2.8rem; }
        .timeline-node { border-color: var(--lime); box-shadow: 0 0 12px rgba(205,220,57,.25); }
        .timeline-title { font-size: 1.35rem; letter-spacing: -.025em; }
        .timeline-text { max-width: 470px; font-size: .98rem; line-height: 1.7; }
        .principles-section { position: relative; }
        .principle-row { min-height: 205px; }
        .principle-index { color: var(--lime); }
        .brutalist-cta {
          padding: clamp(5rem, 9vw, 8rem) 0;
          border-top: 1px solid var(--surface-border);
          background:
            radial-gradient(ellipse at 50% 100%, rgba(205,220,57,.1), transparent 58%),
            linear-gradient(180deg, rgba(255,255,255,.012), transparent);
        }
        .cta-grid-bg { opacity: .1; }
        .cta-p { line-height: 1.8; }
        @keyframes market-pulse {
          0% { opacity: .65; transform: translate(-50%, -50%) scale(.78); }
          70%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.6); }
        }
        @media (max-width: 1024px) {
          .compact-hero { gap: 2.5rem; }
          .premium-row { grid-template-columns: 1fr; gap: .8rem; padding: 1.5rem 1rem; }
          .row-left { flex-direction: row; align-items: baseline; }
          .row-right { justify-content: flex-start; }
          .split-heading { align-items: start; }
        }
        @media (max-width: 768px) {
          .premium-hero { min-height: auto; padding: 3.5rem 0 3rem; }
          .compact-hero { gap: 1.6rem; }
          .premium-override .massive-title { font-size: clamp(3rem, 12vw, 4.7rem); }
          .premium-override .hero-lede { margin-top: 1.2rem; font-size: 1rem; }
          .software-showcase { padding: .5rem 0 .5rem .3rem; }
          .showcase-content { padding: 1rem; }
          .showcase-window-label, .showcase-window-index { font-size: 7px; }
          .showcase-kicker { font-size: .95rem; }
          .showcase-live { max-width: 120px; font-size: 7px; text-align: right; }
          .showcase-description { font-size: 9px; }
          .showcase-pathway { grid-template-columns: 22px minmax(0, 1fr); gap: 8px; padding: 10px; }
          .pathway-action { grid-column: 2; justify-self: start; margin-top: 2px; }
          .pathway-copy strong { font-size: 11px; }
          .pathway-copy small { font-size: 9px; }
          .showcase-footnote { font-size: 6px; }
          .split-heading { gap: 1rem; margin-bottom: 2rem; }
          .heading-right-text, .work-heading-aside > p { font-size: .94rem; }
          .map-wrapper { min-height: 0; grid-template-columns: minmax(0, 1fr); gap: .4rem; }
          .map-canvas { width: min(100%, 600px); max-width: 600px; }
          .map-market-list {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: .8rem;
            padding: 1rem .25rem .25rem;
            border-top: 1px solid var(--surface-border);
            border-left: 0;
          }
          .map-market-region h3 { font-size: 8px; }
          .map-market-region li { font-size: 9px; }
          .bento-grid, .bento-grid-2x2 { gap: .85rem; }
          .bento-card { min-height: 260px; }
          .subtle-card { min-height: 180px; }
          .premium-row { padding-inline: .5rem; }
          .row-left { flex-direction: column; gap: .3rem; }
          .row-right { flex-wrap: wrap; }
          .cta-footer-metrics { gap: 1rem; font-size: 8px; }
        }
        @media (max-width: 540px) {
          .map-market-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem .75rem; }
          .map-market-region:first-child { grid-column: 1 / -1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-pending { opacity: 1; transform: none; }
          .is-visible { transition: none; }
          .node-ring { animation: none; }
          .premium-btn, .premium-btn-ghost, .icon-smooth, .premium-row, .bento-card {
            transition: none;
          }
          html { scroll-behavior: auto; }
        }
      `}} />
    </main>
  );
}