import { area } from '@turf/area'

const EARTH_RADIUS = 6371 // km
const AVAR_RADIUS = 5000 // km
const SCALING_FACTOR = (AVAR_RADIUS / EARTH_RADIUS) ** 2
const GEOJSON_DIRECTORY = './geojson'
const M2_IN_KM2 = 1e6

const calculateArea = async (id: string): Promise<number> => {
  try {
    const path = `${GEOJSON_DIRECTORY}/${id}.geojson`
    const str = await Deno.readTextFile(path)
    const data = JSON.parse(str)
    const feature = data.features[0]
    if (!feature && feature.geometry.type !== 'Polygon') throw new Error(`No valid Polygon geometry found in region ${id}`)
    const earthly = area(feature)
    const m2 = earthly * SCALING_FACTOR
    return Math.round(m2 / M2_IN_KM2)
  } catch (error) {
    console.error('Error: ', error)
    return 0
  }
}

export default calculateArea
