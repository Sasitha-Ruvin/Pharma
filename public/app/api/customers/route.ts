import prisma from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            where: { isDeleted: false },
            include: { clientaddress: true },
        });

        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error Fetching Clients:', error);
        return NextResponse.json({ error: 'Failed to fetch Clients' }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
      const data = await request.json();

      const requiredFields = ["name", "type", "email","contact","contractType","paymentMethod","tier"];
      for(const field of requiredFields){
        if(!data[field]?.trim()){
          return NextResponse.json({error:`Field '${field} is required'`},{status:400})
        }
      }

      if (!Array.isArray(data.addresses) || data.addresses.length === 0 || data.addresses.every((addr: string) => !addr.trim())) {
        return NextResponse.json({ error: "At least one valid address is required." }, { status: 400 });
      }
  
      // Create the client first
      const newClient = await prisma.client.create({
        data: {
          name: data.name,
          type: data.type,
          email: data.email,
          contact: data.contact,
          contractType: data.contractType,
          paymentMethod: data.paymentMethod,
          tier: data.tier,
        },
      });
  
      const clientAddresses = await prisma.clientaddress.createMany({
        data: data.addresses.map((address: string) => ({
          clientId: newClient.id,
          address,
        })),
      });
  
      return NextResponse.json({ client: newClient, addresses: clientAddresses }, { status: 201 });
    } catch (error) {
      console.error('Error creating client:', error);
      return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
  }