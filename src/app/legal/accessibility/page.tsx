import LegalPage from '@/app/components/LegalPage';

export default function AccessibilityPage() {
  return <LegalPage title="Accessibility" updated="28 September 2026" intro="Origins aims to make its website and client-facing digital services usable by as many people as possible, including people who use assistive technologies or alternative input methods." sections={[
    { heading: '1. Our approach', body: <p>We work toward accessible structure, readable typography, keyboard navigation, visible focus states, sufficient contrast, semantic headings, form labels and reduced-motion support.</p> },
    { heading: '2. Ongoing improvements', body: <p>Accessibility is an ongoing engineering concern. New features and content should be checked against applicable accessibility guidance before release.</p> },
    { heading: '3. Feedback', body: <p>If you encounter an accessibility barrier, email <a href="mailto:hello@originsltd.com">hello@originsltd.com</a> with the page and a description of the issue. We will use the feedback to improve the service.</p> },
  ]} />;
}
