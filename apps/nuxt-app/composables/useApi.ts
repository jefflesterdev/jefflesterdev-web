import type { Profile, SkillGroup, Experience, Achievement } from '@jld/types'

interface ApiResponse<T> {
  success: boolean
  result: T
}

export function useApi() {
  const base = import.meta.env.VITE_API_URL || 'https://jefflesterdev-api.jeffery-a-lester.workers.dev'

  async function get<T>(path: string): Promise<T> {
    const res = await fetch(`${base}${path}`)
    if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
    const body: ApiResponse<T> = await res.json()
    return body.result
  }

  return {
    base,
    profile:      () => get<Profile>('/profile'),
    skills:       () => get<SkillGroup[]>('/skills'),
    experience:   () => get<Experience[]>('/experience'),
    achievements: () => get<Achievement[]>('/achievements'),
  }
}
