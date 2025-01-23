import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');
  const year = searchParams.get('year');

  try {
    if (employeeId) {
      // Fetch orders for the specific employee
      const orders = await prisma.order.findMany({
        where: {
          userId: parseInt(employeeId, 10),
        },
      });

      // Extract unique years
      const years = Array.from(
        new Set(orders.map((order) => new Date(order.orderDate).getFullYear()))
      ).sort((a, b) => b - a);

      let monthlyData = Array(12).fill(0);

      // If year is provided, calculate monthly data
      if (year) {
        const filteredOrders = orders.filter(
          (order) =>
            new Date(order.orderDate).getFullYear() === parseInt(year, 10)
        );

        filteredOrders.forEach((order) => {
          const month = new Date(order.orderDate).getMonth();
          monthlyData[month]++;
        });
      }

      return NextResponse.json({ years, data: monthlyData });
    } else {
      // Fetch all unique years across all orders
      const orders = await prisma.order.findMany({
        select: {
          orderDate: true,
        },
      });

      const years = Array.from(
        new Set(orders.map((order) => new Date(order.orderDate).getFullYear()))
      ).sort((a, b) => b - a);

      return NextResponse.json({ years });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data.' },
      { status: 500 }
    );
  }
}
