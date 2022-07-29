import { IsInt } from 'class-validator';

export class FindAllDto {
  @IsInt()
  readonly page: number;

  @IsInt()
  readonly limit: number;
}
