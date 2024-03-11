import { RegisterUseCase } from '../register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterUser() {
  const inMemoryUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

  return registerUseCase
}
