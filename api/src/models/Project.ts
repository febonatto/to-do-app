import { EPriority } from './Priority';

export interface IProject {
  id?: string;
  name: string;
  description: string;
  priority: EPriority;
  end_date?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

class Project {
  hasAllRequiredFields(project: IProject): boolean {
    if(!project.name || !project.description || !project.priority) {
      return false;
    }

    return true;
  }
}

export default new Project();
