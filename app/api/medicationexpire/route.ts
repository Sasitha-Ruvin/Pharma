import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  try {
    const expiringMedications = await prisma.medication.findMany({
      where: {
        expireDate: {
          gte: today,       // expireDate is greater than or equal to today
          lte: nextMonth,   // expireDate is less than or equal to next month
        }
      }
    });

    const count = expiringMedications.length;
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching expiring medications:", error);
    return NextResponse.json({ error: "Failed to fetch expiring medications" }, { status: 500 });
  }
}
