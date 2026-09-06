import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

export const Auth = () => UseGuards(JwtAuthGuard, RolesGuard);
