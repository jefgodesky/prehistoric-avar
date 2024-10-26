import { BIOMES, LANG_ORDER, SPECIES_NAMES } from '../../enums.ts'
import Species from '../../classes/Species.ts'

export default new Species({
  name: SPECIES_NAMES.DWARF,
  ancestor: SPECIES_NAMES.WOSAN,
  generation: 20,
  fitness: {
    [BIOMES.BOREAL_FOREST]: 2,
    [BIOMES.TEMPERATE_FOREST]: 1,
    [BIOMES.TROPICAL_FOREST]: -1,
    [BIOMES.DESERT]: -2,
    [BIOMES.SAVANNA]: 1,
    [BIOMES.TEMPERATE_GRASSLAND]: 1,
    [BIOMES.MOUNTAINS]: 3,
    [BIOMES.POLAR]: 0,
    [BIOMES.CAVES]: 1,
    [BIOMES.WORLD_BELOW]: 2
  },
  languagePreferences: {
    order: [LANG_ORDER.SOV]
  }
})