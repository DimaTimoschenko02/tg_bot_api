import { Injectable } from "@nestjs/common";
import { Credentials } from "@aws-sdk/types";
import { CustomConfigService } from "./custom-config.service";

@Injectable()
export class AwsConfigService {
  private readonly region: string;
  private readonly credentials: Credentials | undefined;
  private readonly awsBucketName: string;

  constructor(configService: CustomConfigService) {
    this.region = configService.getOptional("AWS_REGION") || "us-east-1";

    this.awsBucketName = configService.get("AWS_BUCKET_NAME");

    const awsAccessKeyId: string | undefined =
      configService.getOptional<string>("AWS_ACCESS_KEY_ID");

    const awsSecretAccessKey: string | undefined =
      configService.getOptional<string>("AWS_SECRET_ACCESS_KEY");

    if (awsAccessKeyId && awsSecretAccessKey) {
      this.credentials = {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      };
    } else {
      this.credentials = undefined;
    }
  }

  public getBucketName(): string {
    return this.awsBucketName;
  }

  public getRegion(): string {
    return this.region;
  }

  public getCredentials(): Credentials | undefined {
    return this.credentials;
  }
}
