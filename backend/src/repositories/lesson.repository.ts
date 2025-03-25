import { BaseRepository } from "../core/abstracts/base.repository";
import { ILessonRepository } from "../core/interfaces/repository/ILessonRepository ";
import { Lesson, ILesson } from "../models/Lesson";

export class LessonRepository extends BaseRepository<ILesson> implements ILessonRepository {
  constructor() {
    super(Lesson);
  }
  async addLesson(moduleId: string, lessonData: Partial<ILesson>): Promise<ILesson> {
    lessonData.moduleId = moduleId;
    return await Lesson.create(lessonData);
  }

  async getLessonsByModule(moduleId: string): Promise<ILesson[]> {
    return await Lesson.find({ moduleId });
  }
}
