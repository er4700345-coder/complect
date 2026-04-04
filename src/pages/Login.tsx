import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Button, Input, Field } from '@/components/complect/ui'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const from = params.get('from') ?? '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function set(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.email) errs.email = 'Email required'
    if (!form.password) errs.password = 'Password required'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? 'Sign in failed')
        if (data.issues) setErrors(data.issues)
        return
      }
      navigate(data.redirectTo ?? from)
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex w-[480px] flex-shrink-0 bg-[var(--ink)] flex-col justify-between p-12 border-r border-[var(--rule)]">
        <div>
          <div className="font-syne font-bold text-[18px] text-white tracking-tight mb-12">Complect</div>
          <h2 className="font-syne font-bold text-[36px] leading-[1.05] tracking-tight text-white mb-4">
            Stop answering<br/>questionnaires<br/>by hand.
          </h2>
          <p className="text-[15px] text-white/50 leading-relaxed font-light max-w-sm">
            AI-powered compliance intelligence that drafts accurate, evidence-backed answers from your own documentation.
          </p>
        </div>
        <div className="space-y-4">
          {['80% of questions answered automatically', '3 weeks reduced to 4 hours', '$40k saved vs. consulting fees'].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
              <span className="text-[13px] text-white/40 font-mono">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-3">Sign in</div>
            <h1 className="font-syne font-bold text-[28px] tracking-tight text-[var(--ink)] mb-2">Welcome back</h1>
            <p className="text-[14px] text-[var(--ink3)] font-light">
              New to Complect?{' '}
              <Link to="/signup" className="text-[var(--ink)] underline underline-offset-2">Create an account</Link>
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field label="Work email" error={errors.email}>
              <Input type="email" placeholder="you@company.com" value={form.email} onChange={e => set('email', e.target.value)} error={errors.email} autoComplete="email" autoFocus />
            </Field>
            <Field label="Password" error={errors.password}>
              <Input type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} error={errors.password} autoComplete="current-password" />
            </Field>

            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              {loading ? 'Signing in…' : 'Sign in →'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--rule)]">
            <p className="text-[12px] text-[var(--ink4)] font-mono text-center">
              Enterprise SSO available on Scale plan.{' '}
              <a href="mailto:hello@complect.io" className="text-[var(--ink3)] underline">Contact us</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
