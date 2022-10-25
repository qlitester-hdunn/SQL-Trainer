# ORM-Practice
Some practice querying a database using an ORM (in this case Prisma).

### Setting up MySQL

Via Homebrew: `brew install mysql` (ref: https://formulae.brew.sh/formula/mysql)

Clone the test database repo:
```
git clone https://github.com/datacharmer/test_db.git
```

To set up MySQL server with employee data run:
```
cd test_db
mysql.server start
mysql -u root
CREATE DATABASE employees;
use employees;
source employees.sql;
exit
```
Note: After initial set up the only command that needs to be ran before running any tests is `mysql.server start`

### Setting up Prisma

To set up Prisma, in the MySQL directory run:
```
npm install
```

Create a .env file in the MySQL directory with the proper DATABASE_URL set. If the above MySQL set up steps were followed exactly, the following should work in the .env file:
```
DATABASE_URL="mysql://root@localhost:3306/employees"
```

After setting the DATABASE_URL, run:
```
npx prisma db pull
npm install @prisma/client
npx prisma generate
```

### Running tests
Before running any tests start the MySQL server by running:
```
mysql.server start
```

To run a test file run:
```
npx cypress run
```

To open the Cypress runner:
```
npx cypress open
```
### Helpful Links

MySQL Commands ref: https://medium.com/@mandeepkaur1/a-list-of-mysql-commands-c4d0d244aa5c

Setting up Prisma ref: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres

Prisma Introspection ref: https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgres

Prisma Querying the Database ref: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgres
