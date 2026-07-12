'use client';
import { useRouter, useParams } from 'next/navigation';

export default function Module1() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <header style={{ padding: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => router.push(`/subjects/${subjectId}`)} className="btn-secondary">
          ⬅ Volver al Laboratorio
        </button>
        <h2 style={{ color: 'var(--accent-primary)' }}>Misión 1</h2>
      </header>

      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          Características de los seres vivos 👽
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Spoiler alert: Eres un montón de células colaborando para no morir.
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. ¿De qué estamos hechos? 🧱</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Imagina que estás jugando Minecraft. Todo está hecho de bloques, ¿verdad? Bueno, en la vida real, el bloque fundamental no es de tierra o diamante, es la <strong>célula</strong>.
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Unicelulares:</strong> Son los lobos solitarios de la biología (como las bacterias). Una sola célula hace todo: come, se defiende y se reproduce. Básicamente, viven en modo Dios (pero chiquitos).</li>
            <li><strong>Pluricelulares:</strong> Somos nosotros. Tenemos billones de células especializadas. Algunas forman tus músculos para que puedas correr, otras forman tus ojos para que leas esto. ¡Trabajo en equipo nivel leyenda!</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. Eucariotas vs Procariotas ⚔️</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            No todas las células son iguales. Hay dos equipos principales:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ color: 'var(--accent-secondary)' }}>Eucariotas (VIPs) 👑</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Tienen su material genético bien guardado en un núcleo. Son como casas con cuartos separados. Ej: Células de Animales y Plantas.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ color: '#f59e0b' }}>Procariotas (Minimalistas) 🎒</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>No tienen núcleo. Su ADN está suelto por ahí como los cables detrás de la compu. Ej: Bacterias.</p>
            </div>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2>3. Las Funciones Vitales 🔄</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Para considerarte un "ser vivo" oficialmente y no una simple piedra muy inteligente, tienes que cumplir estas tres reglas básicas (sí, incluso tú):
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li>🍔 <strong>Nutrición:</strong> Obtener energía. Si eres planta haces fotosíntesis (autótrofos); si eres animal, vas a la heladera (heterótrofos).</li>
            <li>👀 <strong>Relación:</strong> Darse cuenta de qué pasa alrededor y reaccionar. Si tocas algo caliente y quitas la mano, es función de relación. ¡Tu sistema nervioso en acción!</li>
            <li>👶 <strong>Reproducción:</strong> Crear descendencia para que la especie no se extinga.</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>¿Te sientes preparado?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            El jefe final de este módulo te está esperando. Tienes que sacar al menos un 80% para desbloquear la Misión 2.
          </p>
          <button onClick={() => router.push(`/subjects/${subjectId}/module/1/quiz`)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>
            🎮 Iniciar Evaluación (Quiz)
          </button>
        </div>
      </main>
    </div>
  );
}
