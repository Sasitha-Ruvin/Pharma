import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// API route to get order count based on order status
export async function GET(request: Request) {
  try {
    // Fetch orders grouped by status
    const orderStats = await prisma.order.groupBy({
      by: ['orderStatus'],
      _count: {
        id: true
      },
    });

    // Format the data for Pie chart
    const labels = orderStats.map((stat) => stat.orderStatus);
    const data = orderStats.map((stat) => stat._count.id);

    // Return the data to use in the pie chart
    return NextResponse.json({ labels, data }, { status: 200 });
  } catch (error) {
    console.error("Error Fetching Order Stats: ", error);
    return NextResponse.json({ error: "Failed to fetch order status stats" }, { status: 500 });
  }
}
