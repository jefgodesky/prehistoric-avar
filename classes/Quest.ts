import { nanoid } from 'nanoid'
import { Biome } from '../enums.ts'
import { IQuest, IQuestReport } from '../index.d.ts'
import type Population from './Population.ts'
import World from './World.ts'

class Quest {
  id: string
  description: string
  courage: number
  skill: number
  lethality: number
  accomplished: boolean
  attempts: IQuestReport[]

  constructor (world: World, data?: IQuest) {
    this.id = world.quests.generateKey(data?.id ?? nanoid())
    this.description = data?.description ?? 'Complete the quest'
    this.courage = data?.courage ?? 0.1
    this.skill = data?.skill ?? 0.1
    this.lethality = data?.lethality ?? 1/3
    this.accomplished = data?.accomplished ?? false
    this.attempts = data?.attempts ?? []

    world.quests.add(this)
  }

  run (p: Population, biome: Biome): IQuestReport {
    const report = {
      attempted: 0,
      abandoned: 0,
      killed: 0,
      success: false
    }

    for (let i = 1; i <= p.size; i++) {
      const courage = Math.random()
      if (courage <= this.courage) {
        // This person embarks on the quest
        report.attempted++
        // You get to attempt once for each level of fitness
        const fitness = p.getFitness(biome)
        const attempts: number[] = []
        for (let a = 0; a < fitness; a++) attempts.push(Math.random())
        const skill = Math.max(...attempts)
        if (skill <= this.skill) {
          // This person succeeded on the quest
          report.success = true
          this.accomplished = true
          break
        } else {
          const die = Math.random() > this.lethality
          if (die) {
            // This person died on the quest
            report.killed++
          } else {
            // This person failed, but did not die
            report.abandoned++
          }
        }
      }
    }

    this.attempts.push(report)
    return report
  }

  toObject (): IQuest {
    return {
      id: this.id,
      description: this.description,
      courage: this.courage,
      skill: this.skill,
      lethality: this.lethality,
      accomplished: this.accomplished,
      attempts: this.attempts
    }
  }

  toString (): string {
    return this.description
  }
}

export default Quest
