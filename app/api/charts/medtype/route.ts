import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Fetch medication data aggregated by category
    const types = await prisma.medication.groupBy({
      by: ["type"], 
      _count: {
        id: true,
      },
    });

    // Format the data for Chart.js
    const labels = types.map((ty) => ty.type);
    const data = types.map((cat) => cat._count.id);

    return NextResponse.json({ labels, data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching medication categories:", error);
    return NextResponse.json({ error: "An error occurred while fetching data" }, { status: 500 });
  }
}
