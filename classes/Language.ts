import { LANG_MORPHOLOGY, LANG_ORDER } from '../enums.ts'
import type { LangMorphology, LangOrder } from '../enums.ts'
import { ILanguage } from '../index.d.ts'

class Language {
  name?: string
  order: LangOrder
  morphology: LangMorphology

  constructor (data?: ILanguage) {
    this.order = data?.order ?? LANG_ORDER.SOV
    this.morphology = data?.morphology ?? LANG_MORPHOLOGY.FUSIONAL
    if (data?.name) this.name = data.name
  }

  advanceMorphology () {
    const types = Language.getMorphologyTypes()
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

  static getMorphologyTypes (): LangMorphology[] {
    return [
      LANG_MORPHOLOGY.FUSIONAL,
      LANG_MORPHOLOGY.ANALYTIC,
      LANG_MORPHOLOGY.AGGLUTINATIVE
    ]
  }
}

export default Language
