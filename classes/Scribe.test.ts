import Emittery from 'emittery'
import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IScroll } from '../index.d.ts'
import Scroll from './Scroll.ts'
import Scribe from './Scribe.ts'

describe('Scribe', () => {
  const emitter = new Emittery()

  describe('constructor', () => {
    it('creates a Scribe instance', () => {
      const d = new Scribe(emitter)
      expect(d).toBeInstanceOf(Scribe)
    })

    it('defaults to an empty array of scrolls', () => {
      const d = new Scribe(emitter)
      expect(d.scrolls).toHaveLength(0)
    })

    it('can take scrolls', () => {
      const scroll = new Scroll('Test scroll', 5)
      const d = new Scribe(emitter, scroll)
      expect(d.scrolls).toHaveLength(1)
    })

    it('can take scroll data', () => {
      const scroll: IScroll = { text: 'Test scroll', seals: 5 }
      const d = new Scribe(emitter, scroll)
      expect(d.scrolls).toHaveLength(1)
    })

    it('can take a mix of scroll instances and scroll data', () => {
      const data: IScroll = { text: 'Test scroll', seals: 5 }
      const instance = new Scroll('Test scroll', 5)
      const d = new Scribe(emitter, data, instance)
      expect(d.scrolls).toHaveLength(2)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const scroll: IScroll = { text: 'Test scroll', seals: 5 }
        const d = new Scribe(emitter, scroll)
        const cpy = Object.assign({ id: d.scrolls[0].id }, scroll)
        expect(JSON.stringify(d.toObject())).toBe(JSON.stringify([cpy]))
      })
    })
  })

  describe('Event handling', () => {
    describe('Scroll.Open', () => {
      const event = 'Scroll.Open'

      it('removes the scroll', async () => {
        const scroll = new Scroll('Test scroll', 5)
        const d = new Scribe(emitter, scroll)
        await emitter.emit(event, scroll.toObject())
        expect(d.scrolls).toHaveLength(0)
      })
    })
  })
})