import { serviceSpecialties } from '@/app/data/siteContent';
import { locales, translate, type Locale } from '@/app/i18n';

export type EmbeddedFaq = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  href?: string;
  linkLabel?: string;
  serviceSlug?: string;
  intent?: 'overview' | 'considerations' | 'approach';
};

type FaqDefinition = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  href?: string;
  linkLabel?: string;
};

const faqDefinitions: FaqDefinition[] = [
  {
    id: 'origins-overview',
    question: 'What does Origins Software do?',
    answer: 'Origins helps ambitious teams turn difficult ideas and tangled systems into dependable digital products, infrastructure and AI-enabled workflows.',
    keywords: ['Origins Software', 'what does Origins do', 'company', 'software company'],
    href: '/company',
    linkLabel: 'Company information',
  },
  {
    id: 'services',
    question: 'What services does Origins provide?',
    answer: 'Origins works across nine connected service specialities: Digital Marketing, VPS Hosting Services, Applied AI & ML Solutions, Full-Stack Development, Cloud & DevOps, Autonomous AI Agents, Custom Web Architecture, Proactive Cybersecurity and Computer Vision Systems.',
    keywords: ['services', 'specialities', 'capabilities', 'what can you do', 'what do you build'],
    href: '/services',
    linkLabel: 'Explore services',
  },
  {
    id: 'choose-service',
    question: 'Which service is right for my project?',
    answer: 'Start with the problem to solve. Origins can help define the right scope and bring together the disciplines the work needs.',
    keywords: ['which service', 'right service', 'not sure', 'recommend a service', 'choose a service'],
    href: '/contact',
    linkLabel: 'Discuss your requirements',
  },
  {
    id: 'delivery-process',
    question: 'How does the delivery process work?',
    answer: 'Origins follows a four-stage delivery process: understand the problem, design the approach, build in reviewable increments, then launch, hand over and improve.',
    keywords: ['delivery process', 'how do you work', 'project stages', 'process', 'workflow'],
    href: '/process',
    linkLabel: 'View the delivery process',
  },
  {
    id: 'start-project',
    question: 'How do I start a project?',
    answer: 'Tell us what you are building, what is not working or what needs to happen next. We will help turn the problem into a practical plan.',
    keywords: ['start a project', 'get started', 'begin a project', 'new project', 'hire Origins'],
    href: '/contact',
    linkLabel: 'Start a project enquiry',
  },
  {
    id: 'project-enquiry',
    question: 'What should I include in a project enquiry?',
    answer: 'Include what you are building, where the project is today, your target timeline and anything already in place. Sharing the intended outcome, users and constraints is also useful.',
    keywords: ['project enquiry', 'project inquiry', 'what information', 'what should I send', 'brief'],
    href: '/contact',
    linkLabel: 'Contact the team',
  },
  {
    id: 'project-cost',
    question: 'How are project costs determined?',
    answer: 'Project cost depends on agreed scope, constraints, risks, delivery approach and responsibilities. Assumptions and commercial options are made visible while defining the work. Contact Origins to discuss a project estimate.',
    keywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'estimate', 'fees'],
    href: '/contact',
    linkLabel: 'Discuss project scope',
  },
  {
    id: 'project-timing',
    question: 'How long will a project take?',
    answer: 'Project timing depends on the outcome, scope, integrations, risks and existing systems. Milestones and dependencies are agreed during planning; no standard timeline is assumed.',
    keywords: ['how long', 'timeline', 'duration', 'deadline', 'when can', 'schedule'],
    href: '/contact',
    linkLabel: 'Discuss your timeline',
  },
  {
    id: 'existing-systems',
    question: 'Can you improve or modernise an existing system?',
    answer: 'Yes. Origins works with your business context, current systems and team—not against them. Services include platform modernisation, performance, cloud, security and software engineering.',
    keywords: ['existing system', 'legacy', 'modernise', 'modernize', 'technical debt', 'improve a platform', 'migration'],
    href: '/services',
    linkLabel: 'Explore services',
  },
  {
    id: 'after-launch',
    question: 'What happens after launch?',
    answer: 'Delivery includes the transition into operation: releases, observability, ownership, practical documentation and a clear path for future improvements. Any ongoing support arrangements should be agreed for each engagement.',
    keywords: ['after launch', 'after release', 'handover', 'hand over', 'support', 'maintenance', 'operations'],
    href: '/process/operate',
    linkLabel: 'See release and operations',
  },
  {
    id: 'client-portal',
    question: 'What does the client portal provide?',
    answer: 'The secure client portal provides access to quotations, service fees, invoices, documents and payment status.',
    keywords: ['client portal', 'customer portal', 'invoice', 'quotation', 'payment status', 'client workspace'],
    href: 'https://portal.origins-software.com',
    linkLabel: 'Open client portal',
  },
  {
    id: 'nexus-overview',
    question: 'What is Nexus Origins?',
    answer: 'Nexus Origins is a desktop workspace for environment and project management, secure secrets, access administration, audit visibility and Origins Forge. It connects to the Origins Cloud API as a centralized control plane while supported Forge operations stay on the local machine.',
    keywords: ['Nexus', 'Nexus Origins', 'developer tool', 'environment management', 'Origins Forge'],
    href: 'mailto:support@origins-software.com?subject=Nexus%20Origins%20enquiry',
    linkLabel: 'Ask about Nexus',
  },
  {
    id: 'authorized-testing',
    question: 'Can Nexus run penetration tests?',
    answer: 'Origins Forge supports local security-testing workflows, including authorized penetration testing. Testing must be explicitly authorized and limited to systems you are permitted to assess.',
    keywords: ['penetration test', 'pentest', 'security test', 'Origins Forge', 'authorized testing', 'authorised testing'],
    href: 'mailto:support@origins-software.com?subject=Nexus%20Origins%20enquiry',
    linkLabel: 'Ask about Nexus',
  },
  {
    id: 'assistant-how',
    question: 'How does the Ask Origins assistant work?',
    answer: 'Ask Origins matches questions against up to 50 curated company FAQs embedded in this website. It returns prepared answers in the selected site language; it does not generate freeform responses or use RAG.',
    keywords: ['assistant', 'Ask Origins', 'AI', 'RAG', 'how does chat work', 'generative AI'],
  },
  {
    id: 'assistant-privacy',
    question: 'Is my message sent outside this website?',
    answer: 'No. The assistant matches your question locally in this page. Messages are not sent to a server, AI model or external search service, and the chat widget does not save them after the chat closes.',
    keywords: ['privacy', 'message sent', 'stored', 'save chat', 'data', 'external service', 'server'],
    href: '/legal/privacy',
    linkLabel: 'Read the privacy policy',
  },
  {
    id: 'assistant-languages',
    question: 'Which languages does Ask Origins support?',
    answer: 'The embedded FAQ assistant responds in the selected site language: English, Japanese, Chinese, Arabic or German.',
    keywords: ['language', 'languages', 'Japanese', 'Chinese', 'Arabic', 'German', 'translate', 'translation'],
  },
  {
    id: 'delivery-markets',
    question: 'Where can Origins work with clients?',
    answer: 'Origins works with clients in the United Kingdom and across global markets. Include any location, data-residency or regulatory requirements in your enquiry so they can be assessed.',
    keywords: ['where', 'location', 'country', 'countries', 'global', 'international', 'United Kingdom', 'UK', 'market'],
    href: '/#markets',
    linkLabel: 'View supported markets',
  },
  {
    id: 'technology-platforms',
    question: 'Which cloud and AI platforms do you work with?',
    answer: 'Origins lists Microsoft, AWS and Alibaba Cloud under cloud and technology, and Gemini, Claude, ChatGPT and Microsoft Copilot under AI platforms. Tool selection depends on project requirements.',
    keywords: ['cloud provider', 'cloud platform', 'AWS', 'Microsoft', 'Alibaba', 'Gemini', 'Claude', 'ChatGPT', 'Copilot', 'technology partners'],
  },
  {
    id: 'industries',
    question: 'Do you work in a particular industry?',
    answer: 'Origins does not state an exclusive industry focus. Its work is shaped around product, infrastructure, data and workflow challenges. Share your business context to discuss fit.',
    keywords: ['industry', 'industries', 'sector', 'vertical', 'business type'],
    href: '/contact',
    linkLabel: 'Discuss your requirements',
  },
  {
    id: 'security-approach',
    question: 'How do you approach software security?',
    answer: 'Security work can include threat modelling, secure-by-design reviews, identity and least-privilege controls, application and infrastructure assessment, logging, response planning and remediation tracking.',
    keywords: ['security', 'cybersecurity', 'secure', 'threat', 'access control', 'application security'],
    href: '/services/proactive-cybersecurity',
    linkLabel: 'Explore cybersecurity',
  },
  {
    id: 'contact',
    question: 'How do I contact Origins?',
    answer: 'For a project enquiry, use the contact form. For general questions, email support@origins-software.com.',
    keywords: ['contact', 'email', 'reach', 'talk to', 'speak to', 'support@origins-software.com'],
    href: '/contact',
    linkLabel: 'Contact Origins',
  },
  {
    id: 'partnership',
    question: 'Can Origins work with our internal team?',
    answer: 'Origins works with your business context, current systems and team—not against them. Share your preferred collaboration model when discussing scope.',
    keywords: ['internal team', 'collaborate', 'collaboration', 'work with our team', 'handover', 'ownership'],
    href: '/company',
    linkLabel: 'How Origins works',
  },
  {
    id: 'project-examples',
    question: 'Can I see examples of your work?',
    answer: 'The work section describes representative problem patterns, not named client case studies. Contact Origins to discuss relevant experience for a specific requirement.',
    keywords: ['portfolio', 'case study', 'case studies', 'examples', 'previous work', 'clients'],
    href: '/work',
    linkLabel: 'Explore representative work',
  },
];

