import express from 'express';
import estudiantesController from '../controllers/estudiantesControllers';
const routes =  express.Router();



routes.get('/', estudiantesController.consultar);

routes.post('/', estudiantesController.ingresar);


routes.route('/:id')
        .get(estudiantesController.consultarDetalle)
        .put(estudiantesController.actualizar)
        .delete(estudiantesController.borrar);




export default routes;