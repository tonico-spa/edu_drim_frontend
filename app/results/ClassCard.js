'use client'
import { useRouter } from 'next/navigation'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import styles from './ClassCard.module.css'

function toPlainText(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value.map((b) => b.children?.map((c) => c.text).join('') ?? '').join(' ')
}

const RESOURCE_LABELS = {
  sin_tecnologia:      'Sin tecnología',
  computador:          'Computador',
  computador_internet: 'Computador + internet',
}

export default function ClassCard({ class_, suggested }) {
  const router = useRouter()
  const { selectedClasses, addClass, removeClass } = useCourseBuilderStore()
  const isAdded = selectedClasses.some((c) => c.id === class_._id)

  function toggle(e) {
    e.stopPropagation()
    if (isAdded) {
      removeClass(class_._id)
    } else {
      addClass({ id: class_._id, title: class_.title })
    }
  }

  return (
    <div className={styles.card} onClick={() => router.push(`/classes/${class_._id}`)} role="button" tabIndex={0}>
      <div className={styles.top}>
        {suggested && class_.match_pct !== undefined && (
          <span className={styles.match}>{class_.match_pct}% match</span>
        )}
        {class_.resources && (
          <span className={styles.resource}>{RESOURCE_LABELS[class_.resources] ?? class_.resources}</span>
        )}
      </div>

      <h3 className={styles.title}>{class_.title}</h3>
      <p className={styles.desc}>{toPlainText(class_.description)}</p>

      <div className={styles.meta}>
        {class_.duration_minutes && <span>{class_.duration_minutes} min</span>}
        {class_.level && <span>{class_.level}</span>}
      </div>

      <div className={styles.tags}>
        {(class_.tags || []).map((t) => (
          <span key={t.name} className={styles.tag}>{t.label}</span>
        ))}
      </div>

      <button className={`${styles.btn} ${isAdded ? styles.added : ''}`} onClick={toggle} tabIndex={0}>
        {isAdded ? 'Quitar del curso' : 'Agregar al curso'}
      </button>
    </div>
  )
}
