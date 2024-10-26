import { BIOMES, SPECIES_NAMES } from '../../enums.ts'
import Species from '../../classes/Species.ts'

export default new Species({
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
})
