import { Module } from "@nestjs/common";
import { AwsS3Module } from "../aws/aws-s3.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileService } from "./file.service";
import { FileRepository } from "./repositories/file.repository";
import { File } from "./entities/file.entity";

@Module({
  imports: [AwsS3Module, TypeOrmModule.forFeature([File])],
  providers: [FileService, FileRepository],
  exports: [FileService],
})
export class FileModule {}
