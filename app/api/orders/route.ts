//api/orders

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                client: true,
                user: true,
                ordermedication: {
                    include: {
                        medication: true,
                    },
                },
            },
        });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Error Fetching Orders: ", error);
        return NextResponse.json(
            { error: "Failed to fetch Orders" },
            { status: 500 }
        );
    }
}


export async function POST(request:Request) {
    const formData = await request.formData();
    try {
        const orderDate = formData.get('orderDate')?.toString();
        const estDeliveryDate = formData.get('estDeliveryDate')?.toString();
        const deliveryAddress = formData.get('deliveryAddress')?.toString();
        const note = formData.get('notes')?.toString();
        const selectedClient = formData.get('selectedClient')?.toString();
        const selectedUser = formData.get('selectedUser')?.toString();
        const items = formData.get('items')?.toString();
        const totalPrice = formData.get('totalPrice')?.toString() || "";


        if(!orderDate || !estDeliveryDate || !deliveryAddress || !selectedClient || !selectedUser || !items){
            return NextResponse.json(
                { error: "Missing Required Fields: orderDate, estDeliveryDate, deliveryAddress, selectedClient, selectedUser, or items" },
                { status: 400 }
            );            
        }

        const parsedItems = JSON.parse(items);
        if(!Array.isArray(parsedItems) || parsedItems.length === 0){
            return NextResponse.json({error:"Invalid Item Format"},{status:400});
        }

        const transaction = await prisma.$transaction(async(prismaTransaction)=>{
            const newOrder = await prismaTransaction.order.create({
                data:{
                    orderDate: new Date(orderDate),
                    estDeliveryDate: new Date(estDeliveryDate),
                    deliveryAddress:deliveryAddress,
                    notes:note ?? "",
                    clientId:parseInt(selectedClient,10),
                    userId:parseInt(selectedUser,10),
                    total:parseFloat(totalPrice),
                    orderStatus:"Pending",
                    ordermedication:{
                        create:parsedItems.map((item:any)=>({
                            medicationId:parseInt(item.medicationId,10),
                            quantity:parseInt(item.quantity,10),
                            price:parseFloat(item.price),
                        })),
                    },
                },
            });

            for (const item of parsedItems){
                await prismaTransaction.medication.update({
                    where:{id:parseInt(item.medicationId,10)},
                    data:{
                        amount:{
                            decrement:parseInt(item.quantity,10),
                        },
                    },
                });
            }
            return newOrder;
        });

        return NextResponse.json(transaction,{status:201})
    } catch (error) {
        console.error("Error Creating Order: ", error);
    return NextResponse.json({ error: "Failed to Create Order" }, { status: 500 });
        
    }
    
}