import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InvitationCode } from '@prisma/client';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

@Injectable()
export class InvitationService {
  constructor(private readonly prisma: PrismaService) {}

  private static generateInvitationCode(
    name: string,
    namespace: string,
  ): string {
    return uuidv5(name, namespace);
  }

  async create(count: number): Promise<InvitationCode[]> {
    const namespace = uuidv4();

    const randomInvitationCodes: { code: string }[] = Array(count)
      .fill('')
      .map((_, i) => ({
        code: InvitationService.generateInvitationCode(i.toString(), namespace),
      }));

    const invitationCodes =
      await this.prisma.invitationCode.createManyAndReturn({
        data: randomInvitationCodes,
      });

    return invitationCodes;
  }

  async findAll(): Promise<InvitationCode[]> {
    const invitationCodes = await this.prisma.invitationCode.findMany();

    return invitationCodes;
  }

  async findActive(): Promise<InvitationCode[]> {
    const invitationCodes = await this.prisma.invitationCode.findMany({
      where: {
        usedBy: {
          equals: null,
        },
      },
    });

    return invitationCodes;
  }

  async findUsed(): Promise<InvitationCode[]> {
    const invitationCodes = await this.prisma.invitationCode.findMany({
      where: {
        usedBy: {
          not: null,
        },
      },
    });

    return invitationCodes;
  }

  async findOne(id: number): Promise<InvitationCode | null> {
    const invitationCode = await this.prisma.invitationCode.findUnique({
      where: {
        id,
      },
    });

    if (!invitationCode) {
      throw new NotFoundException('Invitation not found');
    }

    return invitationCode;
  }

  async findOneByCode(code: string): Promise<InvitationCode | null> {
    const invitationCode = await this.prisma.invitationCode.findUnique({
      where: {
        code,
      },
    });

    if (!invitationCode) {
      throw new NotFoundException('Invitation not found');
    }

    return invitationCode;
  }

  update(id: number) {
    throw new Error(`Invitation code once generated cannot be updated - ${id}`);
  }

  remove(id: number) {
    throw new Error(`Invitation code once generated cannot be deleted - ${id}`);
  }

  async checkUserInvitation({
    invitationCode,
    userId,
  }: {
    invitationCode: string;
    userId: number;
  }) {
    const invitation = await this.findOneByCode(invitationCode);

    // The invitation code should be valid and active
    if (!invitation) {
      throw new NotFoundException('The Invitation code is invalid');
    }

    if (invitation.isUsed) {
      throw new BadRequestException('Invitation code already used');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // The user should be valid and not already invited
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isInvited) {
      throw new BadRequestException('You have already been invited');
    }

    // Once all the checks pass, update the invitation code and user
    const res = await this.prisma.invitationCode.update({
      where: {
        id: invitation.id,
      },
      data: {
        isUsed: true,
        usedAt: new Date(),
        User: {
          connect: {
            id: user.id,
          },
          // update: {
          //   isInvited: true,
          // },
        },
      },
    });

    // TODO: Include in single transaction
    const res2 = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isInvited: true,
      },
    });

    console.log(`RES - ${res}`);

    return res;
  }
}
