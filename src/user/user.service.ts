import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { UserDto } from "./dtos/user.dto";
import { isNil, omit } from "lodash";
import { ProfileService } from "../profile/profile.service";
import { SignUpUserResponseDto } from "./dtos/sign-up-user-response.dto";
import { User } from "./entities/user.entity";
import { FindOneOptions } from "typeorm";
import { ChangeUserRoleDto } from "./dtos/change-user-role.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService
  ) {}

  public async getAllUsers() {
    return this.userRepository.find({ skip: 2 });
  }

  public async isExistsUser(
    userId: number,
    withProfile: boolean = false
  ): Promise<User> {
    const findOptions: FindOneOptions<User> = withProfile
      ? { where: { userId }, relations: { profile: true } }
      : { where: { userId } };
    const user = await this.userRepository.findOne(findOptions);

    if (isNil(user)) {
      throw new BadRequestException("UserDoesNotExists");
    }

    return user;
  }

  public async signUpUser(user: UserDto): Promise<SignUpUserResponseDto> {
    try {
      const isExistsUser = await this.isExistsUser(user.userId);
      return { message: "You are already registered" };
    } catch (err: any) {
      if (err.message === "UserDoesNotExists") {
        const newUser = await this.userRepository.save({ ...user });

        await this.profileService.createProfile(newUser);

        return {
          message: "You successfully signed up",
        };
      }
    }
  }

  public async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({ userId: id });
  }

  public async getUserWithProfileById(
    userId: number,
    withProfile = true
  ): Promise<User> {
    const user = await this.isExistsUser(userId, withProfile);

    if (isNil(user)) throw new NotFoundException("UserNotFound");

    return user;
  }

  public async changeUserRole(user: ChangeUserRoleDto): Promise<void> {
    const existingUser = await this.isExistsUser(user.userId);

    existingUser.role = user.role;

    await existingUser.save();
  }
}
