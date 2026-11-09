import LegalPage from '@/app/components/LegalPage';

export default function CookiesPage() {
  return <LegalPage 
    title="Cookie & Tracking Technology Policy" 
    updated="28 September 2026" 
    intro="Origins Ltd. UK uses cookies, tracking pixels, and web beacons to enhance user navigation, analyze platform traffic, and deliver personalized commercial interactions. This policy explains what cookies are, how we utilize them, and how you can exercise control over tracking preferences in compliance with UK Privacy and Electronic Communications Regulations (PECR) & UK GDPR." 
    sections={[
      { 
        heading: '1. What Are Cookies?', 
        body: <p>Cookies are small text files containing unique identifier codes that are stored on your desktop computer, mobile device, or browser storage when you access our Website. Cookies enable web applications to recognize your browser, preserve session state, and remember your site preferences over time.</p> 
      },
      { 
        heading: '2. Categories of Cookies Utilized', 
        body: (
          <>
            <p>We categorize the cookies deployed across our Website into three distinct operational tiers:</p>
            <ul>
              <li><strong>Essential / Strictly Necessary:</strong> Required for core technical functionality, session security, load balancing, and cookie preference storage. These cannot be disabled, have a lifespan of a session to 1 year, and are exempt from consent under PECR.</li>
              <li><strong>Analytics & Performance:</strong> Collect aggregated, anonymous metrics on page visits, bounce rates, traffic sources, and user journeys to optimize site speed and performance. These require opt-in consent and have a lifespan of 14 days to 2 years.</li>
              <li><strong>Marketing & Targeting:</strong> Track visitor engagement across digital properties to deliver tailored commercial materials and promotional offers aligned with business interest. These require opt-in consent and have a lifespan of 30 days to 1 year.</li>
            </ul>
          </>
        )
      },
      { 
        heading: '3. Analytics Integration and Third-Party Tracking', 
        body: <p>We utilize Google Analytics to understand how visitors interact with our Web platform. Google Analytics collects anonymized IP data and user activity logs. To opt-out of Google Analytics web tracking across all websites, you can visit the Google Analytics Opt-Out Tool at https://www.google.com/analytics/settings.</p> 
      },
      { 
        heading: '4. Cookie Consent Management Banner', 
        body: <p>Upon your initial visit to our website, an explicit Cookie Consent Banner will be presented. You may choose to ACCEPT or REJECT non-essential Analytics and Marketing cookies. Your preference is remembered for 12 months, after which consent will be re-prompted.</p> 
      },
      { 
        heading: '5. Managing and Disabling Cookies via Browser Controls', 
        body: <p>You can control, block, or delete cookies at any time through your browser settings for Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge. Please note that disabling Essential Cookies may degrade Website functionality, rendering secure portals or inquiry forms unavailable.</p> 
      },
    ]} 
  />;
}
