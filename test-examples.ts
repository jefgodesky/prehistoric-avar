import {
  BIOMES,
  DISPOSITIONS,
  SPECIES_NAMES
} from './enums.ts'

import {
  IImmortal,
  IPopulation,
  IQuest,
  IRelationship,
  ISociety,
  ISpecies
} from './index.d.ts'

const SamplePopulation: IPopulation = {
  id: 'GS02-123HU',
  species: SPECIES_NAMES.HUMAN,
  markers: ['Example marker'],
  size: 54321,
  viability: 0.9,
  relationships: [
    {
      a: 'Population: GS02-123HU',
      b: 'Immortal: The Dragon Queen',
      disposition: DISPOSITIONS.HOSTILE,
      scrolls: []
    }
  ],
  scrolls: [
    {
      text: 'Example scroll',
      seals: 10
    }
  ]
}

const SampleRelationship: IRelationship = {
  a: 'Population: GS03-001WO',
  b: 'Immortal: The Dragon Queen',
  disposition: DISPOSITIONS.HOSTILE,
  scrolls: [
    {
      text: 'We will come to worship the Dragon Queen',
      seals: 10
    },
    {
      text: 'We will invent gods to protect us from the Dragon Queen',
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
  lethality: 0.9
}

const DragonQueen: IImmortal = {
  description: 'The Dragon Queen',
  disposition: DISPOSITIONS.HOSTILE,
  impact: 1000,
  relationships: [
    {
      a: 'Immortal: The Dragon Queen',
      b: 'Population: GS03-001WO',
      disposition: DISPOSITIONS.HOSTILE,
      scrolls: []
    }
  ],
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
  SampleRelationship,
  SampleSociety,
  ElfData,
  HumanData,
  WosanData
}
