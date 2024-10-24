import { LAYER } from './enums.ts'
import type { Layer } from './enums.ts'
import makeLayerId from './make-layer-id.ts'

const getAdjacencyList = (id: string, data: { [key: string]: string[] }, layer: Layer = LAYER.SURFACE): string[] => {
  let regions: string[] = []
  const s = makeLayerId(id, LAYER.SURFACE)
  const c = makeLayerId(id, LAYER.NEAR_SURFACE)
  const d = makeLayerId(id, LAYER.WORLD_BELOW)

  if (layer === LAYER.SURFACE || layer === LAYER.WORLD_BELOW) regions = [c]
  if (layer === LAYER.NEAR_SURFACE) regions = [s, d]

  return [
    ...regions,
    ...data[id].map(region => makeLayerId(region, layer))
  ]
}

export default getAdjacencyList
