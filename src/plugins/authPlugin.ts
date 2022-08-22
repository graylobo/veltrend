import fastify, { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { JsonWebTokenError } from 'jsonwebtoken'
import { AccessTokenPayload, validateToken } from '../lib/tokens.js'
export const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null)
  fastify.addHook('preHandler', async (request) => {
    const { authorization } = request.headers
    if (!authorization || !authorization.includes('Bearer')) {
      return
    }
    const token = authorization.split('Bearer ')[1]
    try {
      const decoded = await validateToken<AccessTokenPayload>(token)
    } catch (error) {
      if(error instanceof JsonWebTokenError){
        if(error.name ==="TokenExpiredError"){
          
        }
      }
    }
  })
}

export const authPlugin = fp(authPluginAsync, { name: 'authPlugin' })

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: number
      username: string
    } | null
  }
}
