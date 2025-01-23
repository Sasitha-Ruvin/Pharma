import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const year = searchParams.get('year');
    
    try {
        if(clientId){
            const orders = await prisma.order.findMany({
                where:{
                    clientId:parseInt(clientId,10),
                },
            });

            const years = Array.from(
                new Set(orders.map((order)=> new Date(order.orderDate).getFullYear()))
            ).sort((a,b) => b- a);

            let monthlyData = Array(12).fill(0);

            if(year){
                const filteredOrders = orders.filter(
                    (order) =>
                        new Date(order.orderDate).getFullYear()=== parseInt(year,10)
                );

                filteredOrders.forEach((order) =>{
                    const month = new Date(order.orderDate).getMonth();
                    monthlyData[month]++;
                });
            }
            return NextResponse.json({years,data:monthlyData});
        }else{
            const orders = await prisma.order.findMany({
                select:{
                    orderDate:true,
                }
            });

            const years = Array.from(
                new Set(orders.map((order)=> new Date(order.orderDate).getFullYear()))
            ).sort((a,b) => b- a);

            return NextResponse.json({years});
        }
        
    } catch (error) {
        console.log('Error Fetching Client Order Data', error);
        return NextResponse.json(
            {error:'Failed to Fetch Data'},
            {status:500}
        )
    }
}