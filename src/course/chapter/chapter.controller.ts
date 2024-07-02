import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { Public } from 'src/auth/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/rbac/roles.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Public()
@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Post()
  create() {
    return this.chapterService.create();
  }

  @Get('module/:id')
  findAllByModule(@Param('id', ParseIntPipe) id: number) {
    return this.chapterService.findAllByModule(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    console.log(`Chapter Updation Attempted - ${id}`);

    return this.chapterService.update();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(`Chapter Deletion Attempted - ${id}`);

    return this.chapterService.remove();
  }
}
