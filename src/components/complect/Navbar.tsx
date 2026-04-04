import { useTheme } from './ThemeProvider'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface NavbarProps {
  user?: { name: string; email: string; role: string } | null
  workspaceName?: string | null
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link to={href} className="text-[13px] text-[var(--ink3)] px-3 py-2 rounded hover:text-[var(--ink)] hover:bg-[var(--bg2)] transition-colors font-syne font-medium">
      {children}
    </Link>
  )
}

export function Navbar({ user, workspaceName }: NavbarProps) {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      navigate('/')
    } catch {
      toast.error('Sign out failed')
      setSigningOut(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--rule)] bg-[var(--bg)]/90 backdrop-blur-md transition-colors duration-300">
      <nav className="max-w-[1120px] mx-auto px-10 h-14 flex items-center justify-between gap-6">

        {/* Wordmark */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 flex-shrink-0">
          <span className="font-syne font-bold text-[17px] tracking-tight text-[var(--ink)]">Complect</span>
          {!user && (
            <span className="font-mono text-[9px] tracking-widest text-[var(--green)] bg-[var(--green-bg)] border border-[var(--green-rule)] px-1.5 py-0.5 rounded-[2px] uppercase">
              Beta
            </span>
          )}
          {user && workspaceName && (
            <span className="font-mono text-[10px] text-[var(--ink4)] hidden sm:block">/ {workspaceName}</span>
          )}
        </Link>

        {/* Authenticated nav */}
        {user && (
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/dashboard/billing">Billing</NavLink>
            {user.role === 'ADMIN' && <NavLink href="/admin/leads">Admin</NavLink>}
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button onClick={toggle} title="Toggle theme"
            className="w-11 h-6 rounded-full border border-[var(--rule2)] bg-[var(--bg3)] relative hover:border-[var(--ink4)] flex-shrink-0 transition-colors">
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-[var(--bg)] shadow-sm flex items-center justify-center text-[10px] transition-all duration-300 ${theme === 'dark' ? 'left-[22px]' : 'left-0.5'}`}>
              {theme === 'dark' ? '☾' : '☀'}
            </div>
          </button>

          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center font-mono text-[10px] flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <span className="text-[12px] text-[var(--ink3)] font-mono truncate max-w-[120px]">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="text-[12px] text-[var(--ink4)] border border-[var(--rule)] px-3 py-1.5 rounded hover:text-[var(--ink)] hover:bg-[var(--bg2)] transition-colors font-mono"
              >
                {signingOut ? '…' : 'Sign out'}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[13px] text-[var(--ink3)] border border-[var(--rule2)] px-3 py-2 rounded hover:bg-[var(--bg2)] hover:text-[var(--ink)] transition-colors font-syne font-medium bg-[var(--bg)]">Sign in</Link>
              <Link to="/signup" className="text-[13px] bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] px-3 py-2 rounded hover:opacity-80 transition-opacity font-syne font-medium">Get started</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
