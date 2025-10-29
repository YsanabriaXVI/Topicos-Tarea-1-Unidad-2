import * as z from "zod";
import {User} from '../interfaces/user.interface'

const userSchema = z.object({
    name: z.string().min(2, 'El nombre es requerido'),
    email: z.email().min(1, 'El email es requerido'),
    password: z.string().min(4, 'La contraseña es requerida')
})

export const validateUser = (user: Partial<User>) => {  
    return userSchema.safeParse(user);
}

export const validateUserPartial = (user: Partial<User>) => {
    return userSchema.partial().safeParse(user);
}