import LegalPage from '@/app/components/LegalPage';

export default function TermsPage() {
  return <LegalPage title="Terms of Service" updated="28 September 2026" intro="These website terms describe general use of the Origins site. Project-specific obligations, deliverables, payment stages and acceptance criteria should be governed by an executed proposal, statement of work or service agreement." sections={[
    { heading: '1. Website use', body: <p>You may use this website for lawful purposes and in accordance with these terms. Do not interfere with its operation, attempt unauthorised access, introduce malicious code, scrape restricted data, or misuse contact and account features.</p> },
    { heading: '2. Information on the site', body: <p>We aim to keep descriptions, capabilities and examples useful and current. Website content is provided for general information and is not a substitute for a project-specific technical, commercial or legal assessment.</p> },
    { heading: '3. Intellectual property', body: <p>Unless stated otherwise, site content and branding are owned by or licensed to Origins Ltd. You may not reproduce or commercially exploit protected material without permission.</p> },
    { heading: '4. Third-party services', body: <p>Links to third-party services are provided for convenience. Their availability, content, security and terms are controlled by those providers.</p> },
    { heading: '5. Project agreements', body: <p>When you become a client, the signed project documents take precedence over general website information. Payment obligations, change control, warranties, support and termination should be stated in the applicable agreement.</p> },
    { heading: '6. Liability', body: <p>To the extent permitted by applicable law, liability should be allocated in the executed contract for the relevant services. Nothing in these terms is intended to exclude liabilities that cannot lawfully be excluded.</p> },
    { heading: '7. Changes', body: <p>We may update these terms from time to time. The current version will be published on this page with its effective or updated date.</p> },
  ]} />;
}
