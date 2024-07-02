import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EnrollCourseDTO } from './dto/enroll-course.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('course-enrollment')
export class CourseEnrollmentController {
  constructor(
    private readonly courseEnrollmentService: CourseEnrollmentService,
  ) {}

  @Post()
  async enrollUserInCourse(@Body() body: EnrollCourseDTO, @Request() req) {
    return this.courseEnrollmentService.enrollUserInCourse(
      body.courseId,
      parseInt(req.user.id),
    );
  }

  @Get()
  async getUserCourses(@Request() req) {
    return this.courseEnrollmentService.getUserCourses(parseInt(req.user.id));
  }

  @Get('detailed')
  async getUserCoursesDetailed(@Request() req) {
    return this.courseEnrollmentService.getUserCoursesDetailed(
      parseInt(req.user.id),
    );
  }
}
