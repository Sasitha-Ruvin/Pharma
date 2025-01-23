import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Fetch medications and their quantities
    const medications = await prisma.medication.findMany({
      select: {
        id: true,
        medicationname: {
          select: { name: true }, // Get medication name
        },
        amount: true,  // Get quantity of each medication
      },
    });

    const medicationData = medications.map((medication) => ({
      name: medication.medicationname.name,
      quantity: medication.amount,
    }));

    // Return formatted data for the chart
    return NextResponse.json({
      labels: medicationData.map((data) => data.name),
      data: medicationData.map((data) => data.quantity),
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching medication quantities:", error);
    return NextResponse.json({ error: "Failed to fetch medication data" }, { status: 500 });
  }
}
