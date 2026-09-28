import LegalPage from '@/app/components/LegalPage';

export default function AcceptableUsePage() {
  return <LegalPage title="Acceptable Use" updated="28 September 2026" intro="These rules apply to website, account and portal features made available by Origins. Project agreements may impose additional controls for a particular system." sections={[
    { heading: '1. Prohibited activity', body: <p>Do not use Origins services to commit unlawful activity, distribute malware, attempt unauthorised access, disrupt infrastructure, send abusive bulk messages, infringe intellectual property rights, or knowingly introduce harmful content or code.</p> },
    { heading: '2. Account security', body: <p>Keep credentials confidential, use strong authentication where available, and notify us promptly if you suspect an account or session has been compromised.</p> },
    { heading: '3. Client content', body: <p>You remain responsible for having the rights and permissions needed for content, data and instructions you provide. Do not submit data that you are not authorised to process.</p> },
    { heading: '4. Enforcement', body: <p>We may restrict or suspend access when reasonably necessary to protect people, systems, data, or comply with law or contract.</p> },
  ]} />;
}
