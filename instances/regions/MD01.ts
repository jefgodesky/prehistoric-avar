import { IRegion } from '../../index.d.ts'

const MD01: IRegion = {
  id: 'MD01',
  adjacentRegions: ['MC01', 'FD09', 'FD10'],
  area: 220309,
  biome: 'World Below',
  capacity: 3671,
  dragons: [],
  features: [
    {
      description: 'Underground lake (5643 sq. km)',
      impact: 564300
    },
    {
      description: 'Underground lake (5783 sq. km)',
      impact: 578300
    },
    {
      description: 'Underground lake (661 sq. km)',
      impact: 66100
    },
    {
      description: 'Underground lake (856 sq. km)',
      impact: 85600
    }
  ],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  markers: [],
  ogrism: 0,
  populations: [],
  species: 'Gnome',
  tags: ['world-below'],
}

export default MD01
