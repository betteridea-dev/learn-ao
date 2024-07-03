import { IsNumber } from 'class-validator';

export class UpdateCourseProgressDTO {
  /**
   * Pass the id of desired course
   * @example: 1
   */
  @IsNumber({}, { message: 'Course ID must be of type number' })
  courseId: number;

  /**
   * Pass the id of desired module
   * @example: 1
   */
  @IsNumber({}, { message: 'Module ID must be of type number' })
  moduleID: number;

  /**
   * Pass the id of desired chapter
   * @example: 1
   */
  @IsNumber({}, { message: 'Chapter ID must be of type number' })
  chapterId: number;
}
