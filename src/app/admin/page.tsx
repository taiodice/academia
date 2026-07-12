'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/stats?pin=${encodeURIComponent(pin)}`);
      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
        setStats(data.users);
      } else {
        setError(data.error || 'PIN incorrecto');
      }
    } catch (err) {
      setError('Error de conexión');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <form onSubmit={handleLogin} className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Acceso a Padres</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Ingrese el PIN de seguridad para ver el progreso de los estudiantes.</p>
          
          <input
            type="password"
            placeholder="PIN Secreto"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="input-field"
            style={{ width: '100%', marginBottom: '1rem' }}
          />
          
          {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Verificando...' : 'Entrar al Panel'}
          </button>
          
          <button type="button" onClick={() => router.push('/')} className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
            Volver al Inicio
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <header style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ color: 'var(--accent-primary)' }}>📊 Panel de Supervisión</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Analíticas de aprendizaje en tiempo real</p>
        </div>
        <button onClick={() => { setIsAuthenticated(false); setPin(''); }} className="btn-secondary">
          Cerrar Sesión
        </button>
      </header>

      <main className="main-content">
        {stats?.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Aún no hay estudiantes registrados.</p>
        ) : (
          stats?.map((user: any) => (
            <div key={user.id} className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem' }}>Estudiante: <span style={{ color: 'var(--accent-primary)' }}>{user.name}</span> (@{user.username})</h3>
                <span style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '5px 15px', borderRadius: '20px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                  Total XP: {user.score}
                </span>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                  Historial de Evaluaciones (Quiz)
                </h4>
                
                {user.quizAttempts.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Aún no ha realizado ninguna evaluación.</p>
                ) : (
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {user.quizAttempts.map((attempt: any) => (
                      <div key={attempt.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '8px',
                        borderLeft: attempt.passed ? '4px solid #10b981' : '4px solid #ef4444'
                      }}>
                        <div>
                          <strong>Módulo {attempt.moduleId}</strong>
                          <span style={{ marginLeft: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {new Date(attempt.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>{attempt.score} / 10 aciertos</span>
                          <span style={{ color: attempt.passed ? '#10b981' : '#ef4444' }}>
                            {attempt.passed ? 'APROBADO' : 'REPROBADO'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
