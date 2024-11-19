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

