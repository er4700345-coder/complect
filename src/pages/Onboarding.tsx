import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Field, Input, Select } from '@/components/complect/ui'
import toast from 'react-hot-toast'

const FRAMEWORKS = ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'PCI DSS', 'NIST CSF', 'FedRAMP', 'CAIQ']
const TEAM_SIZES = [
  { value: 'SOLO', label: 'Just me' },
  { value: 'SMALL', label: '2–10 people' },
  { value: 'MEDIUM', label: '11–50 people' },
  { value: 'LARGE', label: '51–200 people' },
  { value: 'ENTERPRISE', label: '200+ people' },
]
const USE_CASES = [
  'Answering vendor security questionnaires',
  'Preparing for SOC 2 audit',
  'GDPR compliance documentation',
  'Enterprise deal compliance acceleration',
  'Building internal compliance program',
  'Ongoing compliance maintenance',
]

type Step = 'company' | 'role' | 'compliance' | 'done'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('company')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [data, setData] = useState({
    companyName: '',
    companyWebsite: '',
    role: '',
    teamSize: '',
    primaryUseCase: '',
    complianceNeeds: [] as string[],
    sellingToEnterprise: false,
  })

  function set(k: string, v: any) {
    setData(d => ({ ...d, [k]: v }))
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  function toggleFramework(fw: string) {
    set('complianceNeeds', data.complianceNeeds.includes(fw)
      ? data.complianceNeeds.filter(f => f !== fw)
      : [...data.complianceNeeds, fw])
  }

  function validateStep(): boolean {
    const errs: Record<string, string> = {}
    if (step === 'company') {
      if (!data.companyName) errs.companyName = 'Company name required'
    }
    if (step === 'role') {
      if (!data.role) errs.role = 'Role required'
      if (!data.teamSize) errs.teamSize = 'Team size required'
      if (!data.primaryUseCase) errs.primaryUseCase = 'Select a primary use case'
    }
    if (step === 'compliance') {
      if (data.complianceNeeds.length === 0) errs.complianceNeeds = 'Select at least one framework'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() {
    if (!validateStep()) return
    const flow: Step[] = ['company', 'role', 'compliance', 'done']
    const idx = flow.indexOf(step)
    setStep(flow[idx + 1])
  }

  async function submit() {
    if (!validateStep()) return
    setLoading(true)
    try {
      const res = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        if (json.issues) {
          const flat: Record<string, string> = {}
          Object.entries(json.issues).forEach(([k, v]) => { flat[k] = (v as string[])[0] })
          setErrors(flat)
          setStep('company')
        } else {
          toast.error(json.error ?? 'Setup failed')
        }
        return
      }
      navigate(json.redirectTo ?? '/dashboard')
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const steps: Step[] = ['company', 'role', 'compliance', 'done']
  const stepIdx = steps.indexOf(step)
  const progress = ((stepIdx) / (steps.length - 1)) * 100

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-px bg-[var(--rule)]">
        <div
          className="h-full bg-[var(--ink)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[520px]">

          {/* Header */}
          <div className="mb-10">
            <div className="font-syne font-bold text-[17px] tracking-tight text-[var(--ink)] mb-6">Complect</div>
            <div className="flex items-center gap-2 mb-4">
              {steps.slice(0, -1).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-colors ${i < stepIdx ? 'bg-[var(--ink)]' : i === stepIdx ? 'bg-[var(--ink)] ring-2 ring-[var(--ink)]/20' : 'bg-[var(--rule2)]'}`} />
                  {i < 2 && <div className={`w-8 h-px ${i < stepIdx ? 'bg-[var(--ink)]' : 'bg-[var(--rule)]'}`} />}
                </div>
              ))}
            </div>
            <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase">
              Step {stepIdx + 1} of {steps.length - 1}
            </div>
          </div>

          {/* STEP: Company */}
          {step === 'company' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-syne font-bold text-[28px] tracking-tight text-[var(--ink)] mb-2">Your company</h2>
                <p className="text-[14px] text-[var(--ink3)] font-light">This creates your Complect workspace.</p>
              </div>
              <div className="space-y-4">
                <Field label="Company name" error={errors.companyName}>
                  <Input placeholder="Acme Inc." value={data.companyName} onChange={e => set('companyName', e.target.value)} error={errors.companyName} autoFocus />
                </Field>
                <Field label="Company website (optional)">
                  <Input type="url" placeholder="https://acme.com" value={data.companyWebsite} onChange={e => set('companyWebsite', e.target.value)} />
                </Field>
              </div>
              <Button size="lg" onClick={next} className="w-full">Continue →</Button>
            </div>
          )}

          {/* STEP: Role */}
          {step === 'role' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-syne font-bold text-[28px] tracking-tight text-[var(--ink)] mb-2">Your role</h2>
                <p className="text-[14px] text-[var(--ink3)] font-light">Helps us tailor the experience for you.</p>
              </div>
              <div className="space-y-4">
                <Field label="Job title / role" error={errors.role}>
                  <Input placeholder="e.g. CTO, Head of Security, Founder" value={data.role} onChange={e => set('role', e.target.value)} error={errors.role} autoFocus />
                </Field>
                <Field label="Team size" error={errors.teamSize}>
                  <Select value={data.teamSize} onChange={e => set('teamSize', e.target.value)} error={errors.teamSize}>
                    <option value="">Select team size…</option>
                    {TEAM_SIZES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </Select>
                </Field>
                <Field label="Primary use case" error={errors.primaryUseCase}>
                  <Select value={data.primaryUseCase} onChange={e => set('primaryUseCase', e.target.value)} error={errors.primaryUseCase}>
                    <option value="">What brings you to Complect?</option>
                    {USE_CASES.map(u => <option key={u} value={u}>{u}</option>)}
                  </Select>
                </Field>
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="ste"
                    checked={data.sellingToEnterprise}
                    onChange={e => set('sellingToEnterprise', e.target.checked)}
                    className="mt-0.5 accent-[var(--ink)] cursor-pointer"
                  />
                  <label htmlFor="ste" className="text-[13px] text-[var(--ink3)] font-light cursor-pointer leading-relaxed">
                    We're actively selling into enterprise and have deals in security review
                  </label>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep('company')} className="flex-1">← Back</Button>
                <Button size="lg" onClick={next} className="flex-1">Continue →</Button>
              </div>
            </div>
          )}

          {/* STEP: Compliance needs */}
          {step === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-syne font-bold text-[28px] tracking-tight text-[var(--ink)] mb-2">Compliance frameworks</h2>
                <p className="text-[14px] text-[var(--ink3)] font-light">Which frameworks are relevant to your work?</p>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-2">
                  {FRAMEWORKS.map(fw => {
                    const active = data.complianceNeeds.includes(fw)
                    return (
                      <button
                        key={fw}
                        type="button"
                        onClick={() => toggleFramework(fw)}
                        className={`text-left px-4 py-3 rounded border transition-all font-mono text-[12px] tracking-wide ${
                          active
                            ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                            : 'bg-[var(--bg2)] text-[var(--ink3)] border-[var(--rule)] hover:border-[var(--ink4)]'
                        }`}
                      >
                        {fw}
                      </button>
                    )
                  })}
                </div>
                {errors.complianceNeeds && (
                  <p className="mt-2 text-[11px] text-[var(--red)] font-mono">{errors.complianceNeeds}</p>
                )}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep('role')} className="flex-1">← Back</Button>
                <Button size="lg" onClick={submit} loading={loading} className="flex-1">
                  {loading ? 'Setting up…' : 'Complete setup →'}
                </Button>
              </div>
            </div>
          )}

          {/* STEP: Done */}
          {step === 'done' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[var(--green-bg)] border border-[var(--green-rule)] flex items-center justify-center text-[var(--green)] text-2xl mx-auto mb-6">✓</div>
              <h2 className="font-syne font-bold text-[28px] tracking-tight text-[var(--ink)] mb-3">You're all set.</h2>
              <p className="text-[14px] text-[var(--ink3)] font-light mb-8 max-w-sm mx-auto">
                Your workspace is ready. Upload your first security questionnaire to get started.
              </p>
              <Button size="lg" onClick={() => navigate('/dashboard')}>Go to dashboard →</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
