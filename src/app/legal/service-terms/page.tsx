import LegalPage from '@/app/components/LegalPage';

export default function ServiceTermsPage() {
  return <LegalPage title="Service Terms" updated="28 September 2026" intro="Use the executed statement of work and commercial proposal as the controlling documents for each engagement. This page is a practical outline of the topics those documents should cover." sections={[
    { heading: '1. Scope', body: <p>Each engagement should define deliverables, assumptions, exclusions, milestones, dependencies, client responsibilities and acceptance criteria.</p> },
    { heading: '2. Fees and payment', body: <p>Quotations should state currency, applicable taxes, payment stages, due dates, reimbursable costs and consequences of late payment. The client portal may provide a live view of invoices and payment status.</p> },
    { heading: '3. Changes', body: <p>Material changes to agreed scope should be documented with any resulting change to timeline, fees or dependencies before the changed work is treated as committed scope.</p> },
    { heading: '4. Delivery and acceptance', body: <p>Milestones, review windows, launch responsibilities, environments and acceptance criteria should be agreed in writing for the specific engagement.</p> },
    { heading: '5. Support and maintenance', body: <p>Any warranty, support window, response target, maintenance subscription or service-level commitment should be expressly stated in the relevant agreement rather than assumed from marketing material.</p> },
    { heading: '6. Ownership and licences', body: <p>The agreement should state ownership or licensing of deliverables, pre-existing materials, third-party components, source code, content, data and open-source dependencies.</p> },
  ]} />;
}
