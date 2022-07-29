# sabbar-challenge-test

## Demo

### Listing
![Listing](https://imgur.com/b8lhPIB.png)
### Update
![Update](https://imgur.com/PMtBVDa.png)
### Delete
![Delete](https://imgur.com/P8s6haP.png)
### Create
![Create](https://imgur.com/zDedU67.png)

## Getting started

1. Clone the repository
   ```
   git clone git@github.com:ziishaned/sabbar-challenge-test.git
   ```

2. Install dependencies for backend:
   ```bash
   cd backend
   yarn install
   ```

3. Install dependencies for frontend:
   ```bash
   cd frontend
   yarn install
   ```

4. Start the application by running below command in the root of the project:
   ```bash
   yarn dev
   ```

5. Seed the database with below command:
   ```bash
   cd backend
   yarn seed
   ```
   
6. Application URLs:
   ```bash
   frontend: http://localhost:3000/
   backend: http://localhost:3001/
   ```

## Available CLI commands

```bash
Usage: sabbar [options] [command]

Options:
  -V, --version       output the version number
  -h, --help          display help for command

Commands:
  customer [options]  Show existing list of customers
  cruiser [options]   Show existing list of cruisers
  manual              Show this help
  exit                Kill the CLI (and the rest of the application)
  help [command]      display help for command
```

## Importing Postman Collection

Copy below link and import in postman:

```bash
https://www.getpostman.com/collections/4a3e055c9d0bb6ee6517
```

![Postman](https://imgur.com/MYJcUT4.png)