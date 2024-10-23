export const LAYER = {
  SURFACE: 'S',
  NEAR_SURFACE: 'C',
  WORLD_BELOW: 'D'
} as const

export type LAYER = typeof LAYER[keyof typeof LAYER]
