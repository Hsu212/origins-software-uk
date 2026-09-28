import LegalPage from '@/app/components/LegalPage';

export default function SecurityPage() {
  return <LegalPage 
    title="Data Security and Infrastructure" 
    updated="28 September 2026" 
    intro="Origins Ltd. UK implements robust technical and organizational security controls to protect digital assets, personal data, and infrastructure against accidental loss, unauthorized access, alteration, or disclosure[cite: 1]. This page outlines the operational security standards deployed across our environments." 
    sections={[
      { 
        heading: '1. Access Governance and Control', 
        body: <p>Access to personal data and internal systems is restricted to authorized engineers and operational personnel on a strict "need-to-know" basis[cite: 1]. All administrative and operational access is heavily protected by mandatory multi-factor authentication (MFA) and role-based access control (RBAC)[cite: 1].</p> 
      },
      { 
        heading: '2. Data Protection and Encryption', 
        body: <p>Origins enforces strict encryption standards across its operations: all data in transit across public networks is encrypted using Transport Layer Security (TLS 1.3), and all data at rest is secured using the Advanced Encryption Standard (AES-256)[cite: 1].</p> 
      },
      { 
        heading: '3. Infrastructure Isolation', 
        body: <p>To prevent cross-contamination or unauthorized inspection, all client project assets, custom artificial intelligence datasets, and proprietary source code are strictly ring-fenced within secure, isolated environments[cite: 1].</p> 
      },
      { 
        heading: '4. Vulnerability Probing and Reporting', 
        body: <p>Users are strictly prohibited from attempting to breach, test, or probe the security features, firewalls, or authentication mechanisms of the Website or linked cloud systems[cite: 1]. Authorized or suspected security issues should be immediately reported to our security team, avoiding any alteration or retention of data beyond what is necessary to demonstrate the vulnerability.</p> 
      },
      { 
        heading: '5. Incident Response and Enforcement', 
        body: <p>Origins reserves the right to immediately suspend or terminate access to our infrastructure without prior liability in the event of suspected unauthorized security activity or a breach of our security protocols[cite: 1].</p> 
      },
    ]} 
  />;
}
