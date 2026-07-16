'use client';
import { useRouter, useParams } from 'next/navigation';

export default function Module3Page() {
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
        <h2 style={{ color: 'var(--accent-primary)' }}>Misión 3</h2>
      </header>

      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          La Impresionante Civilización Inca 🏔️
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          El imperio más grande de América del Sur, forjado en las alturas de los Andes.
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. Tiempo y Ubicación Geográfica 🗺️</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            A diferencia de los egipcios, el Imperio Inca es mucho más reciente. Su etapa de mayor esplendor ocurrió entre los años <strong>1438 y 1533 d.C.</strong>, justo antes de la llegada de los conquistadores españoles.
          </p>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Se ubicaron en la <strong>Cordillera de los Andes</strong> (América del Sur). En su máxima expansión, el imperio (llamado <em>Tahuantinsuyo</em>, que significa "las cuatro regiones") abarcaba territorios de lo que hoy son seis países: <strong>Perú, Bolivia, Ecuador, sur de Colombia, norte y centro de Chile, y el noroeste de Argentina</strong>. Su capital era la sagrada ciudad de <strong>Cuzco</strong> (en Perú), que ellos consideraban el "ombligo del mundo".
          </p>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2>2. Comienzos de la Civilización 🌅</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Como toda gran civilización, sus inicios están mezclados con el mito. La leyenda cuenta que el dios Sol (Inti) envió a sus hijos, <strong>Manco Cápac y Mama Ocllo</strong>, para fundar la civilización. Ellos salieron de las aguas del Lago Titicaca con una vara de oro, y donde la vara se hundiera sin esfuerzo en la tierra, allí fundarían su capital (Cuzco).
          </p>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Históricamente, los incas comenzaron como una pequeña tribu en el valle de Cuzco. Con el tiempo, mediante alianzas militares y conquistas, lograron unificar a cientos de pueblos diferentes bajo un solo emperador: el <strong>Inca</strong>, quien era considerado el hijo directo del dios Sol.
          </p>
        </section>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>El Emperador te espera</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Demuestra que conoces los secretos de los Andes para desbloquear el Examen Final.
          </p>
          <button onClick={() => router.push(`/subjects/${subjectId}/module/3/quiz`)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>
            🎮 Iniciar Evaluación (Quiz)
          </button>
        </div>
      </main>
    </div>
  );
}
