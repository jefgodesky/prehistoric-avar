import type { Layer } from '../enums.ts'
import parseRegionId from './parse-region-id.ts'

const makeLayerId = (id: string, layer: Layer): string => {
  const [code, num] = parseRegionId(id)
  return [code, layer, num].join('')
}

export default makeLayerId
