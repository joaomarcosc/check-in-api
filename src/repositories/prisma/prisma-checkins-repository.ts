import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCheckinsRepository implements CheckInsRepository {
  findByUserIdOnDate(email: string, date: Date): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  async create({
    gym_id,
    user_id,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id,
        user_id,
      },
    })

    return checkIn
  }
}
