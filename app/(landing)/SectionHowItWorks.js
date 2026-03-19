import styles from './SectionHowItWorks.module.css'

const steps = [
  {
    number: '01',
    title: 'Responde el quiz',
    desc: 'Responde las preguntas para conocerte mejor y que podamos sugerirte clases personalizadas para tu contexto, nivel de conocimiento y recursos disponibles.',
    color: '#D73186',
  },
  {
    number: '02',
    title: 'Recibe recomendaciones',
    desc: 'Revisa y agrega las clases que te proponemos, tendrás la planificación, paso a paso de las actividades seleccionadas para ti y la evaluación.',
    color: '#2180CE',
  },
  {
    number: '03',
    title: 'Arma tu curso',
    desc: 'Implementa junto a tu curso y aprendan juntos algo nuevo en STEM. Todas nuestras clases están alineadas al currículum Mineduc.',
    color: '#D6D625',
  },
]

export default function SectionHowItWorks() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>¿Cómo lo haces?</h2>
      <div className={styles.steps}>
        {steps.map((step) => (
          <div key={step.number} className={styles.step} style={{ background: `${step.color}` }}>
            <span className={styles.number} >{step.number}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
