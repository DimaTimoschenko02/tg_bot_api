import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserIdFromRequest = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest();

    return req.user.id;
  }
);
