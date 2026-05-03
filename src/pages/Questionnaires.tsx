import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import { Navbar } from '@/components/complect/Navbar'
import toast from 'react-hot-toast'

type Answer = {
  id: string
  question: string
  answer: string
  confidence: number
  evidence: string
  approved: boolean
  editing: boolean
}

const SAMPLE_ANSWERS: Answer[] = [
  {
    id: 'a1',
    question: 'Does your organization maintain a formal Information Security Policy reviewed at least annually?',
    answer: 'Yes. Our Information Security Policy (ISP-001 v3.2) is approved by executive leadership and reviewed annually. Last review: March 2026.',
    confidence: 96,
    evidence: 'ISP-001.pdf · §2.1',
    approved: false,
    editing: false,
  },
  {
    id: 'a2',
    question: 'Describe access control procedures for privileged accounts including MFA enforcement.',
    answer: 'Privileged access is brokered via HashiCorp Vault with mandatory FIDO2 MFA. Quarterly access reviews are documented. Sessions are logged for 12 months.',
    confidence: 91,
    evidence: 'Access-Control-Policy.pdf · §4.3',
    approved: false,
    editing: false,
  },
  {
    id: 'a3',
    question: 'Provide your incident response procedure including RTO and RPO targets for critical systems.',
    answer: 'IRP-002 defines a 4-hour RTO for Tier-1 systems. RPO targets are 1 hour for production data via continuous replication.',
    confidence: 72,
    evidence: 'IRP-002.pdf · §6 — verify before submitting',
    approved: false,
    editing: false,
  },
  {
    id: 'a4',
    question: 'Do you maintain a formal Vendor Risk Management program with documented third-party assessments?',
    answer: 'Draft policy generated (VRM-Draft-001.docx). Review and approve before submitting to the vendor.',
    confidence: 58,
    evidence: 'Generated draft · Action required',
    approved: false,
    editing: false,
  },
]

const ACCEPTED = '.pdf,.docx,.xlsx,.csv'

