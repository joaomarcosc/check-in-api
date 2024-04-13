import { randomUUID } from 'crypto'
import { GymsRepository } from '../gyms-repository'
import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

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
