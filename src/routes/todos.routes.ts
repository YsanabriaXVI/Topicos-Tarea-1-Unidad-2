import { Router } from "express";
import { getAll, getById, create, deleteTodo, updateTodo} from '../controllers/todo.controllers';

const router = Router();

router.get("/", getAll);

router.post('/', create);

router.get("/:id", getById);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;
