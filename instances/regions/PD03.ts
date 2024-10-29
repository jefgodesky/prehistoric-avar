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
      description: 'Underground lake (5506 sq. km)',
      impact: 550600
    },
    {
      description: 'Underground lake (2561 sq. km)',
      impact: 256100
    },
    {
      description: 'Underground lake (514 sq. km)',
      impact: 51400
    },
    {
      description: 'Underground lake (853 sq. km)',
      impact: 85300
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

export default PD03
