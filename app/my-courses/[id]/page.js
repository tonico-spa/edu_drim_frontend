'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getTeacherCourse } from '../../../lib/api'
import styles from './course-detail.module.css'

const RESOURCE_LABELS = {
  sin_tecnologia:      'Sin tecnología',
  computador:          'Computador',
  computador_internet: 'Computador + internet',
}

export default function CourseDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    getTeacherCourse(id)
      .then(setCourse)
      .catch(() => setError('No se pudo cargar el curso.'))
      .finally(() => setLoading(false))
  }, [id, router])

  if (loading) return <div className={styles.loading}>Cargando curso…</div>
  if (error)   return <div className={styles.error}>{error}</div>
  if (!course) return null

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => router.push('/my-courses')}>
        ← Mis cursos
      </button>

      <div className={styles.header}>
        <h1 className={styles.title}>{course.title}</h1>
        {course.description && (
          <p className={styles.description}>{course.description}</p>
        )}
        <div className={styles.meta}>
          <span className={styles.count}>{course.classes?.length ?? 0} clases</span>
        </div>
      </div>

      {course.classes?.length > 0 ? (
        <ol className={styles.list}>
          {course.classes.map((cls, i) => (
            <li
              key={cls._id ?? i}
              className={styles.card}
              onClick={() => router.push(`/classes/${cls._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.cardNum}>{i + 1}</div>
              <div className={styles.cardBody}>
                <h2 className={styles.classTitle}>{cls.title}</h2>
                {cls.description && (
                  <p className={styles.classDesc}>{cls.description}</p>
                )}
                <div className={styles.badges}>
                  {cls.duration_minutes && (
                    <span className={styles.badgeMeta}>{cls.duration_minutes} min</span>
                  )}
                  {cls.resources && (
                    <span className={styles.badgeResource}>
                      {RESOURCE_LABELS[cls.resources] ?? cls.resources}
                    </span>
                  )}
                  {cls.tags?.map((t) => (
                    <span key={t.name} className={styles.badgeTag}>{t.label}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className={styles.empty}>Este curso no tiene clases.</div>
      )}
    </div>
  )
}
