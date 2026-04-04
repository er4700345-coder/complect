import { Navbar } from '@/components/complect/Navbar'
import { StatusBadge } from '@/components/complect/ui'

const PLANS = {
  PILOT: {
    name: 'Solo / Pilot',
    description: 'For founders answering occasional questionnaires',
    price: 499,
    interval: 'month',
    features: [
      '5 questionnaire analyses/month',
      'SOC 2 + GDPR coverage',
      'Evidence citations per answer',
      '3 policy drafts/month',
      'Export to PDF and DOCX',
      'Email support',
    ],
  },
  GROWTH: {
    name: 'Growth',
    description: 'For startups actively closing enterprise deals',
    price: 1500,
    interval: 'month',
    features: [
      'Unlimited questionnaire analyses',
      'All frameworks (ISO 27001, HIPAA, PCI DSS)',
      'Full policy library generation',
      'Compliance readiness dashboard',
      'Answer reuse across questionnaires',
      'Approval workflows + audit trail',
      'Priority support (8hr SLA)',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    description: 'For teams needing custom frameworks and SSO',
    price: 3500,
    interval: 'month',
    features: [
      'Everything in Growth',
      'Custom framework ingestion',
      'SSO / SAML integration',
      'Custom data residency region',
      'Dedicated compliance specialist',
      '4hr response SLA',
      'MSA + DPA on request',
    ],
  },
} as const

export default function BillingPage() {
  const user = { name: 'User', email: 'user@company.com', role: 'USER' }
  const plan = 'FREE'
  const billing = 'NONE'

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={user} />

      <main className="max-w-[1120px] mx-auto px-10 pt-20 pb-16">
        <div className="border-b border-[var(--rule)] pb-8 mb-10">
          <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-2">Billing</div>
          <h1 className="font-syne font-bold text-[32px] tracking-tight text-[var(--ink)]">Plans & billing</h1>
        </div>

        {/* Current plan summary */}
        <div className="border border-[var(--rule)] rounded mb-10">
          <div className="px-6 py-5 border-b border-[var(--rule)] flex items-center justify-between">
            <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase">Current plan</div>
            <StatusBadge status={billing === 'NONE' ? 'FREE' : billing} />
          </div>
          <div className="px-6 py-5 grid grid-cols-3 gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase mb-1">Plan</div>
              <div className="font-syne font-semibold text-[16px] text-[var(--ink)]">Free</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase mb-1">Status</div>
              <div className="text-[14px] text-[var(--ink2)] font-light capitalize">{billing.toLowerCase().replace('_', ' ')}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase mb-1">Next</div>
              <div className="text-[14px] text-[var(--ink2)] font-light">—</div>
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-6">Available plans</div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--rule)]">
          {(Object.entries(PLANS) as [string, typeof PLANS[keyof typeof PLANS]][]).map(([key, p], i) => {
            const isCurrent = plan === key
            const isLast = i === Object.keys(PLANS).length - 1

            return (
              <div key={key} className={`p-8 ${!isLast ? 'border-r border-[var(--rule)]' : ''} ${isCurrent ? 'bg-[var(--bg2)]' : ''}`}>
                <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase mb-3">
                  {key === 'PILOT' ? 'Starter' : key === 'GROWTH' ? 'Most popular' : 'Enterprise'}
                </div>
                <div className="font-syne font-bold text-[20px] tracking-tight text-[var(--ink)] mb-1">{p.name}</div>
                <div className="text-[13px] text-[var(--ink4)] font-light mb-5">{p.description}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-syne font-bold text-[36px] tracking-tight text-[var(--ink)]">
                    ${p.price.toLocaleString()}
                  </span>
                  <span className="text-[13px] text-[var(--ink4)]">/{p.interval}</span>
                </div>
                <div className="font-mono text-[10px] text-[var(--ink4)] mb-6">Billed monthly. Cancel anytime.</div>

                <div className="h-px bg-[var(--rule)] mb-5" />

                <ul className="space-y-2.5 mb-7">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-[var(--ink3)] font-light">
                      <span className="font-mono text-[var(--green)] mt-px text-[11px] flex-shrink-0">→</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="w-full font-syne font-medium text-[13px] border border-[var(--rule2)] text-[var(--ink2)] py-2.5 px-4 rounded hover:bg-[var(--bg2)] hover:border-[var(--ink3)] transition-all">
                  {key === 'ENTERPRISE' ? 'Contact sales →' : 'Upgrade →'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Enterprise contact */}
        <div className="mt-6 border border-[var(--rule)] rounded p-6 flex items-center justify-between bg-[var(--bg2)]">
          <div>
            <div className="font-syne font-semibold text-[15px] text-[var(--ink)] mb-1">Need custom terms or enterprise contract?</div>
            <div className="text-[13px] text-[var(--ink3)] font-light">MSA, DPA, SSO, custom data residency, and dedicated support available on Scale.</div>
          </div>
          <a href="mailto:sales@complect.io" className="flex-shrink-0 font-syne font-medium text-[13px] border border-[var(--rule2)] px-4 py-2.5 rounded hover:bg-[var(--bg)] hover:border-[var(--ink3)] transition-all text-[var(--ink2)] ml-8">
            Contact sales →
          </a>
        </div>
      </main>
    </div>
  )
}
