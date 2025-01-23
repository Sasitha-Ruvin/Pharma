import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch medications with a quantity less than 20
    const lowStockMedications = await prisma.medication.findMany({
      where: {
        amount: {
          lt: 20,  // Quantity less than 20
        }
      }
    });

    const count = lowStockMedications.length;
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching low stock medications:", error);
    return NextResponse.json({ error: "Failed to fetch low stock medications" }, { status: 500 });
  }
}
