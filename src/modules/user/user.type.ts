import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole } from '../../domain/user/user-role.enum';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field(type => UserRole)
  role: UserRole;
}
