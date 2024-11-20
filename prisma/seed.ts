// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      address: '123 Main St',
      password: hashedPassword,
      role: 'Chief Operating Officer',
      contact: '123-456-7890',
      status: 'Permanent',
      dateJoined: new Date(),
    },
  });

  console.log('User seeded successfully');

  const hashedHRPassword = await bcrypt.hash('hr123', 10);
  await prisma.user.create({
  data: {
    email: 'janedoe@example.com',
    name: 'Jane Doe',
    address: '123 Main St',
    password: hashedHRPassword,
    role: 'HR Manager',
    contact: '123-456-7890',
    status: 'Permanent',
    dateJoined: new Date(),
  },
});

console.log('HR Manager seeded successfully');
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
