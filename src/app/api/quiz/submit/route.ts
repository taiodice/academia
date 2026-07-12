import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId, moduleId, score, passed } = await req.json();

    if (!userId || moduleId === undefined || score === undefined) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    // 1. Guardar el intento del Quiz
    await prisma.quizAttempt.create({
      data: {
        userId,
        moduleId,
        score,
        passed,
      },
    });

    // 2. Si pasó el quiz, actualizar el progreso general
    if (passed) {
      await prisma.progress.upsert({
        where: {
          userId_moduleId: {
            userId,
            moduleId,
          },
        },
        update: {
          score,
          passed: true,
        },
        create: {
          userId,
          moduleId,
          score,
          passed: true,
        },
      });
      
      // Bonus: Dar puntos al usuario
      await prisma.user.update({
        where: { id: userId },
        data: { score: { increment: 100 } } // 100 XP por pasar un módulo
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quiz Submit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
