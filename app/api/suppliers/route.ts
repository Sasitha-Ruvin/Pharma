import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';


// Getting Suppliers

export async function GET() {
    try {
        const suppliers = await prisma.supplier.findMany();
        return NextResponse.json(suppliers);
        
    } catch (error) {
        console.error("Failed to Load Suppliers",error)
        NextResponse.json({error: 'Failed to load Products'},{status:500})
        
    }
    
}

// Adding Suppliers

export async function POST(request:Request) {
    try {
        const data = await request.json();
        const newSupplier = await prisma.supplier.create({
            data: {
                name: data.name,
                address: data.address,
                contact: data.contact,
                email: data.email,
                country: data.country,
                tier: data.tier
            },
        });
        return NextResponse.json(newSupplier,{status:201});
        
    } catch (error) {
        console.log("Error Creating Supplier",error);
        NextResponse.json({error:'Failed to Create supplier'},{status:500})
        
    }
    
}