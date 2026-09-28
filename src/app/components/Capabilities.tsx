'use client';

import { motion } from 'framer-motion';

const capabilities = [
  {
    title: 'Web Applications',
    description: 'React/Next.js, TypeScript, SSR/SSG/ISR. Complex state management, real-time features, progressive web apps.',
    icon: 'web',
    details: ['Next.js 14+ (App Router)', 'React 18, Server Components', 'TanStack Query / Zustand', 'Playwright E2E testing', 'Storybook component library']
  },
  {
    title: 'API Development',
    description: 'REST, GraphQL, gRPC, tRPC. Type-safe contracts, auto-generated SDKs, comprehensive observability.',
    icon: 'api',
    details: ['NestJS / Fastify / Hono', 'GraphQL Federation (Apollo)', 'gRPC + Protobuf', 'OpenAPI/Swagger generation', 'Rate limiting, auth, caching']
  },
  {
    title: 'Cloud Architecture',
    description: 'AWS/GCP/Azure. Infrastructure as Code, serverless, containers, multi-region, cost optimization.',
    icon: 'cloud',
    details: ['Terraform / Pulumi', 'Kubernetes (EKS/GKE/AKS)', 'Serverless (Lambda/Cloud Run)', 'Service mesh (Istio/Linkerd)', 'FinOps & cost governance']
  },
  {
    title: 'AI Integration',
    description: 'LLM ops, RAG pipelines, fine-tuning, vector databases, eval frameworks. Production-grade ML systems.',
    icon: 'ai',
    details: ['RAG with pgvector/Pinecone', 'LangChain / LlamaIndex', 'Model fine-tuning (LoRA/QLoRA)', 'MLflow / Weights & Biases', 'Guardrails & eval pipelines']
  },
  {
    title: 'Data Engineering',
    description: 'Event streaming, data lakes, real-time analytics, ELT pipelines, governance. Trusted data at scale.',
    icon: 'data',
    details: ['Kafka / Redpanda', 'ClickHouse / DuckDB', 'dbt + Airflow/Dagster', 'Iceberg / Delta Lake', 'Data contracts & lineage']
  },
  {
    title: 'DevOps & Platform',
    description: 'CI/CD, GitOps, platform engineering, developer experience, security hardening, compliance automation.',
    icon: 'devops',
    details: ['GitHub Actions / GitLab CI', 'ArgoCD / Flux', 'Backstage developer portal', 'Policy as Code (OPA)', 'SOC2/ISO27001 automation']
  }
];

const icons = {
  web: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  ),
  api: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  cloud: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  ai: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  data: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  devops: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

export default function Capabilities() {
  return (
    <section className="py-24 sm:py-32 bg-forest" id="capabilities">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-light text-emerald text-sm font-medium mb-6 border border-white/10">
            Capabilities
          </span>
          <h2 className="serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
            Deep expertise across the <span className="font-normal">full stack</span>
          </h2>
          <p className="text-lg text-white-dim font-light">
            We don't just list technologies—we solve problems with them. Each capability represents production battle-tested patterns we've shipped repeatedly.
          </p>
        </motion.div>

        {/* Capabilities Grid - Ubuntu-style rigid grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, index) => (
            <motion.article
              key={cap.title}
              className="group relative bg-forest-light rounded-2xl p-6 border border-white/10 hover:border-emerald/50 hover:shadow-xl hover:shadow-emerald/10 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-forest-lighter flex items-center justify-center text-emerald mb-5 group-hover:bg-emerald group-hover:text-forest transition-all duration-300">
                {icons[cap.icon as keyof typeof icons]}
              </div>

              <h3 className="serif-heading text-xl font-medium text-white mb-3">
                {cap.title}
              </h3>

              <p className="text-white-dim text-sm leading-relaxed mb-5">
                {cap.description}
              </p>

              {/* Tech details - expandable on hover */}
              <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs font-medium text-emerald uppercase tracking-wider mb-3">Core Stack</p>
                  <ul className="space-y-2">
                    {cap.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-white-faint">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald/30" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Process Note */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-forest-light border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <p className="serif-heading text-4xl font-bold text-emerald mb-2">01</p>
              <p className="text-white-dim text-sm">Discovery &amp; Architecture</p>
            </div>
            <div className="p-4">
              <p className="serif-heading text-4xl font-bold text-emerald mb-2">02</p>
              <p className="text-white-dim text-sm">Iterative Delivery</p>
            </div>
            <div className="p-4">
              <p className="serif-heading text-4xl font-bold text-emerald mb-2">03</p>
              <p className="text-white-dim text-sm">Operate &amp; Evolve</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}