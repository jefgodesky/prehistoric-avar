import { LAYER as LAYERS } from './layer.ts'
import parseRegionId from './parse-region-id.ts'

const makeLayerId = (id: string, layer: LAYERS): string => {
  const [code, num] = parseRegionId(id)
  return [code, layer, num].join('')
}

export default makeLayerId
