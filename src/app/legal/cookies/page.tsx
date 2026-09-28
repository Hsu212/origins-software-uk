import LegalPage from '@/app/components/LegalPage';

export default function CookiesPage() {
  return <LegalPage title="Cookie Policy" updated="28 September 2026" intro="This page should describe the cookies and similar technologies actually used on the production site. Remove any category or provider that is not deployed." sections={[
    { heading: '1. Essential technologies', body: <p>Some cookies or storage mechanisms may be necessary for security, session management, preferences and core functionality. These normally do not depend on optional analytics consent where local law permits them.</p> },
    { heading: '2. Analytics', body: <p>If analytics are enabled, identify the provider, purpose, retention period and consent mechanism used. Do not list an analytics service unless it is actually active on the site.</p> },
    { heading: '3. Preferences', body: <p>Preference storage can remember choices such as theme or cookie settings. Where appropriate, explain how these choices are stored and how users can reset them.</p> },
    { heading: '4. Managing cookies', body: <p>Users can control many cookie settings through their browser. Where consent is legally required, provide a clear way to revisit or withdraw optional cookie choices.</p> },
    { heading: '5. Updates', body: <p>Review this policy whenever tracking, advertising, analytics or other storage technologies change.</p> },
  ]} />;
}
