import Monitor from 'ping-monitor'

export class ServiceMonitor {
  monitor = undefined

  constructor(service, failCallback) {
    this.service = service
    this.monitor = new Monitor({
      title: service.name,
      website: service.address,
      interval: 1,
      ignoreSSL: true,
      config: {
        intervalUnits: 'minutes', // seconds, minutes, hours, days
      },
    })

    this.monitor.on('up', (res, state) => {
      console.log(`${this.service.name} : ${this.service.address} : up !`)
    })

    this.monitor.on('error', (error) => {
      console.log(`${this.service.name} : ${this.service.address} : down !`)
      this.monitor.stop()
      failCallback()
    })
  }
}
