import { Biome, BIOMES, SPECIES_NAMES, SpeciesName } from '../enums.ts'
import { IHabitable, IQuestReport, IRegion, IRegionFeature } from '../index.d.ts'
import { ROUND_HABITABILITY_TO_FULL } from '../constants.ts'
import { QUEST_EVENTS } from './Quest.ts'

import Immortal from './Immortal.ts'
import Language from './Language.ts'
import Markable from './Markable.ts'
import Population from './Population.ts'
import Simulation from './Simulation.ts'
import Society from './Society.ts'

import clamp from '../clamp.ts'
import createArchfey from '../factories/immortals/archfey.ts'
import createSpeciationScroll, { getSpeciationScrollText } from '../factories/scrolls/speciation.ts'

class Region extends Markable implements IHabitable {
  adjacentRegions: string[]
  area: number
  biome: Biome | null
  capacity: number
  dragons: string[]
  features: IRegionFeature[]
  feyInfluence: number
  habitability: number
  immortals: Immortal[]
  languages: Language[]
  ogrism: number
  populations: Population[]
  society: Society | null
  species?: SpeciesName
  tags: string[]
  simulation: Simulation

  constructor (sim: Simulation, data?: IRegion) {
    super(sim.emitter, data)

    const immortals = data?.immortals ?? []
    const languages = data?.languages ?? []
    const populations = data?.populations ?? []

    this.id = data?.id ?? ''
    this.adjacentRegions = data?.adjacentRegions ?? []
    this.area = data?.area ?? 0
    this.biome = data?.biome ?? null
    this.capacity = data?.capacity ?? 0
    this.dragons = data?.dragons ?? []
    this.features = data?.features ?? []
    this.feyInfluence = data?.feyInfluence ?? 0
    this.habitability = data?.habitability ?? 1
    this.immortals = immortals.map(immortal => new Immortal(sim.emitter, immortal))
    this.languages = languages.map(lang => new Language(this, lang))
    this.ogrism = data?.ogrism ?? 0
    this.populations = populations.map(pop => new Population(sim.emitter, this, pop))
    this.simulation = sim
    this.society = data?.society ? new Society(this, data.society) : null
    this.tags = data?.tags ?? []

    if (data?.species) this.species = data.species

    sim.emitter.on(QUEST_EVENTS.ACCOMPLISHED, (report: IQuestReport) => this.handleQuestAccomplished(report))
  }

  getCapacity (worldHabitability: number): number {
    const featureImpact = this.features
      .map(feature => feature.impact)
      .reduce((acc, curr) => acc + curr, 0)
    return (this.capacity * this.habitability * worldHabitability) + featureImpact
  }

  introduce (...populations: Population[]): void {
    const sameSpecies = (n: Population, p: Population): boolean => n.species.name === p.species.name
    for (const p of populations) {
      const conspecific = this.populations.filter(n => sameSpecies(n, p))
      const extant = conspecific.filter(p => !p.extinct)
      if (extant.length > 0) {
        extant[0].absorb(p)
      } else {
        this.populations.push(p)
        const num = (conspecific.length + 1).toString().padStart(3, '0')
        p.id = `${this.id}-${p.species.getCode()}${num}`
        p.home = this
      }
    }
  }

  isPopulated (): boolean {
    return this.populations.filter(p => !p.extinct).length > 0
  }

  hasPopulationCapableOfSpeech (): boolean {
    const areSpeakers = (p: Population): boolean => !p.extinct && p.species.name !== SPECIES_NAMES.WOSAN
    return this.populations.filter(areSpeakers).length > 0
  }

  hasSpeechCommunity (): boolean {
    const { languages, populations } = this
    if (languages.length < 1) return false
    return populations
      .map(p => !p.extinct && p.species.canSpeak())
      .reduce((acc, curr) => acc && curr, true)
  }

  reduceHabitability (factor: number): void {
    this.habitability *= 1 - factor
  }

  restoreHabitability (): void {
    const gap = 1 - this.habitability
    this.habitability += gap / 2
    if (this.habitability >= ROUND_HABITABILITY_TO_FULL) this.habitability = 1
  }

  addLanguage (language: Language): void {
    const { millennium } = this.simulation
    language.name = `${this.id}-${millennium.toString().padStart(3, '0')}`
    this.languages.push(language)
  }

  getCurrentLanguage (): Language | undefined {
    if (this.languages.length < 1) return undefined
    return this.languages[this.languages.length - 1]
  }

  getAverageGeneration (): number {
    if (!this.isPopulated()) return 0
    let nominator = 0
    let denominator = 0
    for (const p of this.populations) {
      nominator += p.size * (p.species.generation ?? 50)
      denominator += p.size
    }
    return Math.floor(nominator / denominator)
  }

  speciate (): void {
    console.log(this.species)
    if (!this.species) return
    const { species } = this.simulation.world
    const scrollText = getSpeciationScrollText(this.species)
    const sp = species[this.species.toLowerCase()]
    for (const p of this.populations) {
      if (p.species.name !== sp.ancestor) continue
      let scroll = p.scribe.scrolls.find(s => s.text === scrollText)
      if (scroll) { scroll.unseal(); continue }
      scroll = createSpeciationScroll(this.species, p)
      p.scribe.scrolls.push(scroll)
    }
  }

  reduceOgrism (): void {
    if (!this.hasSpeechCommunity()) this.ogrism = Math.max(this.ogrism - 1, 0)
  }

  adjustFeyInfluence (): void {
    const mod = this.hasSpeechCommunity() ? 1 : -1
    this.feyInfluence = clamp(this.feyInfluence + mod, 0, 8)

    if (this.feyInfluence > 7) {
      const crown = `Archfey Sovereign of ${this.id}`
      const sovereigns = this.immortals.filter(immortal => immortal.description === crown)
      const reigning = sovereigns.filter(sovereign => !sovereign.slain)
      const coronate = reigning.length < 1
      if (coronate) this.immortals.push(createArchfey(this.simulation, this))
      if (sovereigns.length < 1) this.simulation.world.dragons.interest.incr()
    }
  }

  toObject (): IRegion {
    const obj: IRegion = {
      id: this.id,
      adjacentRegions: this.adjacentRegions,
      area: this.area,
      biome: this.biome ?? BIOMES.WORLD_BELOW,
      capacity: this.capacity,
      dragons: this.dragons,
      features: this.features,
      feyInfluence: this.feyInfluence,
      habitability: this.habitability,
      immortals: this.immortals.map(immortal => immortal.toObject()),
      languages: this.languages.map(lang => lang.toObject()),
      markers: this.markers,
      ogrism: this.ogrism,
      populations: this.populations.map(pop => pop.toObject()),
      tags: this.tags
    }

    if (this.species) obj.species = this.species
    return obj
  }

  override toString (): string {
    return this.id
  }

  private handleQuestAccomplished (report: IQuestReport): void {
    if (!report.success) return
    const slain = this.immortals
      .filter(immortal => immortal.slayable !== false && immortal.slayable.id === report.quest.id)
    if (slain.length < 1) return
    slain.forEach(immortal => { immortal.slain = true })
    this.immortals = this.immortals.filter(immortal => !immortal.slain)
  }
}

export default Region
