import { Navbar } from '@/components/complect/Navbar'
import { StatusBadge } from '@/components/complect/ui'

// Admin leads page — static shell, will be wired to backend later
export default function AdminLeadsPage() {
  const user = { name: 'Admin', email: 'admin@complect.io', role: 'ADMIN' }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={user} />

      <main className="max-w-[1120px] mx-auto px-10 pt-20 pb-16">
        <div className="border-b border-[var(--rule)] pb-8 mb-10">
          <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-2">Admin</div>
          <h1 className="font-syne font-bold text-[32px] tracking-tight text-[var(--ink)]">Lead management</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-6 border border-[var(--rule)] mb-8">
          {[
            { label: 'Total pilot', value: '0' },
            { label: 'New pilot', value: '0' },
            { label: 'Urgent', value: '0' },
            { label: 'Total demo', value: '0' },
            { label: 'New demo', value: '0' },
            { label: 'Total users', value: '0' },
          ].map((stat, i) => (
            <div key={i} className={`p-4 ${i < 5 ? 'border-r border-[var(--rule)]' : ''}`}>
              <div className="font-mono text-[9px] text-[var(--ink4)] uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="font-syne font-bold text-[22px] tracking-tight text-[var(--ink)]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div className="border border-[var(--rule)] rounded p-12 text-center">
          <div className="font-mono text-[11px] text-[var(--ink4)] uppercase tracking-widest mb-3">No leads yet</div>
          <p className="text-[14px] text-[var(--ink3)] font-light max-w-md mx-auto">
            Leads from pilot requests and demo bookings will appear here. Connect the backend to start collecting data.
          </p>
        </div>
      </main>
    </div>
  )
}
