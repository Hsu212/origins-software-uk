export type ServiceSpecialty = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  capabilities: string[];
  considerations: string[];
  tags: string;
};

export const serviceSpecialties: ServiceSpecialty[] = [
  {
    slug: 'digital-marketing', number: '01', title: 'Digital Marketing', category: 'Growth & acquisition',
    description: 'Data-driven digital marketing to scale your brand. We combine SEO, targeted paid ads, and content strategy to drive measurable business growth.',
    capabilities: ['Technical SEO and search visibility', 'Paid campaign planning and optimisation', 'Content strategy and measurement design', 'Conversion journeys and landing-page improvement'],
    considerations: ['Align activity to business outcomes before selecting channels.', 'Make tracking and attribution assumptions visible.', 'Improve performance through measured iteration—not vanity metrics.'],
    tags: 'SEO · PAID MEDIA · CONTENT · ANALYTICS',
  },
  {
    slug: 'vps-hosting', number: '02', title: 'VPS Hosting Services', category: 'Hosting & infrastructure',
    description: 'Deploy scalable, high-performance Virtual Private Servers. We provide secure, fully managed cloud infrastructure for your heavy workloads.',
    capabilities: ['Right-sized VPS architecture and provisioning', 'Secure server configuration and access controls', 'Backups, monitoring and recovery planning', 'Capacity planning and performance tuning'],
    considerations: ['Match infrastructure to workload and recovery requirements.', 'Keep patching, backups and access ownership explicit.', 'Document operational limits and paths to scale.'],
    tags: 'VPS · HOSTING · BACKUPS · HARDENING',
  },
  {
    slug: 'applied-ai-ml', number: '03', title: 'Applied AI & ML Solutions', category: 'Applied intelligence',
    description: 'Train and deploy enterprise AI architectures, predictive analytics, and custom models designed to turn complex data into actionable workflows.',
    capabilities: ['Problem framing and AI feasibility assessment', 'Data preparation and model evaluation', 'Predictive analytics and model integration', 'Human review, monitoring and model lifecycle design'],
    considerations: ['Start with data quality and a clearly measurable use case.', 'Evaluate model behaviour against real operating conditions.', 'Plan for observability, governance and human oversight.'],
    tags: 'MACHINE LEARNING · PREDICTION · DATA',
  },
  {
    slug: 'full-stack-development', number: '04', title: 'Full-Stack Development', category: 'Product engineering',
    description: 'End-to-end software engineering. We handle front-end design, back-end logic, and database management to bring your digital vision to life.',
    capabilities: ['Responsive web application development', 'Backend services, APIs and integrations', 'Data modelling and database implementation', 'Automated testing and release workflows'],
    considerations: ['Keep user experience connected to domain and data design.', 'Define stable interfaces between services.', 'Build for observability, maintainability and future change.'],
    tags: 'FRONT END · BACK END · DATABASES',
  },
  {
    slug: 'cloud-devops', number: '05', title: 'Cloud & DevOps', category: 'Platform engineering',
    description: 'Automate your server provisioning and CI/CD pipelines. We maintain 24/7 self-healing cloud infrastructure for flawless global deployment.',
    capabilities: ['Infrastructure as code and environment strategy', 'CI/CD pipeline design and release automation', 'Observability, alerting and incident workflows', 'Reliability engineering and recovery exercises'],
    considerations: ['Automate repeatable changes and keep them reviewable.', 'Define service objectives and alert on actionable signals.', 'Treat rollback and recovery as part of the release design.'],
    tags: 'CLOUD · CI/CD · OBSERVABILITY · SRE',
  },
  {
    slug: 'autonomous-ai-agents', number: '06', title: 'Autonomous AI Agents', category: 'Workflow automation',
    description: 'Move beyond chatbots. We deploy intelligent, multi-agent AI workflows that learn, adapt, and execute complex business tasks autonomously.',
    capabilities: ['Agent orchestration and workflow decomposition', 'Tool integrations and permission boundaries', 'Evaluation, tracing and human escalation', 'Guardrails for sensitive or irreversible actions'],
    considerations: ['Give each agent explicit tools and authority limits.', 'Make actions observable and auditable.', 'Use human approval for high-impact decisions where appropriate.'],
    tags: 'AGENTIC WORKFLOWS · TOOLS · GOVERNANCE',
  },
  {
    slug: 'custom-web-architecture', number: '07', title: 'Custom Web Architecture', category: 'Digital platforms',
    description: 'We build scalable, high-performance web and mobile apps tailored to your business logic using modern frameworks like React and Node.js.',
    capabilities: ['Application architecture and technical discovery', 'React-based web experiences and service layers', 'API, identity and third-party integration design', 'Performance, accessibility and resilience reviews'],
    considerations: ['Choose technology to fit the product and team.', 'Keep boundaries clear as the platform evolves.', 'Optimise measured bottlenecks rather than chasing benchmarks.'],
    tags: 'REACT · NODE.JS · APIS · MOBILE',
  },
  {
    slug: 'proactive-cybersecurity', number: '08', title: 'Proactive Cybersecurity', category: 'Security engineering',
    description: 'Secure your infrastructure from day one with zero-trust architecture, AI-driven penetration testing, and real-time threat monitoring.',
    capabilities: ['Threat modelling and secure-by-design reviews', 'Identity, secrets and least-privilege controls', 'Application and infrastructure security assessment', 'Logging, response planning and remediation tracking'],
    considerations: ['Prioritise risk by impact and exposure.', 'Keep permissions minimal and reviewable.', 'Pair detection with a clear response owner and process.'],
    tags: 'ZERO TRUST · APPSEC · MONITORING',
  },
  {
    slug: 'computer-vision-systems', number: '09', title: 'Computer Vision Systems', category: 'Visual intelligence',
    description: 'Implement advanced image recognition, object tracking, and spatial analysis models tailored for your real-world business applications.',
    capabilities: ['Use-case discovery and dataset assessment', 'Detection, classification and object tracking', 'Evaluation across real-world operating conditions', 'Inference integration and model monitoring'],
    considerations: ['Measure errors across relevant environments and edge cases.', 'Plan for data labelling, drift and retraining.', 'Design deployment around latency, cost and privacy constraints.'],
    tags: 'VISION · DETECTION · TRACKING · INFERENCE',
  },
];

