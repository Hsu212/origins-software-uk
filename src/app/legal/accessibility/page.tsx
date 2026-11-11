import LegalPage from '@/app/components/LegalPage';

export default function AccessibilityPage() {
  return <LegalPage 
    title="Website Accessibility Statement" 
    updated="28 September 2026" 
    intro="Origins Ltd. UK is committed to ensuring digital accessibility for all users, including individuals with visual, auditory, cognitive, or motor disabilities, and we continually refine the user experience of our platform to conform with WCAG 2.1 AA accessibility standards." 
    sections={[
      { 
        heading: '1. Standards and Statutory Framework', 
        body: <p>Our platform operates in accordance with the UK Equality Act 2010 and targets compliance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</p> 
      },
      { 
        heading: '2. Key Technical Accessibility Measures', 
        body: <p>We utilize semantic HTML elements and Accessible Rich Internet Applications (ARIA) roles to logically structure content for screen readers. Interfaces feature high color contrast ratios and scalable font typography that supports 200% zoom without losing content alignment. The site provides complete keyboard navigability (Tab, Enter, Spacebar) with clear visual focus rings, meaningful alternative text for informative images, and text transcripts or closed captions for embedded media.</p> 
      },
      { 
        heading: '3. Assistive Technology Compatibility Testing', 
        body: <p>Our web architecture undergoes regular technical reviews and compatibility testing using screen readers such as NVDA, JAWS, and Apple VoiceOver. We also test across major browser platforms, including the latest releases of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge across Windows, macOS, iOS, and Android systems.</p> 
      },
      { 
        heading: '4. Feedback and Accessibility Support', 
        body: <p>If you encounter accessibility barriers, face navigation difficulties, or require content in an alternative format, please contact our Accessibility Lead at <a href="mailto:accessibility@originsltd.co.uk">accessibility@originsltd.co.uk</a>. We endeavor to acknowledge inquiries within two (2) business days and provide a remediation plan or alternative format within five (5) business days.</p> 
      },
    ]} 
  />;
}
