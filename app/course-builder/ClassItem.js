'use client'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import styles from './ClassItem.module.css'

export default function ClassItem({ class_ }) {
  const { addClass } = useCourseBuilderStore()

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <span className={styles.title}>{class_.title}</span>
        {class_.duration_minutes && (
          <span className={styles.meta}>{class_.duration_minutes} min · {class_.level}</span>
        )}
      </div>
      <button
        className={styles.btn}
        onClick={() => addClass({ id: class_._id, title: class_.title })}
      >
        Agregar
      </button>
    </li>
  )
}
