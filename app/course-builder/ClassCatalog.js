'use client'
import { useEffect, useState } from 'react'
import ClassItem from './ClassItem'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import styles from './ClassCatalog.module.css'
import { getClasses } from '../../lib/api'

export default function ClassCatalog() {
  const [classes, setClasses] = useState([])
  const [search, setSearch] = useState('')
  const { selectedClasses } = useCourseBuilderStore()

  useEffect(() => {
    getClasses().then(setClasses)
  }, [])

  const filtered = classes
    .filter((c) => !selectedClasses.some((s) => s.id === c._id))
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={styles.catalog}>
      <div className={styles.searchWrapper}>
        <input
          className={styles.search}
          placeholder="Buscar clases…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul className={styles.list}>
        {filtered.length === 0 && (
          <li className={styles.empty}>
            {selectedClasses.length > 0 && classes.length === selectedClasses.length
              ? 'Agregaste todas las clases.'
              : 'No se encontraron clases.'}
          </li>
        )}
        {filtered.map((c) => <ClassItem key={c._id} class_={c} />)}
      </ul>
    </div>
  )
}
