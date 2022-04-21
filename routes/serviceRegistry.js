import { Router } from 'express'
import { response } from '../libs/response.js'
import ServiceRegistry from '../libs/ServiceRegistry.js'

const router = Router()

/**
 *  DEVELOPMENT ONLY
 */
router.get('/', (req, res) => {
  res.json(response(true, 'Get services', ServiceRegistry.services))
})

router.get('/:name', (req, res) => {
  const { name } = req.params
  const getService = ServiceRegistry.getByName(name)
  if (!getService) return res.json(response(false, 'Service not found'))
  res.json(response(true, 'Get service', getService))
})

router.get('/:name/:version', (req, res) => {
  const { name, version } = req.params
  const getService = ServiceRegistry.get(name, version)
  if (!getService) return res.json(response(false, 'Service not found'))
  res.json(response(true, 'Get Service', getService))
})

router.put('/:name/:ip/:port/:prefix/:version', (req, res) => {
  const { name, ip, port, prefix, version } = req.params
  const putService = ServiceRegistry.register(name, ip, port, prefix, version)
  res.json(response(true, 'Service added', putService))
})

router.delete('/:name/:version', (req, res) => {
  const { name, version } = req.params
  const removedService = ServiceRegistry.unregister(name, version)
  if (!removedService) return res.json(response(false, 'Service not found'))
  res.json(response(true, 'Service removed', removedService))
})

export { router as registryRoute }
