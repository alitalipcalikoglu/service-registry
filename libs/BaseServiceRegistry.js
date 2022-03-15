import { ServiceMonitor } from './Monitor.js'

export class BaseServiceRegistry {
  constructor() {}
  /**
   *
   * @param {String} name
   * @param {String} version
   * @returns {Service}
   */
  find(name, version) {
    const service = this.services.find((service) => service.name === name && service.version === version)
    return service
  }

  /**
   *
   * @param {String} name
   * @returns {Service}
   */
  findByName(name) {
    const services = this.services.filter((service) => service.name.indexOf(name) !== -1)
    return services
  }

  /**
   *
   * @param {String} key
   * @returns {Service}
   */
  findByKey(key) {
    const service = this.services.find((service) => service.key === key)
    return service
  }

  /**
   *
   * @param {Service} service
   * @returns {Service}
   */
  insert(service) {
    if (!service) return
    new ServiceMonitor(service, () => {
      this.remove(service)
    })

    this.services.push(service)
    console.log('Added Service =>', service.address)
    return service
  }

  /**
   *
   * @param {Service} service
   * @returns {Service}
   */
  update(service) {
    if (!service) return
    service.updated = Math.floor(new Date() / 1000)
    console.log('Updated Service =>', service.address)
    return service
  }

  /**
   *
   * @param {Service} service
   * @returns {Service}
   */
  remove(service) {
    if (!service) return
    const index = this.services.indexOf(service)
    if (index !== -1) this.services.splice(index, 1)
    console.log('Removed Service =>', service.address)
    return service
  }

  /**
   *
   * @param {String} name
   * @param {String} version
   * @returns {String}
   */
  generateKey(name, version) {
    const key = `${name}-${version}`
    return key
  }
}
