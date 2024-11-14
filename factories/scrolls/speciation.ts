import { SpeciesName, EVENTS_GLOBAL_UNIQUE, SPECIES_NAMES } from '../../enums.ts'
import Scroll from '../../classes/Scroll.ts'
import Population from '../../classes/Population.ts'
import Simulation from '../../classes/Simulation.ts'
import type Species from '../../classes/Species.ts'

const SpeciationEvents: Record<SpeciesName, string> = {
  [SPECIES_NAMES.DWARF]: EVENTS_GLOBAL_UNIQUE.DWARVES,
  [SPECIES_NAMES.GNOME]: EVENTS_GLOBAL_UNIQUE.GNOMES,
  [SPECIES_NAMES.HALFLING]: EVENTS_GLOBAL_UNIQUE.HALFLINGS,
  [SPECIES_NAMES.HUMAN]: EVENTS_GLOBAL_UNIQUE.HUMANS,
  [SPECIES_NAMES.ORC]: EVENTS_GLOBAL_UNIQUE.ORCS
}

const getSpeciationScrollText = (species: Species): string => {
  return `We become ${species.getPlural().toLowerCase()}.`
}

const createSpeciationScroll = (name: SpeciesName, population: Population): Scroll => {
  const { world } = Simulation.instance()
  const ancestor = population.getSpecies()
  const descendant = world.species.get(name.toLowerCase())!
  const text = getSpeciationScrollText(descendant)

  const onUnseal = () => {
    return population.getHome().species === descendant.name
      ? population.getSpecies().generation ?? 50
      : 0
  }

  const onOpen = () => {
    population.species = name

    // Remove other scrolls
    const { world, history, millennium } = Simulation.instance()
    const populations = world.populations.values()
    for (const p of populations) {
      p.scribe.scrolls = p.scribe.scrolls.filter(scroll => scroll.text !== text)
    }

    // Record this moment in history
    if (name in SpeciationEvents) world.events.push(SpeciationEvents[name])
    const homeId = population.getHome().id
    history.add({
      millennium,
      description: `The ${ancestor.getPlural().toLowerCase() ?? 'wosan'} of ${homeId} become the first ${descendant.getPlural().toLowerCase()}.`,
      tags: [descendant.getPlural(), homeId]
    })
  }

  return new Scroll(text, 500, onUnseal, onOpen)
}

export default createSpeciationScroll
export { getSpeciationScrollText }
