import styles from './SectionHero.module.css'
import CTAButton from './CTAButton'

export default function SectionHero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>Build the course your students actually need</h1>
      <p className={styles.sub}>Answer a short quiz and get a personalized course recommendation — or browse the full catalog and build your own.</p>
      <CTAButton />
    </section>
  )
}
