import { BIOMES, LANG_MORPHOLOGY, LANG_ORDER, SPECIES_NAMES } from '../../enums.ts'
import Species from '../../classes/Species.ts'

export default new Species({
  name: SPECIES_NAMES.ORC,
  ancestor: SPECIES_NAMES.WOSAN,
  generation: 50,
  fitness: {
    [BIOMES.BOREAL_FOREST]: 3,
    [BIOMES.TEMPERATE_FOREST]: 2,
    [BIOMES.TROPICAL_FOREST]: -1,
    [BIOMES.DESERT]: -2,
    [BIOMES.SAVANNA]: 0,
    [BIOMES.TEMPERATE_GRASSLAND]: 1,
    [BIOMES.MOUNTAINS]: 1,
    [BIOMES.POLAR]: 0,
    [BIOMES.CAVES]: 0,
    [BIOMES.WORLD_BELOW]: 1
  },
  languagePreferences: {
    typology: [LANG_MORPHOLOGY.AGGLUTINATIVE],
    order: [LANG_ORDER.VSO, LANG_ORDER.VOS]
  }
})
