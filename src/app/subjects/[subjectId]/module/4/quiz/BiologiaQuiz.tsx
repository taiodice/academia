'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const questions = [
  // Seres Vivos
  {
    q: '┬┐Qu├⌐ diferencia fundamental tiene una c├⌐lula eucariota respecto a una procariota?',
    options: ['La eucariota es siempre unicelular.', 'La eucariota tiene un n├║cleo verdadero que envuelve y protege el ADN.', 'La procariota es exclusiva de los animales.', 'No hay ninguna diferencia real.'],
    answer: 1
  },
  {
    q: 'Un organismo compuesto por millones de c├⌐lulas organizadas trabajando en equipo, como un ├írbol o un ser humano, es un organismo:',
    options: ['Unicelular', 'Aut├│trofo obligado', 'Pluricelular', 'Procariota gigante'],
    answer: 2
  },
  {
    q: 'Si una bacteria simplemente se divide por la mitad para crear un clon exacto de s├¡ misma, est├í realizando:',
    options: ['Nutrici├│n aut├│trofa', 'Reproducci├│n sexual (sexuada)', 'Funci├│n de relaci├│n', 'Reproducci├│n asexual (asexuada)'],
    answer: 3
  },
  {
    q: 'A diferencia de las plantas, nosotros los humanos no podemos hacer fotos├¡ntesis y debemos consumir alimentos de otros seres vivos. Nuestra nutrici├│n es:',
    options: ['Aut├│trofa', 'Unicelular', 'Heter├│trofa', 'Quimiosint├⌐tica'],
    answer: 2
  },
  {
    q: 'Si te pinchas con una espina y el dolor hace que retires la mano instant├íneamente, acabas de utilizar la funci├│n vital de:',
    options: ['Reproducci├│n r├ípida', 'Relaci├│n (captar un est├¡mulo y generar una respuesta)', 'Nutrici├│n defensiva', 'Ciclo de vida'],
    answer: 1
  },
  // Plantas
  {
    q: '┬┐Por qu├⌐ muchos ├írboles de clima templado pierden sus hojas cuando se acerca el invierno?',
    options: ['Para verse m├ís est├⌐ticos.', 'Es una respuesta a la bajada de temperatura y luz, para ahorrar energ├¡a.', 'Porque se vuelven animales.', 'Para asustar a los herb├¡voros.'],
    answer: 1
  },
  {
    q: '┬┐Qu├⌐ caracteriza a las plantas xer├│fitas (como los cactus)?',
    options: ['Viven flotando en pantanos.', 'No tienen ra├¡ces.', 'Est├ín adaptadas a climas secos, con ra├¡ces profundas y hojas transformadas en espinas.', 'Necesitan estar completamente sumergidas en agua.'],
    answer: 2
  },
  {
    q: 'El crecimiento lento y permanente de las ra├¡ces profundizando en la tierra en busca de humedad se denomina:',
    options: ['Hidrotropismo positivo', 'Fototropismo negativo', 'Estivaci├│n bot├ínica', 'Sismonastia'],
    answer: 0
  },
  {
    q: 'Si tocas las hojas de una planta Mimosa y estas se pliegan r├ípidamente en segundos para protegerse, estamos viendo un ejemplo de:',
    options: ['Geotropismo', 'Tigmotactismo (una nastia por contacto)', 'Hidrotropismo', 'Fotos├¡ntesis nocturna'],
    answer: 1
  },
  // Animales
  {
    q: 'Para adaptarse perfectamente al agua, los peces evolucionaron una estructura que extrae el ox├¡geno disuelto en el agua. Se llama:',
    options: ['Vejiga natatoria', 'Aleta dorsal', 'Branquias', 'Pulmones acu├íticos'],
    answer: 2
  },
  {
    q: '┬┐Qu├⌐ ├│rgano de los peces funciona como un globo interno de gas que les permite flotar y cambiar de profundidad sin gastar energ├¡a nadando?',
    options: ['La aleta caudal', 'El plancton', 'Las branquias', 'La vejiga natatoria'],
    answer: 3
  },
  {
    q: 'Los tiburones y los delfines pueden nadar libremente venciendo las fuertes corrientes del mar, por lo que pertenecen al grupo ecol├│gico del:',
    options: ['Bentos', 'Plancton', 'Necton', 'Ectotermo marino'],
    answer: 2
  },
  {
    q: 'Organismos como los cangrejos y las estrellas de mar, que viven apoyados y arrastr├índose exclusivamente en el lecho (fondo) marino, forman parte del:',
    options: ['Bentos', 'Plancton', 'Necton', 'Endotermo'],
    answer: 0
  },
  {
    q: 'Las aves y los mam├¡feros necesitan comer mucha comida porque gastan esa energ├¡a en generar su propio calor corporal constante. Ellos son:',
    options: ['Animales ectot├⌐rmicos', 'Animales endot├⌐rmicos', 'Organismos s├⌐siles', 'Animales estivadores'],
    answer: 1
  },
  {
    q: 'Para sobrevivir a la extrema falta de agua y al calor sofocante del verano, algunos animales se entierran en el barro seco y entran en un sue├▒o profundo. A esto se le llama:',
    options: ['Hibernaci├│n', 'Migraci├│n', 'Tigmotactismo', 'Estivaci├│n'],
    answer: 3
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
        const passed = newScore >= 12; // Requiere 12/15 para pasar el examen final
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
    const passed = score >= 12; // 80%
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', border: passed ? '2px solid #10b981' : '2px solid #ef4444' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{passed ? '≡ƒÅå ┬íAPROBADO!' : '≡ƒÆÑ REPROBADO'}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Tu puntaje: <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{score} de {questions.length}</span>
          </p>
          <p style={{ marginBottom: '2rem' }}>
            {passed 
              ? '┬íFelicidades! Est├ís m├ís que listo para arrasar en el Parcial de Biolog├¡a. Eres un experto.' 
              : 'Necesitas al menos 12 aciertos para aprobar este simulacro. Repasa bien la teor├¡a y vuelve a intentarlo.'}
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!passed && <button onClick={() => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedOpt(null); }} className="btn-primary">Reintentar Parcial</button>}
            <button onClick={() => router.push(`/subjects/${subjectId}`)} className={passed ? "btn-primary" : "btn-secondary"} style={{ width: '100%' }}>
              Volver a Biolog├¡a
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
        <h3 style={{ color: '#ef4444' }}>≡ƒô¥ POSIBLES PREGUNTAS DEL PARCIAL</h3>
        <span style={{ color: 'var(--text-secondary)' }}>Pregunta {currentQ + 1} de {questions.length}</span>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>{q.q}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {q.options.map((opt, i) => {
              let btnClass = "btn-secondary";
              if (selectedOpt !== null) {
                if (i === q.answer) btnClass = "btn-primary"; // Muestra la correcta en verde
                else if (i === selectedOpt) btnClass = "btn-secondary"; // La que eligi├│ mal
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
