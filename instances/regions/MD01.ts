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
      description: 'Underground lake (3862 sq. km)',
      impact: 386200
    },
    {
      description: 'Underground lake (2833 sq. km)',
      impact: 283300
    },
    {
      description: 'Underground lake (509 sq. km)',
      impact: 50900
    },
    {
      description: 'Underground lake (791 sq. km)',
      impact: 79100
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

export default MD01
