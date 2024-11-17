import { nanoid } from 'nanoid'
import { sample, shuffle } from '@std/random'
import { sumOf } from '@std/collections'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { Biome, BIOMES, SPECIES_NAMES, SpeciesName } from '../enums.ts'
import type { IOgreReport, IPopulation, ISurvivalReport } from '../index.d.ts'
import { wosan } from '../instances/species/index.ts'
import type Region from './Region.ts'
import Fitness from './Fitness.ts'
import Markable from './Markable.ts'
import Quest from './Quest.ts'
import Scribe from './Scribe.ts'
import Simulation from './Simulation.ts'
import Species from './Species.ts'
import World from './World.ts'
import clamp from '../clamp.ts'
import createPopulation from '../factories/population.ts'
import oxford from '../oxford.ts'

const TO_STRING_PREFIX = 'Population:' as const

class Population extends Markable {
  home: string
  species: string
  size: number
  viability: number
  scribe: Scribe
  extinct: boolean
  growth: ISurvivalReport | null = null
  private fitness: Fitness

  constructor (world: World, home: string, data?: IPopulation) {
    super(data)

    this.home = home
    this.id = world.populations.generateKey(data?.id ?? 'GS03-001WO')
    this.species = data?.species ?? SPECIES_NAMES.WOSAN
    this.size = data?.size ?? 1
    this.viability = data?.viability ?? 1
    this.scribe = new Scribe(...(data?.scrolls ?? []))
    this.markers = data?.markers ?? []
    this.extinct = data?.extinct ?? false

    const region = this.getHome()
    const species = this.getSpecies()
    const society = world.societies.get(region.society ?? '')
    const id = data?.id ?? region.generatePopulationId(this.species) ?? 'GS03-0001WO'
    this.id = world.populations.generateKey(id)
    this.fitness = society?.fitness
      ? Fitness.combine(species.fitness, society.fitness)
      : species.fitness
    region.introduce(this)
    world.populations.add(this)
  }

  refresh (): void {
    this.growth = null
    this.adjustViability()
  }

  getFitness (biome?: Biome): number {
    const b = biome ?? this.getHome().biome
    return b ? this.fitness.get(b) : 0
  }

  getSpecies (): Species {
    const { world } = Simulation.instance()
    return world.species.get(this.species.toLowerCase()) ?? wosan
  }

  getHome (): Region {
    const { world } = Simulation.instance()
    const regions = world.regions.values()
    return world.regions.get(this.home) ?? regions[0]
  }

  survive (override?: number): number {
    const mod = this.getFitness()
    const roll = override ?? new DiceRoll(`2d6 + ${mod}`).total

    if (roll <= 3) return 0
    if (roll <= 6) return 1
    if (roll <= 9) return 2
    if (roll <= 12) return 3
    return 4
  }

