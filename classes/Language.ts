export const WORDORDER = {
  SOV: 'SOV',
  SVO: 'SVO',
  OSV: 'OSV',
  OVS: 'OVS',
  VSO: 'VSO',
  VOS: 'VOS'
} as const

export const MORPHOLOGY = {
  FUSIONAL: 12,
  ANALYTIC: 4,
  AGGLUTINATIVE: 8
} as const

export type WORDORDER = typeof WORDORDER[keyof typeof WORDORDER]
export type MORPHOLOGY = typeof MORPHOLOGY[keyof typeof MORPHOLOGY]

class Language {
  order: WORDORDER
  morphology: MORPHOLOGY

  constructor (order: WORDORDER = WORDORDER.SOV, morphology: MORPHOLOGY = MORPHOLOGY.FUSIONAL) {
    this.order = order
    this.morphology = morphology
  }

  advanceMorphology () {
    const types = [MORPHOLOGY.FUSIONAL, MORPHOLOGY.ANALYTIC, MORPHOLOGY.AGGLUTINATIVE]
    const curr = types.indexOf(this.morphology)
    const next = (curr + 1) % types.length
    this.morphology = types[next]
  }
}

export default Language
