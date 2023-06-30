import { QueryDto } from "../../common/dtos/query.dto";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

export class GetFilteredAnnouncementsDto extends QueryDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  //TODO mb add sort by city or by state at all
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  priceMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  priceMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  square?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  floor?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  roomsCount?: number;
}
