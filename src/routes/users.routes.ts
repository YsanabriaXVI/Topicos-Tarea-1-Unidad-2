import { Router } from "express";
import * as userController from "../controllers/user.controllers";

const router = Router();

router.get("/", userController.getAll);

router.post('/', userController.create);

router.get("/:id", userController.getById);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export default router;
