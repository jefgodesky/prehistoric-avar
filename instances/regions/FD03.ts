import { IRegion } from '../../index.d.ts'

const FD03: IRegion = {
  id: 'FD03',
  adjacentRegions: ['FC03', 'GD06', 'MD04', 'GD07', 'PD02', 'FD02', 'FD15'],
  area: 871401,
  biome: 'World Below',
  capacity: 14523,
  dragons: [],
  features: [
    {
      description: 'Underground lake (3008 sq. km)',
      impact: 300800
    },
    {
      description: 'Underground lake (2523 sq. km)',
      impact: 252300
    },
    {
      description: 'Underground lake (814 sq. km)',
      impact: 81400
    },
    {
      description: 'Underground lake (617 sq. km)',
      impact: 61700
    }
  ],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  markers: [],
  ogrism: 0,
  populations: [],
  species: 'Gnome',
  tags: ['world-below'],
}

export default FD03
