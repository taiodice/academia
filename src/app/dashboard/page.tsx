'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalDashboard() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    if (!userId) {
      router.push('/');
    } else {
      setUserName(name || 'Franco');
      setIsLoaded(true);
    }
  }, [router]);

  if (!isLoaded) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Cargando materias... 📚</div>;

  return (
    <div className="container animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div>
          <h2 style={{ color: 'var(--accent-primary)' }}>🎓 Mi Academia</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => { localStorage.removeItem('userId'); router.push('/'); }} className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>
            Desconectarse
          </button>
        </div>
      </header>

      <main className="main-content">
        <h1 style={{ marginBottom: '0.5rem' }}>Hola, {userName}! 👋</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          ¿Qué materia vamos a destruir hoy?
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧬</div>
            <h2 style={{ fontSize: '1.4rem' }}>Biología</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              Seres vivos, plantas, animales y adaptación. Tu misión principal.
            </p>
            <button onClick={() => router.push('/subjects/biologia')} className="btn-primary" style={{ width: '100%' }}>
              Entrar al Laboratorio 🚀
            </button>
          </div>

          <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
            <h2 style={{ fontSize: '1.4rem' }}>Historia</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', minHeight: '60px' }}>
              Poblamiento americano, el esplendor de Egipto y el Imperio Inca.
            </p>
            <button onClick={() => router.push('/subjects/historia')} className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              Viajar en el Tiempo ⏳
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
