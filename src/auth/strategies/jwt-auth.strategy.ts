import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtTokenPayload } from "../types/jwt-token-payload.type";
import { CustomConfigService } from "../../custom-config/custom-config.service";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: CustomConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  public validate(payload: JwtTokenPayload): JwtTokenPayload {
    if (!payload) {
      throw new UnauthorizedException("Unauthorized");
    }

    return payload;
  }
}
