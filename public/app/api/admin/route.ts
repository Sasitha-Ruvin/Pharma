import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; //prisma is something to connect nextJS with mysql,
import bcrypt from 'bcrypt'; // this one is just to decrypt passwords, right now passwords are saved as hashcodes
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "secretKEY";

export async function POST(request:Request) {
    const {email, password } = await request.json();

    const admin = await prisma.admin.findFirst({
        where:{
            email
        },
    });
    console.log("Admin Found",admin);

    if(admin){
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if(isPasswordValid){
            const token = jwt.sign(
                {id:admin.id, role:admin.role},
                SECRET_KEY,
                {expiresIn:'2h'}
            );
            return NextResponse.json({token},{status:200});
        }
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    
}