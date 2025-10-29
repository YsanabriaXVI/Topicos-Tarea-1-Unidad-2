import { User } from "./user.interface";

export interface Todo{
    id: string
    title: string
    description?: string | null
    completed: boolean
    userId?: number | null
    user?: User | null;
}