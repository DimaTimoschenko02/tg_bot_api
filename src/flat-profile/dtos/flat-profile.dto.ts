import { Column } from "typeorm";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class FlatProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  square?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  floor?: number;

  @IsNumber()
  @IsPositive()
  roomsCount: number;
}
