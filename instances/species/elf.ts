import { BIOMES, LANG_MORPHOLOGY, LANG_ORDER, SPECIES_NAMES } from '../../enums.ts'
import Species from '../../classes/Species.ts'

export default new Species({
  name: SPECIES_NAMES.ELF,
  ancestor: SPECIES_NAMES.WOSAN,
  generation: 10,
  fitness: {
    [BIOMES.BOREAL_FOREST]: 3,
    [BIOMES.TEMPERATE_FOREST]: 3,
    [BIOMES.TROPICAL_FOREST]: 3,
    [BIOMES.DESERT]: -3,
    [BIOMES.SAVANNA]: 0,
    [BIOMES.TEMPERATE_GRASSLAND]: 0,
    [BIOMES.MOUNTAINS]: -3,
    [BIOMES.POLAR]: -3,
    [BIOMES.CAVES]: 0,
    [BIOMES.WORLD_BELOW]: 1
  },
  langPrefs: {
    typology: [LANG_MORPHOLOGY.FUSIONAL],
    order: [LANG_ORDER.VSO, LANG_ORDER.VOS]
  }
})
