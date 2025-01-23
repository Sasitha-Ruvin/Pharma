import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const medicationId = parseInt(params.id, 10);
        const medication = await prisma.medication.findUnique({
            where: { id: medicationId }, // Get Medication by ID
        });

        if (!medication) {
            return NextResponse.json({ error: 'Medication Not Found' }, { status: 404 });
        }

        return NextResponse.json(medication, { status: 200 });
    } catch (error) {
        console.error('Error Fetching Medication', error);
        return NextResponse.json({ error: 'Failed to Fetch Medication' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const medicationId = parseInt(params.id, 10);

        if (isNaN(medicationId)) {
            return NextResponse.json({ error: 'Invalid Medication ID Format' }, { status: 400 });
        }

        const data = await request.json();

        // Validate the request payload
        if (
            !data ||
            typeof data !== 'object' ||
            !data.scientificName ||
            typeof data.amount !== 'number' ||
            typeof data.pricePerUnit !== 'number' ||
            !data.shelfAddress
        ) {
            return NextResponse.json({ error: 'Invalid request payload or missing fields' }, { status: 400 });
        }

        const updatedMedication = await prisma.medication.update({
            where: { id: medicationId },
            data: {
                scientificName: data.scientificName,
                amount: data.amount,
                pricePerUnit: data.pricePerUnit,
                shelfAddress: data.shelfAddress,
            },
        });

        return NextResponse.json(updatedMedication, { status: 200 });
    } catch (error) {
        console.error('Error Updating Medication:', error);
        return NextResponse.json({ error: 'Failed to Update Medication' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const medicationId = parseInt(params.id, 10);

    try {
        if (isNaN(medicationId)) {
            return NextResponse.json({ error: 'Invalid Medication ID Format' }, { status: 400 });
        }

        await prisma.medication.delete({
            where: { id: medicationId },
        });

        return NextResponse.json({ message: 'Medication Deleted Successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error Deleting Medication:', error);
        return NextResponse.json({ error: 'Failed to Delete Medication' }, { status: 500 });
    }
}
