import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './customer.controller';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { CustomerService } from './customer.service';

@Module({
  providers: [CustomerService],
  controllers: [CustomerController],
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
})
export class CustomerModule {}
