'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useQuizStore from '../../store/quizStore'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import useCatalogStore from '../../store/catalogStore'
import SuggestedCourses from './SuggestedCourses'
import AllCourses from './AllCourses'
import styles from './results.module.css'

function withMatchPct(class_, tagNames) {
  const classTagNames = new Set((class_.tags || []).map((t) => t.name))
  const matches = tagNames.filter((t) => classTagNames.has(t)).length
  return { ...class_, match_pct: Math.round((matches / tagNames.length) * 100) }
}

export default function ResultsPage() {
  const router = useRouter()
  const { matchedTags, resourceType } = useQuizStore()
  const { selectedClasses } = useCourseBuilderStore()
  const { classes, loaded, load } = useCatalogStore()

  useEffect(() => { load() }, [])

  if (!loaded) return <div className={styles.loading}>Cargando clases…</div>

  const filtered = resourceType
    ? classes.filter((c) => c.resources === resourceType)
    : classes

  const suggested = matchedTags.length
    ? filtered
        .map((c) => withMatchPct(c, matchedTags))
        .filter((c) => c.match_pct > 0)
        .sort((a, b) => b.match_pct - a.match_pct)
    : []

  return (
    <>
      <div className={styles.page}>
        {suggested.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.heading}>Sugeridas para ti</h2>
            <SuggestedCourses courses={suggested} />
          </section>
        )}
        <section className={styles.section}>
          <h2 className={styles.heading}>Todas las clases</h2>
          <AllCourses courses={classes} />
        </section>
      </div>

      {selectedClasses.length > 0 && (
        <div className={styles.coursebar}>
          <span className={styles.coursebarCount}>
            {selectedClasses.length} {selectedClasses.length === 1 ? 'clase agregada' : 'clases agregadas'}
          </span>
          <button className={styles.coursebarBtn} onClick={() => router.push('/course-builder')}>
            Ver mi curso →
          </button>
        </div>
      )}
    </>
  )
}
