import express from 'express';
// import { loadEnvFile } from 'node:process';
import todosRoutes from './routes/todos.routes'
import { errorHandler } from './middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config(); //! Carga de variables de entorno
const app = express();

app.use(express.json()); //*Parsea el body de la solicitud en un objeto JSON

app.get('/', (req, res) => {
  res.send('Hola desde el servidor!');
});

//?Middlewares
app.use(errorHandler);
app.use('/todos', todosRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})