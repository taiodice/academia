import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Instanciar el cliente de Gemini. Requiere que GEMINI_API_KEY esté en el .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { question, answer, referenceAnswer } = await req.json();

    if (!question || !answer || !referenceAnswer) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback si el usuario no ha configurado la API Key de Gemini
      return NextResponse.json({
        correct: true,
        feedback: "⚠️ MODO PRUEBA: La corrección por Inteligencia Artificial no está configurada porque falta la GEMINI_API_KEY en el servidor. Te he dado el punto de todos modos, ¡pero avísale a tu profesor que configure la IA!"
      });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
Eres un profesor de historia evaluando a un alumno de 1er año de secundaria.
Tienes que corregir su respuesta a una pregunta de examen. Eres estricto pero muy amable y didáctico.

Pregunta del examen: "${question}"
Respuesta esperada o de referencia: "${referenceAnswer}"
Respuesta del alumno: "${answer}"

Instrucciones:
1. Analiza si la respuesta del alumno demuestra que entendió el concepto.
2. Determina si la respuesta es CORRECTA (verdadero/falso). Si la respuesta es demasiado vaga o directamente incorrecta (como "${answer}"), es FALSO.
3. Escribe una breve retroalimentación (feedback) de máximo 2 oraciones, hablándole directamente al alumno (ej: "¡Muy bien!..."). Si se equivocó, explícale brevemente por qué.

Devuelve EXCLUSIVAMENTE un objeto JSON válido con esta estructura:
{
  "correct": true o false,
  "feedback": "tu explicación aquí"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const parsedResult = JSON.parse(text);

    return NextResponse.json({
      correct: parsedResult.correct,
      feedback: parsedResult.feedback
    });
  } catch (error: any) {
    console.error('Error detallado en grade-ai:', error?.message || error);
    return NextResponse.json({
      correct: false,
      feedback: "Hubo un error de conexión con mi cerebro artificial. Por favor, revisa la consola del servidor (pm2 logs) para más detalles."
    });
  }
}
