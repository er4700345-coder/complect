import { useState, useEffect } from 'react'
import { useTheme } from '@/components/complect/ThemeProvider'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

type ModalType = 'pilot' | 'demo' | null

export default function LandingPage() {
  const { theme, toggle } = useTheme()
  const [modal, setModal] = useState<ModalType>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.07 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* ── NAV ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-[var(--rule)]' : ''} bg-[var(--bg)]/90 backdrop-blur-md`}>
        <nav className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-10 h-14 flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="font-syne font-bold text-[17px] tracking-tight text-[var(--ink)]">Complect</span>
            <span className="font-mono text-[9px] tracking-widest text-[var(--green)] bg-[var(--green-bg)] border border-[var(--green-rule)] px-1.5 py-0.5 rounded-[2px] uppercase">Beta</span>
          </div>

          <div className="hidden md:flex items-center border-l border-r border-[var(--rule)]">
            {[['#problem','Problem'],['#how','How it works'],['#pricing','Pricing'],['#customers','Customers']].map(([href, label]) => (
              <a key={href} href={href} className="text-[13px] text-[var(--ink3)] px-5 h-14 flex items-center border-r border-[var(--rule)] last:border-r-0 hover:text-[var(--ink)] hover:bg-[var(--bg2)] transition-colors">{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button onClick={toggle} title="Toggle theme"
              className="w-11 h-6 rounded-full border border-[var(--rule2)] bg-[var(--bg3)] relative hover:border-[var(--ink4)] flex-shrink-0 transition-colors">
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-[var(--bg)] shadow-sm flex items-center justify-center text-[10px] transition-all duration-300 ${theme === 'dark' ? 'left-[22px]' : 'left-0.5'}`}>
                {theme === 'dark' ? '☾' : '☀'}
              </div>
            </button>
            <Link to="/login" className="hidden sm:inline-flex text-[13px] text-[var(--ink3)] border border-[var(--rule2)] px-3 py-2 rounded hover:bg-[var(--bg2)] hover:text-[var(--ink)] transition-colors font-syne font-medium bg-[var(--bg)]">Sign in</Link>
            <button onClick={() => setModal('demo')} className="text-[13px] bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] px-3 py-2 rounded hover:opacity-80 transition-opacity font-syne font-medium">Book demo</button>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="pt-14 border-b border-[var(--rule)]">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1120px] mx-auto border-l border-r border-[var(--rule)] md:min-h-[calc(100vh-56px)]">
          <div className="px-5 sm:px-8 md:px-10 py-12 md:py-20 border-b md:border-b-0 md:border-r border-[var(--rule)] flex flex-col justify-center">
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[var(--rule2)]" />
              <span className="font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase">Security Questionnaire Intelligence</span>
            </div>
            <h1 className="reveal font-syne font-extrabold leading-[1.0] tracking-tight text-[var(--ink)] mb-6" style={{fontSize:'clamp(42px,5.5vw,68px)'}}>
              Stop losing<br/>enterprise deals<br/><span className="italic font-light text-[var(--ink3)]" style={{fontFamily:'Libre Franklin, serif'}}>to security review</span>
            </h1>
            <p className="reveal text-[15px] text-[var(--ink3)] leading-relaxed font-light max-w-[440px] mb-10">
              Complect drafts accurate, evidence-backed answers to SOC 2, GDPR, and vendor security questionnaires using your own documentation — in minutes, not weeks.
            </p>
            <div className="reveal flex flex-col sm:flex-row sm:items-center gap-3 mb-10 md:mb-14">
              <button onClick={() => setModal('demo')} className="font-syne font-medium text-[15px] bg-[var(--ink)] text-[var(--bg)] px-6 py-3 rounded-lg hover:opacity-80 transition-opacity min-h-[48px] w-full sm:w-auto">Book a demo</button>
              <button onClick={() => setModal('pilot')} className="font-syne font-medium text-[15px] border border-[var(--rule2)] text-[var(--ink2)] px-6 py-3 rounded-lg hover:bg-[var(--bg2)] hover:border-[var(--ink3)] transition-all min-h-[48px] w-full sm:w-auto">Request pilot →</button>
            </div>
            <div className="reveal grid grid-cols-3 border-t border-[var(--rule)] pt-8 gap-0">
              {[['80%','of questions answered automatically'],['3wk → 4hr','average turnaround reduction'],['$40k','saved vs. consulting fees']].map(([n,l]) => (
                <div key={n} className="pr-5 [&+&]:pl-5 [&+&]:border-l [&+&]:border-[var(--rule)]">
                  <div className="font-syne font-bold text-[22px] tracking-tight text-[var(--ink)] mb-1">{n}</div>
                  <div className="text-[12px] text-[var(--ink4)] leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live widget */}
          <div className="bg-[var(--bg2)] flex flex-col">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-[var(--rule)] bg-[var(--bg)]">
              <span className="font-mono text-[11px] text-[var(--ink4)]">acme-vendor-security-q4.pdf — 247 questions</span>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--green)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />ANALYZING
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
              {DEMO_QUESTIONS.map(q => <QCard key={q.id} {...q} />)}
            </div>
            <div className="border-t border-[var(--rule)] px-6 py-3.5 bg-[var(--bg)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-24 h-[3px] bg-[var(--rule)] rounded overflow-hidden">
                  <div className="h-full w-4/5 bg-[var(--green)] rounded animate-[grow_2.5s_ease_forwards]" />
                </div>
                <span className="font-mono text-[10px] text-[var(--ink4)]">198 / 247 answered</span>
              </div>
              <span className="font-mono text-[11px] text-[var(--green)]">↓ Export draft</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" className="border-b border-[var(--rule)]">
        <div className="max-w-[1120px] mx-auto border-l border-r border-[var(--rule)]">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 px-5 sm:px-8 md:px-10 py-10 md:py-16 border-b border-[var(--rule)]">
            <div className="reveal font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase pt-1">The problem</div>
            <div className="reveal">
              <h2 className="font-syne font-bold tracking-tight text-[var(--ink)] mb-4" style={{fontSize:'clamp(28px,3.5vw,44px)',lineHeight:1.08}}>
                Compliance is a <span className="italic font-light text-[var(--ink3)]" style={{fontFamily:'Libre Franklin,serif'}}>deal-killing bottleneck</span>
              </h2>
              <p className="text-[15px] text-[var(--ink3)] leading-relaxed font-light max-w-[560px]">Enterprise procurement now requires exhaustive security reviews at every stage. Most teams lack bandwidth to respond accurately — and lose deals while the queue grows.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              ['01/03','3–6wk','Average questionnaire turnaround','Your engineering lead spends weeks hunting documentation, writing answers from scratch, and chasing stakeholders — for every single enterprise deal.'],
              ['02/03','$40k','Average SOC 2 readiness consulting cost','Compliance firms charge $15,000–$60,000 to prepare for a single audit. That budget disappears before your first paying enterprise customer.'],
              ['03/03','68%','Enterprise deals delayed by security review','Security assessment is the #1 enterprise procurement bottleneck. Incomplete answers stall pipelines for months — or kill deals entirely.'],
            ].map(([idx,num,title,desc]) => (
              <div key={idx} className="reveal px-5 sm:px-8 md:px-10 py-8 md:py-10 border-b md:border-b-0 md:border-r border-[var(--rule)] last:border-r-0 last:border-b-0 hover:bg-[var(--bg2)] transition-colors">
                <div className="font-mono text-[10px] text-[var(--ink4)] mb-8">{idx}</div>
                <div className="font-syne font-extrabold text-[var(--ink)] mb-2" style={{fontSize:'52px',letterSpacing:'-0.04em',lineHeight:1}}>{num}</div>
                <div className="font-syne font-semibold text-[14px] text-[var(--ink)] mb-3">{title}</div>
                <p className="text-[13px] text-[var(--ink3)] font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="border-b border-[var(--rule)]">
        <div className="max-w-[1120px] mx-auto border-l border-r border-[var(--rule)]">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 px-5 sm:px-8 md:px-10 py-10 md:py-16 border-b border-[var(--rule)]">
            <div className="reveal font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase pt-1">How it works</div>
            <div className="reveal">
              <h2 className="font-syne font-bold tracking-tight text-[var(--ink)] mb-3" style={{fontSize:'clamp(28px,3.5vw,44px)',lineHeight:1.08}}>
                Three steps to <span className="italic font-light text-[var(--ink3)]" style={{fontFamily:'Libre Franklin,serif'}}>close deals faster</span>
              </h2>
              <p className="text-[15px] text-[var(--ink3)] leading-relaxed font-light">Upload your questionnaire. Get accurate, cited answers. Close the deal.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {HOW_STEPS.map(({ step, title, desc, detail }) => (
              <div key={step} className="reveal px-5 sm:px-8 md:px-10 py-8 md:py-10 border-b md:border-b-0 md:border-r border-[var(--rule)] last:border-r-0 last:border-b-0">
                <div className="font-mono text-[10px] text-[var(--ink4)] mb-6">{step}</div>
                <div className="font-syne font-bold text-[20px] tracking-tight text-[var(--ink)] mb-2">{title}</div>
                <p className="text-[13px] text-[var(--ink3)] font-light leading-relaxed mb-4">{desc}</p>
                <div className="border border-[var(--rule)] rounded p-4 bg-[var(--bg2)]">
                  <p className="font-mono text-[11px] text-[var(--ink4)] leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO ── */}
      <section className="border-b border-[var(--rule)]">
        <div className="max-w-[1120px] mx-auto border-l border-r border-[var(--rule)]">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 px-5 sm:px-8 md:px-10 py-10 md:py-16 border-b border-[var(--rule)]">
            <div className="reveal font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase pt-1">Live output</div>
            <div className="reveal">
              <h2 className="font-syne font-bold tracking-tight text-[var(--ink)] mb-3" style={{fontSize:'clamp(28px,3.5vw,44px)',lineHeight:1.08}}>
                Real answers. <span className="italic font-light text-[var(--ink3)]" style={{fontFamily:'Libre Franklin,serif'}}>Real citations.</span>
              </h2>
              <p className="text-[15px] text-[var(--ink3)] leading-relaxed font-light">Every answer includes evidence sources, confidence scoring, and gap analysis. Here's actual Complect output from a SOC 2 vendor questionnaire.</p>
            </div>
          </div>
          <div className="bg-[var(--ink)] text-white p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="font-mono text-[11px] text-white/30">enterprise-vendor-q.xlsx</div>
                <div className="flex gap-1.5">
                  {['SOC 2','GDPR','ISO 27001'].map(t => <span key={t} className="font-mono text-[9px] text-white/25 border border-white/10 px-2 py-0.5 rounded">{t}</span>)}
                </div>
              </div>
              <div className="font-mono text-[10px] text-white/30">12 of 247 shown</div>
            </div>
            <div className="space-y-3">
              {LIVE_DEMO_ITEMS.map(({ q, conf, confClass, a, sources }) => (
                <div key={q} className="reveal border border-white/[0.07] rounded overflow-hidden">
                  <div className="px-4 py-3.5 border-b border-white/[0.05] flex items-start gap-3 justify-between bg-white/[0.02]">
                    <span className="text-[12px] text-white/50 leading-relaxed font-light flex-1">{q}</span>
                    <span className={`font-mono text-[9px] px-2 py-1 rounded border flex-shrink-0 ${confClass}`}>{conf} conf.</span>
                  </div>
                  <div className="px-4 py-3.5">
                    <p className="text-[12px] text-white/70 leading-relaxed font-light mb-3">{a}</p>
                    <div className="flex gap-2 flex-wrap">
                      {sources.map(s => <span key={s} className="font-mono text-[9px] text-white/20 bg-white/[0.04] border border-white/[0.07] px-2 py-1 rounded">{s}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="border-b border-[var(--rule)]">
        <div className="max-w-[1120px] mx-auto border-l border-r border-[var(--rule)]">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 px-5 sm:px-8 md:px-10 py-10 md:py-16 border-b border-[var(--rule)]">
            <div className="reveal font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase pt-1">Pricing</div>
            <div className="reveal">
              <h2 className="font-syne font-bold tracking-tight text-[var(--ink)] mb-3" style={{fontSize:'clamp(28px,3.5vw,44px)',lineHeight:1.08}}>
                Straightforward. <span className="italic font-light text-[var(--ink3)]" style={{fontFamily:'Libre Franklin,serif'}}>No consultant markup.</span>
              </h2>
              <p className="text-[15px] text-[var(--ink3)] leading-relaxed font-light">We're in private beta. Book a call first — most teams start with a pilot agreement before committing to a plan.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {PRICING_PLANS.map(({ key, tier, name, desc, price, note, features, cta, ctaVariant }, i) => (
              <div key={key} className={`reveal px-5 sm:px-8 md:px-10 py-8 md:py-10 border-b md:border-b-0 md:border-r border-[var(--rule)] last:border-r-0 last:border-b-0 ${i===1?'bg-[var(--bg2)]':''}`}>
                <div className="font-mono text-[10px] tracking-widest text-[var(--ink4)] uppercase mb-5">{tier}</div>
                <div className="font-syne font-bold text-[20px] tracking-tight text-[var(--ink)] mb-1">{name}</div>
                <div className="text-[13px] text-[var(--ink4)] font-light mb-6">{desc}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-syne font-bold text-[var(--ink)] leading-none" style={{fontSize:'38px',letterSpacing:'-0.04em'}}>${price.toLocaleString()}</span>
                  <span className="text-[13px] text-[var(--ink4)]">/mo</span>
                </div>
                <div className="font-mono text-[10px] text-[var(--ink4)] mb-2">Billed monthly. Cancel anytime.</div>
                <div className="font-mono text-[10px] italic text-[var(--ink4)] mb-7">{note}</div>
                <div className="h-px bg-[var(--rule)] mb-6" />
                <ul className="space-y-2.5 mb-8">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-[var(--ink3)] font-light">
                      <span className="font-mono text-[var(--green)] text-[11px] mt-px flex-shrink-0">→</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setModal(key === 'enterprise' ? 'demo' : 'pilot')}
                  className={`w-full font-syne font-medium text-[13px] py-2.5 px-4 rounded transition-all ${ctaVariant==='solid'?'bg-[var(--ink)] text-[var(--bg)] hover:opacity-80':'border border-[var(--rule2)] text-[var(--ink2)] hover:bg-[var(--bg)] hover:border-[var(--ink3)]'}`}>
                  {cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="customers" className="border-b border-[var(--rule)]">
        <div className="max-w-[1120px] mx-auto border-l border-r border-[var(--rule)]">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 px-5 sm:px-8 md:px-10 py-10 md:py-16 border-b border-[var(--rule)]">
            <div className="reveal font-mono text-[11px] tracking-widest text-[var(--ink4)] uppercase pt-1">Early design partners</div>
            <div className="reveal">
              <h2 className="font-syne font-bold tracking-tight text-[var(--ink)]" style={{fontSize:'clamp(28px,3.5vw,44px)',lineHeight:1.08}}>
                Used by teams <span className="italic font-light text-[var(--ink3)]" style={{fontFamily:'Libre Franklin,serif'}}>closing enterprise deals</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {TESTIMONIALS.map(({ initials, quote, name, role }) => (
              <div key={name} className="reveal px-5 sm:px-8 md:px-10 py-8 md:py-10 border-b md:border-b-0 md:border-r border-[var(--rule)] last:border-r-0 last:border-b-0 hover:bg-[var(--bg2)] transition-colors">
                <p className="text-[14px] text-[var(--ink2)] leading-relaxed font-light mb-6" dangerouslySetInnerHTML={{ __html: quote }} />
                <div className="h-px bg-[var(--rule)] mb-5" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center font-mono text-[11px] flex-shrink-0">{initials}</div>
                  <div>
                    <div className="font-syne font-semibold text-[13px] text-[var(--ink)]">{name}</div>
                    <div className="text-[12px] text-[var(--ink4)] font-light">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="border-b border-[var(--rule)] bg-[var(--bg2)]">
        <div className="max-w-[1120px] mx-auto border-l border-r border-[var(--rule)] grid grid-cols-1 md:grid-cols-2">
          <div className="px-5 sm:px-8 md:px-10 py-10 md:py-16 border-b md:border-b-0 md:border-r border-[var(--rule)]">
            <h2 className="reveal font-syne font-bold tracking-tight text-[var(--ink)] mb-4" style={{fontSize:'clamp(30px,3.5vw,48px)',lineHeight:1.06}}>Stop letting security review stall your pipeline</h2>
            <p className="reveal text-[15px] text-[var(--ink3)] leading-relaxed font-light mb-6 max-w-[460px]">Private beta. If you have an enterprise deal currently in security review, you're exactly who we built this for.</p>
            <div className="reveal border border-[var(--rule)] rounded p-5 bg-[var(--bg)]">
              <span className="font-semibold text-[13px] text-[var(--ink)]">Early stage, honest approach: </span>
              <span className="text-[13px] text-[var(--ink3)] font-light">We're not asking you to subscribe today. Book a 30-minute call, show us your questionnaire situation, and we'll agree on a pilot. Most teams are live within a week.</span>
            </div>
          </div>
          <div className="px-5 sm:px-8 md:px-10 py-10 md:py-16">
            <InlineRequestForm onSuccess={() => toast.success('Request received — we\'ll follow up within 24 hours.')} />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--rule)] bg-[var(--bg)]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-10 py-7 border-l border-r border-[var(--rule)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-syne font-bold text-[15px] tracking-tight text-[var(--ink)]">Complect</span>
            <span className="font-mono text-[11px] text-[var(--ink4)]">© 2026 COMPLECT INC.</span>
          </div>
          <div className="flex gap-5">
            {['Privacy','Security','Terms'].map(l => <a key={l} href="#" className="text-[12px] text-[var(--ink4)] hover:text-[var(--ink)] transition-colors">{l}</a>)}
            <a href="mailto:hello@complect.io" className="text-[12px] text-[var(--ink4)] hover:text-[var(--ink)] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* ── MODALS ── */}
      {modal === 'pilot' && <PilotModal onClose={() => setModal(null)} />}
      {modal === 'demo' && <DemoModal onClose={() => setModal(null)} />}
    </div>
  )
}

// ─── DEMO QUESTION CARD ───────────────────────────────────────
function QCard({ id, q, tag, answer, cite }: { id:string;q:string;tag:'auto'|'review'|'gap';answer:string;cite:string }) {
  const tagStyle = { auto:'badge-new', review:'badge-qualified', gap:'badge-rejected' }[tag]
  const tagLabel = { auto:'Auto', review:'Review', gap:'Gap' }[tag]
  return (
    <div className="bg-[var(--bg)] border border-[var(--rule)] rounded overflow-hidden text-[12px]">
      <div className="px-4 py-3 flex items-start gap-2.5">
        <span className="font-mono text-[10px] text-[var(--ink4)] w-7 flex-shrink-0 pt-0.5">{id}</span>
        <span className="text-[var(--ink2)] leading-snug flex-1 font-normal">{q}</span>
        <span className={`badge ${tagStyle} flex-shrink-0`}>{tagLabel}</span>
      </div>
      <div className="border-t border-[var(--rule)] px-4 py-2.5 bg-[var(--bg2)] pl-11">
        <p className="text-[var(--ink3)] leading-relaxed font-light mb-1.5">{answer}</p>
        <div className="font-mono text-[10px] text-[var(--ink4)] flex items-center gap-1"><span>↑</span>{cite}</div>
      </div>
    </div>
  )
}

// ─── INLINE CTA FORM ──────────────────────────────────────────
function InlineRequestForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ fullName:'', workEmail:'', companyName:'', complianceNeed:'' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})

  function set(k:string, v:string) { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>{const n={...e};delete n[k];return n}) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string,string> = {}
    if(!form.fullName) errs.fullName = 'Required'
    if(!form.workEmail||!form.workEmail.includes('@')) errs.workEmail = 'Valid email required'
    if(!form.companyName) errs.companyName = 'Required'
    if(!form.complianceNeed) errs.complianceNeed = 'Required'
    if(Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      // For now, simulate submission since backend isn't wired yet
      await new Promise(resolve => setTimeout(resolve, 800))
      setDone(true)
      onSuccess()
    } catch { toast.error('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  if(done) return (
    <div className="h-full flex flex-col justify-center">
      <div className="border border-[var(--green-rule)] bg-[var(--green-bg)] rounded p-6">
        <div className="font-syne font-semibold text-[var(--green)] mb-2">Request received.</div>
        <div className="text-[13px] text-[var(--ink3)] font-light">We'll follow up within 24 hours with next steps.</div>
      </div>
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-3.5">
      {[
        { k:'fullName', label:'Full name', ph:'Jane Smith', type:'text' },
        { k:'workEmail', label:'Work email', ph:'jane@company.com', type:'email' },
        { k:'companyName', label:'Company', ph:'Acme Inc.', type:'text' },
        { k:'complianceNeed', label:'Current compliance situation', ph:'e.g. SOC 2 questionnaire due Friday…', type:'text' },
      ].map(({ k, label, ph, type }) => (
        <div key={k}>
          <label className="field-label">{label}</label>
          <input type={type} value={(form as any)[k]} onChange={e => set(k, e.target.value)} placeholder={ph}
            className={`field-input text-[13px] ${errors[k] ? 'error' : ''}`} />
          {errors[k] && <p className="mt-1 text-[11px] text-[var(--red)] font-mono">{errors[k]}</p>}
        </div>
      ))}
      <button type="submit" disabled={loading}
        className="w-full font-syne font-medium text-[14px] bg-[var(--ink)] text-[var(--bg)] py-3 rounded hover:opacity-80 transition-opacity disabled:opacity-50 mt-2">
        {loading ? 'Sending…' : 'Book a 30-minute demo →'}
      </button>
      <p className="font-mono text-[10px] text-[var(--ink4)] text-center">No commitment. No credit card. Reply within 24 hours.</p>
    </form>
  )
}

// ─── PILOT MODAL ─────────────────────────────────────────────
function PilotModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    fullName:'', workEmail:'', companyName:'', companyWebsite:'',
    role:'', teamSize:'SMALL', complianceNeed:'', questionnairesPerMonth:'',
    bottleneck:'', urgency:'THIS_WEEK', notes:''
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})

  function set(k:string, v:string) { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>{const n={...e};delete n[k];return n}) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string,string> = {}
    if(!form.fullName) errs.fullName = 'Required'
    if(!form.workEmail||!form.workEmail.includes('@')) errs.workEmail = 'Valid email required'
    if(!form.companyName) errs.companyName = 'Required'
    if(!form.role) errs.role = 'Required'
    if(!form.complianceNeed || form.complianceNeed.length < 10) errs.complianceNeed = 'Please describe your situation (min 10 chars)'
    if(Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setDone(true)
    } catch { toast.error('Network error. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <Modal onClose={onClose} title="Request a pilot" sub="Tell us about your compliance situation. We'll follow up within 24 hours.">
      {done ? (
        <div className="p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--green-bg)] border border-[var(--green-rule)] flex items-center justify-center text-[var(--green)] text-xl mx-auto mb-4">✓</div>
          <div className="font-syne font-bold text-[18px] tracking-tight text-[var(--ink)] mb-2">Request received.</div>
          <p className="text-[13px] text-[var(--ink3)] font-light leading-relaxed">We'll reach out within 24 hours. If you have a questionnaire due urgently, reply to our email and we'll prioritize.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MField label="Full name" error={errors.fullName}><input className={`field-input text-[13px] ${errors.fullName?'error':''}`} placeholder="Jane Smith" value={form.fullName} onChange={e=>set('fullName',e.target.value)} /></MField>
            <MField label="Work email" error={errors.workEmail}><input type="email" className={`field-input text-[13px] ${errors.workEmail?'error':''}`} placeholder="jane@company.com" value={form.workEmail} onChange={e=>set('workEmail',e.target.value)} /></MField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Company" error={errors.companyName}><input className={`field-input text-[13px] ${errors.companyName?'error':''}`} placeholder="Acme Inc." value={form.companyName} onChange={e=>set('companyName',e.target.value)} /></MField>
            <MField label="Website (optional)"><input type="url" className="field-input text-[13px]" placeholder="https://acme.com" value={form.companyWebsite} onChange={e=>set('companyWebsite',e.target.value)} /></MField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Your role" error={errors.role}><input className={`field-input text-[13px] ${errors.role?'error':''}`} placeholder="CTO / Founder / Head of Security" value={form.role} onChange={e=>set('role',e.target.value)} /></MField>
            <MField label="Team size">
              <select className="field-input text-[13px]" value={form.teamSize} onChange={e=>set('teamSize',e.target.value)}>
                {[['SOLO','Just me'],['SMALL','2–10'],['MEDIUM','11–50'],['LARGE','51–200'],['ENTERPRISE','200+']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
              </select>
            </MField>
          </div>
          <MField label="Current compliance situation" error={errors.complianceNeed}>
            <textarea className={`field-input text-[13px] resize-none ${errors.complianceNeed?'error':''}`} rows={3} placeholder="e.g. SOC 2 vendor questionnaire due in 48 hours, GDPR audit next month…" value={form.complianceNeed} onChange={e=>set('complianceNeed',e.target.value)} />
          </MField>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Questionnaires per month">
              <input type="number" min="0" className="field-input text-[13px]" placeholder="e.g. 3" value={form.questionnairesPerMonth} onChange={e=>set('questionnairesPerMonth',e.target.value)} />
            </MField>
            <MField label="Urgency">
              <select className="field-input text-[13px]" value={form.urgency} onChange={e=>set('urgency',e.target.value)}>
                {[['IMMEDIATE','< 48 hours'],['THIS_WEEK','This week'],['THIS_MONTH','This month'],['EXPLORING','Just exploring']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
              </select>
            </MField>
          </div>
          <MField label="Biggest bottleneck (optional)">
            <input className="field-input text-[13px]" placeholder="e.g. Don't have documentation, questionnaire too complex…" value={form.bottleneck} onChange={e=>set('bottleneck',e.target.value)} />
          </MField>
          <button type="submit" disabled={loading}
            className="w-full font-syne font-medium text-[14px] bg-[var(--ink)] text-[var(--bg)] py-3 rounded hover:opacity-80 transition-opacity disabled:opacity-50">
            {loading ? 'Submitting…' : 'Submit pilot request →'}
          </button>
        </form>
      )}
    </Modal>
  )
}

// ─── DEMO MODAL ──────────────────────────────────────────────
function DemoModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ fullName:'', workEmail:'', companyName:'', timeframe:'This week', demoFocus:'', notes:'' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})

  function set(k:string, v:string) { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>{const n={...e};delete n[k];return n}) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string,string> = {}
    if(!form.fullName) errs.fullName = 'Required'
    if(!form.workEmail||!form.workEmail.includes('@')) errs.workEmail = 'Valid email required'
    if(!form.companyName) errs.companyName = 'Required'
    if(!form.demoFocus||form.demoFocus.length<10) errs.demoFocus = 'Tell us what you want to see (min 10 chars)'
    if(Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setDone(true)
    } catch { toast.error('Network error. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <Modal onClose={onClose} title="Book a demo" sub="30 minutes. We'll walk through your specific situation and set up a pilot.">
      {done ? (
        <div className="p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--green-bg)] border border-[var(--green-rule)] flex items-center justify-center text-[var(--green)] text-xl mx-auto mb-4">✓</div>
          <div className="font-syne font-bold text-[18px] tracking-tight text-[var(--ink)] mb-2">Request received.</div>
          <p className="text-[13px] text-[var(--ink3)] font-light leading-relaxed">We'll follow up within 24 hours to confirm your demo slot.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MField label="Full name" error={errors.fullName}><input className={`field-input text-[13px] ${errors.fullName?'error':''}`} placeholder="Jane Smith" value={form.fullName} onChange={e=>set('fullName',e.target.value)} autoFocus /></MField>
            <MField label="Work email" error={errors.workEmail}><input type="email" className={`field-input text-[13px] ${errors.workEmail?'error':''}`} placeholder="jane@company.com" value={form.workEmail} onChange={e=>set('workEmail',e.target.value)} /></MField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Company" error={errors.companyName}><input className={`field-input text-[13px] ${errors.companyName?'error':''}`} placeholder="Acme Inc." value={form.companyName} onChange={e=>set('companyName',e.target.value)} /></MField>
            <MField label="Preferred timeframe">
              <select className="field-input text-[13px]" value={form.timeframe} onChange={e=>set('timeframe',e.target.value)}>
                {['This week','Next week','Within 2 weeks','This month','Flexible'].map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </MField>
          </div>
          <MField label="What do you want to see?" error={errors.demoFocus}>
            <textarea className={`field-input text-[13px] resize-none ${errors.demoFocus?'error':''}`} rows={3} placeholder="e.g. How you handle SOC 2 questionnaires, policy generation, the evidence citation system…" value={form.demoFocus} onChange={e=>set('demoFocus',e.target.value)} />
          </MField>
          <MField label="Anything else?">
            <input className="field-input text-[13px]" placeholder="Optional notes…" value={form.notes} onChange={e=>set('notes',e.target.value)} />
          </MField>
          <button type="submit" disabled={loading}
            className="w-full font-syne font-medium text-[14px] bg-[var(--ink)] text-[var(--bg)] py-3 rounded hover:opacity-80 transition-opacity disabled:opacity-50">
            {loading ? 'Sending…' : 'Submit request →'}
          </button>
        </form>
      )}
    </Modal>
  )
}

// ─── MODAL WRAPPER ───────────────────────────────────────────
function Modal({ onClose, title, sub, children }: { onClose:()=>void;title:string;sub:string;children:React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={e=>{ if(e.target===e.currentTarget)onClose() }}>
      <div className="absolute inset-0 bg-[var(--ink)]/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[var(--bg)] border border-[var(--rule2)] rounded-[6px] w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-[var(--rule)]">
          <div>
            <h3 className="font-syne font-bold text-[20px] tracking-tight text-[var(--ink)] mb-1">{title}</h3>
            <p className="text-[13px] text-[var(--ink3)] font-light">{sub}</p>
          </div>
          <button onClick={onClose} className="text-[var(--ink4)] hover:text-[var(--ink)] text-xl leading-none p-1 transition-colors mt-[-2px]">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function MField({ label, error, children }: { label:string;error?:string;children:React.ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] text-[var(--red)] font-mono">{error}</p>}
    </div>
  )
}

// ─── STATIC DATA ─────────────────────────────────────────────
const DEMO_QUESTIONS = [
  { id:'Q.01', q:'Does your organization maintain a formal Information Security Policy reviewed annually?', tag:'auto' as const, answer:'Yes. ISP-001 (v3.2) approved by executive leadership. Last reviewed March 2026.', cite:'ISP-001.pdf · §2.1 · Confidence 97%' },
  { id:'Q.02', q:'Describe your access control procedures for privileged accounts, including MFA requirements.', tag:'auto' as const, answer:'Privileged access via HashiCorp Vault with mandatory FIDO2 MFA. Quarterly access reviews. Sessions logged 12 months.', cite:'Access-Control-Policy.pdf · §4.3 · Confidence 94%' },
  { id:'Q.03', q:'Provide your incident response procedure including RTO and RPO targets for critical systems.', tag:'review' as const, answer:'IRP-002 defines 4hr RTO for Tier-1. RPO targets require manual verification before submission.', cite:'IRP-002.pdf · §6 · Confidence 71% — verify before submitting' },
  { id:'Q.04', q:'Do you have a formal Vendor Risk Management program with documented third-party assessments?', tag:'gap' as const, answer:'No VRM policy found. Complect generated draft VRM-Draft-001.docx — review and approve before answering.', cite:'Generated: VRM-Draft-001.docx · Action required' },
]

const HOW_STEPS = [
  { step:'01', title:'Upload your questionnaire', desc:'Drop in any vendor security questionnaire — PDF, XLSX, DOCX. Complect parses every question and maps it to compliance frameworks automatically.', detail:'Supports SOC 2, ISO 27001, GDPR, HIPAA, PCI DSS, NIST CSF, FedRAMP, CAIQ, and custom frameworks.' },
  { step:'02', title:'AI drafts evidence-backed answers', desc:'Complect searches your uploaded documentation — policies, SOC reports, previous questionnaires — and drafts answers with source citations and confidence scores.', detail:'Each answer shows: source document, section reference, confidence score, and whether it needs human review.' },
  { step:'03', title:'Review, approve, and export', desc:'Review flagged answers, fill gaps with generated policy drafts, and export the completed questionnaire in the original format — ready to send.', detail:'Exports to XLSX, PDF, and DOCX. Approval workflows and audit trail included on Growth and Scale plans.' },
]

const LIVE_DEMO_ITEMS = [
  { q:'Does your organization have a formal change management process?', conf:'96%', confClass:'text-green-400 border-green-400/20', a:'Yes. CM-POL-003 defines our formal change management process including change advisory board (CAB) review for production deployments, automated CI/CD pipeline controls, and rollback procedures.', sources:['CM-POL-003.pdf §2','CI-CD-Runbook.md §4.1','SOC2-Evidence-Pack.zip'] },
  { q:'Describe your data encryption standards for data at rest and in transit.', conf:'94%', confClass:'text-green-400 border-green-400/20', a:'All data at rest encrypted with AES-256. Data in transit protected by TLS 1.3 minimum. Key management via AWS KMS with automatic rotation every 90 days.', sources:['Encryption-Policy.pdf §3','AWS-Architecture.pdf §7.2'] },
  { q:'What is your employee security training frequency and coverage?', conf:'67%', confClass:'text-amber-400 border-amber-400/20', a:'Annual security awareness training mandatory for all employees. Quarterly phishing simulations. However, completion rate for Q3 2024 requires verification — last confirmed at 94%.', sources:['Training-Policy.pdf §2','HR-Compliance-Report.xlsx'] },
]

const PRICING_PLANS = [
  { key:'pilot', tier:'Starter', name:'Solo', desc:'For founders answering occasional questionnaires', price:499, note:'Pilot pricing available — book a call first', features:['5 questionnaire analyses/month','SOC 2 + GDPR coverage','Evidence citations per answer','3 policy drafts/month','Export to PDF and DOCX','Email support'], cta:'Book a call', ctaVariant:'outline' },
  { key:'growth', tier:'Most popular', name:'Growth', desc:'For startups actively closing enterprise deals', price:1500, note:'First 30 days free for design partners', features:['Unlimited questionnaire analyses','All frameworks incl. ISO 27001 + HIPAA','Full policy library generation','Compliance readiness dashboard','Answer reuse across questionnaires','Approval workflows + audit trail','Priority support (8hr SLA)'], cta:'Book a call', ctaVariant:'solid' },
  { key:'enterprise', tier:'Enterprise', name:'Scale', desc:'For teams needing custom frameworks and SSO', price:3500, note:'Custom contracts available', features:['Everything in Growth','Custom framework ingestion','SSO / SAML integration','Custom data residency region','Dedicated compliance specialist','4hr response SLA','MSA + DPA on request'], cta:'Talk to sales', ctaVariant:'outline' },
]

const TESTIMONIALS = [
  { initials:'JK', quote:'A Tier-1 bank sent us a 210-question vendor questionnaire with a 48-hour deadline. Complect drafted <strong>186 answers with source citations</strong> in under 30 minutes. We closed the deal.', name:'James K.', role:'CTO · Series A SaaS · San Francisco' },
  { initials:'SR', quote:'We were quoted $38,000 by a compliance firm for SOC 2 readiness. Complect identified our gaps and generated the missing policies. <strong>Total cost: one month on the Growth plan.</strong>', name:'Sophie R.', role:'CEO · B2B Fintech · London' },
  { initials:'AM', quote:'Gap analysis found we had no Vendor Risk Management policy — one week before our enterprise security review. <strong>Complect generated a complete draft in minutes.</strong> We submitted it. We passed.', name:'Arjun M.', role:'Head of Security · Seed Stage · Berlin' },
]
