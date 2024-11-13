import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Handling GET request (same as before)
export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json({ products });
    } catch (error) {
        console.error("Failed to load Products", error);
        return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();
    console.log("Incoming Data:", data); 

    // Check if the essential fields are provided
    if (!data.name || !data.expiration || !data.supplierId || !data.quantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new product record in the database
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        expiration: new Date(data.expiration), 
        supplierId: data.supplierId,
        quantity: parseInt(data.quantity, 10),
        storetemp: data.storetemp,
        shelf: data.shelf,
        directions: data.directions,
        description: data.description,
        sideEffect: data.sideEffect, // Ensure this matches `formData`
      },
    });

    // Return the created product with a success response
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error Creating Product:", error);
    
    // Return a clear error message if the operation fails
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
