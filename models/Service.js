export class Service {
  constructor(key, name, ip, port, prefix, version) {
    this.key = key
    this.name = name
    this.ip = ip
    this.port = port
    this.prefix = prefix
    this.version = version
    this.address = `http://${ip}:${port}/${prefix}/${version}`
    this.registered = Math.floor(new Date() / 1000)
    this.updated = undefined
  }
}
