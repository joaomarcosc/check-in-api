import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async countByUserId(userId: string) {
    const checkInsCount = this.items.filter(
      (item) => item.user_id === userId,
    ).length

    return checkInsCount
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date') // First time of the day, ex: 00:00:00
    const endOfTheDay = dayjs(date).endOf('date') // Last time of the day, ex: 23:59:59

    const checkOnSameDate = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at)
      const isOnSomeDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return item.user_id === userId && isOnSomeDate
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id,
      user_id,
      // Convert to DATE type
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
