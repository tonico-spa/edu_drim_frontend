import styles from './SectionWhy.module.css'
import CTAButton from './CTAButton'

const testimonials = [
  { quote: 'EDU_DRIM helped me build a math course tailored to my class in under 10 minutes.', name: 'María G.', role: 'Primary school teacher' },
  { quote: 'I love being able to mix and match classes. It feels like the platform was made for how I actually teach.', name: 'Carlos T.', role: 'Secondary educator' },
]

export default function SectionWhy() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Why teachers love it</h2>
      <div className={styles.testimonials}>
        {testimonials.map((t, i) => (
          <blockquote key={i} className={styles.card}>
            <p className={styles.quote}>"{t.quote}"</p>
            <footer className={styles.author}>
              <strong>{t.name}</strong> — {t.role}
            </footer>
          </blockquote>
        ))}
      </div>
      <CTAButton />
    </section>
  )
}
