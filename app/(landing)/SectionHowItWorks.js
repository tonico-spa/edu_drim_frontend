import styles from './SectionHowItWorks.module.css'

const steps = [
  { number: '01', title: 'Take the quiz', desc: 'Answer a few questions about your teaching goals and student needs.' },
  { number: '02', title: 'Get suggestions', desc: 'We match your answers to courses that fit — with a match score.' },
  { number: '03', title: 'Build your course', desc: 'Pick individual classes, reorder them, and save your custom course.' },
]

export default function SectionHowItWorks() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>How it works</h2>
      <div className={styles.steps}>
        {steps.map((s) => (
          <div key={s.number} className={styles.step}>
            <span className={styles.number}>{s.number}</span>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
