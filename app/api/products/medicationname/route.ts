import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const medications = await prisma.medication.findMany({
            select: {
                id: true,
                medicationNameId: true,
                medicationname: {
                    select: {
                        name: true, // Fetch the medication name
                    },
                },
                pricePerUnit: true,
            },
        });

      
        const medicationList = medications.map((medication) => ({
            id: medication.id,
            name: medication.medicationname.name, 
            pricePerUnit: medication.pricePerUnit,
        }));

        return NextResponse.json(medicationList);
    } catch (error) {
        console.error('Error Fetching Medications:', error);
        return NextResponse.json({ error: 'Failed to fetch medications' }, { status: 500 });
    }
}
