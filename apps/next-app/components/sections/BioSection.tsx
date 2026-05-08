import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import SectionHeading from '../SectionHeading'

interface Props {
  bio: string
  locale: Locale
}

export default function BioSection({ bio, locale }: Props) {
  const t = useTranslations(locale)
  const paragraphs = bio.split('\n\n').filter(Boolean)

  return (
    <section id="bio" className="mb-16" aria-labelledby="bio-heading">
      <SectionHeading label={t.nav.bio} />
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
