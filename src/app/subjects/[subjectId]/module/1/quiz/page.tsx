'use client';
import { useParams } from 'next/navigation';
import BiologiaQuiz from './BiologiaQuiz';

export default function Module1QuizPage() {
  const params = useParams();
  
  if (params.subjectId === 'historia') {
    return <HistoriaQuiz />;
  }

  return <BiologiaQuiz />;
}

// ---- HISTORIA QUIZ ----

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    type: 'multiple',
    q: "¿De qué continente provinieron originalmente los primeros humanos según todas las teorías?",
    options: ["De Europa", "De África", "De la Antártida", "De Marte"],
    correct: 1
  },
  {
    type: 'text',
    q: "Explica brevemente de qué trata la Teoría Asiática (o del Estrecho de Bering).",
    referenceAnswer: "Los humanos cruzaron caminando desde Asia (Siberia) hasta América (Alaska) persiguiendo animales a través de un puente de hielo o tierra que se formó durante la glaciación en el Estrecho de Bering."
  },
  {
    type: 'multiple',
    q: "¿Qué científico propuso la Teoría Asiática?",
    options: ["Paul Rivet", "Florentino Ameghino", "Alex Hrdlicka", "Méndez Correa"],
    correct: 2
  },
  {
    type: 'multiple',
    q: "Según la Teoría Oceánica de Paul Rivet, los humanos cruzaron en pequeñas balsas a través del océano:",
    options: ["Atlántico", "Pacífico", "Índico", "Glacial Ártico"],
    correct: 1
  },
  {
    type: 'text',
    q: "¿Qué proponía la Teoría Australiana de Méndez Correa y por dónde pasaron los pobladores?",
    referenceAnswer: "Proponía que los aborígenes australianos cruzaron en balsa hacia la Antártida (aprovechando un clima más cálido o 'óptimo climático') y desde allí cruzaron caminando hasta Tierra del Fuego en el sur de América."
  },
  {
    type: 'multiple',
    q: "La Teoría Americana (Autoctonista) de Florentino Ameghino aseguraba que:",
    options: ["El ser humano evolucionó en América (las Pampas) y no vino de ningún lado.", "El ser humano fue traído por extraterrestres.", "Cruzaron nadando desde Europa.", "Llegaron en barcos vikingos."],
    correct: 0
  },
  {
    type: 'multiple',
    q: "¿Por qué la ciencia moderna descartó totalmente la teoría de Florentino Ameghino?",
    options: ["Porque a los científicos no les gustaba Argentina.", "Porque los huesos que encontró eran muy recientes o pertenecían a animales extintos, no a humanos antiguos.", "Porque confesó que había inventado la historia.", "Porque no tenía mapas."],
    correct: 1
  },
  {
    type: 'text',
    q: "Si trazas la ruta de la teoría de Bering (Asiática) en un mapa mundial, ¿qué zonas conecta?",
    referenceAnswer: "Conecta el extremo noreste de Asia (Siberia) con el extremo noroeste de América del Norte (Alaska)."
  },
  {
    type: 'multiple',
    q: "La glaciación o 'Era de Hielo' fue clave para poblar América porque:",
    options: ["Congeló a los dinosaurios.", "Hizo que el nivel del mar bajara, exponiendo tierras que antes estaban sumergidas y creando puentes naturales.", "Calentó el clima para viajar en balsa.", "Destruyó los continentes."],
    correct: 1
  },
  {
    type: 'text',
    q: "¿Por qué crees que es importante usar un mapa o planisferio para entender estas teorías?",
    referenceAnswer: "Porque permite visualizar gráficamente las rutas migratorias, las distancias entre continentes (como Asia, Oceanía y América) y entender cómo el clima y la geografía determinaron por dónde podían pasar."
  }
];

