import { EPriority } from './Priority';

export interface ITask {
  id?: string;
  name: string;
  short_description: string;
  description: string;
  priority: EPriority;
  end_date?: Date | null;
  created_at?: Date;
  updated_at?: Date;
  project_id?: string;
}

class Task {
  hasAllRequiredFields(task: ITask): boolean {
    if(!task.name || !task.short_description || !task.description || !task.priority) {
      return false;
    }

    return true;
  }
}

export default new Task();
