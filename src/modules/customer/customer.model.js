import { db } from '../../../db/connection.js';
import { ObjectId } from 'mongodb';

export const CustomerModel = db.collection('customers');

export const createCustomer = async (customerData) => {
  return await CustomerModel.insertOne(customerData);
};

export const findCustomerById = async (id) => {
  return await CustomerModel.findOne({ _id: new ObjectId(id) });
};

export const updateCustomer = async (id, updateData) => {
  return await CustomerModel.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
};

export const deleteCustomer = async (id) => {
  return await CustomerModel.deleteOne({ _id: new ObjectId(id) });
};

export const findCustomersByQuery = async (query) => {
  return await CustomerModel.find(query).toArray();
};
