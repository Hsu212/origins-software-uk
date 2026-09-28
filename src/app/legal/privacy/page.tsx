import LegalPage from '@/app/components/LegalPage';

export default function PrivacyPage() {
  return <LegalPage 
    title="Master Privacy Policy" 
    updated="28 September 2026" 
    intro="Origins Ltd. UK is dedicated to protecting the privacy, confidentiality, and security of personal data entrusted to us by clients, partners, website visitors, and service users[cite: 1]. This Privacy Policy outlines our data processing standards in strict accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018[cite: 1]." 
    sections={[
      { 
        heading: '1. Data We Collect', 
        body: <p>We collect Personal Identity & Contact Information (name, corporate email, phone number, job title) through web forms or support inquiries[cite: 1]. We also automatically collect Technical & Usage Data, including IP addresses, browser types, and clickstream data, as well as Communication Records and Client Project Assets such as source code or data inputs for custom engineering[cite: 1].</p> 
      },
      { 
        heading: '2. Legal Basis and Purpose of Processing', 
        body: <p>We process personal data only when an established legal basis applies under UK GDPR Article 6[cite: 1]. This includes processing for Service Provision and Contract Execution (Article 6(1)(b)), System Maintenance & Security (Article 6(1)(f) - Legitimate Interests), Direct Marketing (Article 6(1)(a) - Express Consent), and Legal & Regulatory Compliance (Article 6(1)(c))[cite: 1].</p> 
      },
      { 
        heading: '3. Data Sharing, Disclosures, and Third Parties', 
        body: <p>We engage trusted third-party vendors for hosting, compute infrastructure, and analytics, all operating under formal Data Processing Agreements (DPAs)[cite: 1]. We may disclose data to UK law enforcement or regulatory bodies when legally compelled[cite: 1]. Personal information is never sold, rented, leased, or traded for commercial purposes[cite: 1].</p> 
      },
      { 
        heading: '4. Data Security and Encryption Infrastructure', 
        body: <p>All data in transit across public networks is encrypted using Transport Layer Security (TLS 1.3), and data at rest is encrypted using Advanced Encryption Standard (AES-256)[cite: 1]. Access to personal data is restricted by multi-factor authentication (MFA) and role-based access control (RBAC)[cite: 1]. Client project assets and custom AI datasets are ring-fenced within secure, isolated environments[cite: 1].</p> 
      },
      { 
        heading: '5. Retention and Anonymization', 
        body: <p>Personal data is retained only for the minimum period necessary to fulfill specific operational purposes or satisfy legal reporting requirements[cite: 1]. Upon expiration, data is permanently deleted from primary and backup systems or fully anonymized[cite: 1].</p> 
      },
      { 
        heading: '6. Your Rights under UK GDPR', 
        body: <p>Under the UK Data Protection Act 2018 and UK GDPR, individuals have the Right of Access, Right to Rectification, Right to Erasure ("Right to be Forgotten"), Right to Restriction, Right to Data Portability, and the Right to Withdraw Consent at any time[cite: 1]. To exercise these rights, individuals can contact our Data Protection Lead[cite: 1].</p> 
      },
      { 
        heading: '7. Children\'s Privacy Protection', 
        body: <p>Our website and services are tailored exclusively for legal commercial entities and adult business professionals[cite: 1]. We do not intentionally or knowingly collect, process, or solicit personal data from individuals under 13 years of age[cite: 1].</p> 
      },
      { 
        heading: '8. Contact Information', 
        body: <p>For inquiries, exercise of data subject rights, or regulatory escalation, please contact our legal team at <a href="mailto:privacy@originsltd.co.uk">privacy@originsltd.co.uk</a> or by mail to the Legal Compliance Department, Origins Ltd. UK[cite: 1].</p> 
      },
    ]} 
  />;
}