  adjustSize (delta: number): void {
    if (this.extinct) return
    if (delta >= 1 || delta <= -1) {
      this.size += Math.floor(delta)
    } else {
      this.size *= 1 + delta
    }
    this.size = Math.max(Math.round(this.size), 0)

    if (this.size === 0) {
      const { world } = Simulation.instance()
      this.extinct = true
      const region = this.getHome()
      const populations = world.populations.populate(region.populations)
      const extant = populations.filter(p => !p.extinct && p.size > 0)
      if (region.society !== null && extant.length < 1) {
        world.societies.remove(region.society)
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
    const { world } = Simulation.instance()
    const region = world.regions.get(dest)
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
      const p = createPopulation(dest, {
        species: this.species,
        markers: [],
        size: n,
        viability: this.viability,
        scrolls: [],
        extinct: false
      })
      description += `, where they founded a new population (${p.id}).`
    }

    if (!record) return

    const { history, millennium } = Simulation.instance()
    history.add({ description, millennium, tags })
  }

  getProjectedSize (hold: number): number {
    let adjustment = 100
    const directions = [-1, 1, 1]
    switch (hold) {
      case 0:
        adjustment -= new DiceRoll('1d20').total
        break
      case 1:
        adjustment -= new DiceRoll('1d4').total
        break
      case 3:
        adjustment += new DiceRoll('1d6').total
        break
      case 4:
        adjustment += new DiceRoll('1d8').total
        break
      default:
        adjustment += new DiceRoll('1d4').total * (sample(directions) ?? 1)
        break
    }

    return Math.round(this.size * (adjustment / 100))
  }

  findCannibals ({ hold, pressure }: ISurvivalReport): number {
    const chances = [1/20000, 1/200000]
    const chance = chances[hold] ?? 1/2000000
    const tries = this.size + pressure
    let cannibals = 0

    for (let i = 0; i < tries; i++) {
      if (Math.random() < chance) cannibals++
    }

    return cannibals
  }

  apply50500 (): void {
    if (this.size < 50) {
      this.adjustSize(this.size * -1)
    } else if (this.size < 500) {
      this.viability = this.viability * 0.75
    }
  }

  runOgre (): IOgreReport {
    const { world } = Simulation.instance()
    const home = this.getHome()
    const ogrism = Math.max(home.ogrism, 1)
    const victims: Record<SpeciesName, { fighting: number, murdered: number, total: number }> = {
      [SPECIES_NAMES.ELF]: { fighting: 0, murdered: 0, total: 0 },
      [SPECIES_NAMES.DWARF]: { fighting: 0, murdered: 0, total: 0 },
      [SPECIES_NAMES.GNOME]: { fighting: 0, murdered: 0, total: 0 },
      [SPECIES_NAMES.HALFLING]: { fighting: 0, murdered: 0, total: 0 },
      [SPECIES_NAMES.HUMAN]: { fighting: 0, murdered: 0, total: 0 },
      [SPECIES_NAMES.ORC]: { fighting: 0, murdered: 0, total: 0 },
      [SPECIES_NAMES.WOSAN]: { fighting: 0, murdered: 0, total: 0 }
    }

    const quest = new Quest(world, {
      id: nanoid(),
      description: `Slay the ${this.species} Ogre of ${home.id}`,
      courage: 1 / (ogrism * 10),
      skill: 1 / (ogrism * 10),
      lethality: ((ogrism * 10) + 10) / 100
    })

    // Will the population that the ogre came from be the first to try to
    // destroy it?
    const will = Math.random() > 0.5
    const ids = will ? [this.id, ...shuffle(home.populations)] : shuffle(home.populations)
    const populations = world.populations.populate(ids)

    let slayer: string | null = null
    for (const p of populations) {
      const report = quest.run(p, home.biome ?? BIOMES.TEMPERATE_FOREST)
      p.adjustSize(report.killed * -1)
      victims[p.species].fighting += report.killed
      victims[p.species].total += report.killed
      if (report.success) { slayer = p.id; break }
    }

    const die = slayer === null ? 'd20' : 'd4'
    const killed = new DiceRoll(`${Math.min(home.ogrism, 1)}${die}`).total

    for (let i = 0; i < killed; i++) {
      const { species, population } = home.pickRandomHumanoid()
      const victimPopulation = world.populations.get(population)
      if (victimPopulation && victimPopulation.size > 0) {
        victimPopulation.adjustSize(-1)
        victims[species].murdered++
        victims[species].total++
      }
    }

    return { origin: this.id, slayer, victims }
  }

  recordOgre ({ origin, slayer, victims }: IOgreReport): void {
    // An ogre emerged from the human population GS02-HU001, killing a total of
    // 31 humanoids (18 humans, including 12 who died trying to destroy it and
    // 14 elves, including 2 who died trying to destroy it) before it was
    // destroyed by its own kin.

    // An ogre emerged from the human population GS02-HU001, killing a total of
    // 31 humanoids (18 humans, including 12 who died trying to destroy it and
    // 14 elves, including 2 who died trying to destroy it) before it was
    // destroyed by a group of elves from GS02-EL001.

    // An ogre emerged from the human population GS02-HU001, killing a total of
    // 31 humanoids (18 humans, including 12 who died trying to destroy it and
    // 14 elves, including 2 who died trying to destroy it). It terrorized
    // GS02 for many long years until it died.

    const { history, millennium, world } = Simulation.instance()
    const { populations, species } = world
    const total = sumOf(Object.values(victims), obj => obj.total)
    const lede = `An ogre emerged from the ${this.species.toLowerCase()} ` +
      `population ${this.id}, killing a total of ${total} humanoids `

    const breakdown = Object.keys(victims)
      .filter(name => victims[name].total > 0)
      .map(name => {
        const sp = species.get(name.toLowerCase())
        const pl = sp?.getPlural().toLowerCase() ?? 'humanoids'
        const { fighting, total } = victims[name]
        return `${total} ${pl}, including ${fighting} who died trying to destroy it`
      })
    const paren = `(${oxford(...breakdown)})`

    const fate = origin === slayer
      ? ' before it was destroyed by its own kin.'
      : slayer !== null
        ? ` before it was destroyed by a group of ${species.get(populations.get(slayer ?? '')?.species.toLowerCase() ?? '')?.getPlural().toLowerCase() ?? 'humanoids'} from ${slayer}`
        : `. It terrorized ${this.home} for many long years until it died.`

    const description = lede + paren + fate
    const tags = [this.home, origin, origin === slayer ? null : slayer, 'Ogre'].filter(tag => tag !== null)
    history.add({ description, millennium, tags })
  }

  checkOgres (report: ISurvivalReport): void {
    const home = this.getHome()
    const cannibals = this.findCannibals(report)
    for (let i = 0; i < cannibals; i++) {
      if (home.createsOgre()) {
        const ogre = this.runOgre()
        this.recordOgre(ogre)
      }
    }
  }

  toObject (): IPopulation {
    return {
      id: this.id,
      species: this.species,
      markers: this.markers,
      size: this.size,
      viability: this.viability,
      scrolls: this.scribe.toObject(),
      extinct: this.extinct
    }
  }

  override toString (): string {
    return `${TO_STRING_PREFIX} ${this.id}`
  }
}

export default Population
