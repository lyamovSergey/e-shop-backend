import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Store, User } from 'src/generated/prisma/client';

export interface UserWithStore extends User {
  store?: Store;
}

interface RequestWithUser extends Request {
  user?: UserWithStore;
}

export const CurrentUser = createParamDecorator(
  (data: keyof UserWithStore, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
