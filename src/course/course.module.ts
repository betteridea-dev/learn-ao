import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/prisma.service';
import { CourseEnrollmentController } from './course-enrollment/course-enrollment.controller';
import { CourseEnrollmentService } from './course-enrollment/course-enrollment.service';

@Module({
  controllers: [CourseController, CourseEnrollmentController],
  providers: [CourseService, PrismaService, CourseEnrollmentService],
})
export class CourseModule {}
