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
          Γ¼à Volver al Laboratorio
        </button>
        <h2 style={{ color: 'var(--accent-primary)' }}>Misi├│n 1</h2>
      </header>

      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          Caracter├¡sticas de los seres vivos ≡ƒæ╜
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Todo lo que est├í vivo en el planeta cumple reglas estrictas. ┬íCon├│celas!
        </p>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>1. ┬┐De qu├⌐ est├ín formados? ≡ƒº▒</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Todo ser vivo est├í formado por c├⌐lulas. Existen de dos tipos seg├║n su cantidad y complejidad:
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Unicelulares:</strong> Organismos formados por <em>una sola c├⌐lula</em>. Son microsc├│picos (como las bacterias).</li>
            <li><strong>Pluricelulares:</strong> Organismos formados por <em>muchas c├⌐lulas</em> que trabajan en equipo (como t├║, tu perro o un manzano).</li>
            <li style={{ marginTop: '1rem' }}><strong>C├⌐lulas Procariotas:</strong> C├⌐lulas simples que NO tienen un n├║cleo definido. El ADN est├í suelto (Bacterias).</li>
            <li><strong>C├⌐lulas Eucariotas:</strong> C├⌐lulas complejas que S├ì tienen un n├║cleo verdadero que protege su ADN (Animales, plantas, hongos).</li>
          </ul>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>2. El Ciclo de Vida ≡ƒöä</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Nadie es eterno. Para ser considerado un ser vivo, debes atravesar un ciclo inevitable:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>≡ƒæ╢ Nacer</span>
            <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>≡ƒôê Crecer</span>
            <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>≡ƒº¼ Reproducirse</span>
            <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>≡ƒÆÇ Morir</span>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2>3. Las Funciones Vitales ΓÜí</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            Adem├ís del ciclo de vida, todos los seres vivos realizan estas tres funciones clave:
          </p>

          <h3 style={{ color: 'var(--accent-primary)', marginTop: '1.5rem' }}>A) Nutrici├│n ≡ƒìö</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Aut├│trofa:</strong> Fabrican su propio alimento. Las plantas hacen esto mediante la fotos├¡ntesis (auto = por s├¡ mismo).</li>
            <li><strong>Heter├│trofa:</strong> Necesitan comer a otros seres vivos para obtener energ├¡a. (hetero = otro). Animales, humanos y hongos.</li>
          </ul>

          <h3 style={{ color: '#f59e0b', marginTop: '1.5rem' }}>B) Relaci├│n ≡ƒæÇ</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            Es la capacidad de <strong>captar est├¡mulos</strong> del medio ambiente (luz, calor, peligro) y generar una respuesta. Por ejemplo: si tocas algo muy caliente, tu cuerpo capta el est├¡mulo de dolor y la respuesta es quitar la mano r├ípido.
          </p>

          <h3 style={{ color: '#10b981', marginTop: '1.5rem' }}>C) Reproducci├│n ≡ƒæ╢</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Asexuada (Asexual):</strong> Participa <em>un solo individuo</em>. La cr├¡a es un clon id├⌐ntico al padre (Ej: bacterias dividi├⌐ndose en dos).</li>
            <li><strong>Sexuada (Sexual):</strong> Participan <em>dos individuos</em> de diferente sexo. La cr├¡a hereda caracter├¡sticas de ambos, lo que genera diversidad (Ej: humanos, leones).</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>┬┐Te sientes preparado?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            El jefe final de este m├│dulo te est├í esperando. Tienes que sacar al menos un 80% para desbloquear la Misi├│n 2.
          </p>
          <button onClick={() => router.push(`/subjects/${subjectId}/module/1/quiz`)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>
            ≡ƒÄ« Iniciar Evaluaci├│n (Quiz)
          </button>
        </div>
      </main>
    </div>
  );
}
