import { point } from '@turf/turf'

const MAP_WIDTH = 1800
const MAP_HEIGHT = 900

const coordsToPoint = (x: number, y: number) => {
  const lon = (x / MAP_WIDTH) * 360 - 180
  const lat = 90 - (y / MAP_HEIGHT) * 180
  return point([
    Number(lon.toFixed(6)),
    Number(lat.toFixed(6))
  ])
}

export default coordsToPoint
