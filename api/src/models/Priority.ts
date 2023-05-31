import { Priority as EPriority } from '@prisma/client';

export { EPriority };

class Priority {
  isValid(priority: string): boolean {
    return Object.keys(EPriority).includes(priority);
  }
}

export default new Priority();
