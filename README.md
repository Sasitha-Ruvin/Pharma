## PharmaSys


 ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
## Description
PharmaSys is a Next.js application that helps businesses manage their employees, suppliers, orders, and products. It’s designed to meet specific client needs and isn’t meant to replace full-scale SAP or ERP systems. PharmaSys offers basic ERP features at a much lower cost, making it a great option for small to medium-sized businesses. 

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)

---

## Features
- Employee Management (Employee CRUD)
- Product Management (Product CRUD)
- Supplier Management (Supplier CRUD)
- Order Management
- Trainee Resource Hub
- Report Generation
  
---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository link>
2. Navigate to the project directory:
   ```bash
   cd <project name>
3. Install dependencies:
   ```bash
   npm install
4. Add the env file
   ```bash
   touch .env
5. Add the connection string to the .env file
   ```bash
   DATABASE_URL="mysql://root@localhost:3306/pharma"
6. Create the database:
   - Navigate to your local server.
   - Create the `Pharma` database.
7. Migrate the prisma schema to the database
    ```bash
   npx prisma migrate dev --name init
   npx prisma migrate dev --name added_tables
8. Seed the database
   ```bash
   npm run seed
---

## Usage
Run the server
```bash
npm run dev
```
---

## Deployment
This project is still under development

Production Version - ***under development***
Link to the production version will be displayed soon

---

## Technologies Used

• Next.js
• MySQL
• Prisma ORM
• TailwindCSS

*THIS IS A COLLEGE PROJECT AND DO NOT CONTAIN ANY LICENCES AND CONTRIBUTION FORKS WILL NOT BE MERGED*

**Thank you for checking it out**
