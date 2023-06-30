import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class QueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 5;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset?: number = 0;
}
