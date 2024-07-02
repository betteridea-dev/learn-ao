import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { CheckUserInvitationDto } from './dto/chech-user-invitation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/rbac/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Roles(UserRole.ADMIN)
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

  @Get('active')
  findActive() {
    return this.invitationService.findActive();
  }

  @Get('used')
  findUsed() {
    return this.invitationService.findUsed();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invitationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return this.invitationService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.invitationService.remove(+id);
  }

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Post('user')
  checkUserInvitation(
    @Body() { invitationCode }: CheckUserInvitationDto,
    @Req() req,
  ) {
    return this.invitationService.checkUserInvitation({
      invitationCode,
      userId: req.user.id,
    });
  }
}
