import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";
import { values } from "lodash";

export class ConfirmationCodeDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  code: number;
}
