'use client'
import { useState } from 'react'
import ClassCatalog from './ClassCatalog'
import CourseCanvas from './CourseCanvas'
import SaveCourseModal from './SaveCourseModal'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import styles from './course-builder.module.css'

export default function CourseBuilderPage() {
  const [showModal, setShowModal] = useState(false)
  const { selectedClasses } = useCourseBuilderStore()

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <ClassCatalog />
      </aside>
      <main className={styles.canvas}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tu curso</h1>
          <button
            className={styles.saveBtn}
            onClick={() => setShowModal(true)}
            disabled={selectedClasses.length === 0}
          >
            Guardar Curso
          </button>
        </div>
        <CourseCanvas />
      </main>
      {showModal && <SaveCourseModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
