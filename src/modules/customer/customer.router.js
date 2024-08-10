import { Router } from 'express';
import { addCustomer, getCustomers, getCustomerById, updateCustomerById, deleteCustomerById } from './customer.controller.js';

const customerRouter = Router();

customerRouter.post('/', addCustomer);
customerRouter.get('/', getCustomers);
customerRouter.get('/:id', getCustomerById);
customerRouter.put('/:id', updateCustomerById);
customerRouter.delete('/:id', deleteCustomerById);

export default customerRouter;