const serviceQuestionTemplates = [
  { intent: 'overview' as const, question: 'What does {service} include?', keywords: ['include', 'includes', 'offer', 'provide', 'features'] },
  { intent: 'considerations' as const, question: 'What should teams consider for {service}?', keywords: ['consider', 'considerations', 'risk', 'risks', 'important', 'requirements'] },
  { intent: 'approach' as const, question: 'How does Origins approach {service}?', keywords: ['approach', 'method', 'how', 'process', 'work'] },
];

function localize(locale: Locale, text: string): string {
  return translate(locale, text);
}

function localizedQuestion(locale: Locale, template: string, serviceTitle?: string): string {
  const question = localize(locale, template);
  return serviceTitle ? question.replace('{service}', serviceTitle) : question;
}

export function getEmbeddedFaq(locale: Locale): EmbeddedFaq[] {
  const generalFaq = faqDefinitions.map((definition) => ({
    id: definition.id,
    question: localize(locale, definition.question),
    answer: localize(locale, definition.answer),
    keywords: [
      definition.question,
      ...definition.keywords,
    ].flatMap((keyword) => locales.map((supportedLocale) => localize(supportedLocale, keyword))),
    ...(definition.href ? { href: definition.href } : {}),
    ...(definition.linkLabel ? { linkLabel: localize(locale, definition.linkLabel) } : {}),
  }));

  const serviceFaq = serviceSpecialties.flatMap((service) => {
    const title = localize(locale, service.title);
    const baseKeywords = [
      title,
      localize(locale, service.category),
      ...service.tags.split(' · '),
      ...service.capabilities.map((capability) => localize(locale, capability)),
    ];

    return serviceQuestionTemplates.map(({ intent, question, keywords }) => {
      const translatedConsiderations = service.considerations.map((item) => localize(locale, item));
      const answer = intent === 'overview'
        ? `${localize(locale, service.description)} ${localize(locale, 'Typical work includes:')} ${service.capabilities.map((item) => localize(locale, item)).join(' · ')}.`
        : intent === 'considerations'
          ? `${localize(locale, 'Key considerations include:')} ${translatedConsiderations.join(' · ')}`
          : `${localize(locale, 'Our approach is scoped to your goals, users, current systems and constraints. For this speciality:')} ${translatedConsiderations.join(' · ')}`;

      return {
        id: `${service.slug}-${intent}`,
        serviceSlug: service.slug,
        intent,
        question: localizedQuestion(locale, question, title),
        answer,
        keywords: [
          ...baseKeywords,
          ...keywords.flatMap((keyword) => locales.map((supportedLocale) => localize(supportedLocale, keyword))),
        ],
        href: `/services/${service.slug}`,
        linkLabel: localize(locale, 'Explore this service'),
      };
    });
  });

  return [...generalFaq, ...serviceFaq];
}