export type WorkPattern = {
  slug: string;
  number: string;
  sector: string;
  title: string;
  description: string;
  challenge: string;
  approach: string;
  disciplines: string[];
  questions: string[];
};

export const workPatterns: WorkPattern[] = [
  {
    slug: 'computer-vision-intelligence', number: '01', sector: 'Computer vision', title: 'Turning visual data into dependable decisions',
    description: 'A representative solution pattern for teams that need to detect, classify or track objects in variable real-world environments. Architecture is shaped by dataset quality, latency, deployment constraints and the cost of mistakes.',
    challenge: 'Inspection teams may need to review large volumes of visual evidence across changing environments. Lighting, camera placement, image quality and uncommon edge cases can all affect model reliability.',
    approach: 'Establish a representative evaluation dataset, agree the cost of false positives and false negatives, then compare inference options against real latency, privacy and deployment constraints. Keep uncertain predictions reviewable by people.',
    disciplines: ['Applied ML and evaluation', 'Data pipelines and labelling strategy', 'Inference integration and monitoring'],
    questions: ['Which conditions and edge cases determine real-world performance?', 'Where should inference run: device, edge or cloud?', 'How will drift, false positives and model updates be handled?'],
  },
  {
    slug: 'connected-workspace', number: '02', sector: 'Connected workflows', title: 'Bringing fragmented operations into one workspace',
    description: 'A representative platform pattern for consolidating communication, project work, documents and operational workflows behind coherent identity and access controls.',
    challenge: 'Operational context can become scattered across chat, task tracking, documents and line-of-business systems. Teams lose time switching tools, while duplicated data and inconsistent permissions create avoidable risk.',
    approach: 'Map the workflows and authoritative data sources before designing a shared workspace. Integrate through explicit service boundaries, preserve source-system ownership, and make identity, permissions, audit history and sync failures visible.',
    disciplines: ['Product engineering and UX', 'Realtime systems and integrations', 'Identity, permissions and audit trails'],
    questions: ['Which workflows should be unified—and which should stay independent?', 'How will permissions map to teams, projects and records?', 'What happens when connected systems are unavailable or out of sync?'],
  },
  {
    slug: 'autonomous-workflows', number: '03', sector: 'AI & automation', title: 'Making automated systems useful and governable',
    description: 'A representative AI-agent pattern for coordinating multi-step work across business tools while keeping permissions, traces, human review and failure recovery explicit.',
    challenge: 'A multi-step operational workflow may span several business tools, involve repetitive decisions and still require human judgement for sensitive exceptions. Unbounded automation makes errors difficult to inspect or reverse.',
    approach: 'Break the workflow into observable steps with narrowly scoped tool access. Evaluate against representative tasks, log decisions and tool calls, and define approval, retry, pause and escalation paths before automating consequential actions.',
    disciplines: ['Agent orchestration and tool use', 'Evaluation and workflow observability', 'Human-in-the-loop controls'],
    questions: ['Which actions can run automatically, and which require approval?', 'How are tool calls, decisions and exceptions recorded?', 'How can workflows pause safely, retry or escalate?'],
  },
  {
    slug: 'legacy-platform-modernisation', number: '04', sector: 'Platform modernisation', title: 'Modernising a critical platform without a risky rewrite',
    description: 'A representative modernisation pattern for organisations that need to improve a business-critical system while keeping existing services available and limiting operational disruption.',
    challenge: 'A long-lived platform can accumulate fragile dependencies, slow release cycles and knowledge concentrated in a few people. Replacing everything at once can increase delivery risk and make continuity harder to protect.',
    approach: 'Map system boundaries, dependencies and operational risks first. Prioritise small changes around high-value workflows, add contract and regression checks, and migrate data or capabilities in stages with observable cutover and rollback plans.',
    disciplines: ['Architecture and technical discovery', 'Incremental migration and testing', 'Release planning and operational handover'],
    questions: ['Which workflows and integrations are most critical to continuity?', 'How can old and new components coexist during transition?', 'What evidence is required before each migration step?'],
  },
  {
    slug: 'cloud-foundation', number: '05', sector: 'Cloud & reliability', title: 'Creating a cloud foundation teams can operate',
    description: 'A representative cloud engineering pattern for teams that need repeatable environments, safer releases and clearer operational ownership as a digital service grows.',
    challenge: 'Manual environment setup, inconsistent deployments and unclear recovery responsibilities can slow delivery and make incidents harder to manage as usage and team size increase.',
    approach: 'Define environment and access boundaries, codify repeatable infrastructure, and build a release pipeline with automated checks. Pair monitoring and alerting with backup, rollback and recovery procedures that the team can rehearse.',
    disciplines: ['Cloud architecture and infrastructure as code', 'CI/CD and release automation', 'Observability, security and recovery planning'],
    questions: ['Which service objectives reflect the user experience that matters?', 'How are environments, secrets and access controlled?', 'Can the team recover from a failed release or data loss?'],
  },
  {
    slug: 'digital-product-launch', number: '06', sector: 'Digital product', title: 'Taking a digital product from concept to a dependable release',
    description: 'A representative product engineering pattern for turning a validated user need into a focused application, with a delivery path that supports learning after launch.',
    challenge: 'Early product ideas often combine assumptions about users, features, data and technology. Building too much before validating those assumptions can increase cost without improving the product’s fit.',
    approach: 'Align stakeholders around user needs and a measurable first release. Prototype important journeys, choose a maintainable architecture, and deliver in reviewable increments with accessibility, testing, analytics consent and operational needs considered from the outset.',
    disciplines: ['Product discovery and experience design', 'Full-stack application engineering', 'Quality, accessibility and release readiness'],
    questions: ['Which user need should the first release prove?', 'What can be learned before committing to the full build?', 'How will quality and product feedback shape the next iteration?'],
  },
];

