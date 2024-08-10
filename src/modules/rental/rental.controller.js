import { createRental, findRentalById, updateRental, deleteRental, findRentalsByQuery } from './rental.model.js';
import { findCarById, updateCar } from '../car/car.model.js';
import { findCustomerById } from '../customer/customer.model.js';

export const createRentalEntry = async (req, res, next) => {
  try {
    const { carId, customerId, rentalDate, returnDate } = req.body;
    const car = await findCarById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found', success: false });
    }
    const customer = await findCustomerById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found', success: false });
    }
    const newRental = { carId, customerId, rentalDate, returnDate };
    await updateCar(carId, { rentalStatus: 'rented' });
    await createRental(newRental);
    return res.status(201).json({ message: 'Rental created successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getRentals = async (req, res, next) => {
  try {
    const rentals = await findRentalsByQuery({});
    return res.status(200).json(rentals);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getRentalById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rental = await findRentalById(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found', success: false });
    }
    return res.status(200).json(rental);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateRentalById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const rental = await findRentalById(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found', success: false });
    }
    await updateRental(id, updateData);
    return res.status(200).json({ message: 'Rental updated successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
export const deleteRentalById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const rental = await findRentalById(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found', success: false });
    }
    await updateCar(rental.carId, { rentalStatus: 'available' });
    await deleteRental(id);
    return res.status(200).json({ message: 'Rental deleted successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
