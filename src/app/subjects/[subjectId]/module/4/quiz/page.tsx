'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  // Del Módulo 1 (Características de los seres vivos)
  {
    q: '¿Qué diferencia a un ser vivo unicelular de uno pluricelular?',
    options: ['El unicelular no tiene núcleo.', 'El unicelular tiene una sola célula, el pluricelular muchas.', 'Los unicelulares solo viven en el agua.', 'Los pluricelulares no necesitan comer.'],
    answer: 1
  },
  {
    q: '¿Cuáles son las tres funciones vitales de todos los seres vivos?',
    options: ['Comer, dormir y jugar', 'Nacer, crecer y morir', 'Nutrición, Relación y Reproducción', 'Respirar, caminar y pensar'],
    answer: 2
  },
  {
    q: '¿Cuál es la principal diferencia entre células eucariotas y procariotas?',
    options: ['Las procariotas son más grandes.', 'Las eucariotas tienen el ADN protegido en un núcleo verdadero.', 'Las eucariotas solo están en las plantas.', 'Las procariotas no tienen ADN.'],
    answer: 1
  },
  {
    q: '¿En qué etapa del ciclo de vida un ser vivo aumenta su tamaño?',
    options: ['Nacimiento', 'Crecimiento', 'Reproducción', 'Muerte'],
    answer: 1
  },
  // Del Módulo 2 (Relación en plantas)
  {
    q: 'Las plantas hidrófitas están adaptadas a vivir en...',
    options: ['Desiertos calientes', 'Ambientes muy acuáticos', 'Zonas con mucha nieve', 'Lugares sin luz solar'],
    answer: 1
  },
  {
    q: 'Si pones una planta cerca de una ventana y se dobla hacia el sol, esto es un ejemplo de...',
    options: ['Fototropismo', 'Hidrotropismo', 'Tigmotactismo', 'Fotosíntesis'],
    answer: 0
  },
  {
    q: '¿Cómo sobreviven las plantas xerófitas en lugares secos?',
    options: ['Tienen raíces muy cortas.', 'No necesitan agua nunca.', 'Tienen hojas grandes para sudar.', 'Acumulan agua en sus tallos y tienen hojas en forma de espinas.'],
    answer: 3
  },
  {
    q: '¿Qué es una nastia?',
    options: ['Un movimiento permanente de la planta.', 'Un movimiento pasajero, como cuando una planta carnívora se cierra.', 'El crecimiento de la raíz hacia el agua.', 'Una enfermedad de las plantas.'],
    answer: 1
  },
  // Del Módulo 3 (Relación en animales)
  {
    q: '¿Qué es un animal ectotérmico?',
    options: ['Que genera su propio calor corporal (como nosotros).', 'Que depende de la temperatura del ambiente (como las serpientes).', 'Que solo vive en el frío extremo.', 'Que no tiene sangre.'],
    answer: 1
  },
  {
    q: '¿Cómo se llama la adaptación donde un animal duerme profundamente durante el invierno extremo?',
    options: ['Estivación', 'Migración', 'Hibernación', 'Necton'],
    answer: 2
  },
  {
    q: 'Los peces que nadan activamente contra las corrientes pertenecen al grupo del...',
    options: ['Bentos', 'Plancton', 'Necton', 'Sedimento'],
    answer: 2
  },
  {
    q: '¿Qué es la estivación?',
    options: ['Es como la hibernación, pero los animales duermen para escapar del calor extremo o sequía.', 'Viajar miles de kilómetros en verano.', 'Comer mucho en primavera.', 'La forma en que los osos pasan el invierno.'],
    answer: 0
  }
];

export default function FinalExam() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) router.push('/');
  }, [router]);

  const handleAnswer = (index: number) => {
    if (selectedOpt !== null) return;
    
    setSelectedOpt(index);
    let newScore = score;
    if (index === questions[currentQ].answer) {
      newScore += 1;
      setScore(newScore);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOpt(null);
      } else {
        setShowResult(true);
        // Save progress to database
        const userId = localStorage.getItem('userId');
        const passed = newScore >= 10; // Requiere 10/12 para pasar el examen final
        if (userId) {
          fetch('/api/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, subjectId: 'biologia', moduleId: 4, score: newScore, passed })
          }).catch(err => console.error("Error saving progress:", err));
        }
      }
    }, 1000);
  };

  if (showResult) {
    const passed = score >= 10;
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', border: passed ? '2px solid #10b981' : '2px solid #ef4444' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{passed ? '🏆 ¡VICTORIA ABSOLUTA!' : '💥 GAME OVER'}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Tu puntaje: <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{score} de {questions.length}</span>
          </p>
          <p style={{ marginBottom: '2rem' }}>
            {passed 
              ? '¡Felicidades, Franco! Has dominado todo el conocimiento de Biología 7. Eres oficialmente un maestro de los seres vivos.' 
              : 'El jefe final te ha derrotado. Necesitas al menos 10 aciertos para vencerlo. Repasa los módulos e inténtalo de nuevo.'}
          </p>
          <button onClick={() => router.push('/subjects/biologia')} className="btn-primary" style={{ width: '100%' }}>
            Volver a Biología
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '2rem 1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h3 style={{ color: '#ef4444' }}>👾 JEFE FINAL: EXAMEN DE BIOLOGÍA</h3>
        <span style={{ color: 'var(--text-secondary)' }}>Pregunta {currentQ + 1} de {questions.length}</span>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center' }}>{q.q}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {q.options.map((opt, i) => {
              let btnClass = "btn-secondary";
              if (selectedOpt !== null) {
                if (i === q.answer) btnClass = "btn-primary"; // Muestra la correcta en verde
                else if (i === selectedOpt) btnClass = "btn-secondary"; // La que eligió mal
              }

              return (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(i)}
                  className={btnClass}
                  style={{ 
                    padding: '1rem', 
                    fontSize: '1.1rem', 
                    textAlign: 'left',
                    background: selectedOpt !== null && i === selectedOpt && i !== q.answer ? 'rgba(239, 68, 68, 0.2)' : undefined,
                    border: selectedOpt !== null && i === selectedOpt && i !== q.answer ? '1px solid #ef4444' : undefined
                  }}
                  disabled={selectedOpt !== null}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
