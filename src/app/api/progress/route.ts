import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const subjectId = url.searchParams.get('subjectId');

    if (!userId || !subjectId) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const progress = await prisma.progress.findMany({
      where: {
        userId,
        subjectId
      }
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Progress Error:', error);
    return NextResponse.json({ error: 'Error al obtener progreso' }, { status: 500 });
  }
}
