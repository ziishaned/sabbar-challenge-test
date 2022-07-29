import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sabbar'),
    CustomerModule,
  ],
})
export class AppModule {}
