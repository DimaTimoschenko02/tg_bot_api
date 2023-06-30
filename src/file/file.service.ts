import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileRepository } from "./repositories/file.repository";
import { AwsS3Service } from "../aws/aws-s3.service";
import { File } from "./entities/file.entity";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileRepository)
    private readonly fileRepository: FileRepository,
    private readonly awsS3Service: AwsS3Service
  ) {}

  public async createPublicFile({
    filename,
    buffer,
  }: Partial<Express.Multer.File>): Promise<File> {
    const key = await this.awsS3Service.uploadImage(buffer, filename);
    const url =
      "https://tg-bot-public-flies-1.s3.eu-central-1.amazonaws.com/" + key;

    return await this.fileRepository.save({ key: url, name: key });
  }

  public async getFileByKey(key: string) {
    return this.awsS3Service.getFile(key);
  }
}
