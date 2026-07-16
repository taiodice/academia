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
          Γ¼à Volver al Laboratorio
        </button>
        <h2 style={{ color: 'var(--accent-primary)' }}>Misi├│n 2</h2>
      </header>

      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          La Funci├│n de Relaci├│n en las Plantas ≡ƒî╗
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Spoiler alert: Las plantas no tienen cerebro, pero saben perfectamente lo que pasa a su alrededor.
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. Relaci├│n con la luz, temperatura y agua ≡ƒîª∩╕Å</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Las plantas no pueden correr a refugiarse, as├¡ que tienen que adaptarse f├¡sicamente al lugar donde nacen:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Luz y Temperatura:</strong> Las plantas ajustan su ciclo de vida al clima. En oto├▒o, cuando baja la temperatura y hay menos horas de luz, muchos ├írboles pierden sus hojas para ahorrar energ├¡a en invierno. Otras germinan y florecen ├║nicamente cuando detectan el aumento de temperatura en primavera.</li>
            <li style={{ marginTop: '1rem' }}><strong style={{ color: '#3b82f6' }}>Hidr├│fitas (Relaci├│n con exceso de agua):</strong> Viven en el agua o pantanos (ej: nen├║fares). Tienen ra├¡ces muy cortas porque no necesitan buscar agua, y hojas anchas para flotar.</li>
            <li><strong style={{ color: '#f59e0b' }}>Xer├│fitas (Relaci├│n con falta de agua):</strong> Las maestras del desierto (ej: cactus). Tienen ra├¡ces largu├¡simas para buscar agua profunda, la acumulan en su tallo y sus hojas evolucionaron a espinas para evitar la evaporaci├│n por calor extremo.</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. Movimientos como respuesta a est├¡mulos ≡ƒò║</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Aunque parezcan quietas, las plantas se mueven de dos formas principales: Tropismos y Nastias.
          </p>

          <h3 style={{ color: 'var(--accent-secondary)', marginTop: '1.5rem' }}>Tropismos ≡ƒî₧</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Son movimientos de <strong>crecimiento permanente y lento</strong> hacia un est├¡mulo (tropismo positivo) o alej├índose de ├⌐l (negativo).
          </p>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Fototropismo:</strong> Crecimiento influenciado por la luz. El tallo de un girasol crece hacia el sol (fototropismo positivo).</li>
            <li><strong>Hidrotropismo:</strong> Crecimiento influenciado por el agua. Las ra├¡ces crecen estir├índose hacia donde hay zonas h├║medas bajo la tierra.</li>
          </ul>

          <h3 style={{ color: '#10b981', marginTop: '1.5rem' }}>Nastias ≡ƒî║</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Son movimientos <strong>pasajeros, temporales y muy r├ípidos</strong>, y no importa de d├│nde venga el est├¡mulo.
          </p>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Tigmotactismo (o tigmonastia):</strong> Es la reacci├│n r├ípida de una planta <strong>al tacto</strong>. Por ejemplo, cuando una planta carn├¡vora se cierra velozmente al sentir que una mosca toca sus pelos sensitivos, o cuando las hojas de la <em>Mimosa pudica</em> se pliegan al tocarlas para protegerse.</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>┬┐Listo para el desaf├¡o bot├ínico?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Para desbloquear la Misi├│n 3 de los animales, necesitas dominar a las plantas. ┬íSaca al menos 8 aciertos!
          </p>
          <button onClick={() => router.push(`/subjects/${subjectId}/module/2/quiz`)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>
            ≡ƒÄ« Iniciar Evaluaci├│n (Quiz)
          </button>
        </div>
      </main>
    </div>
  );
}
