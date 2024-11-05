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
      description: 'Underground lake (3925 sq. km)',
      impact: 392500
    },
    {
      description: 'Underground lake (2371 sq. km)',
      impact: 237100
    },
    {
      description: 'Underground lake (791 sq. km)',
      impact: 79100
    },
    {
      description: 'Underground lake (504 sq. km)',
      impact: 50400
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

export default PD03
