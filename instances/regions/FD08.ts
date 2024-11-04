import { IRegion } from '../../index.d.ts'

const FD08: IRegion = {
  id: 'FD08',
  adjacentRegions: ['FC08', 'FD05', 'MD03', 'GD01'],
  area: 1312439,
  biome: 'World Below',
  capacity: 21873,
  dragons: [],
  features: [
    {
      description: 'Underground lake (5689 sq. km)',
      impact: 568900
    },
    {
      description: 'Underground lake (1131 sq. km)',
      impact: 113100
    },
    {
      description: 'Underground lake (871 sq. km)',
      impact: 87100
    },
    {
      description: 'Underground lake (643 sq. km)',
      impact: 64300
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

export default FD08
