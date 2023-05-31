import { Request, Response } from 'express';

import ProjectsRepository from '../repositories/ProjectsRepository';

import Project, { IProject } from './../models/Project';
import Priority from '../models/Priority';

import { isValidDate } from '../utils/isValidDate';
import { isValidId } from '../utils/isValidId';

import MissingParametersError from '../errors/MissingParametersError';
import NotFoundError from '../errors/NotFoundError';
import InvalidParameter from '../errors/InvalidParameter';

class ProjectController {
  async index(request: Request, response: Response) {
    const projects = await ProjectsRepository.findAll();

    return response.json(projects);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!isValidId(id)) {
      throw new InvalidParameter('Invalid id type');
    }

    const project = await ProjectsRepository.findById(id);
    if(!project) {
      throw new NotFoundError('Project not found');
    }

    return response.json(project);
  }

  async store(request: Request, response: Response) {
    const {
      name,
      description,
      priority,
      end_date = null
    } = request.body;

    if(!Project.hasAllRequiredFields({ name, description, priority })) {
      throw new MissingParametersError();
    }

    if(!Priority.isValid(priority)) {
      throw new InvalidParameter('The provided priority has an invalid type. Valid types are {LOW, MEDIUM, HIGH}.');
    }

    if(end_date && !isValidDate(end_date)) {
      throw new InvalidParameter('The provided date is invalid.');
    }

    const project: IProject = {
      name,
      description,
      priority,
      end_date: new Date(end_date),
    }

    const createdProject = await ProjectsRepository.create(project);

    return response.json(createdProject);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!isValidId(id)) {
      throw new InvalidParameter('Invalid id type');
    }

    const project = await ProjectsRepository.findById(id);
    if(!project) {
      throw new NotFoundError('Project not found');
    }

    await ProjectsRepository.delete(id);

    return response.sendStatus(204);
  }
}

export default new ProjectController();
