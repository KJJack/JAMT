import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser
} from '../controllers/user.controller.js';

const UserRouter = express.Router();

UserRouter.get('/', getAllUsers);
UserRouter.get('/:id', getUserById);
UserRouter.post('/', createUser);

export default UserRouter;