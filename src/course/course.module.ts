import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/prisma.service';
import { CourseEnrollmentController } from './course-enrollment/course-enrollment.controller';
import { CourseEnrollmentService } from './course-enrollment/course-enrollment.service';
import { ModuleController } from './module/module.controller';
import { ModuleService } from './module/module.service';

@Module({
  controllers: [CourseController, CourseEnrollmentController, ModuleController],
  providers: [
    CourseService,
    PrismaService,
    CourseEnrollmentService,
    ModuleService,
  ],
})
export class CourseModule {}
