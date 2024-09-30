import express from 'express';
import cursosController from '../controllers/cursosController';
const routes = express.Router();


routes.get('/', cursosController.consultar);
routes.post('/', cursosController.ingresar);
routes.post('/registrarEstudiante', cursosController.asociarEstudiante);

routes.route('/:id')
.get(cursosController.consultarDetalle)
.put(cursosController.actualizar)
.delete(cursosController.borrar);




export default routes;
