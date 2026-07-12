import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId, subjectId, moduleId, score, passed } = await req.json();

    if (!userId || moduleId === undefined || score === undefined || !subjectId) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    // 1. Guardar el intento del Quiz
    await prisma.quizAttempt.create({
      data: {
        userId,
        subjectId,
        moduleId,
        score,
        passed,
      },
    });

    // 2. Revisar si ya había aprobado antes
    const previousProgress = await prisma.progress.findUnique({
      where: {
        userId_subjectId_moduleId: { userId, subjectId, moduleId }
      }
    });

    const isFirstTimePass = passed && (!previousProgress || !previousProgress.passed);

    // 3. Actualizar el progreso general (mejor puntaje histórico)
    if (passed || (previousProgress && score > previousProgress.score)) {
      await prisma.progress.upsert({
        where: {
          userId_subjectId_moduleId: { userId, subjectId, moduleId },
        },
        update: {
          score: Math.max(score, previousProgress?.score || 0),
          passed: passed || previousProgress?.passed || false,
        },
        create: {
          userId, subjectId, moduleId, score, passed
        },
      });
    }

    // 4. Bonus: Dar puntos al usuario SOLO la primera vez que aprueba
    if (isFirstTimePass) {
      await prisma.user.update({
        where: { id: userId },
        data: { score: { increment: 100 } }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quiz Submit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
