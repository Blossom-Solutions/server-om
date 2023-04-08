import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './user.type';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../domain/user/user-role.enum';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Query(returns => String, { nullable: true })
async login(
  @Args('email') email: string,
  @Args('password') password: string,
): Promise<string | null> {
  const user = await this.loginUseCase.execute(email, password);

  if (!user) {
    return null;
  }

  const payload = { sub: user.id, email: user.email, role: user.role };
  return this.jwtService.sign(payload);
}

@Mutation(returns => String)
async register(
  @Args('email') email: string,
  @Args('password') password: string,
  @Args('role') role: UserRole,
): Promise<string> {
  const user = await this.registerUseCase.execute(email, password, role);

  const payload = { sub: user.id, email: user.email, role: user.role };
  return this.jwtService.sign(payload);
}

}
