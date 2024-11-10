import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../../enums.ts'
import type Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'
import createArchfey from './archfey.ts'

describe('createArchfey', () => {
  let sim: Simulation
  let region: Region

  beforeEach(() => {
    sim = new Simulation()
    region = sim.world.regions.get('FS11')!
  })

  it('creates an archfey', () => {
    const archfey = createArchfey(sim, region)
    expect(archfey.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    expect(archfey.description).toBe(`Archfey Sovereign of ${region.id}`)
    expect(archfey.impact).toBe(-250)
    expect(archfey.slayable).not.toBe(false)
  })
})
