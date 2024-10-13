import { point } from '@turf/turf'
import coordsToPoint from './coords-to-point.ts'

const commandsToPoints = (svgPath: string): ReturnType<typeof point>[] => {
  const numberRegex = /-?\d+(\.\d+)?/g
  const numbers = svgPath.match(numberRegex)
  if (!numbers) { return [] }

  const coords = numbers.map(Number)
  const points: ReturnType<typeof point>[] = []
  for (let i = 0; i < coords.length; i += 2) {
    const x = coords[i]
    const y = coords[i + 1]
    if (x !== undefined && y !== undefined) {
      points.push(coordsToPoint(x, y))
    }
  }

  return points
}

export default commandsToPoints
