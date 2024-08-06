import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { LoginInput } from './dto/login.dto';
import { RegisterInput } from './dto/register.dto';
import { VerifyEmailInput } from './dto/verify-email.dto';
import { RefreshTokenInput } from './dto/refresh-token.dto';
import { RevokeTokenInput } from './dto/revoke-token.dto';
import { UpdatePasswordInput } from './dto/update-password.dto';
import { ForgotPasswordInput } from './dto/forgot-password.dto';
import { ResetPasswordInput } from './dto/reset-password.dto';


@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => User)
  async login(@Args('input') input: LoginInput): Promise<User> {
    return this.authService.login(input);
  }

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return this.authService.register(input);
  }

  @Mutation(() => String)
  async verifyEmail(@Args('input') input: VerifyEmailInput): Promise<string> {
    await this.authService.verifyEmail(input.email);
    return 'Verification email sent successfully.';
  }

  @Query(() => String)
  async confirmEmail(@Args('token') token: string): Promise<string> {
    await this.authService.confirmEmail(token);
    return 'Email confirmed successfully.';
  }

  @Mutation(() => User)
  async refreshToken(@Args('input') input: RefreshTokenInput): Promise<User> {
    return this.authService.refreshToken(input.refresh_token);
  }

  @Mutation(() => String)
  async revokeToken(@Args('input') input: RevokeTokenInput): Promise<string> {
    await this.authService.revokeToken(input.refresh_token);
    return 'Token revoked successfully.';
  }

  @Mutation(() => String)
  async updatePassword(@Args('input') input: UpdatePasswordInput): Promise<string> {
    await this.authService.updatePassword(input);
    return 'Password updated successfully.';
  }

  @Mutation(() => String)
  async forgotPassword(@Args('input') input: ForgotPasswordInput): Promise<string> {
    await this.authService.forgotPassword(input.email);
    return 'Password reset instructions sent.';
  }

  @Mutation(() => String)
  async resetPassword(@Args('input') input: ResetPasswordInput): Promise<string> {
    await this.authService.resetPassword(input.token, input.new_password);
    return 'Password reset successfully.';
  }
}
