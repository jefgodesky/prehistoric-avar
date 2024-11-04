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
      description: 'Underground lake (2375 sq. km)',
      impact: 237500
    },
    {
      description: 'Underground lake (2939 sq. km)',
      impact: 293900
    },
    {
      description: 'Underground lake (743 sq. km)',
      impact: 74300
    },
    {
      description: 'Underground lake (589 sq. km)',
      impact: 58900
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

export default FD05
