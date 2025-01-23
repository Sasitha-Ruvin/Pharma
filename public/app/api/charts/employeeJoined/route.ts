import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.groupBy({
      by: ['dateJoined'],
      _count: {
        id: true, // Count users by dateJoined
      },
      where: {
        role: { not: 'Chief Operating Officer' },
        isDeleted: false,
      },
      orderBy: { dateJoined: 'asc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user frequency' }, { status: 500 });
  }
}
