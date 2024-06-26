import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  create(@Body() body: CreateInvitationDto) {
    return this.invitationService.create(body.count);
  }

  @Get()
  findAll() {
    return this.invitationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.invitationService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationService.remove(+id);
  }
}
