import LegalPage from '@/app/components/LegalPage';

export default function ServiceTermsPage() {
  return <LegalPage 
    title="Terms of Service" 
    updated="28 September 2026" 
    intro="By accessing or using the website situated at https://originsltd.co.uk, or engaging Origins Ltd. UK for custom software development, Web/Mobile architecture, or Artificial Intelligence engineering, you confirm your acceptance of and agreement to be legally bound by these Terms of Service." 
    sections={[
      { 
        heading: '1. Eligibility and Authority', 
        body: <p>To access our Website or engage our professional engineering services, you must be at least 18 years of age and possess full legal capacity to enter into binding legal contracts. If you represent an enterprise, you must possess the full corporate authority to bind that entity to these Terms.</p> 
      },
      { 
        heading: '2. Intellectual Property and Limited License', 
        body: <p>Subject to compliance, Origins grants a limited, non-exclusive, revocable license to view and navigate the Website solely for internal business research. All proprietary rights, including source code and design systems, are owned by or licensed to Origins Ltd. UK.</p> 
      },
      { 
        heading: '3. Custom Deliverables and Code Ownership', 
        body: <p>Intellectual property ownership regarding custom software builds, productized MVP deliverables, and artificial intelligence model weights is strictly governed by our Master Services Agreement (MSA) or Statement of Work (SOW) executed between the parties.</p> 
      },
      { 
        heading: '4. User-Generated Content and Submissions', 
        body: <p>By submitting feedback, technical inquiries, or source code samples, you grant Origins a worldwide, royalty-free, perpetual, non-exclusive license to use, reproduce, adapt, and process such submissions solely in connection with evaluating and delivering requested services or improving platform performance.</p> 
      },
      { 
        heading: '5. Disclaimer of Warranties', 
        body: <p>The Website and content are provided on an "AS IS" and "AS AVAILABLE" basis without representations or warranties of any kind. Origins explicitly disclaims all implied warranties of merchantability, fitness for a particular purpose, non-infringement, software compatibility, and uninterrupted or error-free web operation.</p> 
      },
      { 
        heading: '6. Limitation of Liability', 
        body: <p>Origins Ltd. UK shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, data, or business interruption. Total aggregate liability shall not exceed £100 GBP or the total fees paid by you to Origins for website access within the preceding six (6) months, whichever is greater.</p> 
      },
      { 
        heading: '7. Governing Law and Exclusive Jurisdiction', 
        body: <p>These Terms of Service are governed by and construed in accordance with the laws of England and Wales. The courts of London, England, shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or the use of our services.</p> 
      },
      { 
        heading: '8. Terms Inquiries and Notices', 
        body: <p>For legal communications, formal notices, or questions regarding these Terms, please contact our legal counsel at <a href="mailto:terms@originsltd.co.uk">terms@originsltd.co.uk</a>.</p> 
      },
    ]} 
  />;
}
