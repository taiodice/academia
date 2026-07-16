import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("No se encontró GEMINI_API_KEY en el .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  console.log("Probando conexión con Google Gemini...");
  
  try {
    // Vamos a pedirle la lista de modelos disponibles para esta API Key
    const fetchResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await fetchResponse.json();
    
    if (data.error) {
      console.error("\n❌ Error al obtener modelos:", data.error.message);
      return;
    }

    console.log("\n✅ Conexión exitosa. Modelos disponibles para tu API Key:");
    const models = data.models.map(m => m.name);
    console.log(models.join('\n'));
    
    if (!models.includes('models/gemini-1.5-flash')) {
      console.log("\n⚠️ ATENCIÓN: gemini-1.5-flash NO está en la lista. Esto significa que tu región o cuenta no tiene acceso a este modelo.");
    }
    
  } catch (err) {
    console.error("Fallo inesperado:", err);
  }
}

run();
