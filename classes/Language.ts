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

interface ILanguage {
  name?: string
  order?: WordOrder
  morphology?: Morphology
}

export type WordOrder = typeof WORDORDER[keyof typeof WORDORDER]
export type Morphology = typeof MORPHOLOGY[keyof typeof MORPHOLOGY]
export type { ILanguage }

class Language {
  name?: string
  order: WordOrder
  morphology: Morphology

  constructor (data?: ILanguage) {
    this.order = data?.order ?? WORDORDER.SOV
    this.morphology = data?.morphology ?? MORPHOLOGY.FUSIONAL
    if (data?.name) this.name = data.name
  }

  advanceMorphology () {
    const types = [MORPHOLOGY.FUSIONAL, MORPHOLOGY.ANALYTIC, MORPHOLOGY.AGGLUTINATIVE]
    const curr = types.indexOf(this.morphology)
    const next = (curr + 1) % types.length
    this.morphology = types[next]
  }

  toObject (): ILanguage {
    return {
      name: this.name,
      order: this.order,
      morphology: this.morphology
    }
  }
}

export default Language
