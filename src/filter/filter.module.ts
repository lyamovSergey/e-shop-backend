import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FilterController],
  providers: [FilterService, PrismaService],
})
export class FilterModule {}
