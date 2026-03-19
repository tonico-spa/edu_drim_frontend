import Image from 'next/image'
import styles from './SectionHero.module.css'
import CTAButton from './CTAButton'

export default function SectionHero() {
  return (
    <section className={styles.hero}>
      <Image src="/logo-02.png" alt="EDU_DRIM" width={480} height={100} className={styles.heroLogo} />
      <p className={styles.title}>Clases personalizadas para el aula STEM!</p>
      <p className={styles.sub}>Programación, Robótica, Ciudadanía digital, Pensamiento Computacional y mucho más!</p>
      <CTAButton />
    </section>
  )
}
