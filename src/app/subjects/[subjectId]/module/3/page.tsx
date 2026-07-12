'use client';
import { useRouter, useParams } from 'next/navigation';

export default function Module3() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <header style={{ padding: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => router.push(`/subjects/${subjectId}`)} className="btn-secondary">
          ⬅ Volver al Laboratorio
        </button>
        <h2 style={{ color: 'var(--accent-primary)' }}>Misión 3</h2>
      </header>

      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          La Función de Relación en los Animales 🐾
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Spoiler alert: Sobrevivir en el mundo animal requiere súper-poderes de adaptación.
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. La Temperatura Corporal 🌡️</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Mantenerse calientito o fresco es cuestión de vida o muerte. Hay dos tipos de animales según cómo regulan su termostato:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong style={{ color: '#ef4444' }}>Endotérmicos (Sangre caliente):</strong> Generan su propio calor quemando energía. Sudamos cuando hace calor y tiritamos cuando hace frío para mantenernos siempre igual. Ej: Mamíferos (como tú) y aves.</li>
            <li><strong style={{ color: '#3b82f6' }}>Ectotérmicos (Sangre fría):</strong> Su temperatura depende del sol y el ambiente. Si hace frío, se ralentizan y se tiran a tomar sol sobre una roca. Ej: Reptiles, anfibios y peces.</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. Sobreviviendo a los Climas Extremos ❄️🔥</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            ¿Qué haces si el invierno te va a congelar o el verano va a secar tu laguna? ¡Pues duermes mucho o te vas!
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ color: 'var(--accent-secondary)' }}>Hibernación (Frío)</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Dormir profundamente todo el invierno. El metabolismo se pone en "modo ahorro de energía". Ej: Osos y ardillas.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ color: '#f59e0b' }}>Estivación (Calor/Sequía)</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Enterrarse y dormir en verano para evitar secarse y morir de calor. Ej: Cocodrilos y sapos.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px', gridColumn: 'span 2' }}>
              <h3 style={{ color: '#8b5cf6' }}>Migración (El Viaje)</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Agarrar las maletas y viajar miles de kilómetros buscando comida o mejor clima. Ej: Aves, mariposas monarca y ballenas.</p>
            </div>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2>3. Adaptación Acuática 🌊</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            En el agua, los animales se dividen según cómo y dónde nadan:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Plancton:</strong> Son organismos muy pequeños que no tienen fuerza para nadar. Son arrastrados por las corrientes del mar como hojas en el viento. (¡Sí, como Plankton de Bob Esponja!)</li>
            <li><strong>Bentos:</strong> Viven caminando o arrastrándose en el mismísimo fondo del mar o del río. Ej: Cangrejos, estrellas de mar.</li>
            <li><strong>Necton:</strong> Tienen aletas y músculos fuertes. Pueden nadar activamente e ir a donde quieran, peleando contra las corrientes. Ej: Tiburones, delfines, peces.</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>¡Estás a un paso del Jefe Final!</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Aprueba este quiz para obtener la llave de acceso al combate contra el Examen Final de Biología.
          </p>
          <button onClick={() => router.push(`/subjects/${subjectId}/module/3/quiz`)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>
            🎮 Iniciar Evaluación (Quiz)
          </button>
        </div>
      </main>
    </div>
  );
}
