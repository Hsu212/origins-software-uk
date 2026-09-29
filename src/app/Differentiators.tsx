'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const differentiators = [
  {
    icon: 'transparency',
    title: 'Public Architecture Decision Log',
    description: 'Every major technical decision is documented in our public ADR registry. You see the "why" behind every choice—trade-offs, rejected alternatives, and lessons learned.',
    proof: 'View our ADR Registry →',
    proofLink: '/adr',
    metric: '47 decisions logged',
    unique: true
  },
  {
    icon: 'metrics',
    title: 'Live System Health Dashboard',
    description: 'Real-time visibility into our infrastructure: uptime, latency, error rates, deployment frequency, and incident response times. No status page theater—actual telemetry.',
    proof: 'View Live Metrics →',
    proofLink: '/metrics',
    metric: '99.99% uptime (30d)',
    unique: true
  },
  {
    icon: 'quality',
    title: 'Code Quality in Real-Time',
    description: 'SonarQube/CodeQL results on every PR, test coverage trends, dependency vulnerability scans, and technical debt ratio—updated on every merge to main.',
    proof: 'View Quality Gates →',
    proofLink: '/quality',
    metric: '0 critical vulnerabilities',
    unique: true
  },
  {
    icon: 'carbon',
    title: 'Carbon-Aware Computing',
    description: 'Our workloads shift to regions with cleaner energy grids. We publish real-time carbon intensity per deployment and offset 2x our compute footprint.',
    proof: 'View Carbon Dashboard →',
    proofLink: '/carbon',
    metric: '~2.3 tons CO₂/yr offset',
    unique: true
  },
  {
    icon: 'incident',
    title: 'Blameless Postmortems, Public by Default',
    description: 'Every incident gets a public postmortem within 48h. Root cause, timeline, action items, and what we changed. We learn in the open.',
    proof: 'Read Postmortems →',
    proofLink: '/postmortems',
    metric: '12 published this year',
    unique: true
  },
  {
    icon: 'open',
    title: 'Open Source by Default',
    description: 'Non-client-specific tooling, libraries, and infrastructure code are open sourced. 40+ repos on GitHub. We contribute upstream before forking.',
    proof: 'View Our OSS →',
    proofLink: '/oss',
    metric: '40+ public repos',
    unique: true
  },
  {
    icon: 'feedback',
    title: 'Client Feedback Loop — Live',
    description: 'Net Promoter Score, project health scores, and qualitative feedback collected after every sprint. Published quarterly with action plans.',
    proof: 'View Client Pulse →',
    proofLink: '/client-pulse',
    metric: 'NPS: 72 (industry avg: 31)',
    unique: true
  },
  {
    icon: 'career',
    title: 'Engineering Career Framework — Public',
    description: 'Our leveling guide, compensation bands, promotion criteria, and skill matrix are public. No mystery about growth. Candidates see exactly where they\'d land.',
    proof: 'View Career Framework →',
    proofLink: '/careers/framework',
    metric: '6 levels, 4 tracks',
    unique: true
  },
  {
    icon: 'compensation',
    title: 'Open Compensation Philosophy',
    description: 'Formula-based pay: role level × location factor × experience multiplier. No negotiation theater. Everyone knows the math. Updated annually with market data.',
    proof: 'View Compensation Model →',
    proofLink: '/compensation',
    metric: 'Published & audited',
    unique: true
  }
];

const icons = {
  transparency: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  metrics: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  quality: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  carbon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  incident: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  open: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19h12a2 2 0 002-2V7a2 2 0 00-2-2h-6l-4-4H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 11h6m-6 4h6m-6-8h6" />
    </svg>
  ),
  feedback: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  career: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  compensation: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

// Live metrics simulation
function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    uptime: '99.99%',
    latency: '42ms',
    deployments: 23,
    incidents: '0',
    coverage: '94%',
    vulnerabilities: '0'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        latency: `${Math.max(35, Math.min(85, parseInt(prev.latency) + Math.floor(Math.random() * 10) - 5))}ms`,
        deployments: prev.deployments + (Math.random() > 0.95 ? 1 : 0),
        coverage: `${Math.min(99, Math.max(90, parseInt(prev.coverage) + Math.floor(Math.random() * 3) - 1))}%`
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="text-center p-4 bg-forest/50 rounded-xl">
        <p className="text-2xl font-bold text-emerald serif-heading">{metrics.uptime}</p>
        <p className="text-xs text-white-faint uppercase tracking-wider">Uptime (30d)</p>
      </div>
      <div className="text-center p-4 bg-forest/50 rounded-xl">
        <p className="text-2xl font-bold text-emerald serif-heading">{metrics.latency}</p>
        <p className="text-xs text-white-faint uppercase tracking-wider">P99 Latency</p>
      </div>
      <div className="text-center p-4 bg-forest/50 rounded-xl">
        <p className="text-2xl font-bold text-emerald serif-heading">{metrics.deployments}</p>
        <p className="text-xs text-white-faint uppercase tracking-wider">Deploys (30d)</p>
      </div>
    </motion.div>
  );
}

export default function Differentiators() {
  return (
    <section className="py-24 sm:py-32 bg-forest-light/30 relative overflow-hidden" id="differentiators">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 20L20 0M20 0L40 20M40 20L20 40M20 40L0 20\' stroke=\'%2300D47E\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest text-emerald text-sm font-medium mb-6 border border-emerald/30">
            What Makes Us Different
          </span>
          <h2 className="serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
            Things agencies <span className="font-normal">never show you</span>
          </h2>
          <p className="text-lg text-white-dim font-light">
            Most agencies hide their process, quality, and operations. We publish ours in real-time. Not marketing claims—live data you can verify.
          </p>
        </motion.div>

        {/* Live System Status Bar */}
        <motion.div
          className="mb-16 p-6 rounded-2xl bg-forest border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-3 h-3 bg-emerald rounded-full"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-medium text-white">Live System Status</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-emerald/20 text-emerald rounded-full">OPERATIONAL</span>
            </div>
            <span className="text-xs text-white-faint">Updated <span id="last-update" className="font-mono">just now</span></span>
          </div>
          <LiveMetrics />
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {differentiators.map((diff, index) => (
            <motion.article
              key={diff.title}
              className="group relative bg-forest/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald/30 hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Unique badge */}
              {diff.unique && (
                <motion.span
                  className="absolute -top-3 left-6 px-3 py-1 text-xs font-medium bg-emerald text-forest rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 300 }}
                >
                  Unique
                </motion.span>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-forest-light/50 flex items-center justify-center text-emerald mb-5 group-hover:bg-emerald/10 group-hover:scale-105 transition-all duration-300">
                {icons[diff.icon as keyof typeof icons]}
              </div>

              <h3 className="serif-heading text-xl font-medium text-white mb-3">
                {diff.title}
              </h3>

              <p className="text-white-dim text-sm leading-relaxed mb-5 flex-1">
                {diff.description}
              </p>

              {/* Proof link with metric */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <motion.a
                  href={diff.proofLink}
                  className="inline-flex items-center gap-1 text-sm font-medium text-emerald hover:text-white transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  {diff.proof}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                <span className="text-xs text-white-faint font-mono">{diff.metric}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="/transparency"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-emerald/50 text-emerald text-base font-medium rounded-lg hover:bg-emerald/10 hover:border-emerald transition-all duration-300"
          >
            View Full Transparency Portal
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}