import { BIOMES, LANG_MORPHOLOGY, SPECIES_NAMES } from '../../enums.ts'
import Species from '../../classes/Species.ts'

export default new Species({
  name: SPECIES_NAMES.GNOME,
  ancestor: SPECIES_NAMES.DWARF,
  generation: 20,
  fitness: {
    [BIOMES.BOREAL_FOREST]: 1,
    [BIOMES.TEMPERATE_FOREST]: 2,
    [BIOMES.TROPICAL_FOREST]: -1,
    [BIOMES.DESERT]: -2,
    [BIOMES.SAVANNA]: 1,
    [BIOMES.TEMPERATE_GRASSLAND]: 2,
    [BIOMES.MOUNTAINS]: 3,
    [BIOMES.POLAR]: -1,
    [BIOMES.CAVES]: 2,
    [BIOMES.WORLD_BELOW]: 3
  },
  langPrefs: {
    typology: [LANG_MORPHOLOGY.ANALYTIC]
  }
})
