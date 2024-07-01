import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

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

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    console.log(`Chapter Updation - ${id}`);

    return this.chapterService.update();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(`Chapter Deletion - ${id}`);

    return this.chapterService.remove();
  }
}
