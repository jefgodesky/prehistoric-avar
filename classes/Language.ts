import { DiceRoll } from '@dice-roller/rpg-dice-roller'
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

  advanceOrder (roll?: number) {
    let newOrder = this.order
    switch (this.order) {
      case LANG_ORDER.SOV:
        if (!roll) roll = new DiceRoll('4d6').total
        switch (roll) {
          case 4: newOrder = LANG_ORDER.OSV; break
          case 24: newOrder = LANG_ORDER.OVS; break
          default: newOrder = LANG_ORDER.SVO; break
        }
        break
      case LANG_ORDER.SVO:
        if (!roll) roll = new DiceRoll('1d20').total
        switch (roll) {
          case 20: newOrder = LANG_ORDER.VOS; break
          default: newOrder = LANG_ORDER.VSO; break
        }
        break
      default:
        if (this.order === LANG_ORDER.VSO || this.order === LANG_ORDER.VOS) {
          const other = this.order === LANG_ORDER.VSO ? LANG_ORDER.VOS : LANG_ORDER.VSO
          if (!roll) roll = new DiceRoll('1d20').total
          newOrder = roll <= 10 ? LANG_ORDER.SVO : other
        }
        break
    }
    this.order = newOrder
  }

  toObject (): ILanguage {
    return {
      name: this.name,
      order: this.order,
      morphology: this.morphology
    }
  }

  toString (): string {
    return `Language: ${this.name}`
  }

  static getMorphologyTypes (): LangMorphology[] {
    return [
      LANG_MORPHOLOGY.FUSIONAL,
      LANG_MORPHOLOGY.ANALYTIC,
      LANG_MORPHOLOGY.AGGLUTINATIVE
    ]
  }

  static willNaturallyAdvance (): { morphology: boolean, order: boolean } {
    return {
      morphology: Language.willNaturallyAdvanceMorphology(),
      order: Language.willNaturallyAdvanceOrder()
    }
  }

  static willNaturallyAdvanceMorphology (): boolean {
    return Math.random() < (1/3)
  }

  static willNaturallyAdvanceOrder (): boolean {
    // (1 - 0.004)^175 ≈ 0.4958887
    // Meaning that after 175 iterations (as in 175,000 years, or about as long
    // as we think languages have been spoken on earth), on average 49.6% of
    // languages will have returned true at least once (which matches the nearly
    // half of languages on earth that are still SOV, per Gell-Mann & Ruhlen).
    // Gell-Mann, M. and Ruhlen, M. "The origin and evolution of word order,"
    // PNAS, October 10, 2011
    // https://www.pnas.org/doi/10.1073/pnas.1113716108
    return Math.random() < 0.004
  }
}

export default Language
