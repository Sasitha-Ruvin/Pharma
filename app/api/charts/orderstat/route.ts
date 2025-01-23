import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// API Route to get order count by year and month
export async function GET(request: Request) {
  try {
    // Use URLSearchParams to extract query parameters more reliably
    const url = new URL(request.url);
    const year = url.searchParams.get("year") ?? new Date().getFullYear().toString(); // Default to current year

    const startOfYear = new Date(parseInt(year), 0, 1); // Start from Jan 1st of the year
    const endOfYear = new Date(parseInt(year), 11, 31); // End on Dec 31st of the year

    // Fetch count of orders by month
    const monthlyOrders = await prisma.order.groupBy({
      by: ['orderDate'],
      where: {
        orderDate: {
          gte: startOfYear,
          lte: endOfYear
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        orderDate: 'asc',
      },
    });

    // Initialize the array to hold order counts for each month (12 months)
    const ordersByMonth = Array(12).fill(0); 
    monthlyOrders.forEach((order) => {
      const month = new Date(order.orderDate).getMonth(); // Get the month number (0 - 11)
      ordersByMonth[month] = order._count.id;
    });

    return NextResponse.json(ordersByMonth, { status: 200 });
  } catch (error) {
    console.error("Error Fetching Order Stats: ", error);
    return NextResponse.json({ error: "Failed to fetch order stats" }, { status: 500 });
  }
}
