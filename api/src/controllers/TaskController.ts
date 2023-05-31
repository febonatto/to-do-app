import { Request, Response } from 'express';

import TasksRepository from '../repositories/TasksRepository';

import Task, { ITask } from '../models/Task';
import Priority from '../models/Priority';

import { isValidDate } from '../utils/isValidDate';
import { isValidId } from '../utils/isValidId';

import MissingParametersError from '../errors/MissingParametersError';
import NotFoundError from '../errors/NotFoundError';
import InvalidParameter from '../errors/InvalidParameter';


class TaskController {
  async index(request: Request, response: Response) {
    const tasks = await TasksRepository.findAll();

    return response.json(tasks);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!isValidId(id)) {
      throw new InvalidParameter('Invalid id type');
    }

    const task = await TasksRepository.findById(id);
    if(!task) {
      throw new NotFoundError('Task not found');
    }

    return response.json(task);
  }

  async showByProjectId(request: Request, response: Response) {
    const { id } = request.params;

    if(!isValidId(id)) {
      throw new InvalidParameter('Invalid id type');
    }

    const tasks = await TasksRepository.findTasksByProjectId(id);

    return response.json(tasks);
  }

  async store(request: Request, response: Response) {
    const {
      name,
      short_description,
      description,
      priority,
      end_date = null,
      project_id = null,
    } = request.body;

    if(!Task.hasAllRequiredFields({ name, short_description, description, priority })) {
      throw new MissingParametersError();
    }

    if(!Priority.isValid(priority)) {
      throw new InvalidParameter('The provided priority has an invalid type. Valid types are {LOW, MEDIUM, HIGH}.');
    }

    if(end_date && !isValidDate(end_date)) {
      throw new InvalidParameter('The provided date is invalid.');
    }

    const task: ITask = {
      name,
      short_description,
      description,
      priority,
      end_date: new Date(end_date),
      project_id
    }

    const createdTask = await TasksRepository.create(task);

    response.json(createdTask);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!isValidId(id)) {
      throw new InvalidParameter('Invalid id type');
    }

    const task = await TasksRepository.findById(id);
    if(!task) {
      throw new NotFoundError('Task not found');
    }

    await TasksRepository.delete(id);

    response.sendStatus(204);
  }
}

export default new TaskController();
