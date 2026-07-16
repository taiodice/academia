'use client';
import { useRouter, useParams } from 'next/navigation';

export default function Module1Page() {
  const params = useParams();
  
  if (params.subjectId === 'historia') {
    return <Historia />;
  }

  // Fallback a Biología (el anterior page.tsx renombrado lo importaremos luego)
  // Pero para evitar errores de compilación, lo exportaré directamente aquí.
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
        <h2 style={{ color: 'var(--accent-primary)' }}>Misión 1</h2>
      </header>

      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          El Poblamiento Americano 🌎
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          ¿Cómo llegaron los primeros humanos a América? ¡Conoce las rutas más épicas de la prehistoria!
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. Introducción 🧐</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Durante miles de años, el continente americano estuvo completamente vacío de humanos. Los primeros seres humanos (Homo sapiens) surgieron en África, y desde allí caminaron conquistando Europa y Asia. Pero, ¿cómo cruzaron el océano para llegar a América antes de que existieran los barcos modernos? A lo largo de la historia, los científicos han propuesto <strong>diferentes teorías</strong>.
          </p>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. Las Grandes Teorías 🗺️</h2>
          
          <h3 style={{ color: 'var(--accent-primary)', marginTop: '1.5rem' }}>A) Teoría Asiática (El Puente de Hielo) 🧊</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Propuesta por <strong>Alex Hrdlicka</strong>, es la teoría más aceptada hoy en día.
            Hace unos 15.000 años, durante la Era de Hielo (Glaciación), el nivel del mar bajó muchísimo. Esto dejó al descubierto un "puente de tierra y hielo" llamado <strong>Estrecho de Bering</strong>, que conectaba Asia (Siberia) con América del Norte (Alaska). Los cazadores nómadas cruzaron caminando persiguiendo mamuts sin darse cuenta de que estaban entrando a un nuevo continente.
          </p>

          <h3 style={{ color: '#f59e0b', marginTop: '1.5rem' }}>B) Teoría Oceánica (Los Navegantes del Pacífico) 🛶</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Propuesta por <strong>Paul Rivet</strong>. Él decía que además de cruzar por Bering, otros grupos humanos llegaron cruzando el mismísimo Océano Pacífico.
            Eran excelentes navegantes de la <strong>Polinesia y Melanesia</strong> (islas de Oceanía) que viajaron en pequeñas balsas dejándose llevar por las corrientes marinas transpacíficas hasta desembarcar en las costas de América del Sur.
          </p>

          <h3 style={{ color: '#10b981', marginTop: '1.5rem' }}>C) Teoría Australiana (La Ruta por el Frío) 🐧</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            El científico <strong>Méndez Correa</strong> observó parecidos físicos entre los indígenas de la Patagonia y los aborígenes australianos. 
            Su teoría propone que grupos de Australia viajaron en balsa hacia la Antártida (que en esa época tenía un clima un poco más soportable, llamado "óptimo climático"), caminaron por las costas heladas y finalmente cruzaron hacia el sur de Argentina y Chile (Tierra del Fuego).
          </p>

          <h3 style={{ color: '#ef4444', marginTop: '1.5rem' }}>D) Teoría Americana (Origen Autóctono) ❌</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Propuesta por el argentino <strong>Florentino Ameghino</strong>. Él aseguraba que el ser humano no llegó de ningún lado, sino que "nació" en América, específicamente en la Pampa Argentina, y de ahí pobló el resto del mundo.
            <em>Ojo:</em> Esta teoría fue <strong>totalmente descartada</strong> por la ciencia moderna porque los huesos que encontró no eran tan antiguos como él creía (¡algunos eran de animales prehistóricos, no de humanos!).
          </p>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2>3. Estudiando el Mapa 🧭</h2>
          <div style={{ margin: '2rem 0', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            <img src="/images/maps/poblamiento.png" alt="Mapa de Poblamiento Americano" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Para entender estas rutas, es vital visualizar un mapa mundial o planisferio:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Ruta Norte:</strong> Desde la punta derecha (noreste) de Asia cruzando un estrecho hasta la punta izquierda (noroeste) de América del Norte (Alaska).</li>
            <li><strong>Ruta Central (Oceánica):</strong> Cruzando por el medio de todo el gigantesco Océano Pacífico, saltando de isla en isla hasta América del Sur.</li>
            <li><strong>Ruta Sur (Australiana):</strong> Desde Australia, bajando a la Antártida por abajo del mundo, y subiendo a la punta sur de América del Sur (Tierra del Fuego).</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>¿Listo para demostrar tus conocimientos?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Supera el desafío para desbloquear el viaje a Egipto. ¡Atención: habrá preguntas escritas donde tendrás que argumentar tu respuesta!
          </p>
          <button onClick={() => router.push(`/subjects/${subjectId}/module/1/quiz`)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>
            🎮 Iniciar Evaluación (Quiz)
          </button>
        </div>
      </main>
    </div>
  );
}
