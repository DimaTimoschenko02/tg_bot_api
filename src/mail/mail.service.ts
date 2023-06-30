import { ConflictException, Injectable } from "@nestjs/common";
import * as sgMail from "@sendgrid/mail";
import { CustomConfigService } from "../custom-config/custom-config.service";
import { MailMessage } from "./types/message.type";
import { CacheService } from "../cache/cache.service";

@Injectable()
export class MailService {
  private readonly senderEmail: string;
  private readonly signInUrl: string;

  constructor(
    private readonly customConfigService: CustomConfigService,
    private readonly cacheService: CacheService
  ) {
    sgMail.setApiKey(this.customConfigService.get<string>("SENDGRID_API_KEY"));

    this.senderEmail = this.customConfigService.get<string>("SENDER_EMAIL");
  }

  public async sendConfirmEmailMessage(
    email: string,
    userId: number
  ): Promise<void> {
    const message = this.createConfirmEmailMessage(email, userId);

    await this.sendMessage(message);
  }
  private createConfirmEmailMessage(
    email: string,
    userId: number
  ): MailMessage {
    const secretCode = Math.floor(Math.random() * 900000) + 100000;

    const confirmMessage = `<h1>Your code is ${secretCode}</h1> <bold>Dont tell it anyone , code is valid for 5 minutes</bold>`;

    this.cacheService.saveUserEmailSecretCode(secretCode, userId).then();
    return {
      to: email,
      subject: "Verify Email Address",
      text: this.senderEmail,
      html: confirmMessage,
    };
  }

  private async sendMessage(message: MailMessage): Promise<void> {
    try {
      await sgMail.send({ ...message, from: this.senderEmail });
    } catch (error) {
      console.dir({ root: "SendGrid", error }, { depth: null });

      throw new ConflictException("EmailMessageError");
    }
  }
}
