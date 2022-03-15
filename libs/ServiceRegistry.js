import { Service } from '../models/Service.js'
import { BaseServiceRegistry } from './BaseServiceRegistry.js'

class ServiceRegistry extends BaseServiceRegistry {
  services = []
  #model = undefined

  /**
   *
   * @param {Service} model service model
   */
  constructor(model) {
    super()
    this.#model = model
  }

  /**
   *
   * @param {string} name
   * @param {string} version
   * @returns {Service}
   */
  get(name, version) {
    return this.find(name, version)
  }

  /**
   *
   * @param {string} name
   * @param {string} version
   * @returns {Service}
   */
  getByName(name) {
    return this.findByName(name)
  }

  /**
   *
   * @param {string} name
   * @param {string} ip
   * @param {string} port
   * @param {string} prefix
   * @param {string} version
   * @returns {Service}
   */
  register(name, ip, port, prefix, version) {
    const key = this.generateKey(name, version)
    const service = this.findByKey(key)
    if (service) return this.update(service)
    const newService = new this.#model(key, name, ip, port, prefix, version)
    return this.insert(newService)
  }

  /**
   *
   * @param {string} name
   * @param {string} version
   * @returns {Service}
   */
  unregister(name, version) {
    const key = this.generateKey(name, version)
    const service = this.findByKey(key)
    return this.remove(service)
  }
}

export default new ServiceRegistry(Service)
