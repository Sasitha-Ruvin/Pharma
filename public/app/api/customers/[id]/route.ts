import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";

export async function GET(request:Request,{params}:{params:{id:string}}) {
    try{
        const {id} = params;
        const clientId = parseInt(id,10);
        const client = await prisma.client.findUnique({
            where:{id:clientId},
            include: { clientaddress: true },
        })

        if(isNaN(clientId)){
            return NextResponse.json({error:'Invalid Client ID'},{status:400})

        }

        if(!client){
            return NextResponse.json({error:'Client Not Found'},{status:404})
        }
        return NextResponse.json(client,{status:200})

    }catch(error){
        console.log(error);
        return NextResponse.json({error:'Failed to Fetch Clients'},{status:500})
    }
    
}

export async function PUT(request:Request, {params}:{params:{id:string}}) {
    try{
        const {id} = params;
        const clientId = parseInt(id);
        const data = await request.json();

        if(isNaN(clientId)){
            return NextResponse.json({error:'Invalid Client ID'},{status:400});
        }

        const updatedClient = await prisma.client.update({
            where:{id:clientId},
            data:{
                name:data.name,
                email:data.email,
                contact:data.contact,
                type:data.type,
                contractType:data.contractType,
                paymentMethod:data.paymentMethod,
                tier:data.tier,
                clientaddress:{
                    deleteMany:{},
                    create:data.addresses.map((address:string)=>({address})),
                },
            },
        });

        return NextResponse.json(updatedClient,{status:200});

    }catch(error){
        console.error(error);
        return NextResponse.json({error:'Failed to Update Client'},{status:500});
    }
    
}

export async function DELETE(request:Request, {params}:{params:{id:string}}) {
    try {
        const {id} = params;
        const clientId = parseInt(id,10);

        if(isNaN(clientId)){
            return NextResponse.json({error:'Invalid Client ID'}, {status:400});
        }

        await prisma.client.update({
            where:{id:clientId},
            data:{isDeleted:true},
        });

        return NextResponse.json({message:'Client Deleted Successfully'},{status:200});
        
    } catch (error) {
        console.error('Error Deleting Client: ', error);
        return NextResponse.json({error:'Failed to Delete Client'},{status:200});
        
    }
    
}