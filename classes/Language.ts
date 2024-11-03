import { sample } from '@std/collections'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { LANG_MORPHOLOGY, LANG_ORDER } from '../enums.ts'
import type { LangMorphology, LangOrder } from '../enums.ts'
import { ILanguage, ILanguageDiffusion } from '../index.d.ts'
import Region from './Region.ts'

const INFLUENCE_NEEDED = 100

class Language {
  name?: string
  order: LangOrder
  morphology: LangMorphology
  region: Region
  influences: ILanguageDiffusion

  constructor (region: Region, data?: ILanguage) {
    this.region = region
    this.order = data?.order ?? LANG_ORDER.SOV
    this.morphology = data?.morphology ?? LANG_MORPHOLOGY.FUSIONAL
    this.name = data?.name ?? this.generateName()
    this.influences = Language.getBlankDiffusionChart()
  }

  generateName (): string {
    const { id, simulation } = this.region
    return `${id}-${simulation.millennium.toString().padStart(3, '0')}`
  }

  advanceMorphology () {
    const types = Language.getMorphologyTypes()
    const curr = types.indexOf(this.morphology)
    const next = (curr + 1) % types.length
    this.morphology = types[next]
  }

  advanceOrder (roll?: number): LangOrder {
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
    return newOrder
  }

  gatherDiffusion (): ILanguageDiffusion {
    const diffusion = Language.getBlankDiffusionChart()
    for (const neighbor of this.region.adjacentRegions) {
      const region = this.region.simulation.world.regions[neighbor]
      if (!region.hasSpeechCommunity()) continue
      const lang = region.getCurrentLanguage()
      if (!lang) continue
      diffusion.order[lang.order]++
      diffusion.morphology[lang.morphology]++
    }
    return diffusion
  }

  applyInfluence (): {  order: LangOrder, morphology: LangMorphology } {
    const diffusion = this.gatherDiffusion()
    return {
      order: this.applyOrderInfluence(diffusion),
      morphology: this.applyMorphologyInfluence(diffusion)
    }
  }

  applyOrderInfluence (diffusion: ILanguageDiffusion): LangOrder {
    const generation = this.region.getAverageGeneration()
    for (const order of Object.values(LANG_ORDER)) {
      this.influences.order[order] += diffusion.order[order] * generation
    }

    return sample(this.getTopInfluences<LangOrder>(this.influences.order)) ?? this.order
  }

  applyMorphologyInfluence (diffusion: ILanguageDiffusion): LangMorphology {
    const generation = this.region.getAverageGeneration()
    for (const morph of Object.values(LANG_MORPHOLOGY)) {
      this.influences.morphology[morph] += diffusion.morphology[morph] * generation
    }

    return sample(this.getTopInfluences<LangMorphology>(this.influences.morphology)) ?? this.morphology
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

  private getTopInfluences<K extends LangOrder | LangMorphology>(obj: Record<K, number>): Array<K> {
    const max = Math.max(...Object.values(obj) as number[])
    if (max <= INFLUENCE_NEEDED) return []
    return Object.keys(obj).filter((key): key is K => {
      return obj[key as K] >= max
    })
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

  static getBlankDiffusionChart (): ILanguageDiffusion {
    return {
      order: {
        [LANG_ORDER.SOV]: 0,
        [LANG_ORDER.SVO]: 0,
        [LANG_ORDER.OVS]: 0,
        [LANG_ORDER.OSV]: 0,
        [LANG_ORDER.VSO]: 0,
        [LANG_ORDER.VOS]: 0,
      },
      morphology: {
        [LANG_MORPHOLOGY.FUSIONAL]: 0,
        [LANG_MORPHOLOGY.ANALYTIC]: 0,
        [LANG_MORPHOLOGY.AGGLUTINATIVE]: 0
      }
    }
  }
}

export default Language
export { INFLUENCE_NEEDED }
