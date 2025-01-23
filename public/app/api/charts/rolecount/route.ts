import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const roleCounts = await prisma.user.groupBy({
            by:['role'],
            _count:{
                id:true,
            },
            where:{
                isDeleted:false,
                role:{
                    not:"Chief Operating Officer"
                }
            },
        });

        return NextResponse.json(roleCounts)
        
    } catch (error) {
        console.log('Error Fetching Role Counts',  error);
        return NextResponse.json({error:'Failed to fetch Role Counts'},{status:500})
        
    }
    
}