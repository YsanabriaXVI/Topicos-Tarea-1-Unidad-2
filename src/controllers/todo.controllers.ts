import { Request, Response, NextFunction } from "express";
import * as todoService from "../services/todo.service";
import { validateTodo, validateTodoPartial } from "../schemas/todo.schema";
import { ca } from "zod/v4/locales";


export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await todoService.getAll(); //Retorna una promesa
    res.status(200).json(todos);
  } catch (error) {
    next(error); //*Aqui pasamos la responsabilidad de manejar el error al middleware
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const todo = await todoService.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: `Tarea con id ${id} no encontrada`,
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //validar el body de la solicitud
    const { success, error, data } = validateTodo(req.body);

    if (!success) {
      return res.status(400).json(error.issues);
    }
    const newTodo = await todoService.create(data);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;

        const todo = await todoService.findById(id);

       if(!todo){
        return res.status(404).json({
            message: `Tarea con id ${id} no encontrada`
        })
       }

        await todoService.deleteTarea(id);

        return res.status(200).json({
            message: `Tarea con id ${id} eliminada`,
            deleted: todo
        })

    }catch(error){
        next(error)
    }
}

export const updateTodo = async(req: Request, res: Response, next: NextFunction) => {
    try{

        const id = req.params.id;

        const {success, error, data} = validateTodoPartial(req.body);

        if(!success){
            return res.status(400).json(error.issues)
        }

        const result = await todoService.findById(id);

        if(!result){
            return res.status(404).json({
                message: `Tarea con id ${id} no encontrada`
            })
        }

        const todo = await todoService.updateTarea(id, data);
        
        return res.status(200).json(todo)

    }catch(error){
        next(error)
    }
}
