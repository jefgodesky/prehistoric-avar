import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import commandsToArea from './commands-to-area.ts'

describe('commandsToArea', () => {
  it('calculates the area of a square near the equator', () => {
    expect(commandsToArea('M450,450 L1350,450 L1350,900 L450,900 Z')).toBeCloseTo(78715880.6, 1)
  })

  it('calculates the area of a complex polygon near the south pole', () => {
    expect(commandsToArea('M300,800 L600,850 L900,800 L1200,850 L1500,800 Z')).toBeCloseTo(2367518.2, 1)
  })
})
