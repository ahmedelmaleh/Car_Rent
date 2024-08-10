import { createCar, findCarById, updateCar, deleteCar, findCarsByQuery } from './car.model.js';
export const addCar = async (req, res, next) => {
  try {
    const { name, model, rentalStatus } = req.body;
    const newCar = { name, model, rentalStatus };
    await createCar(newCar);
    return res.status(201).json({ message: 'Car added successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCars = async (req, res, next) => {
  try {
    const cars = await findCarsByQuery({});
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await findCarById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found', success: false });
    }
    return res.status(200).json(car);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const car = await findCarById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found', success: false });
    }
    await updateCar(id, updateData);
    return res.status(200).json({ message: 'Car updated successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await findCarById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found', success: false });
    }
    await deleteCar(id);
    return res.status(200).json({ message: 'Car deleted successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCarsByModel = async (req, res, next) => {
  try {
    const { model } = req.query;
    const cars = await findCarsByQuery({ model: { $in: ['Honda', 'Toyota'] } });
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};