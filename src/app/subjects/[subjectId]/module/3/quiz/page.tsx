'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import BiologiaQuiz from './BiologiaQuiz';

const questions = [
  {
    type: 'multiple',
    q: "¿En qué zona geográfica se desarrolló la civilización Inca?",
    options: ["En el desierto del Sahara.", "A lo largo de la Cordillera de los Andes en América del Sur.", "En el Polo Norte.", "En las selvas de Centroamérica."],
    correct: 1
  },
  {
    type: 'text',
    q: "¿Qué significaba Tahuantinsuyo y cuál era su ciudad capital?",
    referenceAnswer: "Tahuantinsuyo significaba 'las cuatro regiones' y era el nombre del imperio Inca. Su ciudad capital era Cuzco (o Cusco)."
  },
  {
    type: 'multiple',
    q: "¿En qué período histórico alcanzó el Imperio Inca su máximo esplendor?",
    options: ["Hace más de 5000 años, al mismo tiempo que Egipto.", "Durante la Era del Hielo.", "Entre los años 1438 y 1533 d.C., poco antes de la llegada de los españoles.", "Hace 100 años."],
    correct: 2
  },
  {
    type: 'multiple',
    q: "En su momento de mayor tamaño, el imperio Inca abarcaba territorios que hoy corresponden a varios países actuales. Selecciona el grupo correcto:",
    options: ["Solo Perú y Brasil.", "México, Guatemala y Honduras.", "Perú, Bolivia, Ecuador, Chile, Argentina y Colombia.", "Estados Unidos y Canadá."],
    correct: 2
  },
  {
    type: 'text',
    q: "Según la leyenda fundacional de los incas, ¿quiénes eran Manco Cápac y Mama Ocllo y de dónde salieron?",
    referenceAnswer: "Eran los hijos del dios Sol (Inti). La leyenda dice que salieron de las aguas del Lago Titicaca con la misión de fundar la ciudad de Cuzco."
  },
  {
    type: 'multiple',
    q: "¿Quién era considerado el líder máximo del imperio Inca?",
    options: ["El Faraón", "El Inca, considerado el hijo directo del dios Sol", "El Presidente", "El Visir"],
    correct: 1
  },
  {
    type: 'multiple',
    q: "Los incas lograron crear un imperio tan grande principalmente a través de:",
    options: ["Comprar tierras con monedas de oro.", "Construir barcos y conquistar islas.", "Alianzas estratégicas con otros pueblos y conquistas militares.", "Pedir por favor a sus vecinos que se unieran."],
    correct: 2
  },
  {
    type: 'text',
    q: "¿Cómo lograban cultivar alimentos en una cordillera tan empinada y alta como los Andes?",
    referenceAnswer: "Aunque no está explícito en el texto principal, construían terrazas o andenes de cultivo escalonados en las laderas de las montañas para aprovechar el terreno y retener el agua."
  },
  {
    type: 'multiple',
    q: "¿Qué nombre le daban los incas a la ciudad de Cuzco en su visión del mundo?",
    options: ["La ciudad del oro.", "El ombligo del mundo.", "La puerta de hielo.", "El don del Nilo."],
    correct: 1
  },
  {
    type: 'text',
    q: "En una oración, compara el tiempo en que vivieron los Egipcios con el tiempo en que vivieron los Incas.",
    referenceAnswer: "Los Egipcios son una civilización muy antigua de hace más de 5000 años (Antigüedad), mientras que los Incas son mucho más recientes (alrededor del año 1400 d.C.)."
  }
];

export default function Module3QuizPage() {
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
      const passed = finalScore >= 8;
      if (userId) {
        fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, subjectId, moduleId: 3, score: finalScore, passed })
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
            {passed ? '¡Excelente! Has conquistado los Andes. Prepárate para el Examen Final.' : 'Te has perdido en las montañas. Necesitas al menos 8 aciertos para avanzar.'}
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!passed && <button onClick={() => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedOpt(null); setTextAnswer(""); setAiFeedback(null); setIsGrading(false); }} className="btn-primary">Reintentar</button>}
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
