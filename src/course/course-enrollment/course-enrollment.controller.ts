import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';

@Controller('course-enrollment')
export class CourseEnrollmentController {
  constructor(
    private readonly courseEnrollmentService: CourseEnrollmentService,
  ) {}

  @Post()
  async enrollUserInCourse(@Body() body: { courseId: string }, @Request() req) {
    return this.courseEnrollmentService.enrollUserInCourse(
      parseInt(body.courseId),
      parseInt(req.user.id),
    );
  }

  @Get()
  async getUserCourses(@Request() req) {
    return this.courseEnrollmentService.getUserCourses(parseInt(req.user.id));
  }
}
