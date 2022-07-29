import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().sort({ updatedAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Customer | null> {
    return this.customerModel.findById(id).exec();
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerModel.create(createCustomerDto);
  }

  async delete(id: string): Promise<Customer | null> {
    return this.customerModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer | null> {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, {
      new: true,
    });
  }
}
