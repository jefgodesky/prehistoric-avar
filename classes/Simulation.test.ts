import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SIMULATION_STAGES, SPECIES_NAMES } from '../enums.ts'
import Simulation, { BaseSimulation, END_THRESHOLD } from './Simulation.ts'

describe('Simulation', () => {
  let sim: BaseSimulation

  beforeEach(() => {
    sim = Simulation.instance()
  })

  afterEach(() => {
    Simulation.reset()
  })

  describe('constructor', () => {
    it('creates a Simulation instance', () => {
      expect(sim).toBeInstanceOf(Simulation)
    })

    it('starts at millennium 1', () => {
      expect(sim.millennium).toBe(1)
    })

    it('starts in the refresh stage', () => {
      expect(sim.stage).toBe(SIMULATION_STAGES.REFRESH)
    })

    it('starts with a history with just one event', () => {
      expect(sim.history.events).toHaveLength(1)
    })

    it('creates a world', () => {
      const { world } = sim
      expect(world.events).toHaveLength(0)
      expect(world.regions.size()).toBe(189)
      for (const species of Object.values(SPECIES_NAMES)) {
        expect(world.species.keys()).toContain(species.toLowerCase())
      }
    })
  })

  describe('Member methods', () => {
    describe('advance', () => {
      it(`advances from one stage to the next`, () => {
        const scenarios = [
          [SIMULATION_STAGES.REFRESH, SIMULATION_STAGES.EVENT, 1],
          [SIMULATION_STAGES.EVENT, SIMULATION_STAGES.GROWTH, 1],
          [SIMULATION_STAGES.GROWTH, SIMULATION_STAGES.EXPANSION, 1],
          [SIMULATION_STAGES.EXPANSION, SIMULATION_STAGES.RESOLUTION, 1],
          [SIMULATION_STAGES.RESOLUTION, SIMULATION_STAGES.REFRESH, 2]
        ]

        for (const [start, end, millennium] of scenarios) {
          sim.stage = start as string
          expect(sim.advance()).toEqual(`${end} ${millennium}`)
        }
      })
    })

    describe('refresh', () => {
      it('recovers global habitability', () => {
        sim.world.habitability = 0.5
        sim.refresh()
        expect(sim.world.habitability).toBeCloseTo(0.75)
      })
    })

    describe('end', () => {
      it('returns false if the sum of draconic interest and fear is below threshold', () => {
        expect(sim.end()).toBe(false)
      })

      it('returns true if the sum of draconic interest and fear is equal to threshold', () => {
        sim.world.dragons.interest.value = END_THRESHOLD - 50
        sim.world.dragons.fear.value = 50
        expect(sim.end()).toBe(true)
      })

      it('returns true if the sum of draconic interest and fear exceeds threshold', () => {
        sim.world.dragons.interest.value = END_THRESHOLD
        sim.world.dragons.fear.value = END_THRESHOLD
        expect(sim.end()).toBe(true)
      })
    })
  })
})
