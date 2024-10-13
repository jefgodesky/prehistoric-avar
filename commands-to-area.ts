import { getAreaOfPolygon } from 'geolib'
import commandsToPoints from './commands-to-points.ts'
import { IPoint } from './index.t.ts'

const EARTH_RADIUS = 6371 // km
const AVAR_RADIUS = 5000 // km
const SCALING_FACTOR = (AVAR_RADIUS / EARTH_RADIUS) ** 2
const M2_IN_KM2 = 1000000

const commandsToArea = (d: string): number => {
  const points: IPoint[] = commandsToPoints(d)
  const earthly = getAreaOfPolygon(points)
  const m2 = earthly * SCALING_FACTOR
  return m2 / M2_IN_KM2
}

export default commandsToArea
