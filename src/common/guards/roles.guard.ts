import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../../user/user.service";
import { Observable } from "rxjs";
import { isNil } from "lodash";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());

    if (isNil(roles)) return true;

    const request = context.switchToHttp().getRequest();

    const { user } = request;

    if (isNil(user)) throw new UnauthorizedException();

    const isExistsUser = await this.userService.isExistsUser(user.id);

    if (isNil(isExistsUser)) throw new UnauthorizedException();

    return roles.includes(isExistsUser.role);
  }
}
