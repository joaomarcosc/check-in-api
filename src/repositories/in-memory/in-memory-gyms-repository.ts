import { randomUUID } from 'crypto'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findManyNearby(params: FindManyNearbyParams) {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates({
        from: {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        to: {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      })

      return distance < 10
    })
  }

  async searchMany(query: string, page: number) {
    const gyms = this.gyms
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    if (!gym) return null

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }
}
