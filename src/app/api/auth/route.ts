import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, name, isRegistering } = body;

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    if (isRegistering) {
      // Crear nuevo usuario
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      const user = await prisma.user.create({
        data: {
          username,
          name: name || username,
        },
      });
      return NextResponse.json({ user }, { status: 201 });
    } else {
      // Login
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ user }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
