import Species from '../../classes/Species.ts'

import dwarf from './dwarf.ts'
import elf from './elf.ts'
import gnome from './gnome.ts'
import halfling from './halfling.ts'
import human from './human.ts'
import orc from './orc.ts'
import wosan from './wosan.ts'

const species: Record<string, Species> = { dwarf, elf, gnome, halfling, human, orc, wosan }

export default species
export { dwarf, elf, gnome, halfling, human, orc, wosan }
