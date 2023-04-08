import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CompanyModule } from './modules/company/company.module';
import { ApprovalModule} from './modules/approval/approval.module';
import { ReceiptModule } from './modules/receipt/receipt.module';
import {UserModule} from './modules/user/user.module';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    CompanyModule,
    ApprovalModule,
    ReceiptModule,
    UserModule
  ],
})
export class AppModule {}
