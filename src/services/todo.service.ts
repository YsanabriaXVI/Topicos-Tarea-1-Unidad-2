import { Todo } from "../interfaces/todo.interface";
import {prisma} from '../db/client'
import { randomUUID as uuid } from "node:crypto";

//TODO: Crear una conexion a la base de datos

//"base de datos (❁´◡`❁)"

 const todos: Todo[] = [];

export const getAll = async(): Promise<Todo[]> => {
  return await prisma.todo.findMany({
    orderBy:{
      'createdAt': 'desc'
    },
    include: {user: {select: {name: true, email: true}}}
}) as Todo[]};

export const findById = async(id: string): Promise<Todo | null> => { 
    return await prisma.todo.findUnique({
      where:{
        id
      },
      include:{user: {select: {name: true, email: true}}}
    }) as Todo | null
};

// export const create = async(todo: Partial<Todo>): Promise<Todo> =>{
//     const newTodo: Todo = {
//         id: uuid(),
//         title: todo.title!,
//         description: todo.description ?? null,
//         completed: todo.completed || false
//     }
//     todos.push(newTodo);
//     return newTodo;
// }

export const create = async (todo: Partial<Todo>): Promise<Todo> => {
  // todos.push(newTodo);
  return await prisma.todo.create({
    data: {
      id: todo.id,
      title: todo.title!,
      description: todo.description ?? null,
      completed: todo.completed || false,
      userId: todo.userId || null
    }
  })
};

export const deleteTarea = async (id: string)=> {
  // const index = todos.findIndex((todo) => todo.id === id);

  // if (index === -1) return false;

  // todos.splice(index, 1);
  // return true;

  return await prisma.todo.delete({
    where:{
      id
    }
  })
  
};

export const updateTarea = async (
  todoId: string,
  payload: Partial<Todo>
): Promise<Todo | null> => {
     try {
    const updated = await prisma.todo.update({
      where: { id: todoId },
      data: {
        title: payload.title,
        description: payload.description ?? undefined,
        completed: payload.completed,
        userId: payload.userId ?? undefined,
      },
    });
    return updated as unknown as Todo;
  } catch (e) {
    console.log(e);
    return null;
    ;
  }
};
