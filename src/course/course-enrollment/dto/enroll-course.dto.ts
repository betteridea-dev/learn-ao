import { IsNumber } from 'class-validator';

export class EnrollCourseDTO {
  /**
   * Pass the id of desired course
   * @example: 1
   */
  @IsNumber({}, { message: 'Course ID must be of type number' })
  courseId: number;
}
