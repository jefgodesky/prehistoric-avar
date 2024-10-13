import { polygon, area } from '@turf/turf'
import commandsToPoints from './commands-to-points.ts'

const EARTH_RADIUS = 6371 // km
const AVAR_RADIUS = 5000 // km
const AREA_SCALE_FACTOR = Math.pow(AVAR_RADIUS / EARTH_RADIUS, 2)

const commandsToArea = (svgPath: string): number => {
  const points = commandsToPoints(svgPath)

  // Ensure the polygon is closed by adding the first point at the end if necessary
  if (points.length > 0 &&
    (points[0].geometry.coordinates[0] !== points[points.length - 1].geometry.coordinates[0] ||
      points[0].geometry.coordinates[1] !== points[points.length - 1].geometry.coordinates[1])) {
    points.push(points[0])
  }

  const coordinates = points.map(point => point.geometry.coordinates)
  const poly = polygon([coordinates])
  return area(poly) * AREA_SCALE_FACTOR / 1000000
}

export default commandsToArea
