import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseEnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async enrollUserInCourse(courseId: string) {
    return courseId;
  }
}
