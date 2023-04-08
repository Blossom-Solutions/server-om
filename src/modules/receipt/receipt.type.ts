import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Receipt {
  @Field(type => ID)
  id: number;

  @Field()
  date: Date;

  @Field()
  taxAmount: number;

  @Field()
  taxPercentage: number;

  @Field()
  companyId: number;
}
