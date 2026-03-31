import { create } from 'zustand'
import { fetchAllClasses, fetchAllCourses } from '../lib/sanity'
import { getAllowedClassIds } from '../lib/api'

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
    const classes = allowedIds
      ? allClasses.filter((c) => allowedIds.includes(c._id))
      : allClasses

    set({ classes, courses, loaded: true })
  },

  reset: () => set({ classes: [], courses: [], loaded: false }),
}))

export default useCatalogStore
