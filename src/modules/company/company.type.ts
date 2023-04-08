import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Approval } from '../approval/approval.type';
import { Receipt } from '../receipt/receipt.type';

@ObjectType()
export class Company {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  fiscalId: string;

  @Field()
  clientNumber: number;

  @Field(() => [Approval], { nullable: true })
  approvals?: Approval[];

  @Field(() => [Receipt], { nullable: true })
  receipts?: Receipt[];
}

@InputType()
export class CreateReceiptInput {
  @Field()
  date: Date;

  @Field()
  taxAmount: number;

  @Field()
  taxPercentage: number;
}
