interface Props {
  bio: string
}

export default function BioSection({ bio }: Props) {
  const paragraphs = bio.split('\n\n').filter(Boolean)

  return (
    <section aria-label="About me" className="mb-16">
      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
