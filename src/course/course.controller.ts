import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create() {
    return this.courseService.create();
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    console.log(`Course Updation - ${id}`);

    return this.courseService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(`Course Deletion - ${id}`);

    return this.courseService.remove();
  }
}
