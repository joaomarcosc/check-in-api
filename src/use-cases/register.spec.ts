import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John',
      email: 'johndoe@example.com',
      password: '123',
    })

    const isPasswordCorrectlyHashed = await compare('123', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John',
      email: 'johndoe@example.com',
      password: '123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to register with same email', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John',
      email,
      password: '123',
    })

    await expect(() =>
      sut.execute({
        name: 'John',
        email,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
