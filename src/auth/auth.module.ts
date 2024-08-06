import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/auth.entity';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '60m' } })],
  providers: [AuthService, AuthResolver,AuthService,MailerService],
  exports:[AuthService]
})
export class AuthModule { }
