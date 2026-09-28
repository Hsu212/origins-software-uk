import LegalPage from '@/app/components/LegalPage';

export default function CookiesPage() {
  return <LegalPage 
    title="Cookie & Tracking Technology Policy" 
    updated="28 September 2026" 
    intro="Origins Ltd. UK uses cookies, tracking pixels, and web beacons to enhance user navigation, analyze platform traffic, and deliver personalized commercial interactions[cite: 1]. This policy explains what cookies are, how we utilize them, and how you can exercise control over tracking preferences in compliance with UK Privacy and Electronic Communications Regulations (PECR) & UK GDPR[cite: 1]." 
    sections={[
      { 
        heading: '1. What Are Cookies?', 
        body: <p>Cookies are small text files containing unique identifier codes that are stored on your desktop computer, mobile device, or browser storage when you access our Website[cite: 1]. Cookies enable web applications to recognize your browser, preserve session state, and remember your site preferences over time[cite: 1].</p> 
      },
      { 
        heading: '2. Categories of Cookies Utilized', 
        body: (
          <>
            <p>We categorize the cookies deployed across our Website into three distinct operational tiers[cite: 1]:</p>
            <ul>
              <li><strong>Essential / Strictly Necessary:</strong> Required for core technical functionality, session security, load balancing, and cookie preference storage[cite: 1]. These cannot be disabled, have a lifespan of a session to 1 year, and are exempt from consent under PECR[cite: 1].</li>
              <li><strong>Analytics & Performance:</strong> Collect aggregated, anonymous metrics on page visits, bounce rates, traffic sources, and user journeys to optimize site speed and performance[cite: 1]. These require opt-in consent and have a lifespan of 14 days to 2 years[cite: 1].</li>
              <li><strong>Marketing & Targeting:</strong> Track visitor engagement across digital properties to deliver tailored commercial materials and promotional offers aligned with business interest[cite: 1]. These require opt-in consent and have a lifespan of 30 days to 1 year[cite: 1].</li>
            </ul>
          </>
        )
      },
      { 
        heading: '3. Analytics Integration and Third-Party Tracking', 
        body: <p>We utilize Google Analytics to understand how visitors interact with our Web platform[cite: 1]. Google Analytics collects anonymized IP data and user activity logs[cite: 1]. To opt-out of Google Analytics web tracking across all websites, you can visit the Google Analytics Opt-Out Tool at https://www.google.com/analytics/settings[cite: 1].</p> 
      },
      { 
        heading: '4. Cookie Consent Management Banner', 
        body: <p>Upon your initial visit to our website, an explicit Cookie Consent Banner will be presented[cite: 1]. You may choose to ACCEPT or REJECT non-essential Analytics and Marketing cookies[cite: 1]. Your preference is remembered for 12 months, after which consent will be re-prompted[cite: 1].</p> 
      },
      { 
        heading: '5. Managing and Disabling Cookies via Browser Controls', 
        body: <p>You can control, block, or delete cookies at any time through your browser settings for Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge[cite: 1]. Please note that disabling Essential Cookies may degrade Website functionality, rendering secure portals or inquiry forms unavailable[cite: 1].</p> 
      },
    ]} 
  />;
}
