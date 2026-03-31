import { create } from 'zustand'
import { fetchAllClasses, fetchAllCourses } from '../lib/sanity'
import { getAllowedClassIds } from '../lib/api'

function toPlainText(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return ''
  return value.map((b) => b.children?.map((c) => c.text).join('') ?? '').join(' ')
}

const useCatalogStore = create((set, get) => ({
  classes: [],
  courses: [],
  loaded: false,

  load: async () => {
    if (get().loaded) return

    const [allClasses, courses, allowedResult] = await Promise.all([
      fetchAllClasses(),
      fetchAllCourses(),
      getAllowedClassIds().catch(() => ({ ids: null })),
    ])

    const allowedIds = allowedResult?.ids
    const filtered = allowedIds
      ? allClasses.filter((c) => allowedIds.includes(c._id))
      : allClasses

    // Convert Portable Text fields to plain strings for list/card views
    const classes = filtered.map((c) => ({
      ...c,
      description: toPlainText(c.description),
      closing: toPlainText(c.closing),
    }))

    set({ classes, courses, loaded: true })
  },

  reset: () => set({ classes: [], courses: [], loaded: false }),
}))

export default useCatalogStore
