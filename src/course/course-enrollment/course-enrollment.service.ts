import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      select: {
        id: true,
        courseId: true,
        userId: true,
        createdAt: true,
      },
    });

    return userCourses;
  }

  async getUserCoursesSemiDetailed(userId: number) {
    const userCourses = await this.prisma.enrollment.findMany({
      where: {
        userId: userId,
      },
    });

    return userCourses;
  }

  async getUserCoursesDetailed(userId: number) {
    const userCourses = await this.prisma.enrollment.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return userCourses;
  }

  async getEnrollment(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        id,
      },
    });

    return enrollment;
  }

  async getEnrollmentDetailed(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        id,
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return enrollment;
  }

  async updateCourseProgress({
    userId,
    enrollmentId,
    courseId,
    moduleID,
    chapterId,
  }: {
    userId: number;
    enrollmentId: number;
    courseId: number;
    moduleID: number;
    chapterId: number;
  }) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        id: enrollmentId,
      },
      select: {
        id: true,
        userId: true,
        courseId: true,
        course: {
          select: {
            id: true,
            Module: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Checking if Enrollment exists and correct
    if (!enrollment) {
      throw new NotFoundException('Enrollment details not found');
    }

    if (enrollment.userId !== userId) {
      throw new ForbiddenException(
        'The enrollment does not belong to the user',
      );
    }

    if (enrollment.courseId !== courseId) {
      throw new BadRequestException(
        'The enrollment does not belong to the course',
      );
    }

    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        id: true,
        module: {
          select: {
            id: true,
            courseId: true,
          },
        },
      },
    });

    // Checking if Chapter exists and correct
    if (!chapter) {
      throw new NotFoundException('The given Chapter ID is invalid');
    }

    if (chapter.module.id !== moduleID) {
      throw new BadRequestException(
        'The chapter does not belong to the given module',
      );
    }

    if (chapter.module.courseId !== courseId) {
      throw new BadRequestException(
        'The module does not belong to the given course',
      );
    }

    // All good, updating the progress
    const newEnrollment = await this.prisma.enrollment.update({
      where: {
        id: enrollmentId,
      },
      data: {
        currentModuleId: moduleID,
        currentChapterId: chapterId,
      },
    });

    return newEnrollment;
  }
}
