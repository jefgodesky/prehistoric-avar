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

  static getMorphologyTypes (): LangMorphology[] {
    return [
      LANG_MORPHOLOGY.FUSIONAL,
      LANG_MORPHOLOGY.ANALYTIC,
      LANG_MORPHOLOGY.AGGLUTINATIVE
    ]
  }
}

export default Language
