'use client'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import styles from './CourseCanvas.module.css'

export default function CourseCanvas() {
  const { selectedClasses, reorderClasses, removeClass } = useCourseBuilderStore()

  if (selectedClasses.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Add classes from the left to get started</p>
      </div>
    )
  }

  function moveUp(index) {
    if (index === 0) return
    const next = [...selectedClasses]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    reorderClasses(next)
  }

  function moveDown(index) {
    if (index === selectedClasses.length - 1) return
    const next = [...selectedClasses]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    reorderClasses(next)
  }

  return (
    <ol className={styles.list}>
      {selectedClasses.map((c, i) => (
        <li key={c.id} className={styles.item}>
          <span className={styles.order}>{i + 1}</span>
          <span className={styles.title}>{c.title}</span>
          <div className={styles.actions}>
            <button className={styles.move} onClick={() => moveUp(i)} disabled={i === 0}>↑</button>
            <button className={styles.move} onClick={() => moveDown(i)} disabled={i === selectedClasses.length - 1}>↓</button>
            <button className={styles.remove} onClick={() => removeClass(c.id)}>✕</button>
          </div>
        </li>
      ))}
    </ol>
  )
}
