import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
  })

  it('Should be able to search gyms', async () => {
    await inMemoryGymsRepository.create({
      latitude: 0,
      longitude: 0,
      title: 'Javascript Gym',
    })

    await inMemoryGymsRepository.create({
      latitude: 0,
      longitude: 0,
      title: 'Typescript Gym',
    })

    const { gyms } = await sut.execute({ query: 'Javascript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
    ])
  })

  it('Should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Typescript Gym ${i}`,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({ query: 'Typescript', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Typescript Gym 21',
      }),
      expect.objectContaining({
        title: 'Typescript Gym 22',
      }),
    ])
  })
})
