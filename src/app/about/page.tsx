import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

interface PrincipleItem {
  title: string;
  body: string;
}

const principles: PrincipleItem[] = [
  { title: 'Senior ownership', body: 'The people shaping the solution stay close to delivery.' },
  { title: 'Clarity by default', body: 'Scope, trade-offs, timelines and commercial decisions are made visible early.' },
  { title: 'Engineering with context', body: 'We design software around the operational reality of the business, not just a feature list.' },
  { title: 'Built to last', body: 'We care about maintainability, observability, security and the handover after launch.' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero 
        eyebrow="About Origins" 
        title="A senior engineering partner for complex digital work." 
        description="Origins brings strategy, product design, software engineering and infrastructure together so ambitious teams can move from idea to dependable systems without unnecessary layers." 
      />
      
      <section className="content-section two-col">
        <div>
          <div className="section-kicker">What we do</div>
          <h2>We make difficult digital work feel structured.</h2>
        </div>
        <div className="prose">
          <p>Some projects need a product partner. Others need a technical team that can untangle an existing platform, build the next release, or prepare the infrastructure for scale. Origins is designed to cover that full range.</p>
          <p>Our approach is deliberately senior-led: small teams, direct communication, thoughtful documentation and an emphasis on decisions that remain useful months after launch.</p>
          <Link className="text-link" href="/services">Explore our services <span>→</span></Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-kicker">Our principles</div>
        <div className="principles-grid">
          {principles.map(({ title, body }, i) => (
            <article className="feature-card modern-principle-card" key={title}>
              <div className="feature-index">0{i + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <p>“Good engineering is not only what ships. It is what remains understandable when the original team is no longer in the room.”</p>
      </section>

      <section className="content-section two-col">
        <div>
          <div className="section-kicker">Let's talk</div>
          <h2>Bring us the difficult part.</h2>
        </div>
        <div className="prose">
          <p>Tell us what you are building, what is not working, or what needs to happen next. We will turn that into a practical conversation about scope, team shape and delivery.</p>
          <Link className="button-primary" href="/contact">Talk to Origins <span>↗</span></Link>
        </div>
      </section>
    </PageShell>
  );
}import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

interface PrincipleItem {
  title: string;
  body: string;
}

const principles: PrincipleItem[] = [
  { title: 'Senior ownership', body: 'The people shaping the solution stay close to delivery.' },
  { title: 'Clarity by default', body: 'Scope, trade-offs, timelines and commercial decisions are made visible early.' },
  { title: 'Engineering with context', body: 'We design software around the operational reality of the business, not just a feature list.' },
  { title: 'Built to last', body: 'We care about maintainability, observability, security and the handover after launch.' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero 
        eyebrow="About Origins" 
        title="A senior engineering partner for complex digital work." 
        description="Origins brings strategy, product design, software engineering and infrastructure together so ambitious teams can move from idea to dependable systems without unnecessary layers." 
      />
      
      <section className="content-section two-col">
        <div>
          <div className="section-kicker">What we do</div>
          <h2>We make difficult digital work feel structured.</h2>
        </div>
        <div className="prose">
          <p>Some projects need a product partner. Others need a technical team that can untangle an existing platform, build the next release, or prepare the infrastructure for scale. Origins is designed to cover that full range.</p>
          <p>Our approach is deliberately senior-led: small teams, direct communication, thoughtful documentation and an emphasis on decisions that remain useful months after launch.</p>
          <Link className="text-link" href="/services">Explore our services <span>→</span></Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-kicker">Our principles</div>
        <div className="principles-grid">
          {principles.map(({ title, body }, i) => (
            <article className="feature-card modern-principle-card" key={title}>
              <div className="feature-index">0{i + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <p>“Good engineering is not only what ships. It is what remains understandable when the original team is no longer in the room.”</p>
      </section>

      <section className="content-section two-col">
        <div>
          <div className="section-kicker">Let's talk</div>
          <h2>Bring us the difficult part.</h2>
        </div>
        <div className="prose">
          <p>Tell us what you are building, what is not working, or what needs to happen next. We will turn that into a practical conversation about scope, team shape and delivery.</p>
          <Link className="button-primary" href="/contact">Talk to Origins <span>↗</span></Link>
        </div>
      </section>
    </PageShell>
  );
}import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

interface PrincipleItem {
  title: string;
  body: string;
}

const principles: PrincipleItem[] = [
  { title: 'Senior ownership', body: 'The people shaping the solution stay close to delivery.' },
  { title: 'Clarity by default', body: 'Scope, trade-offs, timelines and commercial decisions are made visible early.' },
  { title: 'Engineering with context', body: 'We design software around the operational reality of the business, not just a feature list.' },
  { title: 'Built to last', body: 'We care about maintainability, observability, security and the handover after launch.' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero 
        eyebrow="About Origins" 
        title="A senior engineering partner for complex digital work." 
        description="Origins brings strategy, product design, software engineering and infrastructure together so ambitious teams can move from idea to dependable systems without unnecessary layers." 
      />
      
      <section className="content-section two-col">
        <div>
          <div className="section-kicker">What we do</div>
          <h2>We make difficult digital work feel structured.</h2>
        </div>
        <div className="prose">
          <p>Some projects need a product partner. Others need a technical team that can untangle an existing platform, build the next release, or prepare the infrastructure for scale. Origins is designed to cover that full range.</p>
          <p>Our approach is deliberately senior-led: small teams, direct communication, thoughtful documentation and an emphasis on decisions that remain useful months after launch.</p>
          <Link className="text-link" href="/services">Explore our services <span>→</span></Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-kicker">Our principles</div>
        <div className="principles-grid">
          {principles.map(({ title, body }, i) => (
            <article className="feature-card modern-principle-card" key={title}>
              <div className="feature-index">0{i + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <p>“Good engineering is not only what ships. It is what remains understandable when the original team is no longer in the room.”</p>
      </section>

      <section className="content-section two-col">
        <div>
          <div className="section-kicker">Let's talk</div>
          <h2>Bring us the difficult part.</h2>
        </div>
        <div className="prose">
          <p>Tell us what you are building, what is not working, or what needs to happen next. We will turn that into a practical conversation about scope, team shape and delivery.</p>
          <Link className="button-primary" href="/contact">Talk to Origins <span>↗</span></Link>
        </div>
      </section>
    </PageShell>
  );
}import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

interface PrincipleItem {
  title: string;
  body: string;
}

const principles: PrincipleItem[] = [
  { title: 'Senior ownership', body: 'The people shaping the solution stay close to delivery.' },
  { title: 'Clarity by default', body: 'Scope, trade-offs, timelines and commercial decisions are made visible early.' },
  { title: 'Engineering with context', body: 'We design software around the operational reality of the business, not just a feature list.' },
  { title: 'Built to last', body: 'We care about maintainability, observability, security and the handover after launch.' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero 
        eyebrow="About Origins" 
        title="A senior engineering partner for complex digital work." 
        description="Origins brings strategy, product design, software engineering and infrastructure together so ambitious teams can move from idea to dependable systems without unnecessary layers." 
      />
      
      <section className="content-section two-col">
        <div>
          <div className="section-kicker">What we do</div>
          <h2>We make difficult digital work feel structured.</h2>
        </div>
        <div className="prose">
          <p>Some projects need a product partner. Others need a technical team that can untangle an existing platform, build the next release, or prepare the infrastructure for scale. Origins is designed to cover that full range.</p>
          <p>Our approach is deliberately senior-led: small teams, direct communication, thoughtful documentation and an emphasis on decisions that remain useful months after launch.</p>
          <Link className="text-link" href="/services">Explore our services <span>→</span></Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-kicker">Our principles</div>
        <div className="principles-grid">
          {principles.map(({ title, body }, i) => (
            <article className="feature-card modern-principle-card" key={title}>
              <div className="feature-index">0{i + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <p>“Good engineering is not only what ships. It is what remains understandable when the original team is no longer in the room.”</p>
      </section>

      <section className="content-section two-col">
        <div>
          <div className="section-kicker">Let's talk</div>
          <h2>Bring us the difficult part.</h2>
        </div>
        <div className="prose">
          <p>Tell us what you are building, what is not working, or what needs to happen next. We will turn that into a practical conversation about scope, team shape and delivery.</p>
          <Link className="button-primary" href="/contact">Talk to Origins <span>↗</span></Link>
        </div>
      </section>
    </PageShell>
  );
}import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

interface PrincipleItem {
  title: string;
  body: string;
}

const principles: PrincipleItem[] = [
  { title: 'Senior ownership', body: 'The people shaping the solution stay close to delivery.' },
  { title: 'Clarity by default', body: 'Scope, trade-offs, timelines and commercial decisions are made visible early.' },
  { title: 'Engineering with context', body: 'We design software around the operational reality of the business, not just a feature list.' },
  { title: 'Built to last', body: 'We care about maintainability, observability, security and the handover after launch.' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero 
        eyebrow="About Origins" 
        title="A senior engineering partner for complex digital work." 
        description="Origins brings strategy, product design, software engineering and infrastructure together so ambitious teams can move from idea to dependable systems without unnecessary layers." 
      />
      
      <section className="content-section two-col">
        <div>
          <div className="section-kicker">What we do</div>
          <h2>We make difficult digital work feel structured.</h2>
        </div>
        <div className="prose">
          <p>Some projects need a product partner. Others need a technical team that can untangle an existing platform, build the next release, or prepare the infrastructure for scale. Origins is designed to cover that full range.</p>
          <p>Our approach is deliberately senior-led: small teams, direct communication, thoughtful documentation and an emphasis on decisions that remain useful months after launch.</p>
          <Link className="text-link" href="/services">Explore our services <span>→</span></Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-kicker">Our principles</div>
        <div className="principles-grid">
          {principles.map(({ title, body }, i) => (
            <article className="feature-card modern-principle-card" key={title}>
              <div className="feature-index">0{i + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <p>“Good engineering is not only what ships. It is what remains understandable when the original team is no longer in the room.”</p>
      </section>

      <section className="content-section two-col">
        <div>
          <div className="section-kicker">Let's talk</div>
          <h2>Bring us the difficult part.</h2>
        </div>
        <div className="prose">
          <p>Tell us what you are building, what is not working, or what needs to happen next. We will turn that into a practical conversation about scope, team shape and delivery.</p>
          <Link className="button-primary" href="/contact">Talk to Origins <span>↗</span></Link>
        </div>
      </section>
    </PageShell>
  );
}
