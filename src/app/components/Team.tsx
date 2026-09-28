'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const team = [
  {
    name: 'Htet Aung',
    role: 'CEO, Founder & Lead Engineer',
    bio: 'Ex-Stripe, Airbnb. 15+ years building distributed systems. Writes the architecture docs no one else wants to write—and makes them readable. Leads technical strategy and client engagements.',
    focus: ['Distributed Systems', 'Platform Engineering', 'Technical Strategy', 'Founder-led Delivery'],
    avatar: 'HA',
    gradient: 'from-emerald to-forest-lighter',
    linkedin: '#',
    github: '#',
    twitter: '#'
  },
  {
    name: 'Hsu Myat Wai Maung',
    role: 'CTO',
    bio: 'Ex-Datadog, Uber. Kubernetes since 1.3. Believes "it works on my machine" is a valid deployment strategy if your machine is a 500-node cluster. Owns infrastructure, observability, and platform architecture.',
    focus: ['Kubernetes', 'Observability', 'Performance Engineering', 'Cloud Architecture'],
    avatar: 'HM',
    gradient: 'from-emerald-dim to-emerald',
    linkedin: '#',
    github: '#',
    twitter: '#'
  },
  {
    name: 'Chloe Rodriguez',
    role: 'Senior HR Specialist',
    bio: 'Ex-Figma, Vercel. Obsessed with the intersection of design systems and developer experience. Shipped design tokens at scale before it was cool. Builds the team that builds the product.',
    focus: ['Talent Acquisition', 'Engineering Culture', 'Design Systems', 'People Operations'],
    avatar: 'CR',
    gradient: 'from-emerald to-emerald-dim',
    linkedin: '#',
    github: '#',
    twitter: '#'
  },
  {
    name: 'Maranda Sasha',
    role: 'Senior Marketing Lead',
    bio: 'Ex-OpenAI, Anthropic (research). Takes models from notebooks to production. 3 papers at NeurIPS. Still prefers Vim. Translates technical depth into market narratives that resonate.',
    focus: ['Technical Marketing', 'Developer Relations', 'Content Strategy', 'Brand Positioning'],
    avatar: 'MS',
    gradient: 'from-forest-lighter to-emerald',
    linkedin: '#',
    github: '#',
    twitter: '#'
  }
];

const values = [
  {
    title: 'Founder-to-Founder Communication',
    description: 'You talk to the people writing the code. No account managers, no project managers translating requirements. Direct technical dialogue.'
  },
  {
    title: 'Agility Over Process Theater',
    description: 'We follow practices that ship software, not practices that look good in slide decks. Process serves the product, not the other way around.'
  },
  {
    title: 'Skin in the Game',
    description: 'We use our own stack. We run our own infrastructure. We feel the pain of our architectural decisions—so we make better ones.'
  },
  {
    title: 'Senior-Led Delivery',
    description: 'Every project is led by engineers who have shipped at scale. We mentor internally, deliver externally. No learning on your dime.'
  }
];

// Deterministic particle positions to avoid hydration mismatch
const particlePositions = [
  { left: '5%', top: '10%', duration: 18, delay: 0 },
  { left: '15%', top: '80%', duration: 22, delay: 2 },
  { left: '25%', top: '5%', duration: 20, delay: 4 },
  { left: '35%', top: '60%', duration: 16, delay: 1 },
  { left: '45%', top: '90%', duration: 24, delay: 3 },
  { left: '55%', top: '20%', duration: 19, delay: 5 },
  { left: '65%', top: '70%', duration: 21, delay: 2.5 },
  { left: '75%', top: '15%', duration: 17, delay: 4.5 },
  { left: '85%', top: '40%', duration: 23, delay: 1.5 },
  { left: '95%', top: '85%', duration: 15, delay: 3.5 },
  { left: '10%', top: '30%', duration: 20, delay: 0.5 },
  { left: '20%', top: '95%', duration: 18, delay: 2.5 },
  { left: '30%', top: '25%', duration: 22, delay: 4 },
  { left: '40%', top: '75%', duration: 16, delay: 1 },
  { left: '50%', top: '5%', duration: 24, delay: 3 },
  { left: '60%', top: '50%', duration: 19, delay: 5 },
  { left: '70%', top: '90%', duration: 21, delay: 2 },
  { left: '80%', top: '35%', duration: 17, delay: 4 },
  { left: '90%', top: '65%', duration: 23, delay: 1.5 },
  { left: '98%', top: '10%', duration: 15, delay: 3 },
];

export default function Team() {
  return (
    <section className="py-24 sm:py-32 bg-forest relative overflow-hidden" id="team">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-dim/5 rounded-full blur-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
        />
        {/* Floating particles - deterministic positions */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald/20 rounded-full"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              scale: [0, 1, 0],
              y: [0, -100, -200],
              x: [0, (i % 3 - 1) * 50, (i % 3 - 1) * 100]
            }}
            transition={{ 
              duration: pos.duration, 
              repeat: Infinity, 
              delay: pos.delay,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-light text-emerald text-sm font-medium mb-6 border border-white/10">
            Team & Ethos
          </span>
          <h2 className="serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
            A focused, highly specialized <span className="font-normal">engineering unit</span>
          </h2>
          <p className="text-lg text-white-dim font-light">
            We lean into the advantage of being small and senior. No corporate bloat. No handoff chains. Just experienced engineers who own outcomes end-to-end.
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid gap-8 lg:grid-cols-2 mb-20">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              className="group relative bg-forest-light/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-emerald/50 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
              
              <div className="flex gap-6 relative z-10">
                {/* Avatar with animated gradient border */}
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-forest text-2xl font-bold serif-heading relative`}>
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br animate-pulse opacity-0 group-hover:opacity-50 transition-opacity"
                      style={{ filter: 'blur(8px)' }}
                    />
                    {member.avatar}
                  </div>
                  {/* Status indicator */}
                  <motion.div
                    className="absolute bottom-2 right-2 w-4 h-4 bg-emerald rounded-full border-4 border-forest"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="serif-heading text-xl font-medium text-white group-hover:text-emerald transition-colors">
                      {member.name}
                    </h3>
                    <span className="px-3 py-1 text-xs font-medium bg-forest-lighter text-emerald rounded-full border border-white/10">
                      {member.role}
                    </span>
                  </div>

                  <p className="text-white-dim text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.focus.map((skill, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-forest border border-white/10 rounded-full text-white-dim hover:border-emerald/50 hover:text-emerald transition-all duration-300 cursor-default"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 200 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="flex gap-3">
                    {[
                      { href: member.linkedin, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label: 'LinkedIn' },
                      { href: member.github, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, label: 'GitHub' },
                      { href: member.twitter, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>, label: 'Twitter' }
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-white-faint hover:text-emerald hover:bg-white/5 transition-colors"
                        whileHover={{ scale: 1.2 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Values - Apple-style card layout */}
        <motion.div
          className="border-t border-white/10 pt-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="serif-heading text-3xl font-medium text-white text-center mb-12">
            How We Operate
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group p-6 rounded-xl bg-forest-light/50 backdrop-blur-sm border border-white/10 hover:border-emerald/50 hover:shadow-lg hover:shadow-emerald/10 transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Animated border top */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald to-emerald-dim transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                />
                <h4 className="font-medium text-white mb-3 group-hover:text-emerald transition-colors relative z-10">
                  {value.title}
                </h4>
                <p className="text-sm text-white-faint leading-relaxed relative z-10">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald text-forest text-base font-medium rounded-lg hover:bg-emerald-dim transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald/30"
          >
            Work with us
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}