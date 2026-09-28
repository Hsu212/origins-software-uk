import LegalPage from '@/app/components/LegalPage';

export default function SecurityPage() {
  return <LegalPage title="Security" updated="28 September 2026" intro="Security is part of delivery and operations. This page describes the control areas clients and partners may reasonably expect; exact controls should reflect the production environment and any contractual security commitments." sections={[
    { heading: '1. Access control', body: <p>Access should follow least privilege, role-based permissions and removal of unnecessary access. Administrative access should use strong authentication and protected credentials.</p> },
    { heading: '2. Data protection', body: <p>Use encrypted transport, appropriate encryption at rest where supported, controlled secrets, backups and environment separation for production systems.</p> },
    { heading: '3. Application security', body: <p>Development should include dependency review, input validation, authentication and authorisation checks, secure headers, logging and testing appropriate to the system risk.</p> },
    { heading: '4. Payments', body: <p>Payment-card details should be collected through a suitable payment provider rather than stored directly in Origins application databases unless a specific compliant architecture requires otherwise.</p> },
    { heading: '5. Vulnerability reporting', body: <p>Report suspected security issues to <a href="mailto:security@originsltd.com">security@originsltd.com</a>. Include enough detail to reproduce the issue and avoid accessing, altering or retaining data beyond what is necessary to demonstrate the issue.</p> },
    { heading: '6. Incident response', body: <p>Production incidents should be triaged, contained, investigated, remediated and communicated according to their impact and the applicable contractual or legal requirements.</p> },
  ]} />;
}
