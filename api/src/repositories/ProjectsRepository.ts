import prismaClient from '../database/prismaClient';

import { IProject } from '../models/Project';

class ProjectsRepository {
  findAll() {
    return prismaClient.project.findMany();
  }

  findById(id: string) {
    return prismaClient.project.findUnique({
      where: {
        id
      }
    });
  }

  create({
    name,
    description,
    priority,
    end_date
  }: IProject) {
    return prismaClient.project.create({
      data: {
        name,
        description,
        priority,
        end_date
      }
    });
  }

  delete(id: string) {
    return prismaClient.project.delete({
      where: {
        id
      }
    });
  }
}

export default new ProjectsRepository();
