import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { validateUser, validateUserPartial } from "../schemas/user.schema";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    //! Aqui valimos de que el id existe
    const user = await userService.getById(Number(id));

    if (!user) {
      return res.status(404).json({
        message: `Usuario con id ${id} no encontrado`,
      });
    }
    return res.status(200).json(user);
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
    const { success, error, data } = validateUser(req.body);

    if (!success) {
      return res.status(400).json(error.issues);
    }

    const newUser = await userService.create(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const { success, error, data } = validateUserPartial(req.body);

    if (!success) {
      return res.status(400).json(error.issues);
    }

    const result = await userService.getById(Number(id));

    if (!result) {
      return res.status(404).json({
        message: `Usuario con id ${id} no encontrada`,
      });
    }

    const user = await userService.update(Number(id), data);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try{
          const id = req.params.id;

          const user = await userService.getById(Number(id));

         if(!user){
          return res.status(404).json({
              message: `User con id ${id} no encontrada`
          })
         }

          await userService.remove(Number(id));

          return res.status(200).json({
              message: `Usuario con id ${id} eliminado`,
              deleted: user
          })

      }catch(error){
          next(error)
      }
    }
