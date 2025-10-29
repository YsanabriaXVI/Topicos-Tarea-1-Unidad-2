import { User } from "./user.interface";

export interface Todo{
    id: string
    title: string
    description?: string | null
    completed: boolean
    userId?: string | null
    user?: User | null;
}