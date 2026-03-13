import styles from './QuizProgress.module.css'

export default function QuizProgress({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.label}>{current} / {total}</span>
    </div>
  )
}
