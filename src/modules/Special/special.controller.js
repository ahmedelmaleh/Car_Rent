import { findCarsByQuery } from '../car/car.model.js';

export const getCarsByModel = async (req, res) => {
  try {
    const models = req.query.models ? req.query.models.split(',') : [];
    const cars = await findCarsByQuery({ model: { $in: models } });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAvailableCarsByModel = async (req, res) => {
  try {
    const { model } = req.query;
    const cars = await findCarsByQuery({ model, rentalStatus: 'available' });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getRentedOrSpecificModelCars = async (req, res) => {
  try {
    const { model } = req.query;
    const cars = await findCarsByQuery({ $or: [{ rentalStatus: 'rented' }, { model }] });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAvailableOrRentedSpecificModelCars = async (req, res) => {
  try {
    const models = req.query.models ? req.query.models.split(',') : [];
    const { model } = req.query;
    const cars = await findCarsByQuery({
      $or: [
        { model: { $in: models }, rentalStatus: 'available' },
        { model, rentalStatus: 'rented' }
      ]
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
