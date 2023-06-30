import { Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Category } from "../../announcement-category/entities/category.entity";
import { City } from "../../city/entities/city.entity";
import { File } from "../../file/entities/file.entity";
import { FlatProfile } from "../../flat-profile/entities/flat-profile";
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { FlatProfileDto } from "../../flat-profile/dtos/flat-profile.dto";

export class AnnouncementDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmptyObject()
  @Type(() => FlatProfileDto)
  @ValidateNested()
  flatProfile: FlatProfileDto;
}
