import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import {BIOMES, LANG_MORPHOLOGY, LANG_ORDER, SPECIES_NAMES} from './enums.ts'
import {
  getElf,
  getDwarf,
  getGnome,
  getHalfling,
  getHuman,
  getOrc,
  getWosan
} from './get-species.ts'

describe('Species instantiators', () => {
  describe('getElf', () => {
    it('returns the elf species', () => {
      const elf = getElf()
      expect(elf.name).toEqual(SPECIES_NAMES.ELF)
      expect(elf.ancestor).toEqual(undefined)
      expect(elf.fitness[BIOMES.BOREAL_FOREST]).toEqual(3)
      expect(elf.fitness[BIOMES.TEMPERATE_FOREST]).toEqual(3)
      expect(elf.fitness[BIOMES.TROPICAL_FOREST]).toEqual(3)
      expect(elf.fitness[BIOMES.DESERT]).toEqual(-3)
      expect(elf.fitness[BIOMES.SAVANNA]).toEqual(-2)
      expect(elf.fitness[BIOMES.TEMPERATE_GRASSLAND]).toEqual(-2)
      expect(elf.fitness[BIOMES.MOUNTAINS]).toEqual(-3)
      expect(elf.fitness[BIOMES.POLAR]).toEqual(-3)
      expect(elf.fitness[BIOMES.CAVES]).toEqual(0)
      expect(elf.fitness[BIOMES.WORLD_BELOW]).toEqual(1)
      expect(elf.generation).toEqual(10)
      expect(elf.langPrefs?.typology).toEqual([LANG_MORPHOLOGY.ANALYTIC])
      expect(elf.langPrefs?.order).toEqual([LANG_ORDER.VOS, LANG_ORDER.VSO])
      expect(elf.appeared).toEqual(undefined)
    })
  })

  describe('getDwarf', () => {
    it('returns the dwarf species', () => {
      const dwarf = getDwarf()
      expect(dwarf.name).toEqual(SPECIES_NAMES.DWARF)
      expect(dwarf.ancestor).toEqual(SPECIES_NAMES.WOSAN)
      expect(dwarf.fitness[BIOMES.BOREAL_FOREST]).toEqual(2)
      expect(dwarf.fitness[BIOMES.TEMPERATE_FOREST]).toEqual(1)
      expect(dwarf.fitness[BIOMES.TROPICAL_FOREST]).toEqual(-1)
      expect(dwarf.fitness[BIOMES.DESERT]).toEqual(-2)
      expect(dwarf.fitness[BIOMES.SAVANNA]).toEqual(1)
      expect(dwarf.fitness[BIOMES.TEMPERATE_GRASSLAND]).toEqual(1)
      expect(dwarf.fitness[BIOMES.MOUNTAINS]).toEqual(3)
      expect(dwarf.fitness[BIOMES.POLAR]).toEqual(0)
      expect(dwarf.fitness[BIOMES.CAVES]).toEqual(3)
      expect(dwarf.fitness[BIOMES.WORLD_BELOW]).toEqual(1)
      expect(dwarf.generation).toEqual(20)
      expect(dwarf.langPrefs?.typology).toEqual(undefined)
      expect(dwarf.langPrefs?.order).toEqual([LANG_ORDER.SOV])
      expect(dwarf.appeared).toEqual(undefined)
    })
  })

  describe('getGnome', () => {
    it('returns the gnome species', () => {
      const gnome = getGnome()
      expect(gnome.name).toEqual(SPECIES_NAMES.GNOME)
      expect(gnome.ancestor).toEqual(SPECIES_NAMES.DWARF)
      expect(gnome.fitness[BIOMES.BOREAL_FOREST]).toEqual(1)
      expect(gnome.fitness[BIOMES.TEMPERATE_FOREST]).toEqual(2)
      expect(gnome.fitness[BIOMES.TROPICAL_FOREST]).toEqual(-1)
      expect(gnome.fitness[BIOMES.DESERT]).toEqual(-2)
      expect(gnome.fitness[BIOMES.SAVANNA]).toEqual(1)
      expect(gnome.fitness[BIOMES.TEMPERATE_GRASSLAND]).toEqual(2)
      expect(gnome.fitness[BIOMES.MOUNTAINS]).toEqual(3)
      expect(gnome.fitness[BIOMES.POLAR]).toEqual(-1)
      expect(gnome.fitness[BIOMES.CAVES]).toEqual(3)
      expect(gnome.fitness[BIOMES.WORLD_BELOW]).toEqual(3)
      expect(gnome.generation).toEqual(20)
      expect(gnome.langPrefs?.typology).toEqual([LANG_MORPHOLOGY.ANALYTIC])
      expect(gnome.langPrefs?.order).toEqual(undefined)
      expect(gnome.appeared).toEqual(undefined)
    })
  })

  describe('getHalfling', () => {
    it('returns the halfling species', () => {
      const halfling = getHalfling()
      expect(halfling.name).toEqual(SPECIES_NAMES.HALFLING)
      expect(halfling.ancestor).toEqual(SPECIES_NAMES.HUMAN)
      expect(halfling.fitness[BIOMES.BOREAL_FOREST]).toEqual(0)
      expect(halfling.fitness[BIOMES.TEMPERATE_FOREST]).toEqual(1)
      expect(halfling.fitness[BIOMES.TROPICAL_FOREST]).toEqual(2)
      expect(halfling.fitness[BIOMES.DESERT]).toEqual(-1)
      expect(halfling.fitness[BIOMES.SAVANNA]).toEqual(2)
      expect(halfling.fitness[BIOMES.TEMPERATE_GRASSLAND]).toEqual(2)
      expect(halfling.fitness[BIOMES.MOUNTAINS]).toEqual(-2)
      expect(halfling.fitness[BIOMES.POLAR]).toEqual(-3)
      expect(halfling.fitness[BIOMES.CAVES]).toEqual(-3)
      expect(halfling.fitness[BIOMES.WORLD_BELOW]).toEqual(-1)
      expect(halfling.generation).toEqual(40)
      expect(halfling.langPrefs?.typology).toEqual(undefined)
      expect(halfling.langPrefs?.order).toEqual(undefined)
      expect(halfling.appeared).toEqual(undefined)
    })
  })

  describe('getHuman', () => {
    it('returns the human species', () => {
      const human = getHuman()
      expect(human.name).toEqual(SPECIES_NAMES.HUMAN)
      expect(human.ancestor).toEqual(SPECIES_NAMES.WOSAN)
      expect(human.fitness[BIOMES.BOREAL_FOREST]).toEqual(0)
      expect(human.fitness[BIOMES.TEMPERATE_FOREST]).toEqual(1)
      expect(human.fitness[BIOMES.TROPICAL_FOREST]).toEqual(0)
      expect(human.fitness[BIOMES.DESERT]).toEqual(-1)
      expect(human.fitness[BIOMES.SAVANNA]).toEqual(2)
      expect(human.fitness[BIOMES.TEMPERATE_GRASSLAND]).toEqual(2)
      expect(human.fitness[BIOMES.MOUNTAINS]).toEqual(-2)
      expect(human.fitness[BIOMES.POLAR]).toEqual(-3)
      expect(human.fitness[BIOMES.CAVES]).toEqual(-3)
      expect(human.fitness[BIOMES.WORLD_BELOW]).toEqual(-1)
      expect(human.generation).toEqual(40)
      expect(human.langPrefs?.typology).toEqual(undefined)
      expect(human.langPrefs?.order).toEqual(undefined)
      expect(human.appeared).toEqual(undefined)
    })
  })

  describe('getOrc', () => {
    it('returns the orc species', () => {
      const orc = getOrc()
      expect(orc.name).toEqual(SPECIES_NAMES.ORC)
      expect(orc.ancestor).toEqual(SPECIES_NAMES.WOSAN)
      expect(orc.fitness[BIOMES.BOREAL_FOREST]).toEqual(3)
      expect(orc.fitness[BIOMES.TEMPERATE_FOREST]).toEqual(2)
      expect(orc.fitness[BIOMES.TROPICAL_FOREST]).toEqual(-1)
      expect(orc.fitness[BIOMES.DESERT]).toEqual(-2)
      expect(orc.fitness[BIOMES.SAVANNA]).toEqual(2)
      expect(orc.fitness[BIOMES.TEMPERATE_GRASSLAND]).toEqual(2)
      expect(orc.fitness[BIOMES.MOUNTAINS]).toEqual(1)
      expect(orc.fitness[BIOMES.POLAR]).toEqual(0)
      expect(orc.fitness[BIOMES.CAVES]).toEqual(0)
      expect(orc.fitness[BIOMES.WORLD_BELOW]).toEqual(1)
      expect(orc.generation).toEqual(50)
      expect(orc.langPrefs?.typology).toEqual([LANG_MORPHOLOGY.AGGLUTINATIVE])
      expect(orc.langPrefs?.order).toEqual([LANG_ORDER.VSO, LANG_ORDER.VOS])
      expect(orc.appeared).toEqual(undefined)
    })
  })

  describe('getWosan', () => {
    it('returns the wosan species', () => {
      const wosan = getWosan()
      expect(wosan.name).toEqual(SPECIES_NAMES.WOSAN)
      expect(wosan.ancestor).toEqual(undefined)
      expect(wosan.fitness[BIOMES.BOREAL_FOREST]).toEqual(0)
      expect(wosan.fitness[BIOMES.TEMPERATE_FOREST]).toEqual(1)
      expect(wosan.fitness[BIOMES.TROPICAL_FOREST]).toEqual(0)
      expect(wosan.fitness[BIOMES.DESERT]).toEqual(-2)
      expect(wosan.fitness[BIOMES.SAVANNA]).toEqual(2)
      expect(wosan.fitness[BIOMES.TEMPERATE_GRASSLAND]).toEqual(1)
      expect(wosan.fitness[BIOMES.MOUNTAINS]).toEqual(-2)
      expect(wosan.fitness[BIOMES.POLAR]).toEqual(-3)
      expect(wosan.fitness[BIOMES.CAVES]).toEqual(-3)
      expect(wosan.fitness[BIOMES.WORLD_BELOW]).toEqual(-1)
      expect(wosan.generation).toEqual(50)
      expect(wosan.langPrefs).toEqual(undefined)
      expect(wosan.appeared).toEqual(undefined)
    })
  })
})
