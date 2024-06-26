import { IsNumber } from 'class-validator';

export class CreateInvitationDto {
  /**
   * Pass the number of invitation codes to generate
   * @example: 1
   */
  @IsNumber({}, { message: 'Count must be an potitive integer' })
  count: number = 1;
}
