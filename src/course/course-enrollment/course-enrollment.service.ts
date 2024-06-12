import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseEnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async enrollUserInCourse(courseId: number, userId: number) {
    const enrollment = await this.prisma.enrollment.create({
      data: {
        courseId: courseId,
        userId: userId,
      },
    });

    return enrollment;
  }

  async getUserCourses(userId: number) {
    const userCourses = await this.prisma.enrollment.findMany({
      where: {
        userId: userId,
      },
    });

    return userCourses;
  }
}
