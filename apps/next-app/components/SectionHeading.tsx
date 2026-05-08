export default function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span aria-hidden="true" className="font-mono text-sm select-none" style={{ color: 'var(--color-accent)' }}>
        {'//'}
      </span>
      <h2
        className="font-mono text-xs font-medium tracking-widest uppercase whitespace-nowrap"
        style={{ color: 'var(--color-muted)' }}
      >
        {label}
      </h2>
      <div aria-hidden="true" className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
    </div>
  )
}
