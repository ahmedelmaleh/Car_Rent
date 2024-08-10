import { db } from '../../../db/connection.js';
import { ObjectId } from 'mongodb';

export const CarModel = db.collection('cars');

export const createCar = async (carData) => {
  return await CarModel.insertOne(carData);
};

export const findCarById = async (id) => {
  return await CarModel.findOne({ _id: new ObjectId(id) });
};

export const updateCar = async (id, updateData) => {
  return await CarModel.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
};

export const deleteCar = async (id) => {
  return await CarModel.deleteOne({ _id: new ObjectId(id) });
};

export const findCarsByQuery = async (query) => {
  return await CarModel.find(query).toArray();
};