const intentAliases: Record<Locale, Record<NonNullable<EmbeddedFaq['intent']>, string[]>> = {
  en: {
    overview: ['include', 'includes', 'offer', 'provide', 'features', 'what is'],
    considerations: ['consider', 'risk', 'important', 'requirements', 'challenge'],
    approach: ['approach', 'method', 'how', 'process'],
  },
  ja: {
    overview: ['含ま', '内容', '提供', '機能'],
    considerations: ['考慮', 'リスク', '要件', '重要'],
    approach: ['進め方', '方法', 'アプローチ', 'プロセス'],
  },
  zh: {
    overview: ['包括', '提供', '内容', '功能'],
    considerations: ['考虑', '考量', '风险', '要求', '重要'],
    approach: ['如何', '方法', '方式', '流程'],
  },
  ar: {
    overview: ['يشمل', 'تتضمن', 'تقدم', 'ماذا'],
    considerations: ['اعتبار', 'مخاطر', 'متطلبات', 'مهم'],
    approach: ['نهج', 'طريقة', 'كيف', 'عملية'],
  },
  de: {
    overview: ['umfasst', 'beinhaltet', 'bietet', 'leistungen'],
    considerations: ['berücksichtigen', 'risiken', 'anforderungen', 'wichtig'],
    approach: ['vorgehen', 'ansatz', 'methode', 'ablauf'],
  },
};

