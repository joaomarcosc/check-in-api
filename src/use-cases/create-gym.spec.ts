import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym use case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('Should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-01',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
