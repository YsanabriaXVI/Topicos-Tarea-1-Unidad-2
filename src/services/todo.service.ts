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
    }
  });
};

export const findById = async(id: string): Promise<Todo | null> => { 
    return await prisma.todo.findUnique({
      where:{
        id
      }
    })
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
  const newTodo: Todo = {
    id: uuid(),
    ...todo,
  } as Todo;
  // todos.push(newTodo);

return await prisma.todo.create({
    data: newTodo
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
    return await prisma.todo.update({
      where: {
        id: todoId,
      }, data: payload,
    })
    
    //?todos.splice(index, 1, tarea); Forma 1
    //*todos[index] = {...todos[index], ...tarea}; Forma 2
    // return todos[index];
};
