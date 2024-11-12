import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IPopulation } from '../../index.d.ts'
import { SPECIES_NAMES, EVENTS_GLOBAL_UNIQUE } from '../../enums.ts'
import { SamplePopulation } from '../../test-examples.ts'
import Population from '../../classes/Population.ts'
import Simulation from '../../classes/Simulation.ts'
import createSpeciationScroll, { getSpeciationScrollText } from './speciation.ts'

describe('getSpeciationScrollText', () => {
  let sim: Simulation

  beforeEach(() => { sim = new Simulation() })

  it('returns text for a given species', () => {
    const scenarios = [
      [SPECIES_NAMES.DWARF, 'We become dwarves.'],
      [SPECIES_NAMES.GNOME, 'We become gnomes.'],
      [SPECIES_NAMES.HALFLING, 'We become halflings.'],
      [SPECIES_NAMES.HUMAN, 'We become humans.'],
      [SPECIES_NAMES.ORC, 'We become orcs.']
    ]

    for (const [name, text] of scenarios) {
      const species = sim.world.species.get(name.toLowerCase())!
      expect(getSpeciationScrollText(species)).toBe(text)
    }
  })
})

describe('createSpeciationScroll', () => {
  let sim: Simulation

  const createPopulation = (
    sim: Simulation,
    data: IPopulation,
    region: string = sim.regions[0].id
  ): Population => {
    return new Population(sim, region, data)
  }

  const createWosanPopulation = (sim: Simulation, region?: string): Population => {
    const data = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
    return createPopulation(sim, data, region)
  }

  const createDwarfPopulation = (sim: Simulation, region?: string): Population => {
    const data = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.DWARF })
    return createPopulation(sim, data, region)
  }

  const createHumanPopulation = (sim: Simulation, region?: string): Population => {
    return createPopulation(sim, SamplePopulation, region)
  }

  beforeEach(() => { sim = new Simulation() })

  it('returns a scroll', () => {
    const scenarios: Array<[string, string, Population, string]> = [
      [SPECIES_NAMES.DWARF, 'We become dwarves.', createWosanPopulation(sim), EVENTS_GLOBAL_UNIQUE.DWARVES],
      [SPECIES_NAMES.GNOME, 'We become gnomes.', createDwarfPopulation(sim), EVENTS_GLOBAL_UNIQUE.GNOMES],
      [SPECIES_NAMES.HALFLING, 'We become halflings.', createHumanPopulation(sim), EVENTS_GLOBAL_UNIQUE.HALFLINGS],
      [SPECIES_NAMES.HUMAN, 'We become humans.', createWosanPopulation(sim), EVENTS_GLOBAL_UNIQUE.HUMANS],
      [SPECIES_NAMES.ORC, 'We become orcs.', createWosanPopulation(sim), EVENTS_GLOBAL_UNIQUE.ORCS]
    ]

    for (const [name, text, p, event] of scenarios) {
      const species = sim.world.species.get(name.toLowerCase())!
      const scroll = createSpeciationScroll(sim, name, p)
      expect(scroll.text).toBe(text)
      expect(scroll.seals).toBe(500) // See block comment at end for justification

      scroll.open()
      expect(p.getSpecies().name).toBe(species.name)
      expect(sim.world.events).toContain(event)
      expect(sim.history.get({ tags: [species.getPlural()] }).length).toBe(1)
    }
  })

  it('unseals in proper regions', () => {
    const scenarios: Array<[string, Population, number]> = [
      [SPECIES_NAMES.DWARF, createWosanPopulation(sim, 'MS06'), 50],
      [SPECIES_NAMES.GNOME, createDwarfPopulation(sim, 'MD06'), 20],
      [SPECIES_NAMES.HALFLING, createHumanPopulation(sim, 'FS32'), 40],
      [SPECIES_NAMES.HUMAN, createWosanPopulation(sim, 'GS03'), 50],
      [SPECIES_NAMES.ORC, createWosanPopulation(sim, 'FS02'), 50]
    ]

    for (const [species, p, generation] of scenarios) {
      const scroll = createSpeciationScroll(sim, species, p)
      expect(scroll.onUnseal()).toBe(generation)
    }
  })

  it('will not unseal in other regions', () => {
    const scenarios: Array<[string, Population]> = [
      [SPECIES_NAMES.DWARF, createWosanPopulation(sim, 'GS02')],
      [SPECIES_NAMES.GNOME, createDwarfPopulation(sim, 'GS02')],
      [SPECIES_NAMES.HALFLING, createHumanPopulation(sim, 'GS02')],
      [SPECIES_NAMES.HUMAN, createWosanPopulation(sim, 'GS02')],
      [SPECIES_NAMES.ORC, createWosanPopulation(sim, 'GS02')]
    ]

    for (const [species, p] of scenarios) {
      const scroll = createSpeciationScroll(sim, species, p)
      expect(scroll.onUnseal()).toBe(0)
    }
  })

  it('removes all other scrolls with the same name when it is opened', () => {
    const data = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
    const p1 = createPopulation(sim, data, sim.regions[1].id)
    const p2 = createPopulation(sim, data, sim.regions[2].id)
    p1.scribe.scrolls.push(createSpeciationScroll(sim, SPECIES_NAMES.HUMAN, p1))
    p2.scribe.scrolls.push(createSpeciationScroll(sim, SPECIES_NAMES.HUMAN, p2))

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