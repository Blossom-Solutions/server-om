import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Approval {
  @Field(type => Int)
  id: number;

  @Field()
  approved: boolean;

  @Field(type => Int)
  companyId: number;
}
