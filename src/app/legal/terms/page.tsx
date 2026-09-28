import LegalPage from '@/app/components/LegalPage';

export default function TermsPage() {
  return <LegalPage 
    title="Terms of Service" 
    updated="28 September 2026" 
    intro="By accessing or using the website situated at https://originsltd.co.uk, or engaging Origins Ltd. UK for custom software development, Web/Mobile architecture, or Artificial Intelligence engineering, you confirm your acceptance of and agreement to be legally bound by these Terms of Service[cite: 1]. Project-specific intellectual property ownership regarding custom deliverables and model weights is strictly governed by our Master Services Agreement (MSA) or Statement of Work (SOW)[cite: 1]." 
    sections={[
      { 
        heading: '1. Eligibility and Authority', 
        body: <p>To access our Website or engage our professional engineering services, you represent and warrant that you are at least 18 years of age and possess full legal capacity to enter into binding legal contracts[cite: 1]. If you represent an enterprise or corporate entity, you must possess the full corporate authority to bind that entity to these Terms[cite: 1].</p> 
      },
      { 
        heading: '2. Intellectual Property and Limited License', 
        body: <p>Origins grants you a limited, non-exclusive, non-transferable, revocable license to view and navigate the Website solely for internal business research and evaluation purposes[cite: 1]. All text, graphical interfaces, source code, documentation, and brand identity assets are owned by or licensed to Origins Ltd. UK and are protected under UK and international intellectual property laws[cite: 1].</p> 
      },
      { 
        heading: '3. Prohibited Conduct and Restrictions', 
        body: <p>You explicitly agree not to copy, modify, reverse engineer, decompiling, or create derivative works based on any portion of the Website or underlying source code without prior written consent[cite: 1]. Furthermore, you must not use the Website for fraudulent or malicious purposes, attempt to breach security features, or deploy automated scripts and scrapers to extract data without explicit permission[cite: 1].</p> 
      },
      { 
        heading: '4. User-Generated Content and Submissions', 
        body: <p>By submitting feedback, technical inquiries, or source code samples through forms or communications, you grant Origins a worldwide, royalty-free, perpetual, non-exclusive license to use, reproduce, adapt, and process such submissions solely in connection with evaluating and delivering requested services or improving platform performance[cite: 1].</p> 
      },
      { 
        heading: '5. Disclaimer of Warranties and Liability', 
        body: <p>The Website and content are provided on an "AS IS" and "AS AVAILABLE" basis, and Origins explicitly disclaims all implied warranties of merchantability, fitness for a particular purpose, non-infringement, and software compatibility[cite: 1]. Origins Ltd. UK shall not be liable for any indirect, incidental, special, or consequential damages, and total aggregate liability shall not exceed £100 GBP or the total fees paid by you for website access within the preceding six (6) months, whichever is greater[cite: 1].</p> 
      },
      { 
        heading: '6. Suspension of Access', 
        body: <p>Origins reserves the right, in its sole discretion and without prior liability, to suspend, terminate, or restrict your access to the Website or related services immediately, with or without cause, upon notice, including for any breach of these Terms or suspected unauthorized security activity[cite: 1].</p> 
      },
      { 
        heading: '7. Governing Law and Notices', 
        body: <p>These Terms of Service are governed by and construed in accordance with the laws of England and Wales, and the courts of London, England, shall have exclusive jurisdiction to settle any dispute[cite: 1]. For legal communications or questions regarding these Terms, please contact our legal counsel at <a href="mailto:terms@originsltd.co.uk">terms@originsltd.co.uk</a>[cite: 1].</p> 
      },
    ]} 
  />;
}
