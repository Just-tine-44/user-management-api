import { Router, Request, Response } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();

router.post('/', UsersController.createUser);

export default router;