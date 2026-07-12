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
          Todo lo que está vivo en el planeta cumple reglas estrictas. ¡Conócelas!
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. ¿De qué están formados? 🧱</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Todo ser vivo está formado por células. Existen de dos tipos según su cantidad y complejidad:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Unicelulares:</strong> Organismos formados por <em>una sola célula</em>. Son microscópicos (como las bacterias).</li>
            <li><strong>Pluricelulares:</strong> Organismos formados por <em>muchas células</em> que trabajan en equipo (como tú, tu perro o un manzano).</li>
            <li style={{ marginTop: '1rem' }}><strong>Células Procariotas:</strong> Células simples que NO tienen un núcleo definido. El ADN está suelto (Bacterias).</li>
            <li><strong>Células Eucariotas:</strong> Células complejas que SÍ tienen un núcleo verdadero que protege su ADN (Animales, plantas, hongos).</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. El Ciclo de Vida 🔄</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Nadie es eterno. Para ser considerado un ser vivo, debes atravesar un ciclo inevitable:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>👶 Nacer</span>
            <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>📈 Crecer</span>
            <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>🧬 Reproducirse</span>
            <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>💀 Morir</span>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2>3. Las Funciones Vitales ⚡</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Además del ciclo de vida, todos los seres vivos realizan estas tres funciones clave:
          </p>

          <h3 style={{ color: 'var(--accent-primary)', marginTop: '1.5rem' }}>A) Nutrición 🍔</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Autótrofa:</strong> Fabrican su propio alimento. Las plantas hacen esto mediante la fotosíntesis (auto = por sí mismo).</li>
            <li><strong>Heterótrofa:</strong> Necesitan comer a otros seres vivos para obtener energía. (hetero = otro). Animales, humanos y hongos.</li>
          </ul>

          <h3 style={{ color: '#f59e0b', marginTop: '1.5rem' }}>B) Relación 👀</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Es la capacidad de <strong>captar estímulos</strong> del medio ambiente (luz, calor, peligro) y generar una respuesta. Por ejemplo: si tocas algo muy caliente, tu cuerpo capta el estímulo de dolor y la respuesta es quitar la mano rápido.
          </p>

          <h3 style={{ color: '#10b981', marginTop: '1.5rem' }}>C) Reproducción 👶</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Asexuada (Asexual):</strong> Participa <em>un solo individuo</em>. La cría es un clon idéntico al padre (Ej: bacterias dividiéndose en dos).</li>
            <li><strong>Sexuada (Sexual):</strong> Participan <em>dos individuos</em> de diferente sexo. La cría hereda características de ambos, lo que genera diversidad (Ej: humanos, leones).</li>
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
