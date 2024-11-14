import death from './death.ts'
import dragonQueen from './dragon-queen.ts'
import fs32 from './fs32.ts'
import language from './language.ts'
import languageElta from './language-elta.ts'
import languageHadar from './language-hadar.ts'
import languageSun from './language-sun.ts'
import languageTuan from './language-tuan.ts'

const uniqueGlobalEventFunctions: Array<(forceEvent?: boolean) => void> = [
  death,
  dragonQueen,
  fs32,
  language,
  languageElta,
  languageHadar,
  languageSun,
  languageTuan
]

export default uniqueGlobalEventFunctions
