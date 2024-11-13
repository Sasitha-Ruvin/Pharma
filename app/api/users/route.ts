// app/api/users/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: 'COO'
        },
        isDeleted: false,
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request:Request) {
  try{
    const data = await request.json();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name:data.name,
        email:data.email,
        address:data.address,
        password:hashedPassword,
        role:data.role,
        contact:data.contact,
        dateJoined:data.dateJoined ? new Date(data.dateJoined) : null,
        status:data.status
    
      },
    });
    return NextResponse.json(newUser,{status:201});
  }catch(error){
    console.log("Error Creating User: ", error);
    return NextResponse.json({error:'Failed to create User'},{status:500})

  }
  
}