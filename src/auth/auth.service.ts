import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';
import { RegisterInput } from './dto/register.dto';
import { LoginInput } from './dto/login.dto';
import { UpdatePasswordInput } from './dto/update-password.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async register(registerInput: RegisterInput): Promise<User> {
    const { email } = registerInput;
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }
    const user = new this.userModel(registerInput);
    return user.save();
  }

  async login(loginInput: LoginInput): Promise<User> {
    const { email, password } = loginInput;
    const user = await this.userModel.findOne({ email, password }).exec();
    if (!user) {
      throw new NotFoundException('Invalid credentials.');
    }
    return user;
  }

  async verifyEmail(email: string): Promise<void> {
    // Implementation for sending verification email
  }

  async confirmEmail(token: string): Promise<void> {
    // Implementation for confirming email with token
  }

  async refreshToken(refreshToken: string): Promise<User | any> {
    // Implementation for refreshing token
  }

  async revokeToken(refreshToken: string): Promise<void> {
    // Implementation for revoking token
  }

  async updatePassword(updatePasswordInput: UpdatePasswordInput): Promise<void> {
    const { old_password, new_password } = updatePasswordInput;
    // Implementation for updating password
  }

  async forgotPassword(email: string): Promise<void> {
    // Implementation for handling forgotten password
  }

  async resetPassword(token: string, new_password: string): Promise<void> {
    // Implementation for resetting password with token
  }
}
