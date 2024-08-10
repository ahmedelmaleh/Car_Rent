import express from 'express';
import { connectdb } from './db/connection.js';
import carRouter from './src/modules/car/car.router.js';
import customerRouter from './src/modules/customer/customer.router.js';
import rentalRouter from './src/modules/rental/rental.router.js';
import specialCarRouter from './src/modules/Special/special.router.js';

const app = express();
const port = 3000;

connectdb();

app.use(express.json());

app.use('/cars', carRouter);
app.use('/customers', customerRouter);
app.use('/rentals', rentalRouter);
app.use('/special', specialCarRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
