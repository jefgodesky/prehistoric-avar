import { IRegion } from '../../index.d.ts'

const FD05: IRegion = {
  id: 'FD05',
  adjacentRegions: ['FC05', 'FD04', 'MD03', 'FD08'],
  area: 542146,
  biome: 'World Below',
  capacity: 9035,
  dragons: [],
  features: [
    {
      description: 'Underground lake (2508 sq. km)',
      impact: 250800
    },
    {
      description: 'Underground lake (5961 sq. km)',
      impact: 596100
    },
    {
      description: 'Underground lake (581 sq. km)',
      impact: 58100
    },
    {
      description: 'Underground lake (511 sq. km)',
      impact: 51100
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

export default FD05
