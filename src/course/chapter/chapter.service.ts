import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    throw new BadRequestException(
      'Chapter creation allowed only through Prisma Admin',
    );
  }

  async findAllByModule(moduleId: number) {
    const chapters = await this.prisma.chapter.findMany({
      where: {
        moduleId,
      },
    });

    return chapters;
  }

  async findOne(id: number) {
    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        index: true,
        moduleId: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return chapter;
  }

  async findOneDetailed(id: number) {
    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id,
      },
    });

    return chapter;
  }

  async update() {
    throw new BadRequestException(
      'Chapter updation allowed only through Prisma Admin',
    );
  }

  async remove() {
    throw new BadRequestException(
      'Chapter deletion allowed only through Prisma Admin',
    );
  }
}
