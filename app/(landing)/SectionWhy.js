import Image from 'next/image'
import styles from './SectionWhy.module.css'

const testimonials = [
  { quote: 'EDU_DRIM helped me build a math course tailored to my class in under 10 minutes.', name: 'María G.', role: 'Primary school teacher' },
  { quote: 'I love being able to mix and match classes. It feels like the platform was made for how I actually teach.', name: 'Carlos T.', role: 'Secondary educator' },
]

export default function SectionWhy() {
  return (
    <section className={styles.section}>
      <div className={styles.columns}>
        <div className={styles.imageCol}>
          <Image src="/profe_stem.jpg" alt="Teacher" fill className={styles.image} />
        </div>
        <div className={styles.textCol}>
          <h2 className={styles.title}>¿Por qué ProfeSTEM?</h2>
          <div className={styles.testimonials}>

            <blockquote className={styles.card}>
              <p >En Chile, la asignatura de Tecnología es obligatoria. Pero en la práctica, muchas veces enseñarla se vuelve cuesta arriba: faltan recursos, faltan ideas aterrizadas y falta tiempo para planificar actividades que sean realmente significativas para las y los estudiantes.
            <br/><br/>
                Por eso creamos Profe STEM: una plataforma de clases personalizadas que te entrega sesiones listas para implementar en 45 minutos, diseñadas por docentes reales con años de experiencia en aula STEM.
                Tú nos dices con qué cuentas (materiales disponibles, nivel de experiencia y el área que quieres fortalecer) y Profe STEM te recomienda las mejores clases para tu contexto, con actividades claras, objetivos y una guía paso a paso.
            <br/><br/>

                Esperamos que este apoyo sea valioso para tu aula y que contribuya al futuro de las niñas y niños de Chile.</p>

            </blockquote>

          </div>
        </div>
      </div>
    </section>
  )
}
