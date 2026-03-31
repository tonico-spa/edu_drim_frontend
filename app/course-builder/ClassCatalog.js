'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ClassItem from './ClassItem'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import useQuizStore from '../../store/quizStore'
import useCatalogStore from '../../store/catalogStore'
import styles from './ClassCatalog.module.css'

function Folder({ label, color, classes, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  if (classes.length === 0) return null
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
        <ul className={styles.folderList}>
          {classes.map((c) => <ClassItem key={c._id} class_={c} />)}
        </ul>
      )}
    </div>
  )
}

function withMatchPct(class_, tagNames) {
  const classTagNames = new Set((class_.tags || []).map((t) => t.name))
  const matches = tagNames.filter((t) => classTagNames.has(t)).length
  return { ...class_, match_pct: Math.round((matches / tagNames.length) * 100) }
}

export default function ClassCatalog() {
  const [search, setSearch] = useState('')
  const { selectedClasses } = useCourseBuilderStore()
  const { matchedTags, resourceType, reset: resetQuiz } = useQuizStore()
  const { classes: allClasses, loaded, load } = useCatalogStore()
  const router = useRouter()

  function retakeQuiz() {
    resetQuiz()
    router.push('/quiz')
  }

  useEffect(() => { load() }, [])

  const suggested = matchedTags.length
    ? allClasses
        .map((c) => withMatchPct(c, matchedTags))
        .filter((c) => c.match_pct > 0 && (!resourceType || c.resources === resourceType))
    : []

  if (!loaded) return <div className={styles.empty}>Cargando clases…</div>

  const notSelected = (list) => list.filter((c) => !selectedClasses.some((s) => s.id === c._id))
  const suggestedIds = new Set(suggested.map((c) => c._id))

  const availableSuggested = notSelected(suggested)
  const rest = notSelected(allClasses.filter((c) => !suggestedIds.has(c._id)))

  // When searching: flat filtered list across everything
  if (search) {
    const q = search.toLowerCase()
    const flat = notSelected(allClasses).filter((c) => c.title.toLowerCase().includes(q))
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
          {flat.length === 0
            ? <li className={styles.empty}>No se encontraron clases.</li>
            : flat.map((c) => <ClassItem key={c._id} class_={c} />)
          }
        </ul>
        <div className={styles.quizFooter}>
          <button className={styles.quizBtn} onClick={retakeQuiz}>
            Cambiar respuestas del quiz
          </button>
        </div>
      </div>
    )
  }

  // Group rest by main_tag
  const groups = {}
  const groupColors = {}
  for (const c of rest) {
    const key = c.main_tag?.label ?? 'Sin categoría'
    if (!groups[key]) groups[key] = []
    groups[key].push(c)
    if (c.main_tag?.color && !groupColors[key]) groupColors[key] = c.main_tag.color
  }
  const sortedGroups = Object.entries(groups).sort(([a], [b]) => {
    if (a === 'Sin categoría') return 1
    if (b === 'Sin categoría') return -1
    return a.localeCompare(b, 'es')
  })

  const isEmpty = availableSuggested.length === 0 && rest.length === 0

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

      <div className={styles.sections}>
        {isEmpty && (
          <p className={styles.empty}>No hay más clases para agregar.</p>
        )}

        {availableSuggested.length > 0 && (
          <Folder label="Sugeridas para ti" classes={availableSuggested} defaultOpen={true} />
        )}

        {availableSuggested.length > 0 && sortedGroups.length > 0 && (
          <div className={styles.separator} />
        )}

        {sortedGroups.map(([label, classes]) => (
          <Folder key={label} label={label} color={groupColors[label]} classes={classes} defaultOpen={false} />
        ))}
      </div>

      <div className={styles.quizFooter}>
        <button className={styles.quizBtn} onClick={retakeQuiz}>
          Cambiar respuestas del quiz
        </button>
      </div>
    </div>
  )
}
