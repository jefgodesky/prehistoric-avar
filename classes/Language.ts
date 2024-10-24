import { MORPHOLOGY, WORDORDER } from '../index.t.ts'
import type { Morphology, WordOrder, ILanguage } from '../index.t.ts'

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
