import { describe, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { TERRESTRIAL_ELEMENTS } from '../../enums.ts'
import AirElemental from '../../classes/immortals/elementals/Air.ts'
import EarthElemental from '../../classes/immortals/elementals/Earth.ts'
import FireElemental from '../../classes/immortals/elementals/Fire.ts'
import WaterElemental from '../../classes/immortals/elementals/Water.ts'
import Simulation from '../../classes/Simulation.ts'
import createElemental from './elemental.ts'

describe('createElemental', () => {
  afterEach(() => {
    Simulation.reset()
  })

  it('creates an air elemental', () => {
    const { world } = Simulation.instance()
    const actual = createElemental('MS06', TERRESTRIAL_ELEMENTS.AIR)
    expect(actual).toBeInstanceOf(AirElemental)
    expect(world.immortals.keys()).toContain(actual.id)
  })

  it('creates an earth elemental', () => {
    const { world } = Simulation.instance()
    const actual = createElemental('MS06', TERRESTRIAL_ELEMENTS.EARTH)
    expect(actual).toBeInstanceOf(EarthElemental)
    expect(world.immortals.keys()).toContain(actual.id)
  })

  it('creates a fire elemental', () => {
    const { world } = Simulation.instance()
    const actual = createElemental('MS06', TERRESTRIAL_ELEMENTS.FIRE)
    expect(actual).toBeInstanceOf(FireElemental)
    expect(world.immortals.keys()).toContain(actual.id)
  })

  it('creates a water elemental', () => {
    const { world } = Simulation.instance()
    const actual = createElemental('MS06', TERRESTRIAL_ELEMENTS.WATER)
    expect(actual).toBeInstanceOf(WaterElemental)
    expect(world.immortals.keys()).toContain(actual.id)
  })
})
