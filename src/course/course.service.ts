import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    throw new BadRequestException(
      'Course creation allowed only through Prisma Admin',
    );
  }

  async findAll(): Promise<Course[]> {
    const courses = await this.prisma.course.findMany();
    return courses;
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    return course;
  }

  async findOneDetailed(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        Module: {
          include: {
            chapter: true,
            Assignment: true,
          },
        },
      },
    });

    return course;
  }

  async update() {
    throw new BadRequestException(
      'Course updation allowed only through Prisma Admin',
    );
  }

  async remove() {
    throw new BadRequestException(
      'Course deletion allowed only through Prisma Admin',
    );
  }
}
