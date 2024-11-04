import { IRegion } from '../../index.d.ts'

const GD01: IRegion = {
  id: 'GD01',
  adjacentRegions: ['GC01', 'FD08', 'MD03', 'GD02', 'MD02', 'GD03'],
  area: 870978,
  biome: 'World Below',
  capacity: 14516,
  dragons: [],
  features: [
    {
      description: 'Underground lake (3189 sq. km)',
      impact: 318900
    },
    {
      description: 'Underground lake (796 sq. km)',
      impact: 79600
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

export default GD01
