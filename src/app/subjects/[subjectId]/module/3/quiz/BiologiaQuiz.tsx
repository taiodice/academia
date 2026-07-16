'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const questions = [
  {
    q: "┬┐Qu├⌐ ├│rgano utilizan los peces para extraer el ox├¡geno disuelto en el agua y poder respirar?",
    options: ["Los pulmones", "Las branquias", "La vejiga natatoria", "Las aletas dorsales"],
    correct: 1
  },
  {
    q: "┬┐Para qu├⌐ sirve la vejiga natatoria en los peces?",
    options: ["Para almacenar agua potable", "Para digerir alimentos r├ípidos", "Es como un globo de gas que les permite flotar y cambiar de profundidad sin esfuerzo", "Para respirar aire fuera del agua"],
    correct: 2
  },
  {
    q: "Los organismos diminutos del mar que NO pueden nadar y simplemente flotan a la deriva son el:",
    options: ["Plancton", "Bentos", "Necton", "Ectotermo"],
    correct: 0
  },
  {
    q: "Los cangrejos y estrellas de mar viven caminando en el fondo del mar. Ellos pertenecen al grupo del...",
    options: ["Plancton", "Necton", "Bentos", "Endot├⌐rmico"],
    correct: 2
  },
  {
    q: "┬┐Por qu├⌐ los animales ectot├⌐rmicos (como lagartijas y serpientes) se acuestan sobre rocas calientes?",
    options: ["Porque est├ín cansados de cazar", "Porque generan su propio calor interno y quieren broncearse", "Porque su temperatura depende del ambiente, y necesitan el calor del sol para calentar sus m├║sculos y activarse", "Para realizar fotos├¡ntesis"],
    correct: 2
  },
  {
    q: "Los mam├¡feros (como los lobos o los humanos) y las aves generan su propio calor corporal. Por lo tanto, son animales:",
    options: ["Ectot├⌐rmicos", "Bentos", "Endot├⌐rmicos", "Aut├│trofos"],
    correct: 2
  },
  {
    q: "┬┐Qu├⌐ nombre recibe el largo viaje que hacen las aves cada a├▒o para escapar del crudo invierno?",
    options: ["Hibernaci├│n", "Estivaci├│n", "Migraci├│n", "Tigmotactismo"],
    correct: 2
  },
  {
    q: "Cuando un oso se encierra a dormir todo el invierno bajando su ritmo card├¡aco para no gastar energ├¡a, est├í en estado de...",
    options: ["Hibernaci├│n", "Estivaci├│n", "Necton profundo", "Migraci├│n est├ítica"],
    correct: 0
  },
  {
    q: "Algunos sapos se entierran en el barro para dormir y escapar de las mortalmente calurosas y secas ├⌐pocas de verano. Esto se llama:",
    options: ["Estivaci├│n", "Hibernaci├│n de calor", "Migraci├│n subterr├ínea", "Fototropismo animal"],
    correct: 0
  },
  {
    q: "┬┐Qu├⌐ grupo de animales acu├íticos tiene aletas y m├║sculos fuertes que les permiten nadar activamente a donde quieran (como tiburones o delfines)?",
    options: ["Bentos", "Plancton", "Necton", "Anfibios estivales"],
    correct: 2
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
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{passed ? '┬íVICTORIA! ≡ƒÅå' : 'GAME OVER ≡ƒÆÇ'}</h1>
          <h2>Tu puntaje: {score} / 10</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            {passed ? '┬íImpresionante! Has obtenido 100 XP extra. Has completado todas las misiones. ┬íEl Jefe Final se ha desbloqueado!' : 'Has fallado la prueba de supervivencia animal. Necesitas 8 aciertos para avanzar.'}
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
