import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async findAll(findAllDto: FindAllDto): Promise<Customer[]> {
    const { limit = 10, page = 1, isDriver } = findAllDto;

    return this.customerModel
      .find({
        ...(isDriver !== undefined ? { isDriver: isDriver } : {}),
      })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ updatedAt: -1 })
      .exec();
  }

  async count(): Promise<number> {
    return this.customerModel.count().exec();
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
