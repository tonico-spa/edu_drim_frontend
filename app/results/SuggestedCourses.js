import ClassCard from './ClassCard'
import styles from './results.module.css'

export default function SuggestedCourses({ courses }) {
  return (
    <div className={styles.grid}>
      {courses.map((c) => <ClassCard key={c._id} class_={c} suggested />)}
    </div>
  )
}
