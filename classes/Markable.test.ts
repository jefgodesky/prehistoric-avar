import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Markable from './Markable.ts'

describe('Markable', () => {
  const marker = 'Example'
  const markers = [marker]

  describe('constructor', () => {
    it('creates a Markable instance', () => {
      const mark = new Markable()
      expect(mark).toBeInstanceOf(Markable)
    })

    it('defaults markers to an empty list', () => {
      const mark = new Markable()
      expect(mark.markers).toHaveLength(0)
    })

    it('can take markers', () => {
      const mark = new Markable({ markers })
      expect(mark.markers).toHaveLength(1)
    })
  })

  describe('Member methods', () => {
    describe('addMarker', () => {
      const mark = new Markable()
      mark.addMarker(marker)
      expect(mark.markers).toHaveLength(1)
    })

    describe('removeMarker', () => {
      const mark = new Markable({ markers })
      mark.removeMarker(marker)
      expect(mark.markers).toHaveLength(0)
    })
  })
})
