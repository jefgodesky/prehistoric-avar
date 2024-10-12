const AVAR_RADIUS = 5000 // km
const MAP_WIDTH = 1800 // px
const MAP_HEIGHT = 900 // px

const calculateArea = (path: string): number => {
  const points = path.split(/[MmLlHhVvCcSsQqTtAaZz]/).filter(Boolean).map(coord => coord.trim().split(/[,\s]+/).map(Number))
  let area = 0
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length
    const [x1, y1] = points[i]
    const [x2, y2] = points[j]
    area += (x1 * y2 - x2 * y1)
  }
  area = Math.abs(area / 2)
  return pixelAreaToSphereArea(area)
}

const pixelAreaToSphereArea = (pixelArea: number): number => {
  const mapArea = MAP_WIDTH * MAP_HEIGHT
  const sphereSurfaceArea = 4 * Math.PI * AVAR_RADIUS * AVAR_RADIUS
  return (pixelArea / mapArea) * sphereSurfaceArea
}

export default calculateArea
