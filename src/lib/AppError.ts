type ErrorName =
  | 'UserExistsError'
  | 'AuthenticationError'
  | 'UnknownError'
  | 'UnauthorizedError'

type ErrorInfo = {
  statusCode: number
  message: string
}

const statusCodeMap: Record<ErrorName, ErrorInfo> = {
  UserExistsError: {
    message: 'User already exists',
    statusCode: 409,
  },
  AuthenticationError: {
    message: 'Invalid username or password',
    statusCode: 401,
  },
  UnknownError: {
    message: 'Unknown Error',
    statusCode: 500,
  },
  UnauthorizedError: {
    message: 'Unauthorized',
    statusCode: 401,
  },
}

export default class AppError extends Error {
  public statusCode: number
  public name: string
  constructor(name: ErrorName) {
    const info = statusCodeMap[name]
    super(info.message)
    this.name = name
    this.statusCode = info.statusCode
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export const appErrorSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    message: { type: 'string' },
    statusCode: { type: 'number' },
  },
}

export function createAppErrorSchema<T>(example: T) {
  return {
    ...appErrorSchema,
    example,
  }
}