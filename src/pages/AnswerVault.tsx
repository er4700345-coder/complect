import { useMemo, useState } from 'react'
import { Navbar } from '@/components/complect/Navbar'
import toast from 'react-hot-toast'

const CATEGORIES = ['All', 'Security', 'Privacy', 'Compliance', 'Infrastructure', 'Legal'] as const
type Category = typeof CATEGORIES[number]

type VaultAnswer = {
  id: string
  question: string
  answer: string
  category: Exclude<Category, 'All'>
  uses: number
  updated: string
}

const VAULT: VaultAnswer[] = [
  { id: 'v1', question: 'Do you maintain a formal Information Security Policy?', answer: 'Yes — ISP-001 v3.2, reviewed annually by executive leadership.', category: 'Security', uses: 24, updated: '2 days ago' },
  { id: 'v2', question: 'Describe how you handle data subject access requests (GDPR Art. 15).', answer: 'Requests are handled via privacy@ and resolved within 30 days. DPO oversight; verification required.', category: 'Privacy', uses: 18, updated: '1 week ago' },
  { id: 'v3', question: 'Are you SOC 2 Type II certified?', answer: 'Yes — SOC 2 Type II, audit period Jan–Dec 2025. Report available under NDA.', category: 'Compliance', uses: 41, updated: '3 days ago' },
  { id: 'v4', question: 'Where is customer data hosted?', answer: 'AWS us-east-1 and eu-west-1. Customer choice at provisioning. AES-256 at rest, TLS 1.3 in transit.', category: 'Infrastructure', uses: 33, updated: '5 days ago' },
  { id: 'v5', question: 'Will you sign our Data Processing Agreement?', answer: 'Yes. We provide a standard DPA (GDPR Art. 28 compliant) and accept reasonable customer redlines.', category: 'Legal', uses: 12, updated: '2 weeks ago' },
  { id: 'v6', question: 'How is encryption key management handled?', answer: 'AWS KMS with automatic 90-day rotation. Customer-managed keys available on Enterprise.', category: 'Security', uses: 19, updated: '4 days ago' },
  { id: 'v7', question: 'How do you handle incident notifications?', answer: 'Customers notified within 72 hours of confirmed incidents per our IRP. Regulatory notifications per applicable law.', category: 'Compliance', uses: 14, updated: '1 week ago' },
]

export default function AnswerVaultPage() {
  const user = { name: 'User', email: 'user@company.com', role: 'USER' }
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<Category>('All')

  const filtered = useMemo(() => VAULT.filter(a => {
    if (cat !== 'All' && a.category !== cat) return false
    if (!query) return true
    const q = query.toLowerCase()
    return a.question.toLowerCase().includes(q) || a.answer.toLowerCase().includes(q)
  }), [query, cat])

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={user} />
      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-10 pt-20 pb-16">
        <div className="mb-8 sm:mb-10 border-b border-[var(--rule)] pb-6 sm:pb-8">
          <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-2">Knowledge base</div>
          <h1 className="font-syne font-bold text-[26px] sm:text-[32px] tracking-tight text-[var(--ink)]">Answer Vault</h1>
          <p className="text-[14px] text-[var(--ink3)] font-light mt-1">Reusable, approved answers to common security & compliance questions.</p>
        </div>

        {/* Search + filters */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search saved answers…"
              className="field-input text-[14px] pl-10"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink4)]">⌕</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap font-syne font-medium text-[12px] px-3.5 py-2 rounded-full border transition-colors min-h-[36px] ${
                  cat === c
                    ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                    : 'bg-[var(--bg)] text-[var(--ink3)] border-[var(--rule2)] hover:border-[var(--ink3)] hover:text-[var(--ink)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(a => (
            <div key={a.id} className="border border-[var(--rule)] rounded-xl p-5 bg-[var(--bg)] hover:border-[var(--ink3)] transition-colors flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink4)]">{a.category}</span>
                <span className="font-mono text-[10px] text-[var(--ink4)]">{a.uses} reuses</span>
              </div>
              <p className="font-syne font-semibold text-[14px] text-[var(--ink)] leading-snug mb-2">{a.question}</p>
              <p className="text-[13px] text-[var(--ink3)] font-light leading-relaxed mb-4 flex-1">{a.answer}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] text-[var(--ink4)]">Updated {a.updated}</span>
                <button
                  onClick={() => toast.success('Answer copied — paste into your draft')}
                  className="min-h-[40px] font-syne font-medium text-[12px] bg-[var(--ink)] text-[var(--bg)] px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                >
                  ↻ Reuse answer
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="md:col-span-2 border border-dashed border-[var(--rule2)] rounded-xl p-10 text-center">
              <p className="text-[14px] text-[var(--ink3)] font-light">No answers match your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}