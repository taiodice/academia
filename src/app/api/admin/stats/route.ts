import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const pin = url.searchParams.get('pin');

    if (pin !== 'Padre.123') {
      return NextResponse.json({ error: 'Acceso Denegado. PIN incorrecto.' }, { status: 401 });
    }

    // Get users (excluding if we had admins, but for now just all users)
    const users = await prisma.user.findMany({
      include: {
        progress: true,
        quizAttempts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    return NextResponse.json({ error: 'Error fetching stats' }, { status: 500 });
  }
}
