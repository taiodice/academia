'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const questions = [
  {
    q: "Las plantas hidrófitas se caracterizan por...",
    options: ["Tener hojas en forma de espina", "Vivir en desiertos", "Tener raíces cortas y vivir en lugares muy húmedos", "No necesitar agua"],
    correct: 2
  },
  {
    q: "Si una planta cambia sus hojas por espinas y guarda agua en el tallo, es una...",
    options: ["Hidrófita", "Xerófita", "Carnívora", "Eucariota"],
    correct: 1
  },
  {
    q: "Los cactus son el mejor ejemplo de plantas:",
    options: ["Xerófitas", "Hidrófitas", "Acuáticas", "Fototrópicas"],
    correct: 0
  },
  {
    q: "¿Qué es un tropismo?",
    options: ["Un movimiento pasajero y rápido", "Un salto de la planta", "Un movimiento de crecimiento lento y permanente hacia un estímulo", "Una enfermedad de las raíces"],
    correct: 2
  },
  {
    q: "Cuando el tallo de una planta crece dirigiéndose hacia la ventana buscando el sol, está haciendo:",
    options: ["Geotropismo positivo", "Fototropismo positivo", "Sismonastia", "Fotosíntesis oscura"],
    correct: 1
  },
  {
    q: "Las raíces que crecen hacia abajo a favor de la gravedad muestran un:",
    options: ["Fototropismo negativo", "Geotropismo positivo", "Geotropismo negativo", "Tropismo de gravedad nula"],
    correct: 1
  },
  {
    q: "Las plantas carnívoras que cierran su trampa velozmente al sentir una mosca realizan una:",
    options: ["Sismonastia", "Fototropismo", "Hidrotropismo", "Geonastia"],
    correct: 0
  },
  {
    q: "A diferencia de un tropismo, una nastia es...",
    options: ["Permanente", "Solo en raíces", "Un movimiento rápido y temporal", "Solo por el agua"],
    correct: 2
  },
  {
    q: "Las raíces de los árboles que se desvían para crecer hacia una tubería de agua están haciendo:",
    options: ["Geotropismo", "Fotonastia", "Hidrotropismo", "Fototropismo"],
    correct: 2
  },
  {
    q: "Las margaritas que se abren de día y se cierran de noche realizan un movimiento llamado:",
    options: ["Fotonastia", "Sismonastia", "Fototropismo", "Tropismo nocturno"],
    correct: 0
  }
];

export default function Quiz2() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId;
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOpt(index);
    setTimeout(() => {
      let newScore = score;
      if (index === questions[currentQ].correct) {
        newScore = score + 1;
        setScore(newScore);
      }

      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOpt(null);
      } else {
        setShowResult(true);
        const userId = localStorage.getItem('userId');
        const passed = newScore >= 8;
        if (userId) {
          fetch('/api/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, subjectId, moduleId: 2, score: newScore, passed })
          }).catch(err => console.error("Error saving progress:", err));
        }
      }
    }, 800);
  };

  if (showResult) {
    const passed = score >= 8;
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{passed ? '¡VICTORIA! 🏆' : 'GAME OVER 💀'}</h1>
          <h2>Tu puntaje: {score} / 10</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            {passed ? '¡Has superado a las plantas! Has ganado 100 XP y desbloqueado la Misión 3.' : 'Cuidado con los cactus... Necesitas al menos 8 aciertos para avanzar. ¡Inténtalo de nuevo!'}
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!passed && <button onClick={() => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedOpt(null); }} className="btn-primary">Reintentar</button>}
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
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4rem' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Pregunta {currentQ + 1} de 10</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Puntaje: {score}</span>
        </header>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{q.q}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {q.options.map((opt, i) => {
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
                  onClick={() => selectedOpt === null && handleAnswer(i)}
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    borderRadius: '10px',
                    background: bg,
                    border: border,
                    color: '#fff',
                    cursor: selectedOpt === null ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem'
                  }}
                  onMouseOver={(e) => {
                    if (selectedOpt === null) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    if (selectedOpt === null) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
