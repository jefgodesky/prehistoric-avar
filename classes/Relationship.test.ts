import Emittery from 'emittery'
import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../enums.ts'
import { SampleRelationship } from '../test-examples.ts'
import Relationship from './Relationship.ts'

describe('Relationship', () => {
  const emitter = new Emittery()

  describe('constructor', () => {
    it('creates a Relationship instance', () => {
      const rel = new Relationship(emitter)
      expect(rel).toBeInstanceOf(Relationship)
    })

    it('defaults A to a null string', () => {
      const rel = new Relationship(emitter)
      expect(rel.a).toBe('')
    })

    it('defaults B to a null string', () => {
      const rel = new Relationship(emitter)
      expect(rel.b).toBe('')
    })

    it('defaults disposition to indifference', () => {
      const rel = new Relationship(emitter)
      expect(rel.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    })

    it('defaults scrolls to an empty list', () => {
      const rel = new Relationship(emitter)
      expect(rel.scribe.scrolls).toHaveLength(0)
    })

    it('can set A', () => {
      const rel = new Relationship(emitter, SampleRelationship)
      expect(rel.a).toBe(SampleRelationship.a)
    })

    it('can set B', () => {
      const rel = new Relationship(emitter, SampleRelationship)
      expect(rel.b).toBe(SampleRelationship.b)
    })

    it('can set the disposition', () => {
      const rel = new Relationship(emitter, SampleRelationship)
      expect(rel.disposition).toBe(SampleRelationship.disposition)
    })

    it('can set the scrolls', () => {
      const rel = new Relationship(emitter, SampleRelationship)
      expect(rel.scribe.scrolls).toHaveLength(SampleRelationship.scrolls.length)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, SampleRelationship)
        const rel = new Relationship(emitter, SampleRelationship)
        cpy.scrolls = rel.scribe.toObject()
        expect(JSON.stringify(rel.toObject())).toBe(JSON.stringify(cpy))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const { a, b, disposition } = SampleRelationship
        const rel = new Relationship(emitter, SampleRelationship)
        expect(rel.toString()).toBe(`${a} → ${b} [${disposition}]`)
      })
    })
  })
})
