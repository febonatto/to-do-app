import { Router } from 'express';

import TaskController from './controllers/TaskController';
import ProjectController from './controllers/ProjectController';

const router = Router();

router.get('/tasks', TaskController.index);
router.get('/tasks/:id', TaskController.show);
router.get('/tasks/project/:id', TaskController.showByProjectId);
router.post('/tasks', TaskController.store);
router.delete('/tasks/:id', TaskController.delete);

router.get('/projects', ProjectController.index);
router.get('/projects/:id', ProjectController.show);
router.post('/projects', ProjectController.store);
router.delete('/projects/:id', ProjectController.delete);

export default router;
