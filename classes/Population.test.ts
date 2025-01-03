import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { sumOf } from '@std/collections'
import { sample } from '@std/random'
import { BIOMES, SPECIES_NAMES } from '../enums.ts'
import { SamplePopulation, SampleSociety } from '../test-examples.ts'
import Simulation from './Simulation.ts'
import Species from './Species.ts'
import Region from './Region.ts'
import World from './World.ts'
import createPopulation from '../factories/population.ts'
import createSociety from '../factories/society.ts'
import Population, { EXPANSION_THRESHOLD } from './Population.ts'

describe('Population', () => {
  let world: World
  const home = 'GS02'
  
  beforeEach(() => {
    world = Simulation.instance().world
    const region = world.regions.get(home)!
    region.society = createSociety(home, SampleSociety).id
  })
  
  afterEach(() => { Simulation.reset() })

  describe('constructor', () => {
    it('creates a Population instance', () => {
      const p = new Population(world, home)
      expect(p).toBeInstanceOf(Population)
    })

    it('sets a default ID', () => {
      const p = new Population(world, home)
      expect(p.id).toBe('GS02-WO001')
    })

    it('defaults the species to Wosan', () => {
      const p = new Population(world, home)
      expect(p.species).toBe(SPECIES_NAMES.WOSAN)
    })

    it('defaults to a size of 1', () => {
      const p = new Population(world, home)
      expect(p.size).toBe(1)
    })

    it('defaults viability to 1', () => {
      const p = new Population(world, home)
      expect(p.viability).toBe(1)
    })

    it('defaults to an empty array of scrolls', () => {
      const p = new Population(world, home)
      expect(p.scribe.scrolls).toHaveLength(0)
    })

    it('defaults to an empty array of markers', () => {
      const p = new Population(world, home)
      expect(p.markers).toHaveLength(0)
    })

    it('defaults not extinct', () => {
      const p = new Population(world, home)
      expect(p.extinct).toBe(false)
    })

    it('can set a species', () => {
      const p = createPopulation(home, SamplePopulation)
      expect(p.species).toBe(SamplePopulation.species)
    })

    it('can set size', () => {
      const p = createPopulation(home, SamplePopulation)
      expect(p.size).toBe(SamplePopulation.size)
    })

    it('can set viability', () => {
      const p = createPopulation(home, SamplePopulation)
      expect(p.viability).toBe(SamplePopulation.viability)
    })

    it('can set scrolls', () => {
      const p = createPopulation(home, SamplePopulation)
      expect(p.scribe.scrolls).toHaveLength(SamplePopulation.scrolls.length)
    })

    it('can set markers', () => {
      const p = createPopulation(home, SamplePopulation)
      expect(p.scribe.scrolls).toHaveLength(SamplePopulation.scrolls.length)
    })

    it('can set extinction data', () => {
      const data = Object.assign({}, SamplePopulation, { size: 0, extinct: true })
      const p = new Population(world, home, data)
      expect(p.extinct).toBe(true)
    })
  })

  describe('Member methods', () => {
    describe('refresh', () => {
      it('resets growth', () => {
        const p = createPopulation(home, SamplePopulation)
        p.growth = { hold: 2, pressure: 0 }
        p.refresh()
        expect(p.growth).toBeNull()
      })
    })

    describe('expand', () => {
      it('does nothing if pressure is below threshold', () => {
        const p = createPopulation(home, SamplePopulation)
        p.growth = { hold: 2, pressure: 0 }
        p.expand()
        expect(world.populations.size()).toBe(1)
        expect(p.size).toBe(SamplePopulation.size)
      })

      it('runs expansion if pressure is above threshold', () => {
        const p = createPopulation(home, SamplePopulation)
        p.growth = { hold: 2, pressure: EXPANSION_THRESHOLD + 100 }
        p.expand()
        expect(world.populations.size()).toBe(2)
        expect(p.size).toBeLessThan(SamplePopulation.size)
      })
    })

    describe('getFitness', () => {
      it('returns the population fitness for a given biome', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = [BIOMES.SAVANNA, BIOMES.BOREAL_FOREST].map(biome => p.getFitness(biome))
        expect(actual).toEqual([2, 1])
      })

      it('uses home\'s biome as default', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = p.getFitness()
        expect(actual).toEqual(2)
      })
    })

    describe('getSpecies', () => {
      it('returns the species instance', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = p.getSpecies()
        expect(actual).toBeInstanceOf(Species)
        expect(p.species.toLowerCase()).toBe(actual.name?.toLowerCase())
      })
    })

    describe('getHome', () => {
      it('returns the region instance', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = p.getHome()
        expect(actual).toBeInstanceOf(Region)
        expect(actual.id).toBe(home)
      })
    })

    describe('adjustViability', () => {
      it('does quite a bit of random stuff', () => {
        const p = createPopulation(home, SamplePopulation)
        p.viability = 0.6
        p.adjustViability()
        expect(p.viability).toBeGreaterThanOrEqual(0)
        expect(p.viability).toBeLessThanOrEqual(1)
      })

      it('does nothing if the population is extinct', () => {
        const p = createPopulation(home, SamplePopulation)
        p.viability = 0.6
        p.adjustSize(p.size * -2)
        p.adjustViability()
        expect(p.viability).toBe(0.6)
      })
    })

    describe('survive', () => {
      it('returns 0 if you roll a 3 or less', () => {
        const rolls = [-3, -2, -1, 0, 1, 2, 3]
        const p = createPopulation(home, SamplePopulation)
        const actual = p.survive(sample(rolls) ?? 0)
        expect(actual).toBe(0)
      })

      it('returns 1 if you roll 4-6', () => {
        const rolls = [4, 5, 6]
        const p = createPopulation(home, SamplePopulation)
        const actual = p.survive(sample(rolls) ?? 5)
        expect(actual).toBe(1)
      })

      it('returns 2 if you roll 7-9', () => {
        const rolls = [7, 8, 9]
        const p = createPopulation(home, SamplePopulation)
        const actual = p.survive(sample(rolls) ?? 8)
        expect(actual).toBe(2)
      })

      it('returns 3 if you roll 10-12', () => {
        const rolls = [10, 11, 12]
        const p = createPopulation(home, SamplePopulation)
        const actual = p.survive(sample(rolls) ?? 11)
        expect(actual).toBe(3)
      })

      it('returns 4 if you roll 13 or higher', () => {
        const rolls = [13, 14, 15, 99]
        const p = createPopulation(home, SamplePopulation)
        const actual = p.survive(sample(rolls) ?? 99)
        expect(actual).toBe(4)
      })
    })

    describe('adjustSize', () => {
      it('adds if given a positive number > 1', () => {
        const p = createPopulation(home, SamplePopulation)
        const before = p.size
        p.adjustSize(32.7)
        expect(p.size).toBe(before + 32)
      })

      it('subtracts if given a negative number < -1', () => {
        const p = createPopulation(home, SamplePopulation)
        const before = p.size
        p.adjustSize(-32.7)
        expect(p.size).toBe(before - 33)
      })

      it('increases by percent if given a positive number <= 1', () => {
        const p = createPopulation(home, SamplePopulation)
        const before = p.size
        p.adjustSize(0.1)
        expect(p.size).toBe(Math.round(before * 1.1))
      })

      it('decreases by percent if given a negative number >= -1', () => {
        const p = createPopulation(home, SamplePopulation)
        const before = p.size
        p.adjustSize(-0.1)
        expect(p.size).toBe(Math.round(before * 0.9))
      })

      it('marks extinct if driven below zero', () => {
        const p = createPopulation(home, SamplePopulation)
        p.adjustSize(p.size * -2)
        expect(p.size).toBe(0)
        expect(p.extinct).toBe(true)
      })

      it('removes region\'s society if last population goes extinct', () => {
        const p = createPopulation(home, SamplePopulation)
        const region = p.getHome()
        const id = region.society
        expect(id).toBeDefined()
        expect(world.societies.has(id ?? '')).toBe(true)

        p.adjustSize(p.size * -2)
        expect(region.society).toBeNull()
        expect(world.regions.has(id ?? '')).toBe(false)
      })

      it('cannot revive an extinct population', () => {
        const p = createPopulation(home, SamplePopulation)
        p.extinct = true
        p.size = 0
        p.adjustSize(100000)
        expect(p.size).toBe(0)
        expect(p.extinct).toBe(true)
      })
    })

    describe('absorb', () => {
      it('absorbs some number of new individuals with different viability', () => {
        const p = createPopulation(home, SamplePopulation)
        p.absorb(SamplePopulation.size, 0.8)
        expect(p.size).toBe(SamplePopulation.size * 2)
        expect(p.viability).toBeCloseTo(0.85)
      })
    })

    describe('migrate', () => {
      it('takes some people form one population to create a new one somewhere else', () => {
        const n = 2000
        const src = world.regions.get('GS02')!
        const dest = world.regions.get('GS03')!
        const p = createPopulation(src.id, SamplePopulation)
        const tags = ['Migration', 'GS02', 'GS03']
        const q = { tags, logic: { tags: 'and' as const } }
        p.migrate(dest.id, n)
        const { history } = Simulation.instance()
        expect(world.populations.size()).toBe(2)
        expect(src.populations).toHaveLength(1)
        expect(dest.populations).toHaveLength(1)
        expect(world.populations.get(dest.populations[0])?.size).toBe(n)
        expect(world.populations.get(src.populations[0])?.size).toBe(SamplePopulation.size - n)
        expect(history.get(q)).toHaveLength(1)
      })

      it('merges migrants into existing population', () => {
        const n = 2000
        const { size } = SamplePopulation
        const src = world.regions.get('GS02')!
        const dest = world.regions.get('GS03')!
        const tags = ['Migration', 'GS02', 'GS03']
        const q = { tags, logic: { tags: 'and' as const } }
        const p = createPopulation(src.id, SamplePopulation)
        new Population(world, dest.id, SamplePopulation)
        p.migrate(dest.id, n)
        const { history } = Simulation.instance()
        expect(world.populations.size()).toBe(2)
        expect(src.populations).toHaveLength(1)
        expect(dest.populations).toHaveLength(1)
        expect(world.populations.get(dest.populations[0])?.size).toBe(size + n)
        expect(world.populations.get(src.populations[0])?.size).toBe(size - n)
        expect(history.get(q)).toHaveLength(1)
      })
    })

    describe('getProjectedSize', () => {
      it('reduces the population by 4d20 percent if given 0', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = p.getProjectedSize(0)
        expect(actual).toBeLessThanOrEqual((p.size * 0.96) + 1)
      })

      it('reduces the population by 3d10 percent if given 1', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = p.getProjectedSize(1)
        expect(actual).toBeLessThanOrEqual((p.size * 0.97) + 1)
        expect(actual).toBeGreaterThanOrEqual((p.size * 0.7) - 1)
      })

      it('reduces or increases the population by 2d8 percent if given 2', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = p.getProjectedSize(2)
        expect(actual).toBeGreaterThanOrEqual((p.size * 0.84) - 1)
        expect(actual).toBeLessThanOrEqual((p.size * 1.16) + 1)
      })

      it('increases the population by 3d10 percent if given 3', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = p.getProjectedSize(3)
        expect(actual).toBeLessThanOrEqual((p.size * 1.3) + 1)
        expect(actual).toBeGreaterThanOrEqual((p.size * 1.03) - 1)
      })

      it('increases the population by 4d20 percent if given 4', () => {
        const p = createPopulation(home, SamplePopulation)
        const actual = p.getProjectedSize(4)
        expect(actual).toBeLessThanOrEqual((p.size * 1.8) + 1)
        expect(actual).toBeGreaterThanOrEqual((p.size * 1.04) - 1)
      })
    })

    describe('findCannibals', () => {
      it('returns the number of incidents of cannibalism', () => {
        const p = createPopulation(home, SamplePopulation)
        const reports = p.getHome().survive()
        const actual = p.findCannibals(reports[0])
        expect(actual).toBeGreaterThanOrEqual(0)
      })
    })

    describe('apply50500', () => {
      it('drives a population with fewer than 50 individuals extinct', () => {
        const p = createPopulation(home, SamplePopulation)
        p.size = 45
        p.apply50500()
        expect(p.size).toBe(0)
        expect(p.extinct).toBe(true)
      })

      it('reduces the viability of a population with fewer than 500 individuals', () => {
        const p = createPopulation(home, SamplePopulation)
        p.size = 450
        p.apply50500()
        expect(p.size).toBe(450)
        expect(p.extinct).toBe(false)
        expect(p.viability).toBeCloseTo(SamplePopulation.viability * 0.75)
      })

      it('does nothing to a population with 500 individuals or more', () => {
        const p = createPopulation(home, SamplePopulation)
        p.size = 500
        p.apply50500()
        expect(p.size).toBe(500)
        expect(p.extinct).toBe(false)
        expect(p.viability).toBeCloseTo(SamplePopulation.viability)
      })
    })

    describe('runOgre', () => {
      it('simulates the impact of an ogre', () => {
        const { regions } = Simulation.instance().world
        regions.get(home)!.ogrism++
        const humans = createPopulation(home, SamplePopulation)
        const elves = createPopulation(home, Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.ELF }))
        const before = humans.size + elves.size
        const report = humans.runOgre()
        const present = [SPECIES_NAMES.HUMAN, SPECIES_NAMES.ELF]
        const all = Object.values(SPECIES_NAMES)
        const slain = sumOf(present.map(sp => report.victims[sp]), sp => sp.total)

        expect(report.origin).toBe(humans.id)
        expect([humans.id, elves.id, null]).toContain(report.slayer)
        expect(humans.size + elves.size).toBe(before - slain)

        for (const sp of all) {
          if (present.includes(sp)) {
            expect(report.victims[sp].total).toBeGreaterThanOrEqual(0)
            expect(report.victims[sp].total).toBeLessThanOrEqual(slain)
          } else {
            expect(report.victims[sp].total).toBe(0)
          }
        }
      })
    })

    describe('recordOgre', () => {
      const victims = {
        [SPECIES_NAMES.ELF]: { fighting: 10, murdered: 1, total: 11 },
        [SPECIES_NAMES.DWARF]: { fighting: 0, murdered: 0, total: 0 },
        [SPECIES_NAMES.GNOME]: { fighting: 0, murdered: 0, total: 0 },
        [SPECIES_NAMES.HALFLING]: { fighting: 0, murdered: 0, total: 0 },
        [SPECIES_NAMES.HUMAN]: { fighting: 15, murdered: 5, total: 20 },
        [SPECIES_NAMES.ORC]: { fighting: 0, murdered: 0, total: 0 },
        [SPECIES_NAMES.WOSAN]: { fighting: 0, murdered: 0, total: 0 },
      }
      it('records an ogre defeated by its own population in the history', () => {
        const { history } = Simulation.instance()
        const humans = createPopulation(home, SamplePopulation)
        humans.recordOgre({
          origin: humans.id,
          slayer: humans.id,
          victims
        })
        expect(history.get({ tags: ['Ogre', humans.id], logic: { tags: 'and' } })).toHaveLength(1)
      })

      it('records an ogre defeated by a different population in the history', () => {
        const { history } = Simulation.instance()
        const humans = createPopulation(home, SamplePopulation)
        const elves = createPopulation(home, Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.ELF }))
        humans.recordOgre({
          origin: humans.id,
          slayer: elves.id,
          victims
        })
        expect(history.get({ tags: ['Ogre', humans.id, elves.id], logic: { tags: 'and' } })).toHaveLength(1)
      })

      it('records an undefeated ogre in the history', () => {
        const { history } = Simulation.instance()
        const humans = createPopulation(home, SamplePopulation)
        humans.recordOgre({
          origin: humans.id,
          slayer: null,
          victims
        })
        expect(history.get({ tags: ['Ogre', humans.id], logic: { tags: 'and' } })).toHaveLength(1)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, SamplePopulation, { extinct: false })
        const p = createPopulation(home, SamplePopulation)
        cpy.id = p.id
        cpy.scrolls = p.scribe.toObject()
        expect(JSON.stringify(p.toObject())).toBe(JSON.stringify(cpy))
      })

      it('reports on extinction', () => {
        const cpy = Object.assign({}, SamplePopulation, { size: 0, extinct: true })
        const p = createPopulation(home, SamplePopulation)
        p.size = 0;
        p.extinct = true
        cpy.id = p.id
        cpy.scrolls = p.scribe.toObject()
        expect(JSON.stringify(p.toObject())).toBe(JSON.stringify(cpy))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const p = createPopulation(home, SamplePopulation)
        expect(p.toString()).toBe(`Population: ${p.id}`)
      })
    })
  })
})
