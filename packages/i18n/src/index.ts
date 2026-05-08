export type Locale = 'en' | 'fr-CA';

export const translations = {
  en: {
    nav: {
      profile: 'Profile',
      bio: 'About',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      achievements: 'Achievements',
    },
    appSwitcher: {
      label: 'View in',
      nextApp: 'Next.js',
      nuxtApp: 'Nuxt',
      vanilla: 'Vanilla TS',
    },
    language: {
      toggle: 'Français',
      current: 'English',
    },
    availability: {
      open: 'Open to work',
      unavailable: 'Not currently available',
    },
    experience: {
      present: 'Present',
      responsibilities: 'Responsibilities',
      achievements: 'Achievements',
    },
    skills: {
      proficiency: {
        familiar: 'Familiar',
        proficient: 'Proficient',
        expert: 'Expert',
      },
    },
    projects: {
      viewCode: 'View Code',
      viewLive: 'View Live',
      featured: 'Featured',
      ongoing: 'Ongoing',
    },
    common: {
      loading: 'Loading…',
      error: 'Something went wrong.',
      noData: 'No data available.',
      comingSoon: 'Coming soon',
    },
  },
  'fr-CA': {
    nav: {
      profile: 'Profil',
      bio: 'À propos',
      experience: 'Expérience',
      skills: 'Compétences',
      projects: 'Projets',
      achievements: 'Réalisations',
    },
    appSwitcher: {
      label: 'Voir dans',
      nextApp: 'Next.js',
      nuxtApp: 'Nuxt',
      vanilla: 'Vanilla TS',
    },
    language: {
      toggle: 'English',
      current: 'Français',
    },
    availability: {
      open: 'Disponible pour de nouvelles opportunités',
      unavailable: 'Pas disponible actuellement',
    },
    experience: {
      present: 'Présent',
      responsibilities: 'Responsabilités',
      achievements: 'Réalisations',
    },
    skills: {
      proficiency: {
        familiar: 'Familier',
        proficient: 'Compétent',
        expert: 'Expert',
      },
    },
    projects: {
      viewCode: 'Voir le code',
      viewLive: 'Voir en direct',
      featured: 'En vedette',
      ongoing: 'En cours',
    },
    common: {
      loading: 'Chargement…',
      error: 'Une erreur est survenue.',
      noData: 'Aucune donnée disponible.',
      comingSoon: 'Bientôt disponible',
    },
  },
} as const;

export type Translations = typeof translations.en;

export function useTranslations(locale: Locale): Translations {
  return translations[locale] as Translations;
}
