import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register'
import { authenticationController } from './controllers/authentication'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticationController)
}