function normalize(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

export function findEmbeddedFaq(query: string, locale: Locale): EmbeddedFaq | null {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return null;

  const faq = getEmbeddedFaq(locale);
  const exactMatch = faq.find((item) => normalizedQuery === normalize(item.question));
  if (exactMatch) return exactMatch;

  const serviceItems = faq.filter((item) => item.serviceSlug);
  let bestService: { item: EmbeddedFaq; score: number } | null = null;
  for (const item of serviceItems) {
    const serviceTerms = item.keywords
      .map(normalize)
      .filter((term) => term.length >= 2 && normalizedQuery.includes(term));
    const score = Math.max(0, ...serviceTerms.map((term) => term.length));
    if (score > (bestService?.score ?? 0)) bestService = { item, score };
  }

  if (bestService && bestService.score >= 3) {
    const intents = intentAliases[locale];
    const matchedIntent = (Object.keys(intents) as NonNullable<EmbeddedFaq['intent']>[])
      .find((intent) => intents[intent].some((term) => normalizedQuery.includes(normalize(term))));
    const serviceSlug = bestService.item.serviceSlug;
    return serviceItems.find((item) => item.serviceSlug === serviceSlug && item.intent === (matchedIntent ?? 'overview')) ?? bestService.item;
  }

  const matches = faqDefinitions
    .map((definition) => {
      const item = faq.find((candidate) => candidate.id === definition.id);
      if (!item) return null;
      const matchedTerms = item.keywords
        .map(normalize)
        .filter((term) => term.length >= 3 && normalizedQuery.includes(term));
      return { item, score: Math.max(0, ...matchedTerms.map((term) => term.length)) };
    })
    .filter((match): match is { item: EmbeddedFaq; score: number } => match !== null && match.score >= 4)
    .sort((a, b) => b.score - a.score);

  return matches[0]?.item ?? null;
}

export const suggestedQuestions = [
  'What services does Origins provide?',
  'How do I start a project?',
  'What is Nexus Origins?',
  'What does Cloud & DevOps include?',
] as const;
