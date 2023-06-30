import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserEmailFromRequest = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest();

    return req.user.email;
  }
);
