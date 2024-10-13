import { IPoint } from './index.t.ts'

const MAP_WIDTH = 1800 // px
const MAP_HEIGHT = 900 // px

const coordsToPoint = (x: number, y: number): IPoint => {
  return {
    latitude: 90 - (y / MAP_HEIGHT) * 180,
    longitude: -180 + (x / MAP_WIDTH) * 360
  }
}

export default coordsToPoint
