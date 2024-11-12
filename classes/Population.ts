import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { Biome, SPECIES_NAMES } from '../enums.ts'
import type { IPopulation } from '../index.d.ts'
import clamp from '../clamp.ts'
import { wosan } from '../instances/species/index.ts'
import type Region from './Region.ts'
import Fitness from './Fitness.ts'
import Relationship from './Relationship.ts'
import Markable from './Markable.ts'
import Scribe from './Scribe.ts'
import Simulation from './Simulation.ts'
import Species from './Species.ts'

const TO_STRING_PREFIX = 'Population:' as const

class Population extends Markable {
  home: string
  species: string
  size: number
  viability: number
  scribe: Scribe
  relationships: Relationship[]
  extinct: boolean
  private fitness: Fitness

  constructor (sim: Simulation, home: string, data?: IPopulation) {
    super(sim, data)

    const relationships = data?.relationships ?? []

    this.home = home
    this.id = this.simulation.world.populations.generateKey(data?.id ?? 'GS03-001WO')
    this.species = data?.species ?? SPECIES_NAMES.WOSAN
    this.size = data?.size ?? 1
    this.viability = data?.viability ?? 1
    this.scribe = new Scribe(this.simulation, ...(data?.scrolls ?? []))
    this.relationships = relationships.map(rel => new Relationship(this.simulation, rel))
    this.markers = data?.markers ?? []
    this.extinct = data?.extinct ?? false

    const region = this.getHome()
    const species = this.getSpecies()
    const society = this.simulation.world.societies.get(region.society ?? '')
    const id = data?.id ?? region.generatePopulationId(this.species) ?? 'GS03-0001WO'
    this.id = this.simulation.world.populations.generateKey(id)
    this.fitness = society?.fitness
      ? Fitness.combine(species.fitness, society.fitness)
      : species.fitness
    region.introduce(this)
    this.simulation.world.populations.add(this)
  }

  getFitness (biome: Biome): number {
    return this.fitness.get(biome)
  }

  getSpecies (): Species {
    return this.simulation.world.species.get(this.species.toLowerCase()) ?? wosan
  }

  getHome (): Region {
    const regions = this.simulation.world.regions.values()
    return this.simulation.world.regions.get(this.home) ?? regions[0]
  }

  adjustSize (delta: number): void {
    if (this.extinct) return
    if (delta > 1 || delta < -1) {
      this.size += Math.floor(delta)
    } else {
      this.size *= 1 + delta
    }
    this.size = Math.max(Math.round(this.size), 0)

    if (this.size === 0) {
      this.extinct = true
      const region = this.getHome()
      const populations = this.simulation.world.populations.populate(region.populations)
      const extant = populations.filter(p => !p.extinct && p.size > 0)
      if (region.society !== null && extant.length < 1) {
        this.simulation.world.societies.remove(region.society)
        region.society = null
      }
    }
  }

  adjustViability (): void {
    if (this.extinct) return
    const species = this.getSpecies()
    const generations = species?.generation ?? 1
    for (let g = 0; g < generations; g++) { // High generations change more per tick
      const flip = Math.random() // High viability recovers; low can become death spiral
      const roll = new DiceRoll('1d3').total // Change between 1% and 3%
      const multiplier = flip >= this.viability ? -1 : 1 // 1% to 3% up or down, based on flip
      this.viability *= ((roll / 100) * multiplier) + 1 // +/- viability by percent determined
      if (this.viability > 0.95) this.viability = 1 // 95% rounds up to 100%
      if (this.viability < 0.5) this.viability = 0 // 5% rounds down to 0%
      this.viability = clamp(this.viability, 0, 1) // Clamp between 0 and 1
      if (this.viability === 0 || this.viability === 1) return // Stop looping if we hit extremes
    }
  }

  absorb (n: number, viability: number): boolean {
    this.viability = ((this.viability * this.size) + (viability * n)) / (this.size + n)
    this.adjustSize(n)
    return true
  }

  migrate (dest: string, n: number, record: boolean = true): void {
    const region = this.simulation.world.regions.get(dest)
    if (!region) return

    const species = this.getSpecies()
    const pl = species?.getPlural() ?? 'Humanoids'
    const tags = ['Migration', dest, this.home, pl]
    let description = `${n} ${pl} from ${this.home} (${this.id}) migrated to ${dest}`

    this.adjustSize(n * -1)
    const receiving = region.getSpeciesPopulation(this.species)
    if (receiving) {
      receiving.absorb(n, this.viability)
      description += ` and were absorbed into ${receiving.id}.`
    } else {
      const p = new Population(this.simulation, dest, {
        species: this.species,
        markers: [],
        size: n,
        viability: this.viability,
        relationships: [],
        scrolls: [],
        extinct: false
      })
      description += `, where they founded a new population (${p.id}).`
    }

    if (!record) return

    this.simulation.history.add({
      description,
      millennium: this.simulation.millennium,
      tags
    })
  }

  toObject (): IPopulation {
    return {
      id: this.id,
      species: this.species,
      markers: this.markers,
      size: this.size,
      viability: this.viability,
      relationships: this.relationships.map(rel => rel.toObject()),
      scrolls: this.scribe.toObject(),
      extinct: this.extinct
    }
  }

  override toString (): string {
    return `${TO_STRING_PREFIX} ${this.id}`
  }
}

export default Population
