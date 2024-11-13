import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params; 

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Ensure id is a number if needed
    const userId = parseInt(id, 10);
    
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isDeleted: true },
    });
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error Deleting User:', error);
    return NextResponse.json({ error: 'Failed to Delete User' }, { status: 500 });
  }
}
