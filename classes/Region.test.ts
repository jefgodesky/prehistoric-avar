import Emittery from 'emittery'
import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DS01, GS02, FS32 } from '../test-data.ts'
import Region from './Region.ts'

describe('Region', () => {
  const emitter = new Emittery()

  describe('constructor', () => {
    it('creates a Region instance', () => {
      const region = new Region(emitter)
      expect(region).toBeInstanceOf(Region)
    })

    it('defaults id to a null string', () => {
      const region = new Region(emitter)
      expect(region.id).toBe('')
    })

    it('defaults adjacent regions to an empty array', () => {
      const region = new Region(emitter)
      expect(region.adjacentRegions).toHaveLength(0)
    })

    it('defaults area to 0', () => {
      const region = new Region(emitter)
      expect(region.area).toBe(0)
    })

    it('defaults biome to null', () => {
      const region = new Region(emitter)
      expect(region.biome).toBe(null)
    })

    it('defaults carrying capacity to 0', () => {
      const region = new Region(emitter)
      expect(region.capacity).toBe(0)
    })

    it('defaults dragons to an empty array', () => {
      const region = new Region(emitter)
      expect(region.dragons).toHaveLength(0)
    })

    it('defaults features to an empty array', () => {
      const region = new Region(emitter)
      expect(region.features).toHaveLength(0)
    })

    it('defaults fey influence to 0', () => {
      const region = new Region(emitter)
      expect(region.feyInfluence).toBe(0)
    })

    it('defaults habitability to 1', () => {
      const region = new Region(emitter)
      expect(region.habitability).toBe(1)
    })

    it('defaults immortals to an empty array', () => {
      const region = new Region(emitter)
      expect(region.immortals).toHaveLength(0)
    })

    it('defaults languages to an empty array', () => {
      const region = new Region(emitter)
      expect(region.languages).toHaveLength(0)
    })

    it('defaults ogrism to 0', () => {
      const region = new Region(emitter)
      expect(region.ogrism).toBe(0)
    })

    it('defaults populations to an empty array', () => {
      const region = new Region(emitter)
      expect(region.populations).toHaveLength(0)
    })

    it('has no species by default', () => {
      const region = new Region(emitter)
      expect(region.species).not.toBeDefined()
    })

    it('defaults tags to an empty array', () => {
      const region = new Region(emitter)
      expect(region.tags).toHaveLength(0)
    })

    it('can take id', () => {
      const region = new Region(emitter, GS02)
      expect(region.id).toBe(GS02.id)
    })

    it('can take an array of adjacent regions', () => {
      const region = new Region(emitter, GS02)
      expect(region.adjacentRegions).toHaveLength(GS02.adjacentRegions.length)
    })

    it('can take area', () => {
      const region = new Region(emitter, GS02)
      expect(region.area).toBe(GS02.area)
    })

    it('can take biome', () => {
      const region = new Region(emitter, GS02)
      expect(region.biome).toBe(GS02.biome)
    })

    it('can take carrying capacity', () => {
      const region = new Region(emitter, GS02)
      expect(region.capacity).toBe(GS02.capacity)
    })

    it('can take dragons', () => {
      const region = new Region(emitter, GS02)
      expect(region.dragons).toHaveLength(GS02.dragons.length)
    })

    it('can take features', () => {
      const region = new Region(emitter, DS01)
      expect(region.features).toHaveLength(DS01.features.length)
    })

    it('can take fey influence', () => {
      const region = new Region(emitter, GS02)
      expect(region.feyInfluence).toBe(GS02.feyInfluence)
    })

    it('can take habitability', () => {
      const habitability = 0.75
      const region = new Region(emitter, Object.assign({}, GS02, { habitability }))
      expect(region.habitability).toBe(habitability)
    })

    it('can take immortals', () => {
      const region = new Region(emitter, GS02)
      expect(region.immortals).toHaveLength(GS02.immortals.length)
    })

    it('can take languages', () => {
      const region = new Region(emitter, GS02)
      expect(region.languages).toHaveLength(GS02.languages.length)
    })

    it('can take ogrism', () => {
      const region = new Region(emitter, GS02)
      expect(region.ogrism).toBe(GS02.ogrism)
    })

    it('can take populations', () => {
      const region = new Region(emitter, GS02)
      expect(region.populations).toHaveLength(GS02.populations.length)
    })

    it('can take a species', () => {
      const region = new Region(emitter, FS32)
      expect(region.species).toBe(FS32.species)
    })

    it('can take tags', () => {
      const region = new Region(emitter, GS02)
      expect(region.tags).toHaveLength(GS02.tags.length)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const region = new Region(emitter, FS32)
        expect(region.toObject()).toEqual(FS32)
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const region = new Region(emitter, FS32)
        expect(region.toString()).toEqual(FS32.id)
      })
    })
  })
})
