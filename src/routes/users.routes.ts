import { Router, Request, Response } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();

router.post('/', UsersController.createUser);
router.delete('/:id', UsersController.deleteUser);

export default router;