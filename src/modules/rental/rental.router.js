import { Router } from 'express';
import { createRentalEntry, getRentals, getRentalById, updateRentalById, deleteRentalById } from './rental.controller.js';

const rentalRouter = Router();

rentalRouter.post('/', createRentalEntry);
rentalRouter.get('/', getRentals);
rentalRouter.get('/:id', getRentalById);
rentalRouter.put('/:id', updateRentalById);
rentalRouter.delete('/:id', deleteRentalById);

export default rentalRouter;
