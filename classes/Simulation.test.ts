import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SIMULATION_STAGES, SPECIES_NAMES } from '../enums.ts'
import Simulation from './Simulation.ts'

describe('Simulation', () => {
  describe('constructor', () => {
    it('creates a Simulation instance', () => {
      const sim = new Simulation()
      expect(sim).toBeInstanceOf(Simulation)
    })

    it('starts at millennium 1', () => {
      const { millennium } = new Simulation()
      expect(millennium).toBe(1)
    })

    it('starts in the refresh stage', () => {
      const { stage } = new Simulation()
      expect(stage).toBe(SIMULATION_STAGES.REFRESH)
    })

    it('starts with a history with just one event', () => {
      const { history } = new Simulation()
      expect(history.events).toHaveLength(1)
    })

    it('creates a world', () => {
      const { world } = new Simulation()
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
        const sim = new Simulation()
        const scenarios = [
          [SIMULATION_STAGES.REFRESH, SIMULATION_STAGES.EVENT, 1],
          [SIMULATION_STAGES.EVENT, SIMULATION_STAGES.GROWTH, 1],
          [SIMULATION_STAGES.GROWTH, SIMULATION_STAGES.RESOLUTION, 1],
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
        const sim = new Simulation()
        sim.world.habitability = 0.5
        sim.refresh()
        expect(sim.world.habitability).toBeCloseTo(0.75)
      })
    })
  })
})
