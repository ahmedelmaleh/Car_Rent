import { db } from '../../../db/connection.js';
import { ObjectId } from 'mongodb';
export const RentalModel = db.collection('rentals');

export const createRental = async (rentalData) => {
  return await RentalModel.insertOne(rentalData);
};

export const findRentalById = async (id) => {
  return await RentalModel.findOne({ _id: new ObjectId(id) });
};

export const updateRental = async (id, updateData) => {
  const result = await RentalModel.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
};

export const deleteRental = async (id) => {
  return await RentalModel.deleteOne({ _id: new ObjectId(id) });
};

export const findRentalsByQuery = async (query) => {
  return await RentalModel.find(query).toArray();
};
