

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; //prisma is something to connect nextJS with mysql,
import bcrypt from 'bcrypt'; // this one is just to decrypt passwords, right now passwords are saved as hashcodes
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "secretKEY";

export async function POST(request: Request) {
  const { role, email, password, status } = await request.json();

  // Validate the user in the database based on role and email
  const user = await prisma.user.findFirst({
    where: {
      email,
      role, 
      status,
    },
  });
  console.log("User found:", user);

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (isPasswordValid) {

      const token = jwt.sign(
        {id:user.id, name:user.name, role:user.role, status:user.status},
        SECRET_KEY,
        {expiresIn:'2h'}
      );
      return NextResponse.json({token}, { status: 200 });
    }
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
