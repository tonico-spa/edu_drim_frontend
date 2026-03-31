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

        {class_.description?.length > 0 && (
          <div className={`${styles.description} ${styles.prose}`}>
            <PortableText value={class_.description} />
          </div>
        )}

        <div className={styles.tags}>
          {(class_.tags || []).map((t) => (
            <span key={t.name} className={styles.tag}>{t.label}</span>
          ))}
        </div>
      </div>

      {(class_.class_name || class_.unidad || class_.semestre || class_.duration || class_.type || class_.recursos) && (
        <div className={styles.infoGrid}>
          {class_.class_name && <div className={styles.infoItem}><span className={styles.infoLabel}>Nombre</span><span className={styles.infoValue}>{class_.class_name}</span></div>}
          {class_.unidad && <div className={styles.infoItem}><span className={styles.infoLabel}>Unidad</span><span className={styles.infoValue}>{class_.unidad}</span></div>}
          {class_.semestre && <div className={styles.infoItem}><span className={styles.infoLabel}>Semestre</span><span className={styles.infoValue}>{class_.semestre}</span></div>}
          {class_.duration && <div className={styles.infoItem}><span className={styles.infoLabel}>Duración</span><span className={styles.infoValue}>{class_.duration}</span></div>}
          {class_.type && <div className={styles.infoItem}><span className={styles.infoLabel}>Tipo</span><span className={styles.infoValue}>{class_.type}</span></div>}
          {class_.recursos && <div className={styles.infoItem}><span className={styles.infoLabel}>Recursos</span><span className={styles.infoValue}>{class_.recursos}</span></div>}
        </div>
      )}

      {class_.video_link && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Video</h2>
          <a href={class_.video_link} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>
            {class_.video_link}
          </a>
        </div>
      )}

      {class_.materials?.length > 0 && (
        <div className={styles.materials}>
          <h2 className={styles.materialsTitle}>Contenido de la clase</h2>
          <div className={styles.prose}>
            <PortableText value={class_.materials} />
          </div>
        </div>
      )}

      {class_.images?.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Imágenes</h2>
          <div className={styles.imageGrid}>
            {class_.images.map((img, i) => (
              <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className={styles.imageCard}>
                <img src={img.url} alt={`Imagen ${i + 1}`} className={styles.image} />
                <span className={styles.downloadLabel}>Descargar</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {class_.files?.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Archivos</h2>
          <ul className={styles.fileList}>
            {class_.files.map((f, i) => (
              <li key={i}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className={styles.fileLink} download>
                  ↓ {f.name || `Archivo ${i + 1}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {class_.closing?.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Cierre</h2>
          <div className={`${styles.closing} ${styles.prose}`}>
            <PortableText value={class_.closing} />
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
