import { nanoid } from 'nanoid'
import { Emitter, IPopulation, IQuest, IQuestCall, IQuestReport } from '../index.d.ts'

const QUEST_EVENTS = {
  ACCOMPLISHED: 'Quest.Accomplished',
  CALL: 'Quest.Call'
} as const

class Quest {
  id: string
  description: string
  courage: number
  skill: number
  lethality: number
  private emitter: Emitter

  constructor (emitter: Emitter, data?: IQuest) {
    this.emitter = emitter
    this.id = data?.id || nanoid()
    this.description = data?.description ?? 'Complete the quest'
    this.courage = data?.courage ?? 0.1
    this.skill = data?.skill ?? 0.1
    this.lethality = data?.lethality ?? 1/3
  }

  async call (scope: string): Promise<void> {
    const call: IQuestCall = { scope, quest: this.toObject() }
    await this.emitter.emit(QUEST_EVENTS.CALL, call)
  }

  async run (pop: IPopulation): Promise<IQuestReport> {
    const report = {
      quest: this.toObject(),
      attempted: 0,
      abandoned: 0,
      killed: 0,
      success: false
    }

    for (let i = 1; i <= pop.size; i++) {
      const courage = Math.random()
      if (courage <= this.courage) {
        // This person embarks on the quest
        report.attempted++
        const skill = Math.random()
        if (skill <= this.skill) {
          // This person succeeded on the quest
          report.success = true
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

    if (report.success) await this.emitter.emit(QUEST_EVENTS.ACCOMPLISHED, report.quest)
    return report
  }

  toObject (): IQuest {
    return {
      id: this.id,
      description: this.description,
      courage: this.courage,
      skill: this.skill,
      lethality: this.lethality
    }
  }

  toString (): string {
    return this.description
  }
}

export default Quest
export { QUEST_EVENTS }
