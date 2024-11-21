import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';
import { error } from "console";

export async function GET(request:Request, {params}:{params :{ id:string}}) {
    try {
        const { id } = await params;
        const supplierId = parseInt(id,10);
        const supplier = await prisma.supplier.findUnique({
            where:{id:supplierId}
        })

        if(!supplier){
            return NextResponse.json({error:'Supplier not Found'},{status:404})
        }
        return NextResponse.json(supplier,{status:200}); 
        
    } catch (error) {
        console.error('Error fetching Supplier:', error);
        return NextResponse.json({ error: 'Failed to fetch Supplier' }, { status: 500 });
        
    }
}

export async function PUT(request:Request,{params}:{params:{id:string}}) {
    try {
        const { id } = await params;
        const supplierId = parseInt(id, 10);
        const data = await request.json();

        if(isNaN(supplierId)){
            return NextResponse.json({error:'Invalid Supplier ID'},{status:404})
        }

        const updatedSupplier = await prisma.supplier.update({
            where:{id:supplierId},
            data:{
                name:data.name,
                address:data.address,
                contact:data.contact,
                email:data.email,
                country:data.country,
                tier:data.tier,
            },
        });
        return NextResponse.json(updatedSupplier,{status:200});
        
    } catch (error) {
        console.error('Error fetching Supplier:', error);
        return NextResponse.json({ error: 'Failed to fetch Supplier' }, { status: 500 });
        
    }
    
}

export async function DELETE(request:Request,{params}:{params: {id:string}}) {
 

    try{
        const { id } = await params;
        if(!id){
            return NextResponse.json({error:'ID is Required'},{status:400});
        }

        const supplierID = parseInt(id,10);

        if(isNaN(supplierID)){
            return NextResponse.json({error:'Invalid ID format'},{status:400});
        }
        await prisma.supplier.delete({
            where:{id:supplierID}
        });

        return NextResponse.json({message:'Supplier Deleted'},{status:200})
    }
    catch(error){
        console.error('Error deleting supplier: ', error);
        return NextResponse.json({error:'Failed to delete supplier'},{status:500});
    }
    
}