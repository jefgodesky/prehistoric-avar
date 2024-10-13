import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IPoint } from './index.t.ts'
import commandsToPoints from './commands-to-points.ts'

describe('commandsToPoints', () => {
  it('converts an SVG path for a square to an array of IPoint objects', () => {
    const points = commandsToPoints('M450,450 L1350,450 L1350,900 L450,900 Z')
    const map = points.map((p: IPoint) => [p.latitude, p.longitude])
    expect(map).toEqual([[0, -90], [0, 90], [-90, 90], [-90, -90]])
  })

  it('converts an SVG path for a complex polygon near the south pole to an array of IPoint objects', () => {
    const points = commandsToPoints('M300,800 L600,850 L900,800 L1200,850 L1500,800 Z')
    const map = points.map((p: IPoint) => [p.latitude, p.longitude])
    console.log({ points, map })
    expect(map).toEqual([[-70, -120], [-80, -60], [-70, 0], [-80, 60], [-70, 120]])
  })
})
