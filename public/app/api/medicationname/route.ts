import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const medicationNames = await prisma.medicationname.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(medicationNames);
  } catch (error) {
    console.error("Failed to load medication names:", error);
    return NextResponse.json({ error: "Failed to load names" }, { status: 500 });
  }
}

export async function POST(request:Request){
  try {
    const data = await request.json();
    const newMedName = await prisma.medicationname.create({
      data:{
        name:data.name,
      },
    });
    return NextResponse.json(newMedName,{status:201});

    
  } catch (error) {
    console.log("Error Creating User: ", error);
    return NextResponse.json({error:'Failed to create User'},{status:500})
    
  }
}
