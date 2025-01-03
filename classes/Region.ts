import { sumOf } from '@std/collections'

import { Biome, BIOMES, SPECIES_NAMES, SpeciesName } from '../enums.ts'
import { IHabitable, IRegion, IRegionFeature, ISurvivalProjection, ISurvivalReport } from '../index.d.ts'
import { ROUND_HABITABILITY_TO_FULL } from '../constants.ts'

import Markable from './Markable.ts'
import Population from './Population.ts'
import Simulation from './Simulation.ts'

import clamp from '../clamp.ts'
import createArchfey from '../factories/immortals/archfey.ts'
import createSociety from '../factories/society.ts'
import createSpeciationScroll, { getSpeciationScrollText } from '../factories/scrolls/speciation.ts'
import Society from './Society.ts'

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
  populations: string[]
  society: string | null
  species?: SpeciesName
  tags: string[]

  constructor (data?: IRegion) {
    super(data)

    this.id = data?.id ?? ''
    this.adjacentRegions = data?.adjacentRegions ?? []
    this.area = data?.area ?? 0
    this.biome = data?.biome ?? null
    this.capacity = data?.capacity ?? 0
    this.dragons = data?.dragons ? [...data.dragons] : []
    this.features = data?.features ? [...data.features] : []
    this.feyInfluence = data?.feyInfluence ?? 0
    this.habitability = data?.habitability ?? 1
    this.immortals = data?.immortals ? [...data.immortals] : []
    this.ogrism = data?.ogrism ?? 0
    this.populations = data?.populations ? [...data.populations] : []
    this.society = data?.society ?? null
    this.tags = data?.tags ? [...data.tags] : []

    if (data?.species) this.species = data.species
  }

  refresh (): void {
    this.restoreHabitability()
    this.adjustFeyInfluence()
    this.reduceOgrism()

    // Language changes over time
    const society = this.getSociety()
    if (society) society.advanceLanguage()

    // Refresh each population
    const { populations } = Simulation.instance().world
    for (const id of this.populations) {
      const p = populations.get(id)
      if (p) p.refresh()
    }
  }

  grow (): void {
    this.spreadLanguage()
    this.spreadOgrism()
    this.survive()

    const populations = this.getPopulations()
    for (const p of populations) p.grow()
  }

  expand (): void {
    const populations = this.getPopulations()
    for (const p of populations) p.expand()
  }

  getCapacity (worldHabitability: number): number {
    const { immortals } = Simulation.instance().world
    const otherFactors = [
      ...this.features.map(feature => feature.impact),
      ...this.immortals.map(id => (immortals.get(id)?.impact ?? 0) * -1)
    ]

    const base = this.capacity * this.habitability * worldHabitability
    const other = sumOf(otherFactors, factor => factor)
    return base + other
  }

  getPopulations (): Population[] {
    const { populations } = Simulation.instance().world
    return populations.populate(this.populations)
  }

  getSociety (): Society | null {
    if (!this.society) return null
    const { societies } = Simulation.instance().world
    return societies.get(this.society)
  }

  introduce (...populations: Population[]): void {
    const { world } = Simulation.instance()
    this.society = this.society ?? createSociety(this.id).id
    for (const p of populations) {
      const conspecific = this.getSpeciesPopulation(p.species)
      if (conspecific) {
        conspecific.absorb(p.size, p.viability)
        world.populations.remove(p.id)
      } else {
        p.id = world.populations.generateKey(this.generatePopulationId(p.species))
        this.populations.push(p.id)
        p.home = this.id
      }
    }
  }

  isPopulated (): boolean {
    return this.getPopulations().filter(p => !p.extinct).length > 0
  }

  getSpeciesPopulation (sp: SpeciesName): Population | false {
    if (!this.isPopulated()) return false
    return this.getPopulations()
      .find(p => p.species === sp && !p.extinct) ?? false
  }

  hasPopulationCapableOfSpeech (): boolean {
    const areSpeakers = (p: Population): boolean => !p.extinct && p.getSpecies().name !== SPECIES_NAMES.WOSAN
    return this.getPopulations().filter(areSpeakers).length > 0
  }

  hasSpeechCommunity (): boolean {
    if (!this.society) return false
    const { world } = Simulation.instance()
    const society = world.societies.get(this.society)
    if (!society?.language) return false
    return this.getPopulations()
      .map(p => !p.extinct && p.getSpecies().canSpeak)
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
    const populations = this.getPopulations()
    let nominator = 0
    let denominator = 0
    for (const p of populations) {
      nominator += p.size * (p.getSpecies().generation ?? 50)
      denominator += p.size
    }
    return Math.floor(nominator / denominator)
  }

  speciate (): void {
    if (!this.species) return
    const { world } = Simulation.instance()
    const sp = world.species.get(this.species.toLowerCase())!
    const scrollText = getSpeciationScrollText(sp)
    const populations = this.getPopulations()
    for (const p of populations) {
      if (p.getSpecies().name !== sp?.ancestor) continue
      let scroll = p.scribe.scrolls.find(s => s.text === scrollText)
      if (scroll) { scroll.unseal(); continue }
      scroll = createSpeciationScroll(this.species, p)
      p.scribe.scrolls.push(scroll)
    }
  }

  reduceOgrism (): void {
    if (!this.hasSpeechCommunity()) this.ogrism = Math.max(this.ogrism - 1, 0)
  }

  increaseOgrism (): void {
    this.ogrism = Math.min(this.ogrism + 1, 8)
  }

  adjustFeyInfluence (): void {
    const mod = this.hasSpeechCommunity() ? 1 : -1
    this.feyInfluence = clamp(this.feyInfluence + mod, 0, 8)

    if (this.feyInfluence > 7) {
      const { world } = Simulation.instance()
      const crown = `Archfey Sovereign of ${this.id}`
      const immortals = world.immortals.populate(this.immortals)
      const sovereigns = immortals.filter(immortal => immortal.description === crown)
      const reigning = sovereigns.filter(sovereign => !sovereign.slain)
      const coronate = reigning.length < 1
      if (coronate) createArchfey(this.id)
      if (sovereigns.length < 1) world.dragons.interest.incr()
    }
  }

  survive (): ISurvivalReport[] {
    const { habitability } = Simulation.instance().world
    const populations = this.getPopulations()
    const projections: ISurvivalProjection[] = populations.map(p => {
      const species = p.getSpecies()
      const generation = species.generation ?? 50
      const hold = p.survive()
      let size = p.size
      for (let i = 0; i < generation; i++) size = p.getProjectedSize(hold, size)
      return { hold, size }
    })

    const capacity = this.getCapacity(habitability)
    const open = sumOf(projections, p => p.size) <= capacity
    const holdSum = sumOf(projections, p => p.hold)
    const popSum = sumOf(populations, p => p.size)

    const reports: ISurvivalReport[] = []
    for (let i = 0; i < populations.length; i++) {
      const { hold, size } = projections[i]
      const p = populations[i]

      if (open) {
        // Everyone can grow as much as they like and they'll still be below
        // the region's carrying capacity. Good times!
        populations[i].size = size
      } else {
        // Populations are trying to grow greater than carrying capacity will
        // allow. That means competition, scarcity, and bad times.
        const factors = [
          holdSum === 0 ? 0 : hold / holdSum,
          popSum === 0 ? 0 : p.size / popSum
        ]
        const portion = sumOf(factors, factor => factor) / factors.length
        populations[i].size = Math.floor(capacity * portion)
      }

      p.growth = { hold, pressure: size - p.size }
      reports.push(p.growth)
    }

    return reports
  }

  spreadLanguage (): void {
    if (!this.hasSpeechCommunity()) return
    const society = this.getSociety()
    const language = society?.language
    if (!language) return

    const { regions } = Simulation.instance().world
    const adjacent = regions.populate(this.adjacentRegions)
    for (const region of adjacent) {
      if (!region.hasPopulationCapableOfSpeech()) continue
      const society = region.getSociety()
      if (!society || society.language !== null) continue
      society.addLanguage(language)
    }
  }

  spreadOgrism (): void {
    const { regions } = Simulation.instance().world
    const adjacent = regions.populate(this.adjacentRegions)
    for (const region of adjacent) {
      if (region.ogrism < this.ogrism) region.increaseOgrism()
    }
  }

  createsOgre (override?: boolean): boolean {
    const probabilities = [0.01, 0.025, 0.05, 0.1, 0.2, 0.4, 0.6, 0.8, 1]
    const probability = probabilities[this.ogrism] ?? 0.01
    const result = override ?? Math.random() <= probability
    if (result) this.increaseOgrism()
    return result
  }

  pickRandomHumanoid (): { species: SpeciesName, population: string } {
    const populations = this.getPopulations()
    const total = sumOf(populations, p => p.size)
    const pick = Math.round(Math.random() * total)

    let limit = 0
    let picked: Population | null = null
    for (const p of populations) {
      limit += p.size
      if (pick <= limit) { picked = p; break }
    }

    picked = picked ?? populations[0]
    return { species: picked.species, population: picked.id }
  }

  evaluate (p: Population): number {
    const { world } = Simulation.instance()
    const capacity = this.getCapacity(world.habitability)
    const populations = this.getPopulations()
    const population = sumOf(populations, p => p.size)
    const fitness = this.biome ? p.getFitness(this.biome) : -3
    const dragons = this.dragons.length
    return (capacity - population) * (fitness - dragons + 3)
  }

  generateSocietyId (): string {
    const { millennium } = Simulation.instance()
    return `${this.id}-${millennium.toString().padStart(3, '0')}`
  }

  generatePopulationId (species: SpeciesName): string {
    const { world } = Simulation.instance()
    const code = world.species.get(species.toLowerCase())?.getCode() ?? 'WO'
    const conspecific = this.getPopulations().filter(p => p.species === species)
    const num = (conspecific.length + 1).toString().padStart(3, '0')
    return `${this.id}-${code}${num}`
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
      populations: this.populations,
      tags: this.tags
    }

    if (this.species) obj.species = this.species
    if (this.society) obj.society = this.society
    return obj
  }

  override toString (): string {
    return this.id
  }
}

export default Region
