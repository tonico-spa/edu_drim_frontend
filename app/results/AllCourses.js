import ClassCard from './ClassCard'
import styles from './results.module.css'

export default function AllCourses({ courses }) {
  if (!courses.length) return <p>No hay clases disponibles aún.</p>
  return (
    <div className={styles.grid}>
      {courses.map((c) => <ClassCard key={c._id} class_={c} />)}
    </div>
  )
}
