import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { Response } from 'express'
import { verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  REFRESH_TOKEN_NAME = 'refreshToken'
  EXPIRE_DAY_REFRESH_TOKEN = 1

  constructor(
    private jwt: JwtService,
    private userService: UserService
  ) {}

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto)
    const tokens = this.issueTokens(user.id)

    return { user, ...tokens }
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email)
    if (oldUser) throw new BadRequestException('User allready exist!')

    const { password, ...user } = await this.userService.create(dto)

    const tokens = this.issueTokens(user.id)

    return { user, ...tokens }
  }

  async getNewToken(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) throw new UnauthorizedException('Invalid token')

    const userData = await this.userService.getById(result.id)
    if (!userData) throw new UnauthorizedException('User not found')

    const { password, ...user } = userData

    const tokens = this.issueTokens(result.id)

    return { user, ...tokens }
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      //lax on prodaction
      sameSite: 'none'
    })
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '' , {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      //lax if prod
      sameSite: 'none'
    })
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('Invalid password!')

    return user
  }

  private issueTokens(userId: string) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, { expiresIn: '1h' })
    const refreshToken = this.jwt.sign(data, { expiresIn: '7h' })

    return { accessToken, refreshToken }
  }
}
