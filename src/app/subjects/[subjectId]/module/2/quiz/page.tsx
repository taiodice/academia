'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import BiologiaQuiz from './BiologiaQuiz';

const questions = [
  {
    type: 'multiple',
    q: "Si vieras un mapa de África y quisieras localizar a la civilización egipcia, ¿dónde mirarías?",
    options: ["En el sur de África.", "En el extremo noreste, a orillas del Río Nilo.", "En el centro, cerca de la selva.", "En el oeste, frente al Océano Atlántico."],
    correct: 1
  },
  {
    type: 'text',
    q: "¿Por qué el historiador griego Heródoto afirmó que 'Egipto es un don del Nilo'?",
    referenceAnswer: "Porque Egipto es un desierto y sin el agua del Río Nilo la civilización no habría sobrevivido. Además, el Nilo se desbordaba cada año dejando un barro fértil (limo) que permitía cultivar alimentos."
  },
  {
    type: 'multiple',
    q: "¿Cómo se llama el gobierno donde el líder (como el Faraón) no solo es un rey, sino que es considerado un Dios viviente?",
    options: ["Democracia", "Teocracia", "Monarquía simple", "Politeísmo"],
    correct: 1
  },
  {
    type: 'multiple',
    q: "Los egipcios creían en muchísimos dioses distintos, como Ra y Anubis. Esto significa que eran:",
    options: ["Ateos", "Monoteístas", "Politeístas", "Filósofos"],
    correct: 2
  },
  {
    type: 'text',
    q: "Explica brevemente por qué los egipcios momificaban a sus faraones y nobles.",
    referenceAnswer: "Momificaban los cuerpos porque creían en la vida después de la muerte, y pensaban que para que el alma viviera en el más allá, el cuerpo físico debía conservarse intacto y no pudrirse."
  },
  {
    type: 'multiple',
    q: "¿Quiénes eran los Escribas en la sociedad egipcia?",
    options: ["Los soldados que peleaban en las guerras.", "Los que construían las pirámides.", "Los funcionarios muy respetados que sabían leer y escribir jeroglíficos.", "Los esclavos prisioneros de guerra."],
    correct: 2
  },
  {
    type: 'multiple',
    q: "En la jerarquía social egipcia, ¿quién era la mano derecha directa del Faraón en el gobierno?",
    options: ["El Campesino", "El Visir", "El Médico", "El Artesano"],
    correct: 1
  },
  {
    type: 'text',
    q: "¿Para qué servían las pirámides y quiénes trabajaban mayormente en su construcción durante la época de inundación del Nilo?",
    referenceAnswer: "Las pirámides eran tumbas gigantes para los faraones. Durante la época en que el Nilo inundaba los campos y no se podía cultivar, los campesinos ayudaban a construirlas como forma de tributo."
  },
  {
    type: 'multiple',
    q: "En la base (lo más bajo) de la pirámide social egipcia, sin ningún tipo de derechos, estaban:",
    options: ["Los Sacerdotes", "Los Esclavos (prisioneros de guerra)", "Los Escribas", "Los Artesanos"],
    correct: 1
  },
  {
    type: 'text',
    q: "¿Cómo construían los egipcios las inmensas pirámides sin tener grúas ni tecnología moderna?",
    referenceAnswer: "Usaban la fuerza humana arrastrando bloques de piedra enormes sobre trineos de madera por rampas de arena, mojando la arena frente al trineo para que se deslizara más fácil."
  }
];

export default function Module2QuizPage() {
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
          body: JSON.stringify({ userId, subjectId, moduleId: 2, score: finalScore, passed })
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
            {passed ? '¡El Faraón está complacido! Has ganado 100 XP y desbloqueado la Misión Inca.' : 'Las momias han despertado. Necesitas al menos 8 aciertos para avanzar. ¡Inténtalo de nuevo!'}
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
