import { ApiProperty } from "@nestjs/swagger";

export class FileDto {
  @ApiProperty({ type: String, example: "http://amazon.s3/announcement" })
  key: string;

  @ApiProperty({ type: String, example: "announcement photo" })
  name: string;
}
