import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_SECRET } from 'src/lib/constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_SECRET,
    });
  }

  async validate(payload: { id: number; iat: number; exp: number }) {
    const user = await this.usersService.findByIdForReq(+payload.id);

    if (!user) {
      throw new UnauthorizedException("The user doesn't exist");
    }

    return { ...user };
  }
}
