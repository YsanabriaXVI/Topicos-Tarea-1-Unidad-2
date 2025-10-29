import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";


export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const users = await userService.getAll();
    res.status(200).json(users);
  }catch(error){
    next(error)
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {id} = req.params;

    //! Aqui valimos de que el id existe
    const user = await userService.findById(id);

    if(!user){
        return res.status(404).json({
            message: `Usuario con id ${id} no encontrado`
        })
    }
    return res.status(200).json(user);
  }catch(error){
    next(error)
  }
};

export const create = async (req: Request, res: Response) => {
  const newUser = await userService.create(req.body);
  res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const updated = await userService.update(Number(req.params.id), req.body);
  res.json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.remove(Number(req.params.id));
  res.status(204).send();
};
