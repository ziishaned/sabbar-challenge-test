import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly isDriver: boolean;

  @IsInt()
  readonly locationLatitude: number;

  @IsInt()
  readonly locationLongitude: number;

  @IsInt()
  readonly numberOfRides: number;

  @IsInt()
  readonly rating: number;
}
