'use client'
import { useState } from 'react'
import ClassCard from './ClassCard'
import styles from './AllCourses.module.css'

function Folder({ label, color, classes }) {
  const [open, setOpen] = useState(true)
  const headerStyle = color ? { background: color } : {}
  const labelStyle = color ? { color: '#fff' } : {}
  const accentStyle = color ? { background: 'rgba(0,0,0,0.2)', color: '#fff' } : {}
  const iconStyle = color ? { color: '#fff' } : {}

  return (
    <div className={styles.folder}>
      <button className={styles.folderHeader} style={headerStyle} onClick={() => setOpen((o) => !o)}>
        <span className={styles.folderIcon} style={iconStyle}>{open ? '▾' : '▸'}</span>
        <span className={styles.folderLabel} style={labelStyle}>{label}</span>
        <span className={styles.folderCount} style={accentStyle}>{classes.length}</span>
      </button>
      {open && (
        <div className={styles.folderGrid}>
          {classes.map((c) => (
            <ClassCard key={c._id} class_={c} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function AllCourses({ courses }) {
  if (!courses.length) return <p>No hay clases disponibles aún.</p>

  // Group by main_tag label; classes with no main_tag go to "Sin categoría"
  const groups = {}
  const groupColors = {}
  for (const c of courses) {
    const key = c.main_tag?.label ?? 'Sin categoría'
    if (!groups[key]) groups[key] = []
    groups[key].push(c)
    if (c.main_tag?.color && !groupColors[key]) groupColors[key] = c.main_tag.color
  }

  // Sort folders: named categories alphabetically, "Sin categoría" last
  const sorted = Object.entries(groups).sort(([a], [b]) => {
    if (a === 'Sin categoría') return 1
    if (b === 'Sin categoría') return -1
    return a.localeCompare(b, 'es')
  })

  return (
    <div className={styles.folders}>
      {sorted.map(([label, classes]) => (
        <Folder key={label} label={label} color={groupColors[label]} classes={classes} />
      ))}
    </div>
  )
}
