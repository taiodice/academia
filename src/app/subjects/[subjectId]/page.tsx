'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function SubjectDashboard({ params }: { params: Promise<{ subjectId: string }> }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState<any[]>([]);
  const resolvedParams = use(params);
  const subjectId = resolvedParams.subjectId;

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/');
      return;
    }

    // Fetch progress
    fetch(`/api/progress?userId=${userId}&subjectId=${subjectId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProgress(data.progress);
        }
        setIsLoaded(true);
      })
      .catch(err => {
        console.error("Error fetching progress", err);
        setIsLoaded(true);
      });

  }, [router, subjectId]);

  if (!isLoaded) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Cargando laboratorio... 🔬</div>;

  const isBiologia = subjectId === 'biologia';

  // Check which modules are unlocked
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
          <h2>{isBiologia ? '🔬 TucuAcademy' : '🏛️ Historia'}</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => { localStorage.removeItem('userId'); router.push('/'); }} className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>
            Desconectarse
          </button>
        </div>
      </header>

      <main className="main-content">
        <h1 style={{ marginBottom: '0.5rem' }}>{isBiologia ? '¡Bienvenido al Laboratorio! 🧬' : '¡Viaje en el Tiempo! ⏳'}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          {isBiologia ? 'Tu misión de hoy: Aprobar Biología 7.' : 'Explora los eventos que forjaron la humanidad.'}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>MÓDULO 1 {passedModule1 ? '✅' : ''}</h3>
            <h2 style={{ fontSize: '1.4rem' }}>{isBiologia ? 'Características de los seres vivos' : 'En construcción'}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              {isBiologia ? 'Descubre de qué estamos hechos, unicelulares vs pluricelulares, eucariotas y las funciones vitales.' : 'Próximamente...'}
            </p>
            <button onClick={() => isBiologia && router.push(`/subjects/${subjectId}/module/1`)} className={passedModule1 ? "btn-secondary" : "btn-primary"} style={{ width: '100%' }}>
              {passedModule1 ? 'Repasar Misión 🚀' : 'Comenzar Misión 🚀'}
            </button>
          </div>

          {isBiologia && (
            <>
              <div className="glass-card" style={{ padding: '2rem', opacity: passedModule1 ? 1 : 0.6 }}>
                <h3 style={{ color: passedModule1 ? 'var(--accent-primary)' : 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  MÓDULO 2 {passedModule2 ? '✅' : (passedModule1 ? '' : '🔒')}
                </h3>
                <h2 style={{ fontSize: '1.4rem' }}>Función de relación en plantas</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
                  ¿Las plantas se mueven? Aprende sobre hidrófitas, xerófitas, tropismos y nastias.
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
                <h2 style={{ fontSize: '1.4rem' }}>Función de relación en animales</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
                  Adaptaciones extremas: Peces, plancton, endo/ectotérmicos, hibernación y migraciones.
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
              <div className="glass-card" style={{ padding: '2rem', border: '2px solid rgba(239, 68, 68, 0.3)', opacity: passedModule3 ? 1 : 0.6 }}>
                <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>JEFE FINAL 👾 {!passedModule3 && '🔒'}</h3>
                <h2 style={{ fontSize: '1.4rem' }}>Examen Final: Biología 7</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
                  Demuestra todo lo que has aprendido. 12 preguntas de los 3 módulos. ¡El desafío definitivo!
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
            </>
          )}

        </div>
      </main>
    </div>
  );
}
