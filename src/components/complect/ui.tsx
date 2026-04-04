import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react'

// ─── BUTTON ──────────────────────────────────────────────────

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', loading, children, disabled, className = '', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-syne font-medium rounded transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border'
    const variants = {
      solid: 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)] hover:opacity-80',
      outline: 'bg-[var(--bg)] text-[var(--ink2)] border-[var(--rule2)] hover:border-[var(--ink3)] hover:bg-[var(--bg2)]',
      ghost: 'bg-transparent text-[var(--ink3)] border-transparent hover:text-[var(--ink)] hover:bg-[var(--bg2)]',
    }
    const sizes = {
      sm: 'text-xs px-3 py-2 tracking-tight',
      md: 'text-[13px] px-4 py-[9px] tracking-tight',
      lg: 'text-[14px] px-6 py-[11px] -tracking-[0.01em]',
    }
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && <Spinner size={14} />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

// ─── INPUT ───────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`field-input ${error ? 'error' : ''} ${className}`}
      {...props}
    />
  )
)
Input.displayName = 'Input'

// ─── SELECT ──────────────────────────────────────────────────

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { error?: string }>(
  ({ error, className = '', children, ...props }, ref) => (
    <select
      ref={ref}
      className={`field-input cursor-pointer ${error ? 'error' : ''} ${className}`}
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239b9790' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px' }}
      {...props}
    >
      {children}
    </select>
  )
)
Select.displayName = 'Select'

// ─── TEXTAREA ────────────────────────────────────────────────

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }>(
  ({ error, className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`field-input resize-none ${error ? 'error' : ''} ${className}`}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

// ─── FIELD ───────────────────────────────────────────────────

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] text-[var(--red)] font-mono">{error}</p>}
    </div>
  )
}

// ─── SPINNER ─────────────────────────────────────────────────

export function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ─── BADGE ───────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  NEW: 'badge-new',
  REVIEWING: 'badge-reviewing',
  QUALIFIED: 'badge-qualified',
  DEMO_SCHEDULED: 'badge-demo_scheduled',
  CONVERTED: 'badge-converted',
  REJECTED: 'badge-rejected',
  ARCHIVED: 'badge-archived',
  FREE: 'badge-free',
  PILOT: 'badge-pilot',
  GROWTH: 'badge-growth',
  ENTERPRISE: 'badge-enterprise',
  TRIALING: 'badge-pilot',
  ACTIVE: 'badge-growth',
  PAST_DUE: 'badge-rejected',
  CANCELED: 'badge-archived',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`badge ${STATUS_COLORS[status] ?? 'badge-archived'}`}>
      {status.replace('_', ' ')}
    </span>
  )
}

// ─── CARD ────────────────────────────────────────────────────

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--bg)] border border-[var(--rule)] rounded-[4px] ${className}`}>
      {children}
    </div>
  )
}

// ─── DIVIDER ─────────────────────────────────────────────────

export function Divider({ className = '' }: { className?: string }) {
  return <div className={`h-px bg-[var(--rule)] ${className}`} />
}
