import csv from 'csvtojson';
import { resolve } from 'path';
import mongoose from 'mongoose';

(async () => {
  const driversFilePath = resolve(`${__dirname}/drivers.csv`);
  const drivers = await csv().fromFile(driversFilePath);

  const customersFilePath = resolve(`${__dirname}/customers.csv`);
  const customers = await csv().fromFile(customersFilePath);

  customers.map((customer) => {
    delete customer.id;

    customer.isDriver = false;
    customer.rating = Number(customer.rating);
    customer.numberOfRides = Number(customer.numberOfRides);
    customer.locationLatitude = Number(customer.locationLatitude);
    customer.locationLongitude = Number(customer.locationLongitude);
  });

  drivers.map((driver) => {
    delete driver.id;

    driver.isDriver = true;
    driver.rating = Number(driver.rating);
    driver.numberOfRides = Number(driver.numberOfRides);
    driver.locationLatitude = Number(driver.locationLatitude);
    driver.locationLongitude = Number(driver.locationLongitude);
  });

  await mongoose.connect('mongodb://localhost:27017/sabbar');

  const CustomerSchema = new mongoose.Schema(
    {},
    { strict: false, timestamps: true, versionKey: false },
  );
  const customerModel = mongoose.model('customers', CustomerSchema);

  await customerModel.insertMany(customers);
  await customerModel.insertMany(drivers);

  process.exit();
})();
