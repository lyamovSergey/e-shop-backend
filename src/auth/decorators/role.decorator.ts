import { SetMetadata } from '@nestjs/common';

import { EnumUserRole } from 'src/generated/prisma/enums';

export const Roles = (...roles: EnumUserRole[]) => SetMetadata('roles', roles);
