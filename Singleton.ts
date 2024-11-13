import type { Constructor } from './index.d.ts'

function Singleton<T extends Constructor>(Base: T) {
  return class SingletonClass extends Base {
    static #instance: InstanceType<T> | null = null

    // deno-lint-ignore no-explicit-any
    private constructor (...args: any[]) {
      super(...args)
    }

    static instance (...args: ConstructorParameters<T>): InstanceType<T> {
      if (!this.#instance) this.#instance = new this(...args) as InstanceType<T>
      return this.#instance
    }

    static reset () {
      this.#instance = null
    }
  }
}

export default Singleton
