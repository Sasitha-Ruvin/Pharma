// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      name: 'John Doe',      // Add a name here
      address: 'Admin Address'  // Add an address here
    },
  });

  console.log('Admin user created');
   // Create employee user
   const employeePassword = await bcrypt.hash('employee123', 10);
   await prisma.user.create({
     data: {
       email: 'employee@example.com',
       password: employeePassword,
       role: 'employee',
       name: 'Jane Smith',
       address: 'Employee Address'
     },
   });
 
   console.log('Employee user created');


    // Create employee user
  const inventoryPassword = await bcrypt.hash('inventory123', 10);
  await prisma.user.create({
    data: {
      email: 'inventory@example.com',
      password: inventoryPassword,
      role: 'inventory',
      name: 'Jane Smith',
      address: 'Employee Address'
    },
  });

  console.log('Employee user created');
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
