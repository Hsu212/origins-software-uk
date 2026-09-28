'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const caseStudies = [
  {
    id: 1,
    title: 'FinTech Platform Modernization',
    client: 'Series B Payments Startup',
    problem: 'Legacy monolith couldn\'t handle 10x transaction growth. PCI compliance gaps blocked enterprise deals.',
    architecture: 'Event-driven microservices on Kubernetes. PostgreSQL → CockroachDB for geo-distribution. Kafka for transaction event streaming. GraphQL federation layer.',
    result: '99.99% uptime. 80% latency reduction. SOC2 Type II achieved in 90 days. Unlocked $12M ARR enterprise pipeline.',
    metrics: ['10x throughput', '80% latency ↓', 'SOC2 compliant', '$12M pipeline'],
    tech: ['Kubernetes', 'CockroachDB', 'Kafka', 'GraphQL', 'Go', 'React'],
    image: '/images/case-fintech.svg'
  },
  {
    id: 2,
    title: 'AI-Powered Clinical Decision Support',
    client: 'Healthtech Scale-up (YC W23)',
    problem: 'ML models trapped in notebooks. No inference pipeline. HIPAA compliance required for PHI handling.',
    architecture: 'MLOps on GCP Vertex AI. Feature store with Feast. Real-time inference via Triton. FHIR-compliant API layer. Audit logging with immutable ledger.',
    result: 'Model deployment from weeks → hours. 94% clinician adoption. HIPAA audit passed. $5M Series A closed.',
    metrics: ['Weeks → hours deploy', '94% adoption', 'HIPAA passed', '$5M Series A'],
    tech: ['GCP Vertex AI', 'Triton', 'Feast', 'FHIR', 'Python', 'Next.js'],
    image: '/images/case-healthtech.svg'
  },
  {
    id: 3,
    title: 'Real-Time Collaboration Platform',
    client: 'EdTech Unicorn',
    problem: 'WebRTC infrastructure couldn\'t scale past 500 concurrent rooms. Media quality degraded under load.',
    architecture: 'Custom SFU on Rust/tokio. QUIC transport. Adaptive bitrate via simulcast. Global edge deployment on Cloudflare Workers. Redis Cluster for signaling.',
    result: '50k+ concurrent rooms. Sub-100ms P99 latency. 40% bandwidth reduction. Powers 2M+ daily active students.',
    metrics: ['50k concurrent rooms', '<100ms P99', '40% bandwidth ↓', '2M DAU'],
    tech: ['Rust', 'tokio', 'WebRTC', 'QUIC', 'Cloudflare', 'Redis'],
    image: '/images/case-edtech.svg'
  }
];

export default function CaseStudies() {
  return (
    <section className="py-24 sm:py-32 bg-forest" id="case-studies">
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
            Proof of Work
          </span>
          <h2 className="serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
            Problems solved. <span className="font-normal">Results delivered.</span>
          </h2>
          <p className="text-lg text-white-dim font-light">
            Each engagement follows our structure: <strong className="font-medium text-white">The Problem → The Technical Architecture → The Business Result</strong>. No marketing fluff—just shipped software and measurable outcomes.
          </p>
        </motion.div>

        {/* Case Study Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              className="group relative bg-forest-light rounded-2xl overflow-hidden border border-white/10 hover:border-emerald/50 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Image/Mockup Area */}
              <div className="relative h-48 bg-gradient-to-br from-forest-lighter to-forest-light/50 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="inline-block px-6 py-3 bg-forest/80 backdrop-blur-sm rounded-xl border border-white/10">
                    <span className="text-4xl font-mono text-emerald">{study.metrics[0]}</span>
                  </div>
                </div>
                {/* Decorative code snippet background */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 300\'%3E%3Ctext x=\'20\' y=\'30\' font-family=\'monospace\' font-size=\'11\' fill=\'%23FFFFFF\'%3E// Architecture:%3C/text%3E%3Ctext x=\'20\' y=\'55\' font-family=\'monospace\' font-size=\'11\' fill=\'%23FFFFFF\'%3E// - Microservices on K8s%3C/text%3E%3Ctext x=\'20\' y=\'75\' font-family=\'monospace\' font-size=\'11\' fill=\'%23FFFFFF\'%3E// - Event-driven%3C/text%3E%3Ctext x=\'20\' y=\'95\' font-family=\'monospace\' font-size=\'11\' fill=\'%23FFFFFF\'%3E// - Geo-distributed DB%3C/text%3E%3C/svg%3E")',
                }} />
              </div>

              <div className="p-6 space-y-5">
                {/* Client Badge */}
                <span className="inline-block text-xs font-medium text-emerald uppercase tracking-wider">
                  {study.client}
                </span>

                {/* Title */}
                <h3 className="serif-heading text-xl font-medium text-white leading-snug group-hover:text-emerald transition-colors">
                  {study.title}
                </h3>

                {/* Problem → Architecture → Result Structure */}
                <div className="space-y-4 text-sm text-white-dim leading-relaxed">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald/10 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </span>
                    <p><strong className="text-white">Problem:</strong> {study.problem}</p>
                  </div>
                  <div className="flex gap-3 pl-9 border-l border-white/10">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald/10 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                      </svg>
                    </span>
                    <p><strong className="text-white">Architecture:</strong> {study.architecture}</p>
                  </div>
                  <div className="flex gap-3 pl-9 border-l border-white/10">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald/10 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p><strong className="text-white">Result:</strong> {study.result}</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {study.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-forest/80 backdrop-blur-sm rounded-full border border-white/10 text-white-dim">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  {study.metrics.slice(1).map((metric, i) => (
                    <div key={i} className="text-center p-3 bg-forest/50 rounded-xl">
                      <p className="text-2xl font-bold text-emerald serif-heading">{metric.split(' ')[0]}</p>
                      <p className="text-xs text-white-faint uppercase tracking-wider mt-1">{metric.split(' ').slice(1).join(' ')}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Link */}
                <Link
                  href={`/case-studies/${study.id}`}
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 text-sm font-medium text-emerald hover:text-white transition-colors group"
                >
                  View full case study
                  <motion.span
                    className="transition-transform group-hover:translate-x-1"
                    animate={{ x: 0 }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white text-base font-medium rounded-lg hover:border-emerald hover:text-emerald transition-all duration-300 bg-forest-light/50 backdrop-blur-sm"
          >
            View all case studies
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}