import { Router } from 'express';
import { addCar, getCars, getCarById, updateCarById, deleteCarById, getCarsByModel } from './car.controller.js';

const carRouter = Router();

carRouter.post('/', addCar);
carRouter.get('/', getCars);
carRouter.get('/:id', getCarById);
carRouter.put('/:id', updateCarById);
carRouter.delete('/:id', deleteCarById);
carRouter.get('/byModel', getCarsByModel);

export default carRouter;
