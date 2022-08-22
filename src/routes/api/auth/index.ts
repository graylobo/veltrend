import { FastifyPluginAsync } from 'fastify'
import UserService from '../../../services/UserService.js'
import { loginSchema, registerSchema } from './schema.js'
import { AutoBody } from './types.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()
  fastify.post<{ Body: AutoBody }>(
    '/login',
    { schema: loginSchema },
    async (request) => {
      return userService.login(request.body)
    },
  )

  fastify.post<{ Body: AutoBody }>(
    '/register',
    {
      schema: registerSchema,
    },
    async (request) => {
      return userService.register(request.body)
    },
  )
}
export default authRoute
