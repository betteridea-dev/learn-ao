import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { Public } from 'src/auth/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/rbac/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Public()
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Post()
  create() {
    return this.moduleService.create();
  }

  @Get('course/:id')
  findAllByCourse(@Param('id', ParseIntPipe) id: number) {
    return this.moduleService.findAllByCourse(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.moduleService.findOne(+id);
  }

  @Get(':id/detailed')
  findOneDetailed(@Param('id') id: number) {
    return this.moduleService.findOneDetailed(+id);
  }

  @Get(':id/semi-detailed')
  findOneSemiDetailed(@Param('id') id: number) {
    return this.moduleService.findOneSemiDetailed(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    console.log(`Module Updation - ${id}`);

    return this.moduleService.update();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(`Module Deletion - ${id}`);

    return this.moduleService.remove();
  }
}
