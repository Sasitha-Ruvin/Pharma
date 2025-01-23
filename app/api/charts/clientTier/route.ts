// /app/api/customer-stats/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// API route to get customer count by Tier
export async function GET() {
  try {
    const tierStats = await prisma.client.groupBy({
      by: ['tier'],
      where: { isDeleted: false },
      _count: {
        id: true,
      },
    });

    const labels = tierStats.map((stat) => stat.tier);
    const data = tierStats.map((stat) => stat._count.id);

    return NextResponse.json({ labels, data });
  } catch (error) {
    console.error("Error Fetching Customer Stats:", error);
    return NextResponse.json({ error: "Failed to fetch customer stats" }, { status: 500 });
  }
}
