import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IPopulation } from '../../index.d.ts'
import {SPECIES_NAMES, EVENTS_GLOBAL_UNIQUE, SpeciesPlurals} from '../../enums.ts'
import { SamplePopulation } from '../../test-examples.ts'
import Population from '../../classes/Population.ts'
import Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'
import createSpeciationScroll, { getSpeciationScrollText } from './speciation.ts'

describe('getSpeciationScrollText', () => {
  it('returns text for a given species', () => {
    const scenarios = [
      [SPECIES_NAMES.DWARF, 'We become dwarves.'],
      [SPECIES_NAMES.GNOME, 'We become gnomes.'],
      [SPECIES_NAMES.HALFLING, 'We become halflings.'],
      [SPECIES_NAMES.HUMAN, 'We become humans.'],
      [SPECIES_NAMES.ORC, 'We become orcs.']
    ]

    for (const [species, text] of scenarios) {
      expect(getSpeciationScrollText(species)).toBe(text)
    }
  })
})

describe('createSpeciationScroll', () => {
  let sim: Simulation

  const createPopulation = (
    sim: Simulation,
    data: IPopulation,
    region?: Region
  ): { region: Region, population: Population } => {
    const home = region ?? sim.regions[0]
    const population = new Population(sim.emitter, home, data)
    home.introduce(population)
    return { region: home, population }
  }

  const createWosanPopulation = (sim: Simulation): Population => {
    const data = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
    const { population } = createPopulation(sim, data)
    return population
  }

  const createDwarfPopulation = (sim: Simulation): Population => {
    const data = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.DWARF })
    const { population } = createPopulation(sim, data)
    return population
  }

  const createHumanPopulation = (sim: Simulation): Population => {
    const { population } = createPopulation(sim, SamplePopulation)
    return population
  }

  beforeEach(() => { sim = new Simulation() })

  it('returns a scroll', () => {
    const scenarios: Array<[string, string, number, Population, string]> = [
      [SPECIES_NAMES.DWARF, 'We become dwarves.', 50, createWosanPopulation(sim), EVENTS_GLOBAL_UNIQUE.DWARVES],
      [SPECIES_NAMES.GNOME, 'We become gnomes.', 20, createDwarfPopulation(sim), EVENTS_GLOBAL_UNIQUE.GNOMES],
      [SPECIES_NAMES.HALFLING, 'We become halflings.', 40, createHumanPopulation(sim), EVENTS_GLOBAL_UNIQUE.HALFLINGS],
      [SPECIES_NAMES.HUMAN, 'We become humans.', 50, createWosanPopulation(sim), EVENTS_GLOBAL_UNIQUE.HUMANS],
      [SPECIES_NAMES.ORC, 'We become orcs.', 50, createWosanPopulation(sim), EVENTS_GLOBAL_UNIQUE.ORCS]
    ]

    for (const [species, text, generations, p, event] of scenarios) {
      const scroll = createSpeciationScroll(species, p)
      expect(scroll.text).toBe(text)
      expect(scroll.seals).toBe(500) // See block comment at end for justification
      expect(scroll.onUnseal()).toBe(generations)

      scroll.open()
      expect(p.species.name).toBe(species)
      expect(sim.world.events).toContain(event)
      expect(sim.history.get({ tags: [SpeciesPlurals[species]] }).length).toBe(1)
    }
  })

  it('removes all other scrolls with the same name when it is opened', () => {
    const data = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
    const h1 = sim.regions[1]
    const h2 = sim.regions[2]
    const { population: p1 } = createPopulation(sim, data, h1)
    const { population: p2 } = createPopulation(sim, data, h2)
    p1.scribe.scrolls.push(createSpeciationScroll(SPECIES_NAMES.HUMAN, p1))
    p2.scribe.scrolls.push(createSpeciationScroll(SPECIES_NAMES.HUMAN, p2))

    expect(p1.scribe.scrolls).toHaveLength(2)
    expect(p2.scribe.scrolls).toHaveLength(2)

    const scroll = p1.scribe.scrolls.find(scroll => scroll.text === 'We become humans.')
    scroll!.open()

    expect(p1.scribe.scrolls).toHaveLength(1)
    expect(p2.scribe.scrolls).toHaveLength(1)
  })
})

/**
 *   So, where the hell do I get off with such a low number? Even with elves,
 *   we're estimating a single generation to be 200 years (measured by when
 *   they start having kids, not how long they can live individually), so 500
 *   generations means just 100,000 years. Homo floresiensis may have been
 *   isolated on the island of Flores for 1.27 million years to become the
 *   "hobbits" that we discover from just c. 10kya. Am I not, in the absolute
 *   most *grounded* possible interpretation, speeding up the pace of hominid
 *   evolution by an order of magnitude here?
 *
 *   Well, first of all, this is a fantasy setting, and this is less about
 *   genetic dispersal than it is a sort of Lamarckian, magical "radiation" of
 *   "humanness" or "elfness" that comes from specific places.
 *
 *   Second of all, see Hendry, et. al (2008), who suggest that "[e]cological
 *   speciation can commence within dozens of generations," so I'm actually
 *   *hedging* by setting it at 500.
 *
 *   But let's be real, that's an excuse. There's every chance I'm misreading
 *   or misinterpreting what that article actually says. The citation is just
 *   to insist that it's not a *crazy* number. The real reason is that this is
 *   a fantasy setting and this is magic.
 *
 *   Hendry, A., Nosil, P., and Riesberg, L., "The speed of ecological
 *     speciation," Functional Ecology, 2007 Jun;21(3):455–464
 *     https://pmc.ncbi.nlm.nih.gov/articles/PMC2605086/
 */