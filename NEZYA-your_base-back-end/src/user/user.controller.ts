import { Body, Controller, HttpCode, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './dto/user.dto'

@Controller('/user/profile')
export class UserConroller {
  constructor(private readonly userService: UserService) {}
  @Put()
  @HttpCode(200)
  @Auth()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }
}
