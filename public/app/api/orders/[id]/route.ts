import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";

export async function GET(request:Request,{params}:{params:{id:string}}) {
    try {
        const { id } = await params;
        const orderId = parseInt(id,10);
        const order = await prisma.order.findUnique({
            where:{id:orderId}
        });

        if(!order){
            return NextResponse.json({error:"Order Not Found"},{status:404})
        }

        return NextResponse.json(order,{status:200})
    } catch (error) {

        console.log("Error Fetching Order",error);
        return NextResponse.json({error:"Failed to Fetch Order"},{status:500})
        
    }
    
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const orderId = parseInt(id, 10);
        const data = await request.json();

        // Validate that ID is a number
        if (isNaN(orderId)) {
            return NextResponse.json({ error: "Invalid Order ID Format" }, { status: 400 });
        }

        // Validate data payload
        if (!data || typeof data !== "object") {
            return NextResponse.json({ error: "Invalid Data Payload" }, { status: 400 });
        }

        // Safely prepare updateData
        const updateData: any = {
            notes: data.notes,
            orderStatus: data.orderStatus,
            deliveryAddress: data.deliveryAddress,
        };

        // Ensure estDeliveryDate is valid before adding it
        if (data.estDeliveryDate) {
            const isValidDate = !isNaN(new Date(data.estDeliveryDate).getTime());
            if (isValidDate) {
                updateData.estDeliveryDate = new Date(data.estDeliveryDate);
            } else {
                return NextResponse.json({ error: "Invalid Date Format" }, { status: 400 });
            }
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: updateData,
        });

        return NextResponse.json(updatedOrder, { status: 200 });

    } catch (error) {
        console.log("Error Updating Order", error);
        return NextResponse.json({ error: "Failed to Update Order" }, { status: 500 });
    }
}