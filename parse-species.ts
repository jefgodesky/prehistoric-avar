import Species from './classes/Species.ts'
import type { ISpecies, ISpeciesYAML } from './index.d.ts'
import {BIOMES} from './enums.ts'

const parseSpecies = (data: ISpeciesYAML): Species[] => {
  return Object.keys(data).map(name => {
    const sp = data[name]
    if (!sp) return null

    const obj: ISpecies = {
      name,
      generation: sp.Generation,
      fitness: {
        [BIOMES.BOREAL_FOREST]: sp.Fitness['Boreal forest'],
        [BIOMES.TEMPERATE_FOREST]: sp.Fitness['Temperate forest'],
        [BIOMES.TROPICAL_FOREST]: sp.Fitness['Tropical forest'],
        [BIOMES.DESERT]: sp.Fitness['Desert'],
        [BIOMES.SAVANNA]: sp.Fitness['Savanna'],
        [BIOMES.TEMPERATE_GRASSLAND]: sp.Fitness['Temperate grassland'],
        [BIOMES.MOUNTAINS]: sp.Fitness['Mountain range'],
        [BIOMES.POLAR]: sp.Fitness['Polar region'],
        [BIOMES.CAVES]: sp.Fitness['Cave system'],
        [BIOMES.WORLD_BELOW]: sp.Fitness['World Below']
      }
    }

    if (sp.Ancestor) obj.ancestor = sp.Ancestor

    if (sp['Language preferences']) {
      obj.langPrefs = {}
      const typology = sp['Language preferences']['Typology']
      const order = sp['Language preferences']['Word order']
      if (typology) obj.langPrefs.typology = typology
      if (order) obj.langPrefs.order = order
    }

    return new Species(obj)
  }).filter(sp => sp !== null)
}

export default parseSpecies
