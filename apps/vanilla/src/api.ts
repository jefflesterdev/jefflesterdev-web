import type { Profile, SkillGroup, Experience, Achievement } from '@jld/types'

interface ApiResponse<T> { success: boolean; result: T }

export const API_BASE =
  import.meta.env.VITE_API_URL ?? 'https://jefflesterdev-api.jeffery-a-lester.workers.dev'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  const body: ApiResponse<T> = await res.json()
  return body.result
}

export const fetchProfile      = () => get<Profile>('/profile')
export const fetchSkills       = () => get<SkillGroup[]>('/skills')
export const fetchExperience   = () => get<Experience[]>('/experience')
export const fetchAchievements = () => get<Achievement[]>('/achievements')
