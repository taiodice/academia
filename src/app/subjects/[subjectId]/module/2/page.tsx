'use client';
import { useRouter, useParams } from 'next/navigation';

export default function Module2() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <header style={{ padding: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => router.push(`/subjects/${subjectId}`)} className="btn-secondary">
          ⬅ Volver al Laboratorio
        </button>
        <h2 style={{ color: 'var(--accent-primary)' }}>Misión 2</h2>
      </header>

      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          La Función de Relación en las Plantas 🌻
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Spoiler alert: Las plantas no tienen cerebro, pero saben perfectamente lo que hacen.
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. Adaptaciones al Agua 💧</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Las plantas no pueden correr a tomar agua, así que tienen que adaptarse al lugar donde nacen. Existen dos tipos extremos:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong style={{ color: '#3b82f6' }}>Hidrófitas:</strong> Viven en el agua o en lugares muy húmedos (como los nenúfares). Tienen raíces muy cortas (¡no necesitan buscar agua lejos!) y hojas anchas para flotar.</li>
            <li><strong style={{ color: '#f59e0b' }}>Xerófitas:</strong> Las maestras de la supervivencia en el desierto (como los cactus). Tienen raíces larguísimas para buscar agua subterránea, acumulan agua en el tallo y sus hojas son espinas para evitar la pérdida de agua por evaporación.</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. Los Movimientos de las Plantas 🕺</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Aunque no lo parezca, las plantas se mueven. Lo hacen muy lento o como respuesta a estímulos rápidos.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ color: 'var(--accent-secondary)' }}>Tropismos 🌞</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Son movimientos de <strong>crecimiento permanente</strong> hacia (o alejándose de) un estímulo. Son muy lentos.</p>
              <ul style={{ fontSize: '0.85rem', marginTop: '0.5rem', paddingLeft: '1rem' }}>
                <li><strong>Fototropismo:</strong> Crecer buscando la luz (el tallo del girasol).</li>
                <li><strong>Geotropismo:</strong> Crecer a favor de la gravedad (las raíces).</li>
                <li><strong>Hidrotropismo:</strong> Las raíces buscando humedad.</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ color: '#10b981' }}>Nastias 🌺</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Son movimientos <strong>pasajeros</strong> y rápidos, independientes de la dirección del estímulo.</p>
              <ul style={{ fontSize: '0.85rem', marginTop: '0.5rem', paddingLeft: '1rem' }}>
                <li><strong>Sismonastia:</strong> Cuando una planta carnívora se cierra rápidamente al tocarla.</li>
                <li><strong>Fotonastia:</strong> Flores que se abren de día y se cierran de noche.</li>
              </ul>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>¿Listo para el desafío botánico?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Para desbloquear la Misión 3 de los animales, necesitas dominar a las plantas. ¡Saca al menos 8 aciertos!
          </p>
          <button onClick={() => router.push(`/subjects/${subjectId}/module/2/quiz`)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>
            🎮 Iniciar Evaluación (Quiz)
          </button>
        </div>
      </main>
    </div>
  );
}
