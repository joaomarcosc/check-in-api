import { AuthenticationUseCase } from '../authentication'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAuthenticationUser() {
  const usersRepository = new PrismaUsersRepository()
  const authenticationUseCase = new AuthenticationUseCase(usersRepository)

  return authenticationUseCase
}
