import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();

// Add route to list all users
router.get('/', UsersController.listUsers);

// Create a new user
router.post('/', UsersController.createUser);

// Delete a user
router.delete('/:id', UsersController.deleteUser);

// Add route to get single User
router.get('/:id', UsersController.getUserById);


export default router;