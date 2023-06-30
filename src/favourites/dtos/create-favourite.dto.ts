import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class CreateFavouriteDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  announcementId: number;
}
