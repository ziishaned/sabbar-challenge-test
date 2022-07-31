import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { FindAllDto } from './dto/find-all.dto';
import { Customer } from './schemas/customer.schema';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll(@Query() findAllDto: FindAllDto): Promise<{
    count: number;
    customers: Customer[];
    totalPages: number;
    currentPage: number;
  }> {
    const { limit = 10, page = 1 } = findAllDto;

    const count = await this.customerService.count();
    const customers = await this.customerService.findAll(findAllDto);

    return {
      count,
      customers,
      currentPage: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
