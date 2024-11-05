import { IRegion } from '../../index.d.ts'

const MD02: IRegion = {
  id: 'MD02',
  adjacentRegions: ['MC02', 'GD01', 'GD02', 'GD03'],
  area: 119205,
  biome: 'World Below',
  capacity: 1986,
  dragons: [],
  features: [
    {
      description: 'Underground lake (5068 sq. km)',
      impact: 506800
    },
    {
      description: 'Underground lake (2133 sq. km)',
      impact: 213300
    },
    {
      description: 'Underground lake (594 sq. km)',
      impact: 59400
    },
    {
      description: 'Underground lake (985 sq. km)',
      impact: 98500
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

export default MD02
