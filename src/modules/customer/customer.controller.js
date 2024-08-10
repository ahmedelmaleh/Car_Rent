import bcrypt from 'bcrypt';
import { createCustomer, findCustomerById, updateCustomer, deleteCustomer, findCustomersByQuery } from './customer.model.js';

export const addCustomer = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const existingCustomer = await findCustomersByQuery({ email });
    if (existingCustomer.length > 0) {
      return res.status(400).json({ message: 'Email already exists', success: false });
    }

    const hashpass = bcrypt.hashSync(password, 8);
    const newCustomer = { name, email, password: hashpass, phoneNumber };
    await createCustomer(newCustomer);
    return res.status(201).json({ message: 'Customer added successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await findCustomersByQuery({});
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await findCustomerById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found', success: false });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { userId } = req.body; 
    if (userId !== id) {
      return res.status(403).json({ message: 'Unauthorized action', success: false });
    }
    if (updateData.password) {
      updateData.password = bcrypt.hashSync(updateData.password, 8);
    }
    await updateCustomer(id, updateData);
    return res.status(200).json({ message: 'Customer updated successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; 
    if (userId !== id) {
      return res.status(403).json({ message: 'Unauthorized action', success: false });
    }
    await deleteCustomer(id);
    return res.status(200).json({ message: 'Customer deleted successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
