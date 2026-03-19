'use client'
import { useRouter } from 'next/navigation'
import styles from './CTAButton.module.css'

export default function CTAButton() {
  const router = useRouter()
  return (
    <button className={styles.btn} onClick={() => router.push('/quiz')}>
      Comienza ahora
    </button>
  )
}
