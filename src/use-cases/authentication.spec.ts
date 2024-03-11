import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticationUseCase } from './authentication'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticationUseCase

describe('Authentication use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticationUseCase(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      created_at: new Date(),
      email: 'john_doe@example.com',
      name: 'John Doe',
      password_hash: await hash('123', 6),
    })

    const { user } = await sut.execute({
      email: 'john_doe@example.com',
      password: '123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      created_at: new Date(),
      email: 'john_doe@example.com',
      name: 'John Doe',
      password_hash: await hash('123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john_doe@error.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      created_at: new Date(),
      email: 'john_doe@example.com',
      name: 'John Doe',
      password_hash: await hash('123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john_doe@example.com',
        password: '1223',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
