'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, isRegistering }),
      });

      if (res.ok) {
        const data = await res.json();
        // Guardamos el ID del usuario en localStorage para la sesión
        localStorage.setItem('userId', data.user.id);
        router.push('/dashboard');
      } else {
        alert('Error: Revisa tus credenciales.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      <div className="glass-card animate-fade-in" style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>🔬 BioAcademy</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          La ciencia nunca fue tan divertida.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Usuario (ej: franco123)"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {isRegistering && (
            <input
              type="text"
              placeholder="Tu nombre real"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
            {isRegistering ? 'Crear mi cuenta' : 'Entrar al Laboratorio'}
          </button>
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {isRegistering ? '¿Ya tienes una cuenta?' : '¿Eres un nuevo científico?'}
          <br />
          <button 
            type="button" 
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ background: 'none', border: 'none', color: 'var(--accent-secondary)', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' }}
          >
            {isRegistering ? 'Inicia sesión aquí' : 'Regístrate aquí'}
          </button>
        </p>
      </div>
    </div>
  );
}
