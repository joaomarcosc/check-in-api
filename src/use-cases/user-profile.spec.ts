import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcrypt'
import { UserProfileUseCase } from './user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: UserProfileUseCase

describe('User profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UserProfileUseCase(usersRepository)
  })

  it('Should be able to get profile', async () => {
    const createdUser = await usersRepository.create({
      created_at: new Date(),
      email: 'john_doe@example.com',
      name: 'John Doe',
      password_hash: await hash('123', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('Should not be able to get profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
