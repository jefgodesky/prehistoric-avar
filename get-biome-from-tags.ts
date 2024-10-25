import { BIOMES } from './enums.ts'
import type { Biome } from './enums.ts'

const getBiomeFromTags = (...tags: string[]): Biome | null => {
  const biomes: Record<Biome, string[]> = {
    [BIOMES.BOREAL_FOREST]: ['forest', 'boreal'],
    [BIOMES.TEMPERATE_FOREST]: ['forest', 'temperate'],
    [BIOMES.TROPICAL_FOREST]: ['forest', 'tropical'],
    [BIOMES.DESERT]: ['desert'],
    [BIOMES.SAVANNA]: ['grassland', 'tropical'],
    [BIOMES.TEMPERATE_GRASSLAND]: ['grassland', 'temperate'],
    [BIOMES.MOUNTAINS]: ['mountains'],
    [BIOMES.POLAR]: ['polar'],
    [BIOMES.CAVES]: ['near-surface'],
    [BIOMES.WORLD_BELOW]: ['world-below']
  }

  biomeLoop: for (const biome of Object.keys(biomes) as Biome[]) {
    for (const tag of biomes[biome]) {
      if (!tags.includes(tag)) continue biomeLoop
    }
    return biome
  }

  return null
}

export default getBiomeFromTags
