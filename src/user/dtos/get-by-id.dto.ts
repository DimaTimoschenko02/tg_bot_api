import { IsNotEmpty, IsNumber } from "class-validator";

export class GetByIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
