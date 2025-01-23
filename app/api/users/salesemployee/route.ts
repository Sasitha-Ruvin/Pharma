import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            where: { role: "Sales Employee", isDeleted:false },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error Fetching Users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
