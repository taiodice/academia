'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/');
    } else {
      setIsLoaded(true);
    }
  }, [router]);

  if (!isLoaded) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Cargando laboratorio... 🔬</div>;

  return (
    <div className="container animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', borderBottom: '1px solid var(--glass-border)' }}>
        <h2>🔬 BioAcademy</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '5px 15px', borderRadius: '20px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
            🏆 0 XP
          </span>
          <button onClick={() => { localStorage.removeItem('userId'); router.push('/'); }} className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>
            Desconectarse
          </button>
        </div>
      </header>

      <main className="main-content">
        <h1 style={{ marginBottom: '0.5rem' }}>¡Bienvenido al Laboratorio! 🧬</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Tu misión de hoy: Aprobar Biología 7. ¡Vamos a investigar la vida!
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>MÓDULO 1</h3>
            <h2 style={{ fontSize: '1.4rem' }}>Características de los seres vivos</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              Descubre de qué estamos hechos, unicelulares vs pluricelulares, eucariotas y las funciones vitales.
            </p>
            <button onClick={() => router.push('/module/1')} className="btn-primary" style={{ width: '100%' }}>Comenzar Misión 🚀</button>
          </div>

          <div className="glass-card" style={{ padding: '2rem', opacity: 0.6 }}>
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>MÓDULO 2 🔒</h3>
            <h2 style={{ fontSize: '1.4rem' }}>Función de relación en plantas</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              ¿Las plantas se mueven? Aprende sobre hidrófitas, xerófitas, tropismos y nastias.
            </p>
            <button className="btn-primary" style={{ width: '100%' }} disabled>Requiere Módulo 1</button>
          </div>

          <div className="glass-card" style={{ padding: '2rem', opacity: 0.6 }}>
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>MÓDULO 3 🔒</h3>
            <h2 style={{ fontSize: '1.4rem' }}>Función de relación en animales</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              Adaptaciones extremas: Peces, plancton, endo/ectotérmicos, hibernación y migraciones.
            </p>
            <button className="btn-primary" style={{ width: '100%' }} disabled>Requiere Módulo 2</button>
          </div>

        </div>
      </main>
    </div>
  );
}
