import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Input, Field } from '@/components/complect/ui'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function set(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name || form.name.length < 2) errs.name = 'Full name required'
    if (!form.email) errs.email = 'Work email required'
    if (!form.password || form.password.length < 8) errs.password = 'Min 8 characters required'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.issues) {
          const flat: Record<string, string> = {}
          Object.entries(data.issues).forEach(([k, v]) => {
            flat[k] = (v as string[])[0]
          })
          setErrors(flat)
        } else {
          toast.error(data.error ?? 'Signup failed')
        }
        return
      }
      toast.success('Account created!')
      navigate(data.redirectTo ?? '/onboarding')
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = form.password.length === 0 ? 0
    : form.password.length < 8 ? 1
    : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password) ? 3 : 2

  const strengthLabel = ['', 'Too short', 'Fair', 'Strong']
  const strengthColor = ['', 'bg-[var(--red)]', 'bg-[var(--amber)]', 'bg-[var(--green)]']

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left — branding */}
      <div className="hidden lg:flex w-[480px] flex-shrink-0 bg-[var(--ink)] flex-col justify-between p-12">
        <div>
          <div className="font-syne font-bold text-[18px] text-white tracking-tight mb-12">Complect</div>
          <h2 className="font-syne font-bold text-[36px] leading-[1.05] tracking-tight text-white mb-4">
            Answer your next<br/>vendor security<br/>review in hours.
          </h2>
          <p className="text-[15px] text-white/50 leading-relaxed font-light max-w-sm">
            Private beta. We're working with a small group of teams. Join the queue and we'll get you set up quickly.
          </p>
        </div>
        <div className="border border-white/10 rounded p-5">
          <div className="font-mono text-[10px] tracking-widest text-white/25 uppercase mb-3">Currently in beta</div>
          <p className="text-[13px] text-white/50 font-light leading-relaxed">
            If you have an active security questionnaire due urgently, reply to your welcome email and we'll prioritize your onboarding.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <div className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase mb-3">Create account</div>
            <h1 className="font-syne font-bold text-[28px] tracking-tight text-[var(--ink)] mb-2">Get started</h1>
            <p className="text-[14px] text-[var(--ink3)] font-light">
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--ink)] underline underline-offset-2">Sign in</Link>
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field label="Full name" error={errors.name}>
              <Input placeholder="Jane Smith" value={form.name} onChange={e => set('name', e.target.value)} error={errors.name} autoFocus autoComplete="name" />
            </Field>
            <Field label="Work email" error={errors.email}>
              <Input type="email" placeholder="jane@company.com" value={form.email} onChange={e => set('email', e.target.value)} error={errors.email} autoComplete="email" />
            </Field>
            <div>
              <Field label="Password" error={errors.password}>
                <Input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} error={errors.password} autoComplete="new-password" />
              </Field>
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-0.5 flex-1 rounded transition-colors ${i <= passwordStrength ? strengthColor[passwordStrength] : 'bg-[var(--rule)]'}`} />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-[var(--ink4)]">{strengthLabel[passwordStrength]}</span>
                </div>
              )}
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              {loading ? 'Creating account…' : 'Create account →'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--rule)]">
            <p className="text-[12px] text-[var(--ink4)] font-mono text-center leading-relaxed">
              By creating an account you agree to our{' '}
              <a href="#" className="text-[var(--ink3)] underline">Terms of Service</a>{' '}and{' '}
              <a href="#" className="text-[var(--ink3)] underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
