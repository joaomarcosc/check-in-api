import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticationUseCaseParams {
  email: string
  password: string
}

interface AuthenticationUseCaseResponse {
  user: User
}

export class AuthenticationUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: AuthenticationUseCaseParams,
  ): Promise<AuthenticationUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(data.password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
