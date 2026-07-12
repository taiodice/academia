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
          <h2>1. Características Adaptativas de los Peces 🐟</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Los peces no están en el agua por accidente. Evolucionaron herramientas biológicas exclusivas para ser los dueños del medio acuático:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Forma Hidrodinámica:</strong> Su cuerpo tiene forma de torpedo para cortar el agua y nadar súper rápido gastando poca energía.</li>
            <li><strong>Branquias:</strong> No tienen pulmones. Usan branquias para atrapar y respirar el oxígeno que está disuelto en el agua.</li>
            <li><strong>Aletas:</strong> Son su volante y su motor. Les dan dirección, equilibrio y propulsión.</li>
            <li><strong>Vejiga Natatoria:</strong> Es como un globo interno que inflan y desinflan con gas. Les permite subir o bajar en el agua sin tener que nadar constantemente para no hundirse.</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. Modos de vida acuáticos 🌊</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            No todos los animales acuáticos viven o se mueven igual. Se dividen en tres grandes grupos:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Plancton:</strong> Organismos minúsculos que NO pueden nadar contra la corriente. Flotan a la deriva (Ej: krill, microalgas).</li>
            <li><strong>Necton:</strong> Tienen aletas y músculos fuertes. Son los amos del mar porque nadan activamente adonde quieren (Ej: Peces, tiburones, ballenas, calamares).</li>
            <li><strong>Bentos:</strong> Viven en el mismísimo fondo del mar o del río, arrastrándose o pegados a las rocas (Ej: Cangrejos, estrellas de mar, caracoles, corales).</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>3. Relación con la Temperatura Corporal 🌡️</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            ¿Cómo mantienen la temperatura de su cuerpo?
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong style={{ color: '#ef4444' }}>Endotérmicos (Sangre caliente):</strong> Generan su propio calor interno. Gastan mucha energía (comida) para mantener su temperatura constante sin importar si afuera hace frío o calor. (Ej: Aves y Mamíferos como humanos, osos, lobos).</li>
            <li><strong style={{ color: '#3b82f6' }}>Ectotérmicos (Sangre fría):</strong> Su temperatura depende del sol y el ambiente. Si hace frío, su cuerpo se enfría y se vuelven lentos. Por eso los ves tomando sol sobre rocas. (Ej: Reptiles, anfibios e insectos como lagartijas, sapos y serpientes).</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2>4. Adaptaciones a temperaturas extremas ❄️🔥</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Cuando el clima se vuelve imposible de soportar (invierno mortal o verano secante), los animales tienen 3 opciones:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ color: 'var(--accent-secondary)' }}>Hibernación (Frío)</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Dormir profundamente todo el invierno. El ritmo cardíaco baja al mínimo para no gastar energía. Ej: Osos y marmotas.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ color: '#f59e0b' }}>Estivación (Calor/Sequía)</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Enterrarse en el lodo y dormir durante el verano para evitar secarse y morir de calor. Ej: Sapos, caracoles terrestres, cocodrilos.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px', gridColumn: 'span 2' }}>
              <h3 style={{ color: '#8b5cf6' }}>Migración (El Viaje)</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Viajar miles de kilómetros en manada buscando comida o huyendo del clima extremo. Ej: Aves, mariposas monarca, ballenas y cebras.</p>
            </div>
          </div>
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
