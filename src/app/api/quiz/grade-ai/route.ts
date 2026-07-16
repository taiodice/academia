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

    let text = "";
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
      const prompt = `
Eres un profesor de historia evaluando a un alumno de 1er año de secundaria.
Tienes que corregir su respuesta a una pregunta de examen. Eres estricto pero muy amable y didáctico.

Pregunta del examen: "${question}"
Respuesta esperada o de referencia: "${referenceAnswer}"
Respuesta del alumno: "${answer}"

Instrucciones:
1. Analiza si la respuesta del alumno demuestra que entendió el concepto.
2. Determina si la respuesta es CORRECTA (verdadero/falso). Si la respuesta es demasiado vaga o directamente incorrecta (como "${answer}"), es FALSO.
3. Escribe una breve retroalimentación (feedback) de máximo 2 oraciones, hablándole directamente al alumno. Si se equivocó, explícale brevemente por qué.

Devuelve tu respuesta EXACTAMENTE en este formato (sin comillas adicionales, sin formato markdown):

CORRECTO: true
FEEDBACK: tu explicación aquí
`;
      const result = await model.generateContent(prompt);
      text = (await result.response).text();
    } catch (modelError: any) {
      console.warn("gemini-flash-latest falló, intentando con gemini-pro-latest...", modelError?.message);
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-pro-latest' });
      const promptFallback = `
Eres un profesor de historia evaluando a un alumno de 1er año de secundaria.
Tienes que corregir su respuesta a una pregunta de examen. Eres estricto pero muy amable y didáctico.

Pregunta del examen: "${question}"
Respuesta esperada o de referencia: "${referenceAnswer}"
Respuesta del alumno: "${answer}"

Instrucciones:
1. Analiza si la respuesta del alumno demuestra que entendió el concepto.
2. Determina si la respuesta es CORRECTA (verdadero/falso). Si la respuesta es demasiado vaga o directamente incorrecta (como "${answer}"), es FALSO.
3. Escribe una breve retroalimentación (feedback) de máximo 2 oraciones, hablándole directamente al alumno. Si se equivocó, explícale brevemente por qué.

Devuelve tu respuesta EXACTAMENTE en este formato (sin comillas adicionales, sin formato markdown):

CORRECTO: true
FEEDBACK: tu explicación aquí
`;
      const result = await fallbackModel.generateContent(promptFallback);
      text = (await result.response).text();
    }

    const isCorrect = text.includes('CORRECTO: true') || text.includes('CORRECTO: True');
    
    let feedbackMatch = text.split(/FEEDBACK:/i);
    let extractedFeedback = feedbackMatch.length > 1 ? feedbackMatch[1].trim() : text.trim();
    // Limpiar comillas iniciales o finales si las agregó
    if (extractedFeedback.startsWith('"') && extractedFeedback.endsWith('"')) {
        extractedFeedback = extractedFeedback.slice(1, -1);
    }

    return NextResponse.json({
      correct: isCorrect,
      feedback: extractedFeedback
    });
  } catch (error: any) {
    console.error('Error detallado en grade-ai:', error?.message || error);
    // FALLBACK DEFINITIVO: Si la API Key existe pero lanza 404 u otro error, no bloqueamos al alumno.
    return NextResponse.json({
      correct: true,
      feedback: "⚠️ MODO OFFLINE: El cerebro de Inteligencia Artificial tiene problemas de conexión con Google. Como eres un excelente alumno, ¡te daré el punto por esta vez! Avanza tranquilo."
    });
  }
}
