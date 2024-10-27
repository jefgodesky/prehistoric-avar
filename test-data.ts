import {
  BIOMES,
  DISPOSITIONS,
  LANG_MORPHOLOGY,
  LANG_ORDER,
  SPECIES_NAMES
} from './enums.ts'

import {
  IImmortal,
  IPopulation,
  IRegion,
  IRelationship,
  ISpecies,
  ITradition
} from './index.d.ts'

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
  slayable: [1000000, 500000]
}

const SamplePopulation: IPopulation = {
  id: 'GS02-123HU',
  species: SPECIES_NAMES.HUMAN,
  tradition: {
    fitness: {
      [BIOMES.BOREAL_FOREST]: 0,
      [BIOMES.TEMPERATE_FOREST]: 0,
      [BIOMES.TROPICAL_FOREST]: 0,
      [BIOMES.DESERT]: 0,
      [BIOMES.SAVANNA]: 1,
      [BIOMES.TEMPERATE_GRASSLAND]: 1,
      [BIOMES.MOUNTAINS]: 0,
      [BIOMES.POLAR]: 0,
      [BIOMES.CAVES]: 0,
      [BIOMES.WORLD_BELOW]: 0
    },
    scrolls: [
      {
        text: 'We adapt to temperate grasslands',
        seals: 2
      },
      {
        text: 'We forget the ways of the savanna',
        seals: 3
      }
    ]
  },
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
  },
  languagePreferences: {
    typology: [LANG_MORPHOLOGY.ANALYTIC],
    order: [LANG_ORDER.VSO, LANG_ORDER.VOS]
  }
}

const HumanData: ISpecies = {
  name: SPECIES_NAMES.HUMAN,
  ancestor: SPECIES_NAMES.WOSAN,
  generation: 40,
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
  },
  languagePreferences: {}
}

const SampleTradition: ITradition = {
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

const DS01: IRegion = {
  id: 'DS01',
  adjacentRegions: ['DC01', 'MS06', 'GS06', 'GS10', 'FS23'],
  area: 2688696,
  biome: BIOMES.DESERT,
  capacity: 17924,
  dragons: [],
  features: [],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  ogrism: 0,
  populations: [],
  tags: ['desert', 'hot', 'surface']
}

for (let i = 0; i < 25; i++) {
  DS01.features.push({
    description: 'Oasis',
    impact: 100
  })
}

const GS02: IRegion = {
  id: 'GS02',
  adjacentRegions: ['GC01', 'FS08', 'MS03', 'GS02', 'MS02', 'GS03'],
  area: 870978,
  biome: BIOMES.SAVANNA,
  capacity: 31935,
  dragons: ['storm dragon'],
  features: [],
  feyInfluence: 2,
  habitability: 1,
  immortals: [],
  languages: [
    {
      name: 'GS02-002',
      order: LANG_ORDER.SOV,
      morphology: LANG_MORPHOLOGY.ANALYTIC
    },
    {
      name: 'GS02-001',
      order: LANG_ORDER.SOV,
      morphology: LANG_MORPHOLOGY.FUSIONAL
    }
  ],
  ogrism: 1,
  populations: [SamplePopulation],
  tags: ['grassland', 'tropical', 'surface', 'coastal']
}

const FS32: IRegion = {
  id: 'FS32',
  adjacentRegions: ['FC32'],
  area: 140985,
  biome: BIOMES.TROPICAL_FOREST,
  capacity: 15273,
  dragons: ['storm dragon', 'forest dragon'],
  features: [],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  ogrism: 0,
  populations: [],
  species: SPECIES_NAMES.HALFLING,
  tags: ['forest', 'tropical', 'surface', 'coastal']
}

export {
  DragonQueen,
  SamplePopulation,
  SampleRelationship,
  SampleTradition,
  ElfData,
  HumanData,
  WosanData,
  DS01,
  GS02,
  FS32
}
