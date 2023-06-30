import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class PostgresIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  id: number;
}
