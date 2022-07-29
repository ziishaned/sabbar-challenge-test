import axios from 'axios';
import Table from 'cli-table';

import { CustomerDocument } from '../../src/customer/schemas/customer.schema';

type Options = {
  page: string;
  limit: string;
};

export default async (options: Options): Promise<void> => {
  const { page, limit } = options;

  try {
    const res = await axios.get(
      `http://localhost:3001/customer?page=${Number(page)}&limit${Number(
        limit,
      )}&isDriver=true`,
    );

    const table = new Table({
      head: ['Name', 'Latitude', 'Longitude', 'Number of Rides', 'Rating'],
    });

    res.data.customers.map((customer: CustomerDocument) => {
      table.push([
        customer.name,
        customer.locationLatitude,
        customer.locationLongitude,
        customer.numberOfRides,
        customer.rating,
      ]);
    });

    console.log(`Limit = ${limit}`);
    console.log(`Total Pages = ${res.data.totalPages}`);
    console.log(`Current Page = ${res.data.currentPage}`);
    console.log(table.toString());
  } catch (error) {
    console.log(`Error while fetching cruiser: ${error.message}`);
  }
};
