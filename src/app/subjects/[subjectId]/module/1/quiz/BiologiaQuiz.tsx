'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const questions = [
  {
    q: "┬┐Cu├íl es la diferencia principal entre un organismo unicelular y uno pluricelular?",
    options: ["El unicelular tiene n├║cleo, el pluricelular no", "El unicelular est├í formado por una sola c├⌐lula, el pluricelular por muchas", "El unicelular es un animal, el pluricelular es una planta", "No hay diferencia"],
    correct: 1
  },
  {
    q: "Las c├⌐lulas que NO tienen un n├║cleo definido y tienen su ADN suelto se llaman:",
    options: ["Eucariotas", "Pluricelulares", "Procariotas", "Aut├│trofas"],
    correct: 2
  },
  {
    q: "┬┐Cu├íles son las etapas del Ciclo de Vida que todo ser vivo debe cumplir?",
    options: ["Comer, dormir y jugar", "Nacer, crecer, reproducirse y morir", "Nacer, cazar y dormir", "Nutrici├│n, relaci├│n y reproducci├│n"],
    correct: 1
  },
  {
    q: "Si una planta fabrica su propio alimento mediante la fotos├¡ntesis, decimos que tiene una nutrici├│n:",
    options: ["Aut├│trofa", "Heter├│trofa", "Asexual", "Pluricelular"],
    correct: 0
  },
  {
    q: "Los animales como los leones, que necesitan cazar a otros para obtener energ├¡a, tienen nutrici├│n:",
    options: ["Aut├│trofa", "Eucariota", "Heter├│trofa", "Sexual"],
    correct: 2
  },
  {
    q: "La funci├│n de Relaci├│n consiste principalmente en:",
    options: ["Hacer nuevos amigos en el ecosistema", "Captar est├¡mulos del medio ambiente y generar respuestas", "Digerir los alimentos", "Crear copias id├⌐nticas de uno mismo"],
    correct: 1
  },
  {
    q: "┬┐Qu├⌐ tipo de reproducci├│n involucra a dos individuos (macho y hembra) y genera cr├¡as con caracter├¡sticas de ambos?",
    options: ["Reproducci├│n Asexual", "Reproducci├│n por clones", "Nutrici├│n Aut├│trofa", "Reproducci├│n Sexual (Sexuada)"],
    correct: 3
  },
  {
    q: "En la reproducci├│n asexual (asexuada)...",
    options: ["Se necesitan dos padres", "Participa un solo individuo y sus cr├¡as son clones id├⌐nticos a ├⌐l", "Solo ocurre en los seres humanos", "Se producen huevos"],
    correct: 1
  },
  {
    q: "Las bacterias son un excelente ejemplo de organismos:",
    options: ["Unicelulares y procariotas", "Pluricelulares y eucariotas", "Heter├│trofos y sexuales", "Unicelulares y eucariotas"],
    correct: 0
  },
  {
    q: "┬┐Qu├⌐ funci├│n vital est├í ocurriendo si tu cuerpo comienza a sudar porque capt├│ el est├¡mulo del calor extremo?",
    options: ["Nutrici├│n", "Reproducci├│n", "Crecimiento", "Relaci├│n"],
    correct: 3
  }
];

export default function Quiz1() {
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
            body: JSON.stringify({ userId, subjectId: 'biologia', moduleId: 1, score: newScore, passed })
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
            {passed ? '┬íIncre├¡ble! Eres todo un bi├│logo. Has desbloqueado la Misi├│n 2.' : 'Necesitas al menos 8 aciertos para avanzar. ┬íLas c├⌐lulas conf├¡an en ti, int├⌐ntalo de nuevo!'}
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
