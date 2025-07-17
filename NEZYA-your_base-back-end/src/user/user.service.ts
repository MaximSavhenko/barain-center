import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      password: await hash(dto.password),
      name: '',
    }

    return this.prisma.user.create({
      data: user,
    })
  }

  async update(id: string, dto: UserDto) {
    let data = dto
    if (data.password) {
      data = { ...dto, password: await hash(data.password) }
    }

    await this.prisma.user.update({
      where: { id },
      data,
      select: {
        email: true,
        name: true,
      },
    })
  }
}
