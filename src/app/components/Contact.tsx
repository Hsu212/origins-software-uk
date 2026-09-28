'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectScope: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.projectScope.trim()) newErrors.projectScope = 'Project scope is required';
    if (!formData.budget) newErrors.budget = 'Please select a budget tier';
    if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', company: '', projectScope: '', budget: '', timeline: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <section className="py-24 sm:py-32 bg-forest" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Info */}
          <motion.div
            className="pr-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest-light text-emerald text-sm font-medium mb-6 border border-white/10">
              Lead Capture
            </span>
            <h2 className="serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
              Let's talk about <span className="font-normal">your project</span>
            </h2>
            <p className="text-lg text-white-dim font-light mb-10">
              A frictionless form. We ask for the project scope, budget tier, and timeline—so we can prepare a meaningful response before our first call.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-forest-light rounded-xl border border-white/10">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-forest-lighter flex items-center justify-center text-emerald">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Direct Email</p>
                  <p className="text-white-dim text-sm">hello@origins.engineering</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-forest-light rounded-xl border border-white/10">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-forest-lighter flex items-center justify-center text-emerald">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Typical Response</p>
                  <p className="text-white-dim text-sm">Within 4 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-forest-light rounded-xl border border-white/10">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-forest-lighter flex items-center justify-center text-emerald">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">First Call</p>
                  <p className="text-white-dim text-sm">Technical discovery (45 min)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="bg-forest-light rounded-2xl p-8 sm:p-10 border border-white/10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald/10 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <svg className="w-10 h-10 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <h3 className="serif-heading text-2xl font-medium text-white mb-3">
                  Message Sent
                </h3>
                <p className="text-white-dim mb-6">
                  We'll review your project details and get back within 4 business hours with next steps.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-emerald hover:text-white font-medium transition-colors"
                >
                  Send another inquiry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Full Name <span className="text-emerald">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-forest transition-all duration-200 ${
                        errors.name ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-emerald focus:ring-2 focus:ring-emerald/20'
                      }`}
                      placeholder="Your name"
                      disabled={status === 'submitting'}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email <span className="text-emerald">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-forest transition-all duration-200 ${
                        errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-emerald focus:ring-2 focus:ring-emerald/20'
                      }`}
                      placeholder="you@company.com"
                      disabled={status === 'submitting'}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-forest focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-200"
                    placeholder="Company name (optional)"
                    disabled={status === 'submitting'}
                  />
                </div>

                {/* Project Scope */}
                <div>
                  <label htmlFor="projectScope" className="block text-sm font-medium text-white mb-2">
                    Project Scope <span className="text-emerald">*</span>
                  </label>
                  <textarea
                    id="projectScope"
                    name="projectScope"
                    value={formData.projectScope}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border bg-forest transition-all duration-200 resize-none ${
                      errors.projectScope ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-emerald focus:ring-2 focus:ring-emerald/20'
                    }`}
                    placeholder="What are you building? What problem are you solving? Any existing stack or constraints?"
                    disabled={status === 'submitting'}
                  />
                  {errors.projectScope && <p className="mt-1 text-sm text-red-400">{errors.projectScope}</p>}
                </div>

                {/* Budget & Timeline Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                      Budget Tier <span className="text-emerald">*</span>
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-forest appearance-none transition-all duration-200 ${
                        errors.budget ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-emerald focus:ring-2 focus:ring-emerald/20'
                      }`}
                      disabled={status === 'submitting'}
                    >
                      <option value="">Select budget range</option>
                      <option value="50-100k">$50K - $100K</option>
                      <option value="100-250k">$100K - $250K</option>
                      <option value="250-500k">$250K - $500K</option>
                      <option value="500k+">$500K+</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                    {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget}</p>}
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-white mb-2">
                      Timeline <span className="text-emerald">*</span>
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-forest appearance-none transition-all duration-200 ${
                        errors.timeline ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-emerald focus:ring-2 focus:ring-emerald/20'
                      }`}
                      disabled={status === 'submitting'}
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP / Urgent</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6-12months">6-12 months</option>
                      <option value="flexible">Flexible / Discovery first</option>
                    </select>
                    {errors.timeline && <p className="mt-1 text-sm text-red-400">{errors.timeline}</p>}
                  </div>
                </div>

                {/* Additional Context */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Anything Else?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-forest focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-200 resize-none"
                    placeholder="Specific tech requirements, team structure, compliance needs, etc. (optional)"
                    disabled={status === 'submitting'}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-emerald text-forest text-base font-medium rounded-lg hover:bg-emerald-dim transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-emerald/30 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <motion.div className="w-5 h-5 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Project Inquiry'
                  )}
                </motion.button>

                <p className="text-center text-xs text-white-faint">
                  By submitting, you agree to our{' '}
                  <a href="/privacy" className="text-emerald hover:text-white underline">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="/terms" className="text-emerald hover:text-white underline">Terms of Service</a>
                  . We never share your data.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}