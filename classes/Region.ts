import { Biome, BIOMES, SPECIES_NAMES, SpeciesName } from '../enums.ts'
import { IHabitable, IRegion, IRegionFeature } from '../index.d.ts'
import { ROUND_HABITABILITY_TO_FULL } from '../constants.ts'
import { QUEST_EVENTS } from './Quest.ts'

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
  immortals: string[]
  ogrism: number
  populations: Population[]
  society: string | null
  species?: SpeciesName
  tags: string[]

  constructor (sim: Simulation, data?: IRegion) {
    super(sim, data)

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
    this.immortals = data?.immortals ?? []
    this.ogrism = data?.ogrism ?? 0
    this.populations = populations.map(pop => new Population(this, pop))
    this.society = data?.society ?? null
    this.tags = data?.tags ?? []

    if (data?.species) this.species = data.species

    sim.emitter.on(QUEST_EVENTS.ACCOMPLISHED, (quest_id: string) => this.handleQuestAccomplished(quest_id))
  }

  getCapacity (worldHabitability: number): number {
    const featureImpact = this.features
      .map(feature => feature.impact)
      .reduce((acc, curr) => acc + curr, 0)
    return (this.capacity * this.habitability * worldHabitability) + featureImpact
  }

  introduce (...populations: Population[]): void {
    this.society = this.society ?? new Society(this.simulation, this.id).id
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
    if (!this.society) return false
    const society = this.simulation.world.societies.get(this.society)
    if (!society?.language) return false
    return this.populations
      .map(p => !p.extinct && p.species.canSpeak)
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
    if (!this.species) return
    const { species } = this.simulation.world
    const scrollText = getSpeciationScrollText(this.species)
    const sp = species.get(this.species.toLowerCase())
    for (const p of this.populations) {
      if (p.species.name !== sp?.ancestor) continue
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
      const immortals = this.simulation.world.immortals.populate(this.immortals)
      const sovereigns = immortals.filter(immortal => immortal.description === crown)
      const reigning = sovereigns.filter(sovereign => !sovereign.slain)
      const coronate = reigning.length < 1
      if (coronate) {
        const archfey = createArchfey(this.simulation, this)
        if (!this.immortals.includes(archfey.id)) this.immortals.push(archfey.id)
      }
      if (sovereigns.length < 1) this.simulation.world.dragons.interest.incr()
    }
  }

  generateId (): string {
    const millennium = this.simulation.millennium.toString().padStart(3, '0')
    return `${this.id}-${millennium}`
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
      immortals: this.immortals,
      markers: this.markers,
      ogrism: this.ogrism,
      populations: this.populations.map(pop => pop.toObject()),
      tags: this.tags
    }

    if (this.species) obj.species = this.species
    if (this.society) obj.society = this.society
    return obj
  }

  override toString (): string {
    return this.id
  }

  private handleQuestAccomplished (quest_id: string): void {
    const quest = this.simulation.world.quests.get(quest_id)
    if (!quest?.accomplished) return
    const immortals = this.simulation.world.immortals.populate(this.immortals)
    const slain = immortals
      .filter(immortal => immortal.slayable !== false && immortal.slayable.id === quest.id)
    if (slain.length < 1) return
    slain.forEach(immortal => {
      immortal.slain = true
      this.simulation.world.immortals.remove(immortal.id)
    })
    this.immortals = this.simulation.world.immortals.populate(this.immortals)
      .filter(immortal => !immortal.slain)
      .map(immortal => immortal.id)
  }
}

export default Region