export default function QuestionnairesPage() {
  const user = { name: 'User', email: 'user@company.com', role: 'USER' }
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [answers, setAnswers] = useState<Answer[]>([])

  function pickFile(f: File | null) {
    if (!f) return
    const ok = /\.(pdf|docx|xlsx|csv)$/i.test(f.name)
    if (!ok) {
      toast.error('Unsupported file. Use PDF, DOCX, XLSX or CSV.')
      return
    }
    setFile(f)
    setAnswers([])
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    pickFile(e.dataTransfer.files?.[0] ?? null)
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    pickFile(e.target.files?.[0] ?? null)
  }

  async function generate() {
    if (!file) return
    setGenerating(true)
    setAnswers([])
    await new Promise(r => setTimeout(r, 1600))
    setAnswers(SAMPLE_ANSWERS)
    setGenerating(false)
    toast.success('Draft answers generated')
  }

  function update(id: string, patch: Partial<Answer>) {
    setAnswers(prev => prev.map(a => (a.id === id ? { ...a, ...patch } : a)))
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={user} />
      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-10 pt-20 pb-16">
        <div className="mb-8 sm:mb-10 border-b border-[var(--rule)] pb-6 sm:pb-8">
          <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-2">Workflow</div>
          <h1 className="font-syne font-bold text-[26px] sm:text-[32px] tracking-tight text-[var(--ink)]">Security Questionnaires</h1>
          <p className="text-[14px] text-[var(--ink3)] font-light mt-1">Upload a questionnaire and generate evidence-backed answers.</p>
        </div>

        {/* Upload */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`rounded-xl border-2 border-dashed p-6 sm:p-10 text-center transition-colors ${
            dragOver ? 'border-[var(--ink)] bg-[var(--bg2)]' : 'border-[var(--rule2)] bg-[var(--bg2)]/40'
          }`}
        >
          <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase mb-3">Upload area</div>
          <h2 className="font-syne font-semibold text-[18px] sm:text-[20px] text-[var(--ink)] mb-2">Drag & drop your questionnaire</h2>
          <p className="text-[13px] text-[var(--ink3)] font-light mb-5">Supports PDF, DOCX, XLSX, CSV — up to 25 MB</p>
          <input ref={inputRef} type="file" accept={ACCEPTED} className="hidden" onChange={onChange} />
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 font-syne font-medium text-[14px] bg-[var(--ink)] text-[var(--bg)] px-5 py-3 rounded-lg hover:opacity-80 transition-opacity min-h-[44px]"
          >
            ↑ Upload questionnaire
          </button>

          {file && (
            <div className="mt-5 inline-flex items-center gap-3 bg-[var(--bg)] border border-[var(--rule)] rounded-lg px-4 py-2.5 max-w-full">
              <span className="font-mono text-[11px] text-[var(--green)] uppercase">Ready</span>
              <span className="text-[13px] text-[var(--ink2)] font-light truncate max-w-[220px] sm:max-w-[400px]">{file.name}</span>
              <button onClick={() => { setFile(null); setAnswers([]) }} className="text-[var(--ink4)] hover:text-[var(--ink)] text-base leading-none">×</button>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-mono text-[11px] text-[var(--ink4)]">
            {file ? `1 file ready · ${(file.size / 1024).toFixed(0)} KB` : 'No file selected yet'}
          </p>
          <button
            onClick={generate}
            disabled={!file || generating}
            className="w-full sm:w-auto font-syne font-medium text-[14px] bg-[var(--ink)] text-[var(--bg)] px-5 py-3 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] inline-flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Generating answers…
              </>
            ) : (
              '✨ Generate AI Answers'
            )}
          </button>
        </div>

        {/* Loading skeletons */}
        {generating && (
          <div className="mt-8 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-[var(--rule)] rounded-xl p-5 animate-pulse">
                <div className="h-3 w-2/3 bg-[var(--bg3)] rounded mb-3" />
                <div className="h-3 w-full bg-[var(--bg3)] rounded mb-2" />
                <div className="h-3 w-5/6 bg-[var(--bg3)] rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Answer cards */}
        {answers.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase">Generated answers</div>
              <span className="font-mono text-[11px] text-[var(--ink4)]">{answers.filter(a => a.approved).length} / {answers.length} approved</span>
            </div>
            <div className="space-y-4">
              {answers.map(a => (
                <AnswerCard key={a.id} a={a} onUpdate={p => update(a.id, p)} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function AnswerCard({ a, onUpdate }: { a: Answer; onUpdate: (p: Partial<Answer>) => void }) {
  const conf = a.confidence
  const confColor =
    conf >= 85 ? 'text-[var(--green)] border-[var(--green-rule)] bg-[var(--green-bg)]'
    : conf >= 70 ? 'text-[#92400e] border-amber-300/40 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-300'
    : 'text-[var(--red)] border-red-300/40 bg-[var(--red-bg)]'

  return (
    <div className={`border rounded-xl p-5 sm:p-6 transition-colors ${a.approved ? 'border-[var(--green-rule)] bg-[var(--green-bg)]/30' : 'border-[var(--rule)] bg-[var(--bg)]'}`}>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <p className="text-[14px] font-syne font-semibold text-[var(--ink)] flex-1 min-w-[200px] leading-snug">{a.question}</p>
        <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${confColor}`}>
          {conf}% confidence
        </span>
      </div>

      {a.editing ? (
        <textarea
          value={a.answer}
          onChange={e => onUpdate({ answer: e.target.value })}
          rows={4}
          className="field-textarea text-[13px] mb-3"
        />
      ) : (
        <p className="text-[13px] text-[var(--ink2)] font-light leading-relaxed mb-3">{a.answer}</p>
      )}

      <div className="flex items-start gap-2 mb-4">
        <span className="font-mono text-[10px] text-[var(--ink4)] uppercase tracking-wider mt-px">Evidence</span>
        <span className="font-mono text-[11px] text-[var(--ink3)] flex-1">{a.evidence}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={() => onUpdate({ editing: !a.editing })}
          className="min-h-[40px] flex-1 sm:flex-none font-syne font-medium text-[13px] border border-[var(--rule2)] text-[var(--ink2)] px-4 py-2 rounded-lg hover:bg-[var(--bg2)] hover:border-[var(--ink3)] transition-colors"
        >
          {a.editing ? 'Done editing' : '✎ Edit answer'}
        </button>
        <button
          onClick={() => onUpdate({ approved: !a.approved, editing: false })}
          className={`min-h-[40px] flex-1 sm:flex-none font-syne font-medium text-[13px] px-4 py-2 rounded-lg transition-opacity ${
            a.approved ? 'bg-[var(--green)] text-white hover:opacity-80' : 'bg-[var(--ink)] text-[var(--bg)] hover:opacity-80'
          }`}
        >
          {a.approved ? '✓ Approved' : '✓ Approve'}
        </button>
      </div>
    </div>
  )
}