'use client';

import { motion } from 'framer-motion';

const phases = [
  {
    number: '01',
    title: 'Discovery & Architecture',
    description: 'We don\'t guess—we investigate. Technical due diligence, architecture decision records, risk modeling, and a concrete roadmap before writing production code.',
    duration: '2-3 weeks',
    deliverables: ['Architecture Decision Records (ADRs)', 'Technical risk assessment', 'Infrastructure design', 'Team & timeline plan', 'Prototype/Spike for critical paths'],
    icon: 'discovery'
  },
  {
    number: '02',
    title: 'Iterative Delivery',
    description: 'Vertical slices, not horizontal layers. Working software every sprint. Continuous deployment to staging. Automated quality gates. You see progress, not status reports.',
    duration: 'Ongoing (2-week sprints)',
    deliverables: ['Shipped features every sprint', 'CI/CD pipeline with quality gates', 'Automated testing (unit/integration/e2e)', 'Observability from day one', 'Weekly demo + retro'],
    icon: 'delivery'
  },
  {
    number: '03',
    title: 'Operate & Evolve',
    description: 'Launch is the beginning. We stay for the run: SLOs, incident response, capacity planning, and continuous architecture evolution as your product and team grow.',
    duration: 'As long as needed',
    deliverables: ['SLO/SLI definition & monitoring', 'Runbooks & incident response', 'Capacity planning & cost optimization', 'Architecture evolution reviews', 'Team knowledge transfer'],
    icon: 'operate'
  }
];

const phaseIcons = {
  discovery: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  delivery: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  operate: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

const principles = [
  {
    title: 'Type Safety Everywhere',
    description: 'TypeScript end-to-end. Shared types between frontend/backend. Database schema as source of truth. No "any" in production.'
  },
  {
    title: 'Observability First',
    description: 'Structured logging, distributed tracing, custom metrics, and alerting built into every service from day one. No flying blind.'
  },
  {
    title: 'Security by Default',
    description: 'OWASP ASVS compliance. Automated dependency scanning. Secrets management. Pen-test ready. Compliance as code.'
  },
  {
    title: 'Developer Experience',
    description: 'Local dev mirrors prod. One-command bootstrap. Fast feedback loops. Documentation that stays current. Engineers stay in flow.'
  }
];

export default function Methodology() {
  return (
    <section className="py-24 sm:py-32 bg-forest" id="methodology">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-light text-emerald text-sm font-medium mb-6 border border-white/10">
            Methodology
          </span>
          <h2 className="serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
            How we <span className="font-normal">ship with confidence</span>
          </h2>
          <p className="text-lg text-white-dim font-light">
            Clients fear black boxes. We visualize the entire lifecycle—from discovery to CI/CD to deployment—so you always know where things stand and what's next.
          </p>
        </motion.div>

        {/* Three Phases - Horizontal Timeline */}
        <div className="relative mb-20">
          {/* Connecting line */}
          <motion.div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-full bg-white/10 hidden lg:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Phase Card */}
                <div className="bg-forest-light rounded-2xl p-8 border border-white/10 h-full">
                  {/* Number & Icon */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-forest-lighter flex items-center justify-center text-emerald">
                      {phaseIcons[phase.icon as keyof typeof phaseIcons]}
                    </div>
                    <div>
                      <p className="serif-heading text-3xl font-bold text-emerald">{phase.number}</p>
                      <p className="text-xs text-white-faint uppercase tracking-wider mt-1">{phase.duration}</p>
                    </div>
                  </div>

                  <h3 className="serif-heading text-xl font-medium text-white mb-3">
                    {phase.title}
                  </h3>

                  <p className="text-white-dim text-sm leading-relaxed mb-6">
                    {phase.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-emerald uppercase tracking-wider">Key Deliverables</p>
                    <ul className="space-y-1.5">
                      {phase.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white-dim">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald/10 flex items-center justify-center mt-0.5">
                            <svg className="w-2 h-2 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Phase number indicator on the line (desktop) */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-20 w-10 h-10 rounded-full bg-emerald flex items-center justify-center text-forest font-bold serif-heading text-lg z-20">
                  {phase.number}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engineering Principles */}
        <motion.div
          className="border-t border-white/10 pt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="serif-heading text-3xl font-medium text-white text-center mb-12">
            Non-negotiable Engineering Principles
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="p-6 rounded-xl bg-forest-light border border-white/10 hover:border-emerald/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="font-medium text-white mb-2">{principle.title}</h4>
                <p className="text-sm text-white-faint leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Visual */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="serif-heading text-3xl font-medium text-white text-center mb-10">
            Our Production Stack
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-medium text-emerald uppercase tracking-wider">Layer</th>
                  <th className="text-left py-3 px-4 font-medium text-emerald uppercase tracking-wider">Technologies</th>
                  <th className="text-left py-3 px-4 font-medium text-emerald uppercase tracking-wider">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-forest-light/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">Frontend</td>
                  <td className="py-4 px-4 text-white-dim">Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion</td>
                  <td className="py-4 px-4 text-white-faint">SSR/SSG for SEO, App Router, type-safe, performant animations</td>
                </tr>
                <tr className="hover:bg-forest-light/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">Backend</td>
                  <td className="py-4 px-4 text-white-dim">NestJS, Fastify, Prisma ORM, PostgreSQL, Redis</td>
                  <td className="py-4 px-4 text-white-faint">Enterprise patterns, type-safe DB, modular architecture</td>
                </tr>
                <tr className="hover:bg-forest-light/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">API</td>
                  <td className="py-4 px-4 text-white-dim">GraphQL (Apollo), tRPC, REST, OpenAPI 3.0</td>
                  <td className="py-4 px-4 text-white-faint">Type-safe contracts, auto-generated clients, flexibility</td>
                </tr>
                <tr className="hover:bg-forest-light/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">Infrastructure</td>
                  <td className="py-4 px-4 text-white-dim">Kubernetes (EKS/GKE), Terraform, ArgoCD, Helm</td>
                  <td className="py-4 px-4 text-white-faint">GitOps, declarative, cloud-agnostic, scalable</td>
                </tr>
                <tr className="hover:bg-forest-light/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">Observability</td>
                  <td className="py-4 px-4 text-white-dim">OpenTelemetry, Prometheus, Grafana, Loki, Tempo</td>
                  <td className="py-4 px-4 text-white-faint">Unified logs/metrics/traces, vendor-neutral, CNCF standard</td>
                </tr>
                <tr className="hover:bg-forest-light/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">CI/CD</td>
                  <td className="py-4 px-4 text-white-dim">GitHub Actions, Trivy, Cosign, SBOM generation</td>
                  <td className="py-4 px-4 text-white-faint">Supply chain security, signed artifacts, compliance ready</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}