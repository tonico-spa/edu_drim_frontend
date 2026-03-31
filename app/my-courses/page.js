'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getTeacherCourses, deleteCourse } from '../../lib/api'
import useCatalogStore from '../../store/catalogStore'
import styles from './my-courses.module.css'

const RESOURCE_LABELS = {
  sin_tecnologia:      'Sin tecnología',
  computador:          'Computador',
  computador_internet: 'Computador + internet',
}

export default function MyCoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const { classes: allClasses, load } = useCatalogStore()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    Promise.all([getTeacherCourses(), load()])
      .then(([data]) => setCourses(data))
      .finally(() => setLoading(false))
  }, [router])

  function enrichCourse(course) {
    const classMap = Object.fromEntries(allClasses.map((c) => [c._id, c]))
    return { ...course, classes: (course.class_ids || []).map((id) => classMap[id]).filter(Boolean) }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este curso?')) return
    setDeletingId(id)
    try {
      await deleteCourse(id)
      setCourses((prev) => prev.filter((c) => c.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <div className={styles.loading}>Cargando tus cursos…</div>

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis cursos</h1>
        <button className={styles.newBtn} onClick={() => router.push('/results')}>
          + Crear nuevo curso
        </button>
      </div>

      {courses.length === 0 ? (
        <div className={styles.empty}>
          <p>Todavía no tienes cursos guardados.</p>
          <button className={styles.newBtn} onClick={() => router.push('/quiz')}>
            Hacer el quiz para empezar
          </button>
        </div>
      ) : (
        <ul className={styles.list}>
          {courses.map((raw) => {
            const course = enrichCourse(raw)
            return (
              <li key={course.id} className={styles.card} onClick={() => router.push(`/my-courses/${course.id}`)} style={{ cursor: 'pointer' }}>
                <div className={styles.cardTop}>
                  <div>
                    <h2 className={styles.courseName}>{course.title}</h2>
                    {course.description && (
                      <p className={styles.courseDesc}>{course.description}</p>
                    )}
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => { e.stopPropagation(); handleDelete(course.id) }}
                      disabled={deletingId === course.id}
                    >
                      {deletingId === course.id ? '…' : 'Eliminar'}
                    </button>
                  </div>
                </div>

                {course.classes?.length > 0 && (
                  <ul className={styles.classes}>
                    {course.classes.map((cls, i) => (
                      <li key={cls._id ?? i} className={styles.classRow}>
                        <span className={styles.classOrder}>{i + 1}</span>
                        <span className={styles.classTitle}>{cls.title}</span>
                        {cls.duration_minutes && (
                          <span className={styles.classMeta}>{cls.duration_minutes} min</span>
                        )}
                        {cls.resources && (
                          <span className={styles.classResource}>{RESOURCE_LABELS[cls.resources] ?? cls.resources}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
