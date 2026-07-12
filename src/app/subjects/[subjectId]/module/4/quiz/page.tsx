'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const questions = [
  // Del Módulo 1 (Características de los seres vivos)
  {
    q: '¿Qué es el ciclo de vida?',
    options: ['Un círculo dibujado en el piso.', 'La etapa donde solo comemos.', 'El proceso inevitable de nacer, crecer, reproducirse y morir.', 'La reproducción sexual.'],
    answer: 2
  },
  {
    q: 'Si un ser vivo fabrica su propio alimento (como una planta), decimos que tiene una nutrición...',
    options: ['Heterótrofa', 'Autótrofa', 'Sexual', 'Unicelular'],
    answer: 1
  },
  {
    q: '¿Cuál es la principal diferencia entre reproducción sexual y asexual?',
    options: ['La asexual necesita dos padres y la sexual uno solo.', 'La sexual produce clones idénticos y la asexual diversidad genética.', 'La asexual involucra un solo individuo (clones) y la sexual a dos individuos (diversidad genética).', 'No hay diferencia.'],
    answer: 2
  },
  {
    q: '¿Cuál es la principal diferencia entre células eucariotas y procariotas?',
    options: ['Las procariotas son más grandes.', 'Las eucariotas tienen el ADN protegido en un núcleo verdadero.', 'Las eucariotas solo están en las plantas.', 'Las procariotas no tienen ADN.'],
    answer: 1
  },
  // Del Módulo 2 (Relación en plantas)
  {
    q: 'Las plantas hidrófitas están adaptadas a vivir en...',
    options: ['Desiertos calientes', 'Ambientes muy acuáticos', 'Zonas con mucha nieve', 'Lugares sin luz solar'],
    answer: 1
  },
  {
    q: 'Si pones una planta cerca de una ventana y el tallo crece doblándose hacia el sol, esto es un ejemplo de...',
    options: ['Fototropismo positivo', 'Hidrotropismo', 'Tigmotactismo', 'Fotosíntesis oscura'],
    answer: 0
  },
  {
    q: '¿Qué adaptación tienen los cactus (xerófitas) para sobrevivir a la falta de agua y el calor?',
    options: ['Tienen raíces cortas y hojas anchas.', 'Sundan todo el día.', 'Sus hojas se transformaron en espinas y guardan agua en el tallo grueso.', 'Pierden las hojas en otoño.'],
    answer: 2
  },
  {
    q: 'Cuando una planta carnívora se cierra velozmente al sentir que una mosca toca sus pelos, está realizando un movimiento de:',
    options: ['Fototropismo', 'Tigmotactismo (una nastia por tacto)', 'Hidrotropismo negativo', 'Sismonastia pasiva'],
    answer: 1
  },
  // Del Módulo 3 (Relación en animales)
  {
    q: 'Para vivir bajo el agua, los peces evolucionaron aletas, forma hidrodinámica, vejiga natatoria y...',
    options: ['Pulmones extra grandes.', 'Branquias para respirar el oxígeno del agua.', 'Branquias para respirar aire superficial.', 'Patas con aletas de buceo.'],
    answer: 1
  },
  {
    q: 'Los mamíferos (como los lobos y tú) generan su propio calor interno. Por eso se llaman animales...',
    options: ["Ectotérmicos", "Bentos", "Endotérmicos", "Fototrópicos"],
    answer: 2
  },
  {
    q: 'Los peces, delfines y tiburones, que nadan activamente y pelean contra las corrientes del mar, forman parte del grupo del...',
    options: ['Bentos', 'Plancton', 'Necton', 'Sedimento'],
    answer: 2
  },
  {
    q: 'Algunos animales se entierran en el lodo a dormir todo el verano para no morir secos por el intenso calor. Esto se llama...',
    options: ['Estivación', 'Migración', 'Hibernación', 'Tigmotactismo'],
    answer: 0
  }
];

export default function FinalExam() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId;
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
            body: JSON.stringify({ userId, subjectId, moduleId: 4, score: newScore, passed })
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
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!passed && <button onClick={() => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedOpt(null); }} className="btn-primary">Reintentar</button>}
            <button onClick={() => router.push(`/subjects/${subjectId}`)} className={passed ? "btn-primary" : "btn-secondary"} style={{ width: '100%' }}>
              Volver a Biología
            </button>
          </div>
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
