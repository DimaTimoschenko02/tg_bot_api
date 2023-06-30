import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileRepository } from "./repositories/profile.repository";
import { User } from "../user/entities/user.entity";
import { Profile } from "./entities/profile.entity";
import { ProfileDto } from "./dtos/profile.dto";
import { UserService } from "../user/user.service";
import { MailService } from "../mail/mail.service";
import { CacheService } from "../cache/cache.service";
import { isNil, omit } from "lodash";
import { EmailStatusEnum } from "./enums/email-status.enum";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly cacheService: CacheService
  ) {}

  public async createProfile(user: User): Promise<Profile> {
    return await this.profileRepository.save({ user: user });
  }

  public async updateProfile(
    updatedProfile: ProfileDto,
    userId: number
  ): Promise<void> {
    await this.userService.isExistsUser(userId);

    const { profile } = await this.userService.getUserWithProfileById(userId);

    await this.profileRepository.update(
      { id: profile.id },
      { ...updatedProfile }
    );
  }

  public async getProfileById(id: number) {
    const { profile } = await this.userService.getUserWithProfileById(id);
    return omit(profile, ["id", "createdAt", "updatedAt"]);
  }

  public async sendConfirmEmailMessage(id: number) {
    const userWithEmail = await this.userService.getUserWithProfileById(id);

    if (isNil(userWithEmail.profile.email))
      throw new BadRequestException("UserDoesntHaveEmail");

    if (userWithEmail.profile.emailStatus === EmailStatusEnum.CONFIRMED)
      throw new BadRequestException("EmailAlreadyConfirmed");

    await this.mailService.sendConfirmEmailMessage(
      userWithEmail.profile.email,
      id
    );
  }

  public async confirmEmail(userId: number, code: number) {
    const secretCode = await this.cacheService.getUserEmailSecretCode(userId);

    if (isNil(secretCode) || secretCode !== code)
      throw new ForbiddenException("CodeNotValid");

    const { profile } = await this.userService.getUserWithProfileById(userId);

    profile.emailStatus = EmailStatusEnum.CONFIRMED;

    await profile.save();
  }
}
