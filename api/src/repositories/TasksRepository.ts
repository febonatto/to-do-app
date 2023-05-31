import prismaClient from '../database/prismaClient';

import { ITask } from '../models/Task';

class TasksRepository {
  findAll() {
    return prismaClient.task.findMany();
  }

  findById(id: string) {
    return prismaClient.task.findUnique({
      where: {
        id
      }
    });
  }

  findTasksByProjectId(id: string) {
    return prismaClient.task.findMany({
      where: {
        projectId: id
      }
    });
  }

  create({
    name,
    short_description,
    description,
    priority,
    end_date
  }: ITask) {
    return prismaClient.task.create({
      data: {
        name,
        short_description,
        description,
        priority,
        end_date,
      }
    })
  }

  delete(id: string) {
    return prismaClient.task.delete({
      where: {
        id
      }
    });
  }
}

export default new TasksRepository();
