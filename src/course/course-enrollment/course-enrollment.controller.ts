import { Body, Controller, Post } from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';

@Controller('course-enrollment')
export class CourseEnrollmentController {
  constructor(
    private readonly courseEnrollmentService: CourseEnrollmentService,
  ) {}

  @Post()
  async create(@Body() body: { courseId: string }) {
    return this.courseEnrollmentService.enrollUserInCourse(body.courseId);
  }
}
