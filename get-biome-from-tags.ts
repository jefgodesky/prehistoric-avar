import { BIOMES } from './enums.ts'
import type { Biome } from './enums.ts'

const getBiomeFromTags = (...tags: string[]): Biome => {
  const biomes: { [key: Biome]: string[]} = {}
  biomes[BIOMES.BOREAL_FOREST] = ['forest', 'boreal']
  biomes[BIOMES.TEMPERATE_FOREST] = ['forest', 'temperate']
  biomes[BIOMES.TROPICAL_FOREST] = ['forest', 'tropical']
  biomes[BIOMES.DESERT] = ['desert']
  biomes[BIOMES.SAVANNA] = ['grassland', 'tropical']
  biomes[BIOMES.TEMPERATE_GRASSLAND] = ['grassland', 'temperate']
  biomes[BIOMES.MOUNTAINS] = ['mountains']
  biomes[BIOMES.POLAR] = ['polar']
  biomes[BIOMES.CAVES] = ['near-surface']
  biomes[BIOMES.WORLD_BELOW] = ['world-below']

  biomeLoop: for (const biome in biomes) {
    for (const tag of biomes[biome]) {
      if (!tags.includes(tag)) continue biomeLoop
    }
    return biome
  }

  return ''
}

export default getBiomeFromTags
