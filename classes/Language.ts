import { ILanguage, LanguageMorphology, LanguageOrder } from '../index.d.ts'

class Language {
  name?: string
  order: LanguageOrder
  morphology: LanguageMorphology

  constructor (data?: ILanguage) {
    this.order = data?.order ?? 'SOV'
    this.morphology = data?.morphology ?? 'Fusional'
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

  static getMorphologyTypes (): LanguageMorphology[] {
    return [
      'Fusional' as LanguageMorphology,
      'Analytic' as LanguageMorphology,
      'Agglutinative' as LanguageMorphology
    ]
  }
}

export default Language
