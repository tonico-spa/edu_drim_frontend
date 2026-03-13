'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useQuizStore from '../../store/quizStore'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import SuggestedCourses from './SuggestedCourses'
import AllCourses from './AllCourses'
import styles from './results.module.css'
import { getClasses } from '../../lib/api'

export default function ResultsPage() {
  const router = useRouter()
  const { matchedTags, resourceType } = useQuizStore()
  const { selectedClasses } = useCourseBuilderStore()
  const [suggested, setSuggested] = useState([])
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [suggestedData, allData] = await Promise.all([
        matchedTags.length ? getClasses(matchedTags, resourceType) : Promise.resolve([]),
        getClasses(),
      ])
      setSuggested(suggestedData)
      setAll(allData)
      setLoading(false)
    }
    load()
  }, [matchedTags, resourceType])

  if (loading) return <div className={styles.loading}>Cargando clases…</div>

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
          <AllCourses courses={all} />
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
