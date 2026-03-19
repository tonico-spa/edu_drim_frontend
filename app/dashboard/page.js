'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getTeacherCourses } from '../../lib/api'
import styles from './dashboard.module.css'

function getTeacherName() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token')
      return null
    }
    return payload.name || null
  } catch {
    return null
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [teacherName, setTeacherName] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    setTeacherName(getTeacherName())
    getTeacherCourses()
      .then(setCourses)
      .finally(() => setLoading(false))
  }, [router])

  if (loading) return <div className={styles.loading}>Cargando…</div>

  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>¡Hola, {teacherName}!</h1>
          <p className={styles.heroSub}>Aquí puedes revisar tus cursos guardados o crear uno nuevo respondiendo el quiz.</p>
        </div>
        <Link href="/quiz" className={styles.quizBtn}>
          Hacer el quiz ✦
        </Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Mis cursos</h2>
          <Link href="/results" className={styles.newBtn}>+ Explorar clases</Link>
        </div>

        {courses.length === 0 ? (
          <div className={styles.empty}>
            <p>Todavía no tienes cursos guardados.</p>
            <p className={styles.emptySub}>Responde el quiz para recibir sugerencias personalizadas.</p>
          </div>
        ) : (
          <ul className={styles.list}>
            {courses.map((course) => (
              <li
                key={course.id}
                className={styles.card}
                onClick={() => router.push(`/my-courses/${course.id}`)}
              >
                <h3 className={styles.courseName}>{course.title}</h3>
                {course.description && (
                  <p className={styles.courseDesc}>{course.description}</p>
                )}
                <span className={styles.classCount}>
                  {course.classes?.length ?? 0} clase{course.classes?.length !== 1 ? 's' : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  )
}
