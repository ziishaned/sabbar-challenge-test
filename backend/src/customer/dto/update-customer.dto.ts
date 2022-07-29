import { IsInt, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  readonly fullName: string;

  @IsString()
  readonly currentLocation: string;

  @IsInt()
  readonly numberOfRides: number;

  @IsInt()
  readonly averageRating: number;
}
