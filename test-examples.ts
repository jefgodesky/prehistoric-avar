import {
  BIOMES,
  SPECIES_NAMES
} from './enums.ts'

import {
  IImmortal,
  IPopulation,
  IQuest,
  ISociety,
  ISpecies
} from './index.d.ts'

const SamplePopulation: IPopulation = {
  id: 'GS02-123HU',
  species: SPECIES_NAMES.HUMAN,
  markers: ['Example marker'],
  size: 54321,
  viability: 0.9,
  scrolls: [
    {
      text: 'Example scroll',
      seals: 10
    }
  ]
}

const WosanData: ISpecies = {
  name: SPECIES_NAMES.WOSAN,
  generation: 50,
  canSpeak: false,
  fitness: {
    [BIOMES.BOREAL_FOREST]: 0,
    [BIOMES.TEMPERATE_FOREST]: 1,
    [BIOMES.TROPICAL_FOREST]: 0,
    [BIOMES.DESERT]: -2,
    [BIOMES.SAVANNA]: 2,
    [BIOMES.TEMPERATE_GRASSLAND]: 1,
    [BIOMES.MOUNTAINS]: -2,
    [BIOMES.POLAR]: -3,
    [BIOMES.CAVES]: -3,
    [BIOMES.WORLD_BELOW]: -1
  }
}

const ElfData: ISpecies = {
  name: SPECIES_NAMES.ELF,
  ancestor: SPECIES_NAMES.WOSAN,
  generation: 10,
  canSpeak: true,
  fitness: {
    [BIOMES.BOREAL_FOREST]: 3,
    [BIOMES.TEMPERATE_FOREST]: 3,
    [BIOMES.TROPICAL_FOREST]: 3,
    [BIOMES.DESERT]: -2,
    [BIOMES.SAVANNA]: 0,
    [BIOMES.TEMPERATE_GRASSLAND]: 0,
    [BIOMES.MOUNTAINS]: -1,
    [BIOMES.POLAR]: -3,
    [BIOMES.CAVES]: -3,
    [BIOMES.WORLD_BELOW]: 1
  }
}

const HumanData: ISpecies = {
  name: SPECIES_NAMES.HUMAN,
  ancestor: SPECIES_NAMES.WOSAN,
  generation: 40,
  canSpeak: true,
  fitness: {
    [BIOMES.BOREAL_FOREST]: 0,
    [BIOMES.TEMPERATE_FOREST]: 1,
    [BIOMES.TROPICAL_FOREST]: 0,
    [BIOMES.DESERT]: -1,
    [BIOMES.SAVANNA]: 2,
    [BIOMES.TEMPERATE_GRASSLAND]: 2,
    [BIOMES.MOUNTAINS]: -2,
    [BIOMES.POLAR]: -3,
    [BIOMES.CAVES]: -3,
    [BIOMES.WORLD_BELOW]: -1
  }
}

const SampleSociety: ISociety = {
  fitness: {
    [BIOMES.BOREAL_FOREST]: 1,
    [BIOMES.TEMPERATE_FOREST]: 0,
    [BIOMES.TROPICAL_FOREST]: 0,
    [BIOMES.DESERT]: 0,
    [BIOMES.SAVANNA]: 0,
    [BIOMES.TEMPERATE_GRASSLAND]: 0,
    [BIOMES.MOUNTAINS]: 0,
    [BIOMES.POLAR]: 0,
    [BIOMES.CAVES]: 0,
    [BIOMES.WORLD_BELOW]: 0
  },
  scrolls: [
    {
      text: `We better adapt to ${BIOMES.BOREAL_FOREST}`,
      seals: 2
    },
    {
      text: 'We remember the heroes who slew the ogre bear',
      seals: 150
    }
  ]
}

const SampleQuest: IQuest = {
  id: 'slay-dragon-queen',
  description: 'Slay the Dragon Queen',
  courage: 0.0001,
  skill: 0.000001,
  lethality: 0.9,
  accomplished: false,
  attempts: []
}

const DragonQueen: IImmortal = {
  description: 'The Dragon Queen',
  impact: 1000,
  scrolls: [
    {
      text: 'The Dragon Queen finds a consort',
      seals: 4
    }
  ],
  slayable: SampleQuest
}

export {
  DragonQueen,
  SamplePopulation,
  SampleQuest,
  SampleSociety,
  ElfData,
  HumanData,
  WosanData
}
