import LegalPage from '@/app/components/LegalPage';

export default function AcceptableUsePage() {
  return <LegalPage 
    title="Acceptable Use Policy (AUP)" 
    updated="28 September 2026" 
    intro="This Acceptable Use Policy (AUP) governs the access to and use of any website, development portal, API endpoint, or digital service hosted or provided by Origins Ltd. UK[cite: 1]. All users must strictly adhere to these operational guidelines[cite: 1]." 
    sections={[
      { 
        heading: '1. Permitted Business Use', 
        body: <p>Users are permitted to access and utilize our services strictly for lawful, legitimate business-related purposes that directly align with Origins' mission of delivering high-performance Web architecture, DevSecOps security auditing, and artificial intelligence solutions[cite: 1].</p> 
      },
      { 
        heading: '2. Prohibited System Activities', 
        body: <p>You must not use Origins' infrastructure to engage in unauthorized port scanning, vulnerability probing, brute-force attacks, system exploitation, or denial-of-service (DoS) attempts, nor inject malicious code, trojans, or ransomware[cite: 1]. Content exploitation, such as distributing, selling, licensing, scraping, or commercially exploiting any software or proprietary text without written authorization, is forbidden[cite: 1]. Abuse, including phishing schemes, spamming, identity spoofing, and sending threatening communications, is strictly prohibited[cite: 1]. Additionally, you must not attempt to decompile, reverse-engineer, or discover the underlying machine learning prompts, neural network configurations, or algorithm logic powering our SaaS applications[cite: 1].</p> 
      },
      { 
        heading: '3. Intellectual Property Rights Compliance', 
        body: <p>All users must respect the proprietary rights, trademarks, trade secrets, and copyright notices embedded across our platform[cite: 1]. Modifying, obscuring, or removing copyright headers or branding attributions from any download or documentation is prohibited[cite: 1].</p> 
      },
      { 
        heading: '4. Data Protection Obligations', 
        body: <p>If you receive, process, or view personal data while utilizing our services or interactive portals, you must handle all such information in strict compliance with applicable data protection laws, the UK GDPR, and our Privacy Policy[cite: 1].</p> 
      },
      { 
        heading: '5. Monitoring and Enforcement', 
        body: <p>Origins reserves the right to monitor communications and system activity across our networks to ensure full compliance[cite: 1]. Failure to adhere to this policy constitutes a material breach and may result in immediate suspension or permanent termination of website access and API credentials without refund[cite: 1]. Enforcement may also include the secure removal of non-compliant user-generated content and formal referral to UK law enforcement or legal authorities, including the commencement of legal proceedings for financial indemnification[cite: 1].</p> 
      },
    ]} 
  />;
}
