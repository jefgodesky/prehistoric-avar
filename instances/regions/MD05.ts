import { IRegion } from '../../index.d.ts'

const MD05: IRegion = {
  id: 'MD05',
  adjacentRegions: ['MC05', 'GD08', 'FD02', 'FD17'],
  area: 228126,
  biome: 'World Below',
  capacity: 3802,
  dragons: [],
  features: [
    {
      description: 'Underground lake (1713 sq. km)',
      impact: 171300
    },
    {
      description: 'Underground lake (2075 sq. km)',
      impact: 207500
    },
    {
      description: 'Underground lake (911 sq. km)',
      impact: 91100
    },
    {
      description: 'Underground lake (806 sq. km)',
      impact: 80600
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

export default MD05
