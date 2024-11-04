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
      description: 'Underground lake (2918 sq. km)',
      impact: 291800
    },
    {
      description: 'Underground lake (2607 sq. km)',
      impact: 260700
    },
    {
      description: 'Underground lake (981 sq. km)',
      impact: 98100
    },
    {
      description: 'Underground lake (644 sq. km)',
      impact: 64400
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

export default FD03
