'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { use } from 'react';

const subjectsData: Record<string, any> = {
  biologia: {
    title: '🔬 Biología',
    welcome: '¡Bienvenido al Laboratorio! 🧬',
    desc: 'Tu misión de hoy: Aprobar Biología.',
    modules: [
      { id: 1, title: 'Características de los seres vivos', desc: 'Descubre de qué estamos hechos, unicelulares vs pluricelulares, eucariotas y las funciones vitales.' },
      { id: 2, title: 'Función de relación en plantas', desc: '¿Las plantas se mueven? Aprende sobre hidrófitas, xerófitas, tropismos y nastias.' },
      { id: 3, title: 'Función de relación en animales', desc: 'Adaptaciones extremas: Peces, plancton, endo/ectotérmicos, hibernación y migraciones.' }
    ],
    exam: { title: 'Posibles Preguntas del Parcial', desc: 'Simulacro definitivo con 15 preguntas clave. ¡El desafío definitivo!' }
  },
  historia: {
    title: '🏛️ Historia',
    welcome: '¡Viaje en el Tiempo! ⏳',
    desc: 'Explora los eventos que forjaron la humanidad.',
    modules: [
      { id: 1, title: 'Poblamiento americano', desc: 'Teorías del poblamiento (Asiática, Oceánica, Australiana, Americana) y uso del mapa.' },
      { id: 2, title: 'Los majestuosos egipcios', desc: 'Cronología, la jerarquía social, pirámides, momificación, religión y la importancia del Nilo.' },
      { id: 3, title: 'La impresionante civilización Inca', desc: 'Tiempo, ubicación geográfica y comienzos de esta gran civilización americana.' }
    ],
    exam: { title: 'Examen de Historia', desc: 'Demuestra todo lo que aprendiste sobre las civilizaciones antiguas.' }
  }
};

export default function SubjectDashboard({ params }: { params: Promise<{ subjectId: string }> }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState<any[]>([]);
  const [userScore, setUserScore] = useState(0);
  const resolvedParams = use(params);
  const subjectId = resolvedParams.subjectId;

  const subject = subjectsData[subjectId];

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/');
      return;
    }

    if (!subject) {
      router.push('/dashboard');
      return;
    }

    // Fetch progress
    fetch(`/api/progress?userId=${userId}&subjectId=${subjectId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProgress(data.progress);
          if (data.userScore) setUserScore(data.userScore);
        }
        setIsLoaded(true);
      })
      .catch(err => {
        console.error("Error fetching progress", err);
        setIsLoaded(true);
      });

  }, [router, subjectId, subject]);

  if (!isLoaded || !subject) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Cargando materia... ⌛</div>;

  const passedModule1 = progress.some(p => p.moduleId === 1 && p.passed);
  const passedModule2 = progress.some(p => p.moduleId === 2 && p.passed);
  const passedModule3 = progress.some(p => p.moduleId === 3 && p.passed);

  return (
    <div className="container animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => router.push('/dashboard')} className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.9rem' }}>
            ⬅ Volver a Materias
          </button>
          <h2>{subject.title}</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ background: 'rgba(255, 215, 0, 0.2)', border: '1px solid gold', padding: '5px 15px', borderRadius: '20px', color: 'gold', fontWeight: 'bold' }}>
            {userScore} XP ⭐
          </div>
          <button onClick={() => { localStorage.removeItem('userId'); router.push('/'); }} className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>
            Desconectarse
          </button>
        </div>
      </header>

      <main className="main-content">
        <h1 style={{ marginBottom: '0.5rem' }}>{subject.welcome}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          {subject.desc}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>MÓDULO 1 {passedModule1 ? '✅' : ''}</h3>
            <h2 style={{ fontSize: '1.4rem' }}>{subject.modules[0].title}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              {subject.modules[0].desc}
            </p>
            <button onClick={() => router.push(`/subjects/${subjectId}/module/1`)} className={passedModule1 ? "btn-secondary" : "btn-primary"} style={{ width: '100%' }}>
              {passedModule1 ? 'Repasar Misión 🚀' : 'Comenzar Misión 🚀'}
            </button>
          </div>

          <div className="glass-card" style={{ padding: '2rem', opacity: passedModule1 ? 1 : 0.6 }}>
            <h3 style={{ color: passedModule1 ? 'var(--accent-primary)' : 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              MÓDULO 2 {passedModule2 ? '✅' : (passedModule1 ? '' : '🔒')}
            </h3>
            <h2 style={{ fontSize: '1.4rem' }}>{subject.modules[1].title}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              {subject.modules[1].desc}
            </p>
            <button 
              onClick={() => router.push(`/subjects/${subjectId}/module/2`)} 
              className={passedModule1 ? (passedModule2 ? "btn-secondary" : "btn-primary") : "btn-primary"} 
              style={{ width: '100%' }} 
              disabled={!passedModule1}
            >
              {!passedModule1 ? 'Requiere Módulo 1' : (passedModule2 ? 'Repasar Misión 🚀' : 'Comenzar Misión 🚀')}
            </button>
          </div>

          <div className="glass-card" style={{ padding: '2rem', opacity: passedModule2 ? 1 : 0.6 }}>
            <h3 style={{ color: passedModule2 ? 'var(--accent-primary)' : 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              MÓDULO 3 {passedModule3 ? '✅' : (passedModule2 ? '' : '🔒')}
            </h3>
            <h2 style={{ fontSize: '1.4rem' }}>{subject.modules[2].title}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              {subject.modules[2].desc}
            </p>
            <button 
              onClick={() => router.push(`/subjects/${subjectId}/module/3`)} 
              className={passedModule2 ? (passedModule3 ? "btn-secondary" : "btn-primary") : "btn-primary"} 
              style={{ width: '100%' }} 
              disabled={!passedModule2}
            >
              {!passedModule2 ? 'Requiere Módulo 2' : (passedModule3 ? 'Repasar Misión 🚀' : 'Comenzar Misión 🚀')}
            </button>
          </div>

          {/* Examen Final */}
          <div className="glass-card" style={{ padding: '2rem', border: '2px solid rgba(239, 68, 68, 0.3)', opacity: 1 }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>JEFE FINAL 👾</h3>
            <h2 style={{ fontSize: '1.4rem' }}>{subject.exam.title}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              {subject.exam.desc}
            </p>
            <button 
              onClick={() => router.push(`/subjects/${subjectId}/module/4/quiz`)} 
              className="btn-secondary" 
              style={{ width: '100%', borderColor: '#ef4444', color: '#ef4444' }} 
              disabled={!passedModule3}
            >
              {!passedModule3 ? 'Requiere Módulo 3' : 'Desafiar al Jefe ⚔️'}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
