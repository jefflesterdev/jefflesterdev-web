import type { ApiResponse, Profile, SkillGroup, Experience, Achievement } from '@jld/types'

export const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://jefflesterdev-api.jeffery-a-lester.workers.dev'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  const body: ApiResponse<T> = await res.json()
  return body.result
}

export const api = {
  profile:      () => get<Profile>('/profile'),
  skills:       () => get<SkillGroup[]>('/skills'),
  experience:   () => get<Experience[]>('/experience'),
  achievements: () => get<Achievement[]>('/achievements'),
}
