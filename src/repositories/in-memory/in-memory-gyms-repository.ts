import { GymsRepository } from '../gyms-repository'
import { Gym } from '@prisma/client'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    if (!gym) return null

    return gym
  }
}
