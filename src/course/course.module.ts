import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/prisma.service';
import { CourseEnrollmentController } from './course-enrollment/course-enrollment.controller';
import { CourseEnrollmentService } from './course-enrollment/course-enrollment.service';
import { ModuleController } from './module/module.controller';
import { ModuleService } from './module/module.service';
import { ChapterController } from './chapter/chapter.controller';
import { ChapterService } from './chapter/chapter.service';

@Module({
  controllers: [
    CourseController,
    CourseEnrollmentController,
    ModuleController,
    ChapterController,
  ],
  providers: [
    CourseService,
    PrismaService,
    CourseEnrollmentService,
    ModuleService,
    ChapterService,
  ],
})
export class CourseModule {}
