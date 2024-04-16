import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchCheckInsHistoryUseCaseParams {
  userId: string
  page: number
}

interface FetchCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchCheckInsHistoryUseCaseParams): Promise<FetchCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
