'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const questions = [
  {
    q: "¿Qué significa ser un animal endotérmico?",
    options: ["Que su cuerpo siempre está frío", "Que genera su propio calor corporal quemando energía", "Que su temperatura depende exclusivamente del sol", "Que vive debajo de la tierra"],
    correct: 1
  },
  {
    q: "Una lagartija tomando sol sobre una piedra caliente es un ejemplo claro de un animal...",
    options: ["Endotérmico", "Ectotérmico", "Unicelular", "Mamífero"],
    correct: 1
  },
  {
    q: "¿Qué estrategia usan los osos para sobrevivir al intenso frío y falta de comida en invierno?",
    options: ["Migración", "Estivación", "Hibernación", "Necton"],
    correct: 2
  },
  {
    q: "Si un animal se entierra en el lodo para dormir y escapar de una extrema sequía de verano, está haciendo:",
    options: ["Estivación", "Fototropismo", "Hibernación", "Migración"],
    correct: 0
  },
  {
    q: "Las aves que vuelan miles de kilómetros hacia el sur buscando calor antes de que llegue el invierno realizan una:",
    options: ["Nastia", "Estivación", "Hibernación", "Migración"],
    correct: 3
  },
  {
    q: "En los ecosistemas acuáticos, los cangrejos y estrellas de mar que viven arrastrándose en el fondo pertenecen al:",
    options: ["Plancton", "Bentos", "Necton", "Xerófitas"],
    correct: 1
  },
  {
    q: "Los diminutos organismos que son arrastrados pasivamente por las corrientes marinas son el:",
    options: ["Plancton", "Necton", "Bentos", "Bacterias terrestres"],
    correct: 0
  },
  {
    q: "Un tiburón nadando velozmente contra las corrientes del océano es parte del:",
    options: ["Bentos", "Necton", "Plancton", "Ectotérmico sedentario"],
    correct: 1
  },
  {
    q: "Nosotros los humanos, ¿somos endotérmicos o ectotérmicos?",
    options: ["Endotérmicos", "Ectotérmicos", "Ambos", "Ninguno, somos plantas"],
    correct: 0
  },
  {
    q: "¿Por qué los animales de sangre fría (ectotérmicos) son menos activos cuando hace frío?",
    options: ["Porque les da sueño crónico", "Porque sus músculos y metabolismo se congelan y ralentizan al no poder generar calor interno", "Porque usan ese tiempo para comer", "Porque están en estivación profunda"],
    correct: 1
  }
];

export default function Quiz3() {
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
            body: JSON.stringify({ userId, subjectId, moduleId: 3, score: newScore, passed })
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
            {passed ? '¡Impresionante! Has obtenido 100 XP extra. Has completado todas las misiones. ¡El Jefe Final se ha desbloqueado!' : 'Has fallado la prueba de supervivencia animal. Necesitas 8 aciertos para avanzar.'}
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
