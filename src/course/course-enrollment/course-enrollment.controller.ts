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

@Controller('course-enrollment')
export class CourseEnrollmentController {
  constructor(
    private readonly courseEnrollmentService: CourseEnrollmentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async enrollUserInCourse(@Body() body: { courseId: string }, @Request() req) {
    return this.courseEnrollmentService.enrollUserInCourse(
      parseInt(body.courseId),
      parseInt(req.user.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  async getUserCourses(@Request() req) {
    return this.courseEnrollmentService.getUserCourses(parseInt(req.user.id));
  }
}
