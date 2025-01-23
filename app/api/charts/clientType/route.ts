import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch clients grouped by type with a count
    const clientStats = await prisma.client.groupBy({
      by: ['type'],
      where: { isDeleted: false },
      _count: {
        id: true,
      },
      orderBy: {
        type: 'asc',
      },
    });

    // Map the results into a more suitable structure for the chart
    const labels = clientStats.map(stat => stat.type);
    const data = clientStats.map(stat => stat._count.id);

    return NextResponse.json({
      labels,
      data,
    });
  } catch (error) {
    console.error("Error Fetching Customer Stats:", error);
    return NextResponse.json({ error: 'Failed to fetch customer stats' }, { status: 500 });
  }
}
