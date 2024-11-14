import { describe, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Simulation from './Simulation.ts'
import Markable from './Markable.ts'

describe('Markable', () => {
  const id = 'example-markable'
  const marker = 'Example'
  const markers = [marker]

  afterEach(() => { Simulation.reset() })

  describe('constructor', () => {
    it('creates a Markable instance', () => {
      const mark = new Markable()
      expect(mark).toBeInstanceOf(Markable)
    })

    it('defaults ID to a random UUID', () => {
      const mark = new Markable()
      expect(mark.id).toBeDefined()
    })

    it('defaults markers to an empty list', () => {
      const mark = new Markable()
      expect(mark.markers).toHaveLength(0)
    })

    it('can take an ID', () => {
      const mark = new Markable({ id })
      expect(mark.id).toBe(id)
    })

    it('can take markers', () => {
      const mark = new Markable({ markers })
      expect(mark.markers).toHaveLength(1)
    })
  })

  describe('Member methods', () => {
    describe('addMarker', () => {
      it('adds a marker', () => {
        const mark = new Markable()
        mark.addMarker(marker)
        expect(mark.markers).toHaveLength(1)
      })
    })

    describe('removeMarker', () => {
      it('removes a marker', () => {
        const mark = new Markable({markers})
        mark.removeMarker(marker)
        expect(mark.markers).toHaveLength(0)
      })
    })
  })
})
