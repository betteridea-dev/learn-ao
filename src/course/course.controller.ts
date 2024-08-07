import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { Roles } from 'src/auth/rbac/roles.decorator';
import { UserRole } from '@prisma/client';

@Public()
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Post()
  create() {
    return this.courseService.create();
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Get(':id/semi-detailed')
  findOneSemiDetailed(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOneSemiDetailed(id);
  }

  @Get(':id/detailed')
  findOneDetailed(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOneDetailed(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    console.log(`Course Updation - ${id}`);

    return this.courseService.update();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(`Course Deletion - ${id}`);

    return this.courseService.remove();
  }
}
