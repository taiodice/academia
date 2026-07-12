'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    q: "¿Cuál es el bloque fundamental de la vida?",
    options: ["El átomo", "La célula", "La piel", "El ADN"],
    correct: 1
  },
  {
    q: "Los organismos formados por una sola célula se llaman...",
    options: ["Pluricelulares", "Extraterrestres", "Unicelulares", "Bacterianos"],
    correct: 2
  },
  {
    q: "Un ejemplo clásico de organismo unicelular es:",
    options: ["Un perro", "Una bacteria", "Un árbol", "Un humano"],
    correct: 1
  },
  {
    q: "Las células VIP que tienen su ADN guardado en un núcleo son las:",
    options: ["Eucariotas", "Procariotas", "Bacterias", "Invisibles"],
    correct: 0
  },
  {
    q: "Nosotros los humanos somos organismos...",
    options: ["Unicelulares y Procariotas", "Pluricelulares y Procariotas", "Unicelulares y Eucariotas", "Pluricelulares y Eucariotas"],
    correct: 3
  },
  {
    q: "¿Qué función vital nos permite obtener energía de la heladera?",
    options: ["Nutrición", "Relación", "Reproducción", "Sueño"],
    correct: 0
  },
  {
    q: "Las plantas hacen fotosíntesis, por lo tanto son organismos:",
    options: ["Heterótrofos", "Autótrofos", "Carnívoros", "Aburridos"],
    correct: 1
  },
  {
    q: "Si tocas la estufa caliente y quitas la mano rápido, estás usando la función de:",
    options: ["Nutrición", "Reproducción", "Magia", "Relación"],
    correct: 3
  },
  {
    q: "Las bacterias (nuestras amigas minimalistas) pertenecen al grupo de las células:",
    options: ["Procariotas", "Eucariotas", "Vegetales", "Animales"],
    correct: 0
  },
  {
    q: "La función vital encargada de crear descendencia (o sea, más Franco's) es:",
    options: ["Relación", "Nutrición", "Reproducción", "Clonación"],
    correct: 2
  }
];

export default function Quiz1() {
  const router = useRouter();
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
        // Save progress to database
        const userId = localStorage.getItem('userId');
        const passed = newScore >= 8;
        if (userId) {
          fetch('/api/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, moduleId: 1, score: newScore, passed })
          }).catch(err => console.error("Error saving progress:", err));
        }
      }
    }, 800); // Pequeña pausa para mostrar qué seleccionó
  };

  if (showResult) {
    const passed = score >= 8;
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{passed ? '¡VICTORIA! 🏆' : 'GAME OVER 💀'}</h1>
          <h2>Tu puntaje: {score} / 10</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            {passed ? '¡Increíble! Eres todo un biólogo. Has desbloqueado la Misión 2.' : 'Necesitas al menos 8 aciertos para avanzar. ¡Las células confían en ti, inténtalo de nuevo!'}
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!passed && <button onClick={() => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedOpt(null); }} className="btn-primary">Reintentar</button>}
            <button onClick={() => router.push('/dashboard')} className={passed ? "btn-primary" : "btn-secondary"}>
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
                  bg = 'rgba(16, 185, 129, 0.2)'; // Verde
                  border = '1px solid #10b981';
                } else if (isWrong) {
                  bg = 'rgba(239, 68, 68, 0.2)'; // Rojo
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
