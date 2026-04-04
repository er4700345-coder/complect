import { Navbar } from '@/components/complect/Navbar'
import { StatusBadge, Card } from '@/components/complect/ui'

// Static dashboard shell — will be wired to backend later
export default function DashboardPage() {
  const user = { name: 'User', email: 'user@company.com', role: 'USER' }
  const plan = 'FREE'
  const billing = 'NONE'

  function greeting() {
    const h = new Date().getHours()
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={user} />

      <main className="max-w-[1120px] mx-auto px-10 pt-20 pb-16">
        {/* Page header */}
        <div className="flex items-start justify-between mb-10 border-b border-[var(--rule)] pb-8">
          <div>
            <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-2">Dashboard</div>
            <h1 className="font-syne font-bold text-[32px] tracking-tight text-[var(--ink)]">
              {greeting()}, {user.name.split(' ')[0]}
            </h1>
            <p className="text-[14px] text-[var(--ink3)] font-light mt-1">Your workspace</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={plan} />
            <a href="/dashboard/billing" className="font-mono text-[11px] text-[var(--ink4)] hover:text-[var(--ink)] transition-colors">{billing}</a>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 border border-[var(--rule)] mb-8">
          {[
            { label: 'Questionnaires analyzed', value: '0', sub: 'total' },
            { label: 'Auto-answered', value: '0', sub: 'questions' },
            { label: 'Gaps identified', value: '0', sub: 'across all analyses' },
            { label: 'Current plan', value: plan, sub: billing.toLowerCase() },
          ].map((stat, i) => (
            <div key={i} className={`p-6 ${i < 3 ? 'border-r border-[var(--rule)]' : ''}`}>
              <div className="font-mono text-[10px] text-[var(--ink4)] uppercase tracking-widest mb-3">{stat.label}</div>
              <div className="font-syne font-bold text-[28px] tracking-tight text-[var(--ink)]">{stat.value}</div>
              <div className="font-mono text-[11px] text-[var(--ink4)] mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main: empty state */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase">Recent analyses</div>
              <button
                disabled={plan === 'FREE'}
                className="font-syne font-medium text-[13px] bg-[var(--ink)] text-[var(--bg)] px-4 py-2 rounded hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {plan === 'FREE' ? 'Upgrade to analyze' : '+ New analysis'}
              </button>
            </div>
            <div className="border border-[var(--rule)] rounded p-12 text-center">
              <div className="font-mono text-[11px] text-[var(--ink4)] uppercase tracking-widest mb-3">No analyses yet</div>
              <p className="text-[14px] text-[var(--ink3)] font-light mb-6 max-w-xs mx-auto">
                Upload your first security questionnaire to see Complect in action.
              </p>
              <a href="/dashboard/billing" className="inline-flex font-syne font-medium text-[13px] bg-[var(--ink)] text-[var(--bg)] px-5 py-2.5 rounded hover:opacity-80 transition-opacity">
                Upgrade to get started →
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <div className="px-5 py-4 border-b border-[var(--rule)]">
                <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase">Workspace</div>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  ['Company', 'Your Company'],
                  ['Role', 'Your Role'],
                  ['Team size', 'SMALL'],
                  ['Frameworks', 'SOC 2, GDPR'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase mb-0.5">{label}</div>
                    <div className="text-[13px] text-[var(--ink2)] font-light">{value}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="px-5 py-4 border-b border-[var(--rule)]">
                <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase">Quick actions</div>
              </div>
              <div className="px-5 py-4 space-y-2">
                <a href="/dashboard/billing" className="block text-[13px] text-[var(--ink2)] font-light hover:text-[var(--ink)] transition-colors">→ View billing & plans</a>
                <a href="mailto:hello@complect.io" className="block text-[13px] text-[var(--ink2)] font-light hover:text-[var(--ink)] transition-colors">→ Contact support</a>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
