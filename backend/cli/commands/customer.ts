import axios from 'axios';
import Table from 'cli-table';

type Customer = {
  _id: string;
  fullName: string;
  numberOfRides: number;
  averageRating: number;
  currentLocation: string;
  createdAt: string;
  updatedAt: string;
};

export default async (): Promise<void> => {
  const res = await axios.get('http://localhost:3001/customer');

  const table = new Table({
    head: [
      'Full Name',
      'Current Location',
      'Number of Rides',
      'Number of Rides',
    ],
  });

  res.data.map((customer: Customer) => {
    table.push([
      customer.fullName,
      customer.currentLocation,
      customer.numberOfRides,
      customer.averageRating,
    ]);
  });

  console.log(table.toString());
};
