import { Router } from 'express';
import {
  getCarsByModel,
  getAvailableCarsByModel,
  getRentedOrSpecificModelCars,
  getAvailableOrRentedSpecificModelCars,
} from './special.controller.js';

const specialCarRouter = Router();

specialCarRouter.get('/byModel', getCarsByModel);
specialCarRouter.get('/availableByModel', getAvailableCarsByModel);
specialCarRouter.get('/rentedOrModel', getRentedOrSpecificModelCars);
specialCarRouter.get('/availableOrRentedByModel', getAvailableOrRentedSpecificModelCars);

export default specialCarRouter;
