import fastify, { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import jwt from 'jsonwebtoken'
import AppError from '../lib/AppError.js'
import { AccessTokenPayload, validateToken } from '../lib/tokens.js'
const { JsonWebTokenError } = jwt
export const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null)
  fastify.decorateRequest('isExpiredToken', false)
  fastify.addHook('preHandler', async (request) => {
    const { authorization } = request.headers
    if (!authorization || !authorization.includes('Bearer')) {
      return
    }
    const token = authorization.split('Bearer ')[1]
    try {
      const decoded = await validateToken<AccessTokenPayload>(token)
      request.user = {
        id: decoded.userId,
        username: decoded.username,
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === 'TokenExpiredError') {
          request.isExpiredToken = true
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
    isExpiredToken: boolean
  }
}
