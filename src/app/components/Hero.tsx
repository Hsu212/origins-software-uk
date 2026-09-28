'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-bg-primary overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'var(--gradient-accent)', opacity: 0.1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bg-secondary/50 rounded-full blur-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\' fill=\'%23FFFFFF\' fill-opacity=\'0.03\'/%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Subtle badge */}
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary text-accent-primary text-sm font-medium mb-8 border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
            Scalable infrastructure &amp; full-stack execution for high-growth teams
          </motion.span>

          {/* Main Headline - Serif for warmth/trust */}
          <motion.h1
            className="serif-heading text-5xl sm:text-6xl lg:text-7xl font-medium text-text-primary leading-tight mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We build <span className="gradient-text">technical leverage</span> for
            <br />
            <span className="font-normal">ambitious product teams</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            From zero-to-one MVPs to platform-scale architectures. Senior engineers who ship production-grade software without the enterprise bloat.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 text-bg-primary text-base font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-primary/30"
              style={{ background: 'var(--gradient-accent)' }}
            >
              Start a project
              <motion.span
                className="transition-transform group-hover:translate-x-1"
                animate={{ x: 0 }}
              >
                →
              </motion.span>
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-text-primary text-base font-medium rounded-lg hover:border-accent-primary hover:text-accent-primary transition-all duration-300 bg-bg-secondary/50 backdrop-blur-sm"
            >
              View our work
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--accent-primary)' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              40+ production deployments
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--accent-primary)' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              99.9% uptime SLA
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--accent-primary)' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Direct founder access
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--accent-primary)' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="text-xs tracking-wide uppercase">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}