function HistoriaQuiz() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId;
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // Estado para la IA
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{correct: boolean, feedback: string} | null>(null);

  const handleMultipleAnswer = (index: number) => {
    if (selectedOpt !== null || isGrading) return;
    
    setSelectedOpt(index);
    let newScore = score;
    const isCorrect = index === questions[currentQ].correct;
    
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    setAiFeedback({
      correct: isCorrect,
      feedback: isCorrect ? "¡Correcto!" : "Incorrecto."
    });

    setTimeout(() => {
      advanceOrFinish(newScore);
    }, 1500);
  };

  const handleTextAnswerSubmit = async () => {
    if (!textAnswer.trim() || isGrading) return;
    setIsGrading(true);

    try {
      const q = questions[currentQ];
      const res = await fetch('/api/quiz/grade-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.q,
          answer: textAnswer,
          referenceAnswer: q.referenceAnswer
        })
      });

      const data = await res.json();
      setAiFeedback(data);
      
      let newScore = score;
      if (data.correct) {
        newScore = score + 1;
        setScore(newScore);
      }

      setTimeout(() => {
        advanceOrFinish(newScore);
      }, 4000); // 4 segundos para que lea el feedback

    } catch (error) {
      console.error(error);
      setIsGrading(false);
    }
  };

  const advanceOrFinish = (finalScore: number) => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
      setTextAnswer("");
      setAiFeedback(null);
      setIsGrading(false);
    } else {
      setShowResult(true);
      const userId = localStorage.getItem('userId');
      const passed = finalScore >= 8;
      if (userId) {
        fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, subjectId, moduleId: 1, score: finalScore, passed })
        }).catch(err => console.error("Error saving progress:", err));
      }
    }
  };

  if (showResult) {
    const passed = score >= 8;
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{passed ? '¡VICTORIA! 🏆' : 'GAME OVER 💀'}</h1>
          <h2>Tu puntaje: {score} / 10</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            {passed ? '¡Has superado el poblamiento de América! Has ganado 100 XP y desbloqueado el viaje a Egipto.' : 'Necesitas al menos 8 aciertos para avanzar. ¡Inténtalo de nuevo!'}
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!passed && <button onClick={() => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedOpt(null); setTextAnswer(""); setAiFeedback(null); setIsGrading(false); }} className="btn-primary">Reintentar</button>}
            <button onClick={() => router.push(`/subjects/${subjectId}`)} className={passed ? "btn-primary" : "btn-secondary"}>
              Volver al Laboratorio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Pregunta {currentQ + 1} de {questions.length}</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Puntaje: {score}</span>
        </header>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{q.q}</h2>
          
          {q.type === 'multiple' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {q.options?.map((opt, i) => {
                const isSelected = selectedOpt === i;
                const isCorrect = selectedOpt !== null && i === q.correct;
                const isWrong = isSelected && i !== q.correct;

                let bg = 'rgba(255, 255, 255, 0.05)';
                let border = '1px solid rgba(255, 255, 255, 0.1)';

                if (selectedOpt !== null) {
                  if (isCorrect) {
                    bg = 'rgba(16, 185, 129, 0.2)'; 
                    border = '1px solid #10b981';
                  } else if (isWrong) {
                    bg = 'rgba(239, 68, 68, 0.2)'; 
                    border = '1px solid #ef4444';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleMultipleAnswer(i)}
                    style={{
                      padding: '1rem', textAlign: 'left', borderRadius: '10px',
                      background: bg, border: border, color: '#fff',
                      cursor: selectedOpt === null ? 'pointer' : 'default',
                      transition: 'all 0.3s ease', fontSize: '1.1rem'
                    }}
                    disabled={selectedOpt !== null || isGrading}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Escribe tu respuesta con tus propias palabras:</p>
              <textarea 
                className="input-field" 
                rows={4} 
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={isGrading || aiFeedback !== null}
                placeholder="Escribe aquí..."
              />
              {!aiFeedback && (
                <button 
                  onClick={handleTextAnswerSubmit} 
                  className="btn-primary" 
                  disabled={isGrading || !textAnswer.trim()}
                >
                  {isGrading ? 'Evaluando con Inteligencia Artificial... 🤖' : 'Enviar Respuesta'}
                </button>
              )}
            </div>
          )}

          {aiFeedback && q.type === 'text' && (
            <div className="animate-fade-in" style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              borderRadius: '10px',
              background: aiFeedback.correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: aiFeedback.correct ? '1px solid #10b981' : '1px solid #ef4444'
            }}>
              <h3 style={{ color: aiFeedback.correct ? '#10b981' : '#ef4444', marginBottom: '0.5rem' }}>
                {aiFeedback.correct ? '✅ ¡Respuesta Correcta!' : '❌ Respuesta Incorrecta'}
              </h3>
              <p style={{ lineHeight: '1.5' }}>{aiFeedback.feedback}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
