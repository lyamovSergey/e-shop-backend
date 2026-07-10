import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from 'src/stripe/stripe.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, StripeService, ConfigService],
})
export class OrderModule {}
