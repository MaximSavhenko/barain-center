import { Module } from '@nestjs/common'
import { UserConroller } from './user.controller'
import { UserService } from './user.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [UserConroller],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule{}
