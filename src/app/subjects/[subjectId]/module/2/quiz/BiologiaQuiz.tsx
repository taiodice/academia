'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const questions = [
  {
    q: "┬┐C├│mo reaccionan muchos ├írboles al percibir que bajan la temperatura y las horas de luz en oto├▒o?",
    options: ["Germinan semillas", "Pierden sus hojas para ahorrar energ├¡a", "Se convierten en hidr├│fitas", "Realizan fototropismo negativo"],
    correct: 1
  },
  {
    q: "Las plantas hidr├│fitas est├ín adaptadas al agua y se caracterizan por...",
    options: ["Tener hojas en forma de espina", "Vivir en desiertos", "Tener ra├¡ces cortas y hojas anchas para flotar", "No necesitar agua"],
    correct: 2
  },
  {
    q: "Los cactus son plantas xer├│fitas. ┬┐Qu├⌐ adaptaci├│n tienen para sobrevivir al calor y la falta de agua?",
    options: ["Tienen ra├¡ces cortas", "Pierden sus hojas en oto├▒o", "Tienen hojas anchas para flotar", "Transformaron sus hojas en espinas y acumulan agua en el tallo"],
    correct: 3
  },
  {
    q: "Un movimiento vegetal de crecimiento lento y permanente hacia (o en contra de) un est├¡mulo se llama:",
    options: ["Nastia", "Tropismo", "Tigmotactismo", "Fotos├¡ntesis"],
    correct: 1
  },
  {
    q: "Cuando el tallo de una planta crece curv├índose hacia la ventana buscando el sol, est├í haciendo:",
    options: ["Hidrotropismo negativo", "Fototropismo positivo", "Tigmotactismo", "Fotonastia"],
    correct: 1
  },
  {
    q: "Las ra├¡ces de los ├írboles que se desv├¡an bajo tierra para crecer hacia una tuber├¡a h├║meda est├ín haciendo:",
    options: ["Geotropismo", "Hidrotropismo", "Fototropismo", "Tigmotactismo"],
    correct: 1
  },
  {
    q: "A diferencia de un tropismo, una nastia es...",
    options: ["Un movimiento de crecimiento lento", "Solo posible en cactus", "Un movimiento r├ípido y temporal que no depende de la direcci├│n del est├¡mulo", "Una adaptaci├│n a la falta de agua"],
    correct: 2
  },
  {
    q: "Las plantas carn├¡voras que cierran su trampa velozmente al sentir el tacto de una mosca realizan un movimiento llamado:",
    options: ["Tigmotactismo", "Fototropismo", "Hidrotropismo", "Geonastia"],
    correct: 0
  },
  {
    q: "La Mimosa pudica, una planta que encoge y pliega sus hojas inmediatamente cuando la tocas, es un ejemplo claro de:",
    options: ["Tigmotactismo", "Hidrotropismo", "Fototropismo", "Xer├│fita"],
    correct: 0
  },
  {
    q: "En general, la funci├│n de relaci├│n en las plantas les permite:",
    options: ["Generar animales", "Solo captar la luz solar", "Captar los cambios del ambiente (luz, agua, temperatura, tacto) y adaptarse a ellos para sobrevivir", "Evitar la reproducci├│n"],
    correct: 2
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
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{passed ? '┬íVICTORIA! ≡ƒÅå' : 'GAME OVER ≡ƒÆÇ'}</h1>
          <h2>Tu puntaje: {score} / 10</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            {passed ? '┬íHas superado a las plantas! Has ganado 100 XP y desbloqueado la Misi├│n 3.' : 'Cuidado con los cactus... Necesitas al menos 8 aciertos para avanzar. ┬íInt├⌐ntalo de nuevo!'}
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
