// /app/api/customer-orders/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch the number of orders for each customer
export async function GET() {
  try {
    const clientOrderStats = await prisma.client.findMany({
      where: { isDeleted: false },
      include: {
        order: {
          select: {
            id: true,
          },
        },
      },
    });

    // Prepare the data: Client's name and the number of orders
    const data = clientOrderStats.map((client) => ({
      name: client.name,
      orderCount: client.order.length,
    }));

    // Extract the names and order counts separately
    const labels = data.map((client) => client.name);
    const orderCounts = data.map((client) => client.orderCount);

    return NextResponse.json({ labels, data: orderCounts });
  } catch (error) {
    console.error("Error Fetching Customer Orders:", error);
    return NextResponse.json({ error: "Failed to fetch customer order stats" }, { status: 500 });
  }
}
