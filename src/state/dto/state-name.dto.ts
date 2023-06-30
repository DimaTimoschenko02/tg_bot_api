import { IsNotEmpty, IsString } from "class-validator";

export class StateNameDto {
  @IsNotEmpty()
  @IsString()
  state: string;
}
