const getBiomeFromTags = (...tags: string[]): string => {
  const biomes: { [key: string]: string[] } = {
    'Boreal forest': ['forest', 'boreal'],
    'Temperate forest': ['forest', 'temperate'],
    'Tropical forest': ['forest', 'tropical'],
    Desert: ['desert'],
    Savanna: ['grassland', 'tropical'],
    'Temperate grassland': ['grassland', 'temperate'],
    'Mountain range': ['mountains'],
    'Polar region': ['polar'],
    'Cave system': ['near-surface'],
    'World Below': ['world-below']
  }

  biomeLoop: for (const biome in biomes) {
    for (const tag of biomes[biome]) {
      if (!tags.includes(tag)) continue biomeLoop
    }
    return biome
  }

  return ''
}

export default getBiomeFromTags
