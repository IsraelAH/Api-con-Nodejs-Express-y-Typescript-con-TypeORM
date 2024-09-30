import express from 'express';
import profesoresControllers from '../controllers/profesoresControllers';
const routes =  express.Router();

routes.get('/', profesoresControllers.consultar);

routes.post('/', profesoresControllers.ingresar);

routes.route('/:id')
        .get(profesoresControllers.consultarDetalle)
        .put(profesoresControllers.actualizar)
        .delete(profesoresControllers.borrar);




export default routes;