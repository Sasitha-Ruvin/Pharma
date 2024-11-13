import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';
import { error } from "console";

export async function DELETE(request:Request, {params}:{params: {id:string}}) {
    const {id} = params;
    try {
        if(!id){
            return NextResponse.json({error:'ID is Required'},{status:400});
        }

        const productId = parseInt(id);
        if(isNaN(productId)){
            return NextResponse.json({error:'Invalid Format'}, {status:400})

        }

        await prisma.product.delete({
            where:{id:productId}
        });
    } catch (error) {
        console.error('Error Deleting Med:', error);
    return NextResponse.json({ error: 'Failed to Delete Med' }, { status: 500 });
        
    }
    
}