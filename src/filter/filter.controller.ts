import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterDto } from 'src/filter/dto/filter.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { EnumUserRole } from 'src/generated/prisma/enums';

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Post(':categoryId')
  @Auth()
  @Roles(EnumUserRole.ADMIN)
  create(@Param('categoryId') categoryId: string, @Body() dto: FilterDto) {
    return this.filterService.create(categoryId, dto);
  }

  @Put(':filterId')
  @Auth()
  @Roles(EnumUserRole.ADMIN)
  update(@Param('filterId') filterId: string, @Body() dto: FilterDto) {
    return this.filterService.update(filterId, dto);
  }

  @Delete(':filterId')
  @Auth()
  @Roles(EnumUserRole.ADMIN)
  delete(@Param('filterId') filterId: string) {
    return this.filterService.delete(filterId);
  }
}