export type ProcessStage = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  outputs: string[];
  principles: string[];
};

export const processStages: ProcessStage[] = [
  {
    slug: 'discovery', number: '01', title: 'Understand the problem', subtitle: 'Discovery & alignment',
    description: 'We clarify the business outcome, people involved, existing systems, constraints and risks before committing to a solution. Discovery is designed to reduce ambiguity and establish a shared decision baseline.',
    outputs: ['Problem statement and success measures', 'Stakeholder and user needs', 'Constraints, assumptions and key risks', 'Recommended next step and scope options'],
    principles: ['Ask what must change before deciding what to build.', 'Separate known facts from assumptions that need testing.', 'Make non-goals and constraints visible early.'],
  },
  {
    slug: 'architecture', number: '02', title: 'Design the approach', subtitle: 'Architecture & planning',
    description: 'We translate the agreed outcomes into system boundaries, delivery milestones, integration choices and an implementation plan with clear trade-offs.',
    outputs: ['Architecture outline and key decisions', 'Milestones, dependencies and responsibilities', 'Delivery risks and validation plan', 'Scope, assumptions and commercial options'],
    principles: ['Choose the simplest architecture that meets the real constraints.', 'Treat security, data and operations as design inputs.', 'Make trade-offs explainable to technical and business stakeholders.'],
  },
  {
    slug: 'engineering', number: '03', title: 'Build in reviewable increments', subtitle: 'Engineering & validation',
    description: 'Implementation is broken into meaningful increments so that users and stakeholders can review progress, validate assumptions and make decisions while change is still manageable.',
    outputs: ['Working increments and review checkpoints', 'Automated checks appropriate to the system', 'Visible technical decisions and scope changes', 'Documentation and operational considerations'],
    principles: ['Keep changes small enough to review and reason about.', 'Test the risks that matter most to the system.', 'Raise blockers early, with options and impact.'],
  },
  {
    slug: 'operate', number: '04', title: 'Launch, hand over and improve', subtitle: 'Release & operations',
    description: 'Delivery includes the transition into operation: releases, observability, ownership, practical documentation and a clear path for future improvements.',
    outputs: ['Release and rollback plan', 'Monitoring and operational runbook', 'Knowledge transfer and ownership handover', 'Follow-on improvements prioritised by evidence'],
    principles: ['Plan for recovery as well as launch.', 'Leave ownership and support boundaries explicit.', 'Use production feedback to guide the next iteration.'],
  },
];
