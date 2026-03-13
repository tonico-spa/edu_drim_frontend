'use client'
import { useState } from 'react'
import useCourseBuilderStore from '../../store/courseBuilderStore'
import styles from './SaveCourseModal.module.css'
import { saveCourse } from '../../lib/api'

export default function SaveCourseModal({ onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const { selectedClasses, clearCourse } = useCourseBuilderStore()

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)
    setError(null)
    try {
      await saveCourse({ title, description, class_ids: selectedClasses.map((c) => c.id) })
      clearCourse()
      onClose()
    } catch (e) {
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Save your course</h2>
        <label className={styles.label}>Course name *</label>
        <input
          className={styles.input}
          placeholder="e.g. Week 3 Math Bundle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={styles.label}>Description (optional)</label>
        <textarea
          className={styles.textarea}
          placeholder="What is this course for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={handleSave} disabled={!title.trim() || saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
