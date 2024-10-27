import Emittery from 'emittery'
import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Markable, { MARKABLE_EVENTS } from './Markable.ts'

describe('Markable', () => {
  const emitter = new Emittery()
  const id = 'example-markable'
  const marker = 'Example'
  const markers = [marker]

  describe('constructor', () => {
    it('creates a Markable instance', () => {
      const mark = new Markable(emitter)
      expect(mark).toBeInstanceOf(Markable)
    })

    it('defaults ID to a random UUID', () => {
      const mark = new Markable(emitter)
      expect(mark.id).toBeDefined()
    })

    it('defaults markers to an empty list', () => {
      const mark = new Markable(emitter)
      expect(mark.markers).toHaveLength(0)
    })

    it('can take an ID', () => {
      const mark = new Markable(emitter, { id })
      expect(mark.id).toBe(id)
    })

    it('can take markers', () => {
      const mark = new Markable(emitter, { markers })
      expect(mark.markers).toHaveLength(1)
    })
  })

  describe('Member methods', () => {
    describe('addMarker', () => {
      const mark = new Markable(emitter)
      mark.addMarker(marker)
      expect(mark.markers).toHaveLength(1)
    })

    describe('removeMarker', () => {
      const mark = new Markable(emitter, { markers })
      mark.removeMarker(marker)
      expect(mark.markers).toHaveLength(0)
    })
  })

  describe('Event handling', () => {
    describe(MARKABLE_EVENTS.ADD, () => {
      const event = MARKABLE_EVENTS.ADD

      it('adds a marker', async () => {
        const mark = new Markable(emitter, { id, markers: [] })
        await emitter.emit(event, { id, marker })
        expect(mark.markers).toHaveLength(1)
      })
    })

    describe(MARKABLE_EVENTS.REMOVE, () => {
      const event = MARKABLE_EVENTS.REMOVE

      it('removes a marker', async () => {
        const mark = new Markable(emitter, { id, markers })
        await emitter.emit(event, { id, marker })
        expect(mark.markers).toHaveLength(0)
      })
    })
  })
})
