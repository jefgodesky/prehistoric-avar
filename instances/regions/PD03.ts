import { IRegion } from '../../index.d.ts'

const PD03: IRegion = {
  id: 'PD03',
  adjacentRegions: ['PC03', 'FD01'],
  area: 299121,
  biome: 'World Below',
  capacity: 4985,
  dragons: [],
  features: [
    {
      description: 'Underground lake (5998 sq. km)',
      impact: 599800
    },
    {
      description: 'Underground lake (4316 sq. km)',
      impact: 431600
    },
    {
      description: 'Underground lake (680 sq. km)',
      impact: 68000
    },
    {
      description: 'Underground lake (702 sq. km)',
      impact: 70200
    }
  ],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  markers: [],
  ogrism: 0,
  populations: [],
  species: Gnome,
  tags: ['world-below'],
}

export default PD03
