import { Navbar } from '@/components/complect/Navbar'
import { StatusBadge, Card } from '@/components/complect/ui'
import { Link } from 'react-router-dom'

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

      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-10 pt-20 pb-16">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 sm:mb-10 border-b border-[var(--rule)] pb-6 sm:pb-8">
          <div>
            <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-2">Dashboard</div>
            <h1 className="font-syne font-bold text-[26px] sm:text-[32px] tracking-tight text-[var(--ink)] break-words">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-[var(--rule)] rounded-xl overflow-hidden mb-8">
          {[
            { label: 'Total questionnaires', value: '12', sub: 'all time' },
            { label: 'Pending review', value: '3', sub: 'need approval' },
            { label: 'Approved answers', value: '184', sub: 'shipped to vendors' },
            { label: 'Avg. confidence', value: '91%', sub: 'across answers' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-4 sm:p-6 border-[var(--rule)] ${
                i % 2 === 0 ? 'border-r' : ''
              } ${i < 2 ? 'border-b lg:border-b-0' : ''} ${
                i < 3 ? 'lg:border-r' : 'lg:border-r-0'
              }`}
            >
              <div className="font-mono text-[10px] text-[var(--ink4)] uppercase tracking-widest mb-3">{stat.label}</div>
              <div className="font-syne font-bold text-[24px] sm:text-[28px] tracking-tight text-[var(--ink)]">{stat.value}</div>
              <div className="font-mono text-[11px] text-[var(--ink4)] mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link to="/dashboard/questionnaires" className="group border border-[var(--rule)] rounded-xl p-5 hover:border-[var(--ink3)] transition-colors bg-[var(--bg)]">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink4)] mb-2">Workflow</div>
            <div className="font-syne font-bold text-[18px] text-[var(--ink)] mb-1">Security Questionnaires →</div>
            <p className="text-[13px] text-[var(--ink3)] font-light">Upload a questionnaire and generate AI answers.</p>
          </Link>
          <Link to="/dashboard/vault" className="group border border-[var(--rule)] rounded-xl p-5 hover:border-[var(--ink3)] transition-colors bg-[var(--bg)]">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink4)] mb-2">Knowledge base</div>
            <div className="font-syne font-bold text-[18px] text-[var(--ink)] mb-1">Answer Vault →</div>
            <p className="text-[13px] text-[var(--ink3)] font-light">Search and reuse approved answers across deals.</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main: empty state */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase">Recent analyses</div>
              <Link
                to="/dashboard/questionnaires"
                className="font-syne font-medium text-[13px] bg-[var(--ink)] text-[var(--bg)] px-4 py-2 rounded-lg hover:opacity-80 transition-opacity min-h-[40px] inline-flex items-center"
              >
                + New analysis
              </Link>
            </div>
            <div className="border border-[var(--rule)] rounded-xl p-8 sm:p-12 text-center">
              <div className="font-mono text-[11px] text-[var(--ink4)] uppercase tracking-widest mb-3">No analyses yet</div>
              <p className="text-[14px] text-[var(--ink3)] font-light mb-6 max-w-xs mx-auto">
                Upload your first security questionnaire to see Complect in action.
              </p>
              <Link to="/dashboard/questionnaires" className="inline-flex font-syne font-medium text-[13px] bg-[var(--ink)] text-[var(--bg)] px-5 py-3 rounded-lg hover:opacity-80 transition-opacity min-h-[44px] items-center">
                Upload questionnaire →
              </Link>
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
