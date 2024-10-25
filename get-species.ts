import { IFitness, ISpecies } from './index.d.ts'
import {BIOMES, LANG_MORPHOLOGY, LANG_ORDER, SPECIES_NAMES} from './enums.ts'

const getElf = (): ISpecies => {
  const fitness: IFitness = {}
  fitness[BIOMES.BOREAL_FOREST] = 3
  fitness[BIOMES.TEMPERATE_FOREST] = 3
  fitness[BIOMES.TROPICAL_FOREST] = 3
  fitness[BIOMES.DESERT] = -3
  fitness[BIOMES.SAVANNA] = -2
  fitness[BIOMES.TEMPERATE_GRASSLAND] = -2
  fitness[BIOMES.MOUNTAINS] = -3
  fitness[BIOMES.POLAR] = -3
  fitness[BIOMES.CAVES] = 0
  fitness[BIOMES.WORLD_BELOW] = 1

  return {
    name: SPECIES_NAMES.ELF,
    fitness,
    generation: 10,
    langPrefs: {
      typology: [LANG_MORPHOLOGY.ANALYTIC],
      order: [LANG_ORDER.VOS, LANG_ORDER.VSO]
    }
  }
}

const getDwarf = (): ISpecies => {
  const fitness: IFitness = {}
  fitness[BIOMES.BOREAL_FOREST] = 2
  fitness[BIOMES.TEMPERATE_FOREST] = 1
  fitness[BIOMES.TROPICAL_FOREST] = -1
  fitness[BIOMES.DESERT] = -2
  fitness[BIOMES.SAVANNA] = 1
  fitness[BIOMES.TEMPERATE_GRASSLAND] = 1
  fitness[BIOMES.MOUNTAINS] = 3
  fitness[BIOMES.POLAR] = 0
  fitness[BIOMES.CAVES] = 3
  fitness[BIOMES.WORLD_BELOW] = 1

  return {
    name: SPECIES_NAMES.DWARF,
    ancestor: SPECIES_NAMES.WOSAN,
    fitness,
    generation: 20,
    langPrefs: {
      order: [LANG_ORDER.SOV]
    }
  }
}

const getGnome = (): ISpecies => {
  const fitness: IFitness = {}
  fitness[BIOMES.BOREAL_FOREST] = 1
  fitness[BIOMES.TEMPERATE_FOREST] = 2
  fitness[BIOMES.TROPICAL_FOREST] = -1
  fitness[BIOMES.DESERT] = -2
  fitness[BIOMES.SAVANNA] = 1
  fitness[BIOMES.TEMPERATE_GRASSLAND] = 2
  fitness[BIOMES.MOUNTAINS] = 3
  fitness[BIOMES.POLAR] = -1
  fitness[BIOMES.CAVES] = 3
  fitness[BIOMES.WORLD_BELOW] = 3

  return {
    name: SPECIES_NAMES.GNOME,
    ancestor: SPECIES_NAMES.DWARF,
    fitness,
    generation: 20,
    langPrefs: {
      typology: [LANG_MORPHOLOGY.ANALYTIC]
    }
  }
}

const getHalfling = (): ISpecies => {
  const fitness: IFitness = {}
  fitness[BIOMES.BOREAL_FOREST] = 0
  fitness[BIOMES.TEMPERATE_FOREST] = 1
  fitness[BIOMES.TROPICAL_FOREST] = 2
  fitness[BIOMES.DESERT] = -1
  fitness[BIOMES.SAVANNA] = 2
  fitness[BIOMES.TEMPERATE_GRASSLAND] = 2
  fitness[BIOMES.MOUNTAINS] = -2
  fitness[BIOMES.POLAR] = -3
  fitness[BIOMES.CAVES] = -3
  fitness[BIOMES.WORLD_BELOW] = -1

  return {
    name: SPECIES_NAMES.HALFLING,
    ancestor: SPECIES_NAMES.HUMAN,
    fitness,
    generation: 40,
    langPrefs: {}
  }
}

const getHuman = (): ISpecies => {
  const fitness: IFitness = {}
  fitness[BIOMES.BOREAL_FOREST] = 0
  fitness[BIOMES.TEMPERATE_FOREST] = 1
  fitness[BIOMES.TROPICAL_FOREST] = 0
  fitness[BIOMES.DESERT] = -1
  fitness[BIOMES.SAVANNA] = 2
  fitness[BIOMES.TEMPERATE_GRASSLAND] = 2
  fitness[BIOMES.MOUNTAINS] = -2
  fitness[BIOMES.POLAR] = -3
  fitness[BIOMES.CAVES] = -3
  fitness[BIOMES.WORLD_BELOW] = -1

  return {
    name: SPECIES_NAMES.HUMAN,
    ancestor: SPECIES_NAMES.WOSAN,
    fitness,
    generation: 40,
    langPrefs: {}
  }
}

const getOrc = (): ISpecies => {
  const fitness: IFitness = {}
  fitness[BIOMES.BOREAL_FOREST] = 3
  fitness[BIOMES.TEMPERATE_FOREST] = 2
  fitness[BIOMES.TROPICAL_FOREST] = -1
  fitness[BIOMES.DESERT] = -2
  fitness[BIOMES.SAVANNA] = 2
  fitness[BIOMES.TEMPERATE_GRASSLAND] = 2
  fitness[BIOMES.MOUNTAINS] = 1
  fitness[BIOMES.POLAR] = 0
  fitness[BIOMES.CAVES] = 0
  fitness[BIOMES.WORLD_BELOW] = 1

  return {
    name: SPECIES_NAMES.ORC,
    ancestor: SPECIES_NAMES.WOSAN,
    fitness,
    generation: 50,
    langPrefs: {
      typology: [LANG_MORPHOLOGY.AGGLUTINATIVE],
      order: [LANG_ORDER.VSO, LANG_ORDER.VOS]
    }
  }
}

const getWosan = (): ISpecies => {
  const fitness: IFitness = {}
  fitness[BIOMES.BOREAL_FOREST] = 0
  fitness[BIOMES.TEMPERATE_FOREST] = 1
  fitness[BIOMES.TROPICAL_FOREST] = 0
  fitness[BIOMES.DESERT] = -2
  fitness[BIOMES.SAVANNA] = 2
  fitness[BIOMES.TEMPERATE_GRASSLAND] = 1
  fitness[BIOMES.MOUNTAINS] = -2
  fitness[BIOMES.POLAR] = -3
  fitness[BIOMES.CAVES] = -3
  fitness[BIOMES.WORLD_BELOW] = -1

  return {
    name: SPECIES_NAMES.WOSAN,
    fitness,
    generation: 50
  }
}

export {
  getElf,
  getDwarf,
  getGnome,
  getHalfling,
  getHuman,
  getOrc,
  getWosan
}
