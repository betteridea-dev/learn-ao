import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EnrollCourseDTO } from './dto/enroll-course.dto';
import { UpdateCourseProgressDTO } from './dto/update-progress.dto';

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
    return this.courseEnrollmentService.getUserCourses(req.user.id);
  }

  @Get('semi-detailed')
  async getUserCoursesSemiDetailed(@Request() req) {
    return this.courseEnrollmentService.getUserCoursesSemiDetailed(req.user.id);
  }

  @Get('detailed')
  async getUserCoursesDetailed(@Request() req) {
    return this.courseEnrollmentService.getUserCoursesDetailed(req.user.id);
  }

  @Get(':id')
  async getEnrollment(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.courseEnrollmentService.getEnrollment(req.user.id);
  }

  @Get(':id/detailed')
  async getEnrollmentDetailed(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.courseEnrollmentService.getEnrollmentDetailed(req.user.id);
  }

  @Patch(':id')
  async updateCourseProgress(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCourseProgressDTO,
    @Request() req,
  ) {
    return this.courseEnrollmentService.updateCourseProgress({
      userId: req.user.id,
      enrollmentId: id,
      courseId: body.courseId,
      moduleID: body.moduleID,
      chapterId: body.chapterId,
    });
  }
}
