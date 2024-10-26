import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../enums.ts'
import { SampleRelationship } from '../test-data.ts'
import Relationship from './Relationship.ts'

describe('Relationship', () => {
  describe('constructor', () => {
    it('creates a Relationship instance', () => {
      const rel = new Relationship()
      expect(rel).toBeInstanceOf(Relationship)
    })

    it('defaults A to a null string', () => {
      const rel = new Relationship()
      expect(rel.a).toBe('')
    })

    it('defaults B to a null string', () => {
      const rel = new Relationship()
      expect(rel.b).toBe('')
    })

    it('defaults disposition to indifference', () => {
      const rel = new Relationship()
      expect(rel.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    })

    it('defaults scrolls to an empty list', () => {
      const rel = new Relationship()
      expect(rel.scrolls).toHaveLength(0)
    })

    it('can set A', () => {
      const rel = new Relationship(SampleRelationship)
      expect(rel.a).toBe(SampleRelationship.a)
    })

    it('can set B', () => {
      const rel = new Relationship(SampleRelationship)
      expect(rel.b).toBe(SampleRelationship.b)
    })

    it('can set the disposition', () => {
      const rel = new Relationship(SampleRelationship)
      expect(rel.disposition).toBe(SampleRelationship.disposition)
    })

    it('can set the scrolls', () => {
      const rel = new Relationship(SampleRelationship)
      expect(rel.scrolls).toHaveLength(SampleRelationship.scrolls.length)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const rel = new Relationship(SampleRelationship)
        expect(JSON.stringify(rel.toObject())).toBe(JSON.stringify(SampleRelationship))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const { a, b, disposition } = SampleRelationship
        const rel = new Relationship(SampleRelationship)
        expect(rel.toString()).toBe(`${a} → ${b} [${disposition}]`)
      })
    })
  })
})
