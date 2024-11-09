import Directory from '../../classes/Directory.ts'
import Species from '../../classes/Species.ts'

import dwarf from './dwarf.ts'
import elf from './elf.ts'
import gnome from './gnome.ts'
import halfling from './halfling.ts'
import human from './human.ts'
import orc from './orc.ts'
import wosan from './wosan.ts'

const species: Directory<Species> = new Directory<Species>()
species.add('dwarf', dwarf)
species.add('elf', elf)
species.add('gnome', gnome)
species.add('halfling', halfling)
species.add('human', human)
species.add('orc', orc)
species.add('wosan', wosan)

export default species
export { dwarf, elf, gnome, halfling, human, orc, wosan }
