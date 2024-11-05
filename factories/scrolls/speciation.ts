import { SpeciesName, SpeciesPlurals, EVENTS_GLOBAL_UNIQUE, SPECIES_NAMES } from '../../enums.ts'
import species from '../../instances/species/index.ts'
import Scroll from '../../classes/Scroll.ts'
import Population from '../../classes/Population.ts'

const SpeciationEvents: Record<SpeciesName, string> = {
  [SPECIES_NAMES.DWARF]: EVENTS_GLOBAL_UNIQUE.DWARVES,
  [SPECIES_NAMES.GNOME]: EVENTS_GLOBAL_UNIQUE.GNOMES,
  [SPECIES_NAMES.HALFLING]: EVENTS_GLOBAL_UNIQUE.HALFLINGS,
  [SPECIES_NAMES.HUMAN]: EVENTS_GLOBAL_UNIQUE.HUMANS,
  [SPECIES_NAMES.ORC]: EVENTS_GLOBAL_UNIQUE.ORCS
}

const getPlural = (sp: SpeciesName): string => {
  return SpeciesPlurals[sp] ?? 'Wosan'
}

const getSpeciationScrollText = (sp: SpeciesName): string => {
  return `We become ${getPlural(sp).toLowerCase()}.`
}

const createSpeciationScroll = (sp: SpeciesName, population: Population): Scroll => {
  const { simulation: sim } = population.home
  const ancestor = population.species.name ?? 'Wosan'
  const text = getSpeciationScrollText(sp)

  const onUnseal = () => {
    const { species, home } = population
    console.log({
      home: { id: home.id, species: home.species },
      sp,
      species: { generation: species.generation },
      test: home.species === sp,
      value: home.species === sp ? species.generation ?? 50 : 0
    })
    return home.species === sp ? species.generation ?? 50 : 0
  }

  const onOpen = () => {
    population.species = species[sp.toLowerCase()]

    // Remove other scrolls
    for (const region of sim.regions) {
      for (const p of region.populations) {
        p.scribe.scrolls = p.scribe.scrolls.filter(scroll => scroll.text !== text)
      }
    }

    // Record this moment in history
    if (sp in SpeciationEvents) sim.world.events.push(SpeciationEvents[sp])
    sim.history.add({
      millennium: sim.millennium,
      description: `The ${SpeciesPlurals[ancestor].toLowerCase() ?? 'wosan'} of ${population.home.id} become the first ${getPlural(sp).toLowerCase()}.`,
      tags: [getPlural(sp), population.home.id]
    })
  }

  return new Scroll(text, 500, onUnseal, onOpen)
}

export default createSpeciationScroll
export { getSpeciationScrollText }
