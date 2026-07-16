'use client';
import { useRouter, useParams } from 'next/navigation';

export default function Module2Page() {
  const params = useParams();
  
  if (params.subjectId === 'historia') {
    return <Historia />;
  }

  return <div />;
}

function Historia() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <header style={{ padding: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => router.push(`/subjects/${subjectId}`)} className="btn-secondary">
          ⬅ Volver al Panel de Control
        </button>
        <h2 style={{ color: 'var(--accent-primary)' }}>Misión 2</h2>
      </header>

      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          Los Majestuosos Egipcios 🐪
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Pirámides, faraones y maldiciones. Descubre el imperio de arena.
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. Tiempo y Espacio: El Don del Nilo 💧</h2>
          <div style={{ margin: '2rem 0', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            <img src="/images/maps/egipto.png" alt="Mapa del Antiguo Egipto" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            La civilización egipcia se desarrolló hace más de 5.000 años (alrededor del 3150 a.C.) en el noreste de África. Todo Egipto es un enorme desierto, pero lograron sobrevivir gracias al <strong>Río Nilo</strong>.
          </p>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            El historiador griego <strong>Heródoto</strong> dijo que <em>"Egipto es un don (regalo) del Nilo"</em>. Y tenía razón: cada año el río se desbordaba, dejando un barro oscuro y súper fértil (el limo) que permitía cultivar trigo en medio del desierto. Los egipcios crearon impresionantes <strong>obras de regadío</strong> (canales y diques) para llevar el agua más lejos.
          </p>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. La Sociedad en forma de Pirámide 🔺</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            No todos eran iguales. La sociedad egipcia estaba rígidamente dividida de arriba hacia abajo:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong style={{ color: '#f59e0b' }}>1. El Faraón y la Familia Real:</strong> El líder absoluto, dueño de todo Egipto.</li>
            <li><strong style={{ color: '#10b981' }}>2. Sacerdotes y Nobles:</strong> Cuidaban los templos y ayudaban a gobernar.</li>
            <li><strong style={{ color: '#3b82f6' }}>3. El Visir y Escribas:</strong> El Visir era la mano derecha del Faraón. Los escribas eran los únicos que sabían leer y escribir (jeroglíficos).</li>
            <li><strong>4. Médicos, Soldados y Artesanos:</strong> Trabajadores especializados muy respetados.</li>
            <li><strong>5. Campesinos:</strong> La gran mayoría del pueblo. Cultivaban la tierra y, cuando el río se inundaba, ayudaban a construir las pirámides.</li>
            <li><strong style={{ color: '#ef4444' }}>6. Esclavos:</strong> Prisioneros de guerra sin derechos, forzados a los trabajos más duros.</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>3. Religión: Teocracia Politeísta 👁️</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Eran <strong>politeístas</strong>, es decir, creían en muchísimos dioses, muchos con cabeza de animal y cuerpo de humano (como Anubis, el dios chacal de los muertos; o Ra, el dios del Sol).
          </p>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Su gobierno era una <strong>Teocracia</strong>: "Teo" significa Dios y "cracia" gobierno. El Faraón no era solo un rey, ¡era considerado un Dios viviente en la Tierra!
          </p>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2>4. Pirámides y Momificación ⚰️</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Creían firmemente en la vida después de la muerte, pero pensaban que para vivir en el "más allá", el cuerpo físico no podía pudrirse.
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>La Momificación:</strong> Era un proceso asqueroso pero científico. Extraían el cerebro por la nariz, sacaban los órganos (menos el corazón), secaban el cuerpo con sal (natrón) durante decenas de días, y lo envolvían en vendas de lino.</li>
            <li><strong>Las Pirámides:</strong> Eran tumbas gigantes exclusivas para los faraones. Se construían apilando bloques de piedra que pesaban toneladas, arrastrados por rampas gigantescas usando fuerza humana y trineos mojados con agua para deslizarse en la arena.</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>El Nilo espera tu evaluación</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Prepárate para responder preguntas cerradas y defender tus respuestas por escrito ante el Faraón.
          </p>
          <button onClick={() => router.push(`/subjects/${subjectId}/module/2/quiz`)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>
            🎮 Iniciar Evaluación (Quiz)
          </button>
        </div>
      </main>
    </div>
  );
}
