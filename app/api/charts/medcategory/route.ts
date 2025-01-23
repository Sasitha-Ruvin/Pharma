import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Fetch medication data aggregated by category
    const categories = await prisma.medication.groupBy({
      by: ["category"], 
      _count: {
        id: true,
      },
    });

    // Format the data for Chart.js
    const labels = categories.map((cat) => cat.category);
    const data = categories.map((cat) => cat._count.id);

    return NextResponse.json({ labels, data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching medication categories:", error);
    return NextResponse.json({ error: "An error occurred while fetching data" }, { status: 500 });
  }
}
