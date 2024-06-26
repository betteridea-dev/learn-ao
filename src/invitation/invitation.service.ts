import { Injectable } from '@nestjs/common';
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

  async findOne(id: number): Promise<InvitationCode> {
    const invitationCode = await this.prisma.invitationCode.findUnique({
      where: {
        id,
      },
    });

    return invitationCode;
  }

  update(id: number) {
    throw new Error(`Invitation code once generated cannot be updated - ${id}`);
  }

  remove(id: number) {
    throw new Error(`Invitation code once generated cannot be deleted - ${id}`);
  }
}
