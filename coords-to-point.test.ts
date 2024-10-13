import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { point } from '@turf/turf'
import coordsToPoint from './coords-to-point.ts'

describe('coordsToPoint', () => {
  it('converts (900, 450) to [0, 0]', () => {
    expect(coordsToPoint(900, 450)).toEqual(point([0, 0]))
  })

  it('converts (1350, 225) to [90, 45]', () => {
    const result = coordsToPoint(1350, 225)
    expect(result.geometry.coordinates[0]).toBeCloseTo(90, 0)
    expect(result.geometry.coordinates[1]).toBeCloseTo(45, 0)
  })

  it('converts (450, 225) to [-90, 45]', () => {
    const result = coordsToPoint(450, 225)
    expect(result.geometry.coordinates[0]).toBeCloseTo(-90, 0)
    expect(result.geometry.coordinates[1]).toBeCloseTo(45, 0)
  })

  it('converts (1350, 675) to [90, -45]', () => {
    const result = coordsToPoint(1350, 675)
    expect(result.geometry.coordinates[0]).toBeCloseTo(90, 0)
    expect(result.geometry.coordinates[1]).toBeCloseTo(-45, 0)
  })

  it('converts (450, 675) to [-90, -45]', () => {
    const result = coordsToPoint(450, 675)
    expect(result.geometry.coordinates[0]).toBeCloseTo(-90, 0)
    expect(result.geometry.coordinates[1]).toBeCloseTo(-45, 0)
  })
})
