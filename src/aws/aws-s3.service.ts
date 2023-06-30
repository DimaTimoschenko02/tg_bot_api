import { BadRequestException, Injectable } from "@nestjs/common";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 } from "uuid";
import { isNil } from "lodash";

import { SaveFilesPath } from "./enums/save-files-path.enum";
import { AwsConfigService } from "../custom-config/aws-config.service";
import { CustomConfigService } from "../custom-config/custom-config.service";

@Injectable()
export class AwsS3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  constructor(
    private readonly awsConfigService: AwsConfigService,
    private readonly configService: CustomConfigService
  ) {
    this.s3 = new S3Client({
      region: this.awsConfigService.getRegion(),
      credentials: this.awsConfigService.getCredentials(),
    });

    this.bucketName = this.configService.get("AWS_BUCKET_NAME");
  }

  public async uploadImage(buffer: Buffer, name: string): Promise<string> {
    return this.upload(buffer, SaveFilesPath.ANNOUNCEMENT, name);
    // return `${this.awsConfigService.getCloudFrontLink()}/${key}`;
    // return `${this.awsConfigService.getBucketName()}/${key}`;
  }

  private async upload(
    file: ArrayBufferLike,
    path: string,
    name: string
  ): Promise<string> {
    const key = `${path}/${!isNil(name) ? name : v4()}`;
    const command = new PutObjectCommand({
      Bucket: this.awsConfigService.getBucketName(),
      Key: key,
      Body: <Buffer>file,
    });

    try {
      const res = await this.s3.send(command);

      return key;
    } catch (err) {
      console.log({ err });
      throw new BadRequestException("Unable to save resource");
    }
  }

  public async getFile(key: string) {
    const input = { Bucket: this.bucketName, Key: key };

    const command = new GetObjectCommand(input);

    const response = await this.s3.send(command);

    return response;
  }
}
