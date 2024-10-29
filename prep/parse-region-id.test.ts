import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import parseRegionId from './parse-region-id.ts'

describe('parseRegionId', () => {
  it('parses letter and numerical code', () => {
    const [code, id] = parseRegionId('G12')
    expect(code).toBe('G')
    expect(id).toBe('12')
  })

  it('parses full region IDs, complete with layer', () => {
    const [code, layer, id] = parseRegionId('GS12')
    expect(code).toBe('G')
    expect(layer).toBe('S')
    expect(id).toBe('12')
  })
})
