import { BIOMES, SPECIES_NAMES } from '../../enums.ts'
import Species from '../../classes/Species.ts'

export default new Species({
  name: SPECIES_NAMES.HALFLING,
  ancestor: SPECIES_NAMES.HUMAN,
  generation: 40,
  fitness: {
    [BIOMES.BOREAL_FOREST]: 0,
    [BIOMES.TEMPERATE_FOREST]: 1,
    [BIOMES.TROPICAL_FOREST]: 1,
    [BIOMES.DESERT]: -1,
    [BIOMES.SAVANNA]: 2,
    [BIOMES.TEMPERATE_GRASSLAND]: 2,
    [BIOMES.MOUNTAINS]: -2,
    [BIOMES.POLAR]: -3,
    [BIOMES.CAVES]: -3,
    [BIOMES.WORLD_BELOW]: -1
  },
  langPrefs: {}
})
