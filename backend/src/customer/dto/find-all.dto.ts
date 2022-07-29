import { IsBoolean, IsInt } from 'class-validator';

export class FindAllDto {
  @IsBoolean()
  readonly isDriver: boolean;

  @IsInt()
  readonly page: number;

  @IsInt()
  readonly limit: number;
}
