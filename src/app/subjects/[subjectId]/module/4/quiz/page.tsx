'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import BiologiaQuiz from './BiologiaQuiz';

const questions = [
  // Poblamiento
  {
    type: 'multiple',
    q: "¿Qué teoría afirma que los humanos cruzaron un puente de hielo durante la glaciación persiguiendo grandes mamíferos?",
    options: ["Teoría Oceánica", "Teoría Autóctona", "Teoría Asiática (Estrecho de Bering)", "Teoría Australiana"],
    correct: 2
  },
  {
    type: 'text',
    q: "Explica brevemente la Teoría Oceánica propuesta por Paul Rivet.",
    referenceAnswer: "Paul Rivet propuso que los humanos cruzaron el Océano Pacífico navegando en pequeñas balsas desde la Polinesia y Melanesia hasta llegar a América del Sur."
  },
  // Egipcios
  {
    type: 'multiple',
    q: "¿Qué importancia tenía el Río Nilo para la civilización Egipcia?",
    options: ["Era solo para bañarse.", "Era vital porque desbordaba cada año dejando un limo fértil que permitía cultivar trigo en medio del desierto.", "No era importante, ellos vivían en la selva.", "Servía para ahogar a los enemigos."],
    correct: 1
  },
  {
    type: 'text',
    q: "Describe brevemente cómo estaba dividida la sociedad egipcia.",
    referenceAnswer: "Tenía forma de pirámide. En la cima estaba el Faraón (considerado un Dios), luego nobles, sacerdotes y el Visir. Debajo escribas, médicos y artesanos. La gran mayoría eran campesinos, y en el fondo sin derechos estaban los esclavos."
  },
  {
    type: 'multiple',
    q: "Los egipcios momificaban a sus muertos porque...",
    options: ["Les gustaba el olor a especias.", "Creían que para vivir en el más allá después de la muerte, el cuerpo no debía pudrirse.", "Era una forma de castigar a los prisioneros.", "Querían asustar a los arqueólogos modernos."],
    correct: 1
  },
  // Incas
  {
    type: 'multiple',
    q: "El Imperio Inca (Tahuantinsuyo) fue el más grande de América del Sur. ¿Por dónde se extendía?",
    options: ["Por la selva del Amazonas.", "A lo largo de la Cordillera de los Andes, abarcando 6 países actuales.", "Por las llanuras de la Pampa Argentina.", "Por las islas del Caribe."],
    correct: 1
  },
  {
    type: 'text',
    q: "¿Según la leyenda de los Incas, quiénes eran Manco Cápac y Mama Ocllo y qué fundaron?",
    referenceAnswer: "Eran los hijos enviados por el dios Sol (Inti). Salieron del Lago Titicaca con la misión de hundir una vara de oro en la tierra para fundar la gran ciudad de Cuzco."
  },
  // Integración
  {
    type: 'multiple',
    q: "Si comparamos la forma de gobierno de los egipcios con la de los incas, encontramos una similitud clave:",
    options: ["Ambos eran democracias modernas.", "En ambas el líder (Faraón / Inca) era considerado un Dios viviente o hijo de los dioses (Teocracia).", "No tenían líderes, todos eran iguales.", "Eran gobernados por escribas."],
    correct: 1
  },
  {
    type: 'multiple',
    q: "Cronológicamente (en el tiempo), ¿qué afirmación es correcta?",
    options: ["Los incas y egipcios vivieron exactamente en los mismos años.", "Los incas son de la Antigüedad (hace 5000 años) y los egipcios son del 1500 d.C.", "Los egipcios son una civilización muy antigua (3150 a.C.), mientras que los incas son más recientes (alrededor del 1400 d.C.).", "Los egipcios le enseñaron a los incas a hacer pirámides en un viaje en barco."],
    correct: 2
  },
  {
    type: 'text',
    q: "Tanto egipcios como incas adoraban a varios dioses relacionados con la naturaleza. ¿Cómo se le llama a la religión que cree en muchos dioses?",
    referenceAnswer: "A las religiones que creen en muchos dioses distintos se las llama religiones politeístas."
  }
];

export default function Module4QuizPage() {
  const params = useParams();
  
  if (params.subjectId === 'historia') {
    return <HistoriaQuiz />;
  }

  return <BiologiaQuiz />;
}

function HistoriaQuiz() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId;
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
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
      }, 4500);

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
      const passed = finalScore >= 8; // Requiere 8/10
      if (userId) {
        fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, subjectId, moduleId: 4, score: finalScore, passed })
        }).catch(err => console.error("Error saving progress:", err));
      }
    }
  };

  if (showResult) {
    const passed = score >= 8;
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', border: passed ? '2px solid #10b981' : '2px solid #ef4444' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{passed ? '🏆 ¡APROBADO!' : '💥 REPROBADO'}</h1>
          <h2>Tu puntaje: {score} / 10</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            {passed 
              ? '¡Felicidades historiador! Has dominado las rutas migratorias, los faraones y los incas. Estás listo para el parcial real.' 
              : 'Necesitas al menos 8 aciertos para aprobar el Examen Final. ¡Repasa la teoría y vuelve a intentarlo!'}
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!passed && <button onClick={() => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedOpt(null); setTextAnswer(""); setAiFeedback(null); setIsGrading(false); }} className="btn-primary">Reintentar Examen</button>}
            <button onClick={() => router.push(`/subjects/${subjectId}`)} className={passed ? "btn-primary" : "btn-secondary"}>
              Volver al Panel
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
