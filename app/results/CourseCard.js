import { useRouter } from 'next/navigation'
import styles from './CourseCard.module.css'

export default function CourseCard({ course, suggested }) {
  const router = useRouter()
  return (
    <div className={styles.card}>
      {suggested && course.match_pct !== undefined && (
        <span className={styles.match}>{course.match_pct}% match</span>
      )}
      <h3 className={styles.title}>{course.title}</h3>
      <p className={styles.desc}>{course.description}</p>
      <div className={styles.tags}>
        {(course.tags || []).map((t) => (
          <span key={t.name} className={styles.tag}>{t.label}</span>
        ))}
      </div>
      <button className={styles.btn} onClick={() => router.push('/course-builder')}>
        Open in builder
      </button>
    </div>
  )
}
