import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import SettingsPanel from '@/app/components/SettingsPanel';
import { localizeMetadata } from '@/app/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...await localizeMetadata(
      'Privacy & Website Settings',
      'Manage cookie preferences and motion settings for the Origins Software website, and learn how the website assistant handles your messages.',
    ),
    robots: { index: false, follow: true },
  };
}

export default function SettingsPage() {
  return <PageShell>
    <PageHero eyebrow="Your preferences / Settings" title="A website experience on your terms." description="Manage optional cookies, choose your motion preferences, and understand how messages sent to our AI assistant are handled." />
    <section className="content-section settings-content">
      <SettingsPanel />
    </section>
  </PageShell>;
}
