import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  create() {
    return this.moduleService.create();
  }

  @Get('course/:id')
  findAllByCourse(@Param('id', ParseIntPipe) id: number) {
    return this.moduleService.findAllByCourse(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    console.log(`Module Updation - ${id}`);

    return this.moduleService.update();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(`Module Deletion - ${id}`);

    return this.moduleService.remove();
  }
}
