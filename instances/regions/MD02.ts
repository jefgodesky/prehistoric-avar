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
      description: 'Underground lake (3702 sq. km)',
      impact: 370200
    },
    {
      description: 'Underground lake (5598 sq. km)',
      impact: 559800
    },
    {
      description: 'Underground lake (870 sq. km)',
      impact: 87000
    },
    {
      description: 'Underground lake (793 sq. km)',
      impact: 79300
    }
  ],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  markers: [],
  ogrism: 0,
  populations: [],
  tags: ['world-below'],
}

export default MD02
