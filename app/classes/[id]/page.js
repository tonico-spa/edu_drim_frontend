'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import useCourseBuilderStore from '../../../store/courseBuilderStore'
import { getClass } from '../../../lib/api'
import styles from './class-detail.module.css'

const RESOURCE_LABELS = {
  sin_tecnologia:      'Sin tecnología',
  computador:          'Computador',
  computador_internet: 'Computador + internet',
}

const LEVEL_LABELS = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
}

export default function ClassDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { selectedClasses, addClass, removeClass } = useCourseBuilderStore()
  const [class_, setClass] = useState(null)
  const [loading, setLoading] = useState(true)

  const isAdded = selectedClasses.some((c) => c.id === id)

  useEffect(() => {
    getClass(id).then((data) => {
      setClass(data)
      setLoading(false)
    })
  }, [id])

  function toggle() {
    if (isAdded) {
      removeClass(id)
    } else {
      addClass({ id: class_._id, title: class_.title })
    }
  }

  if (loading) return <div className={styles.loading}>Cargando clase…</div>
  if (!class_) return <div className={styles.loading}>Clase no encontrada.</div>

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => router.back()}>← Volver</button>

      <div className={styles.header}>
        <div className={styles.badges}>
          {class_.resources && (
            <span className={styles.resource}>{RESOURCE_LABELS[class_.resources] ?? class_.resources}</span>
          )}
          {class_.level && (
            <span className={styles.level}>{LEVEL_LABELS[class_.level] ?? class_.level}</span>
          )}
          {class_.duration_minutes && (
            <span className={styles.duration}>{class_.duration_minutes} min</span>
          )}
        </div>

        <h1 className={styles.title}>{class_.title}</h1>

        {class_.description && (
          <p className={styles.description}>{class_.description}</p>
        )}

        <div className={styles.tags}>
          {(class_.tags || []).map((t) => (
            <span key={t.name} className={styles.tag}>{t.label}</span>
          ))}
        </div>
      </div>

      {class_.materials?.length > 0 && (
        <div className={styles.materials}>
          <h2 className={styles.materialsTitle}>Contenido de la clase</h2>
          <div className={styles.prose}>
            <PortableText value={class_.materials} />
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <button className={`${styles.addBtn} ${isAdded ? styles.added : ''}`} onClick={toggle}>
          {isAdded ? '✓ Agregada al curso' : '+ Agregar al curso'}
        </button>
      </div>
    </div>
  )
}
