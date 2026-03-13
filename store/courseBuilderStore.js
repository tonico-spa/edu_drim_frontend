import { create } from 'zustand'

const useCourseBuilderStore = create((set) => ({
  selectedClasses: [],

  addClass: (class_) =>
    set((state) => ({
      selectedClasses: state.selectedClasses.some((c) => c.id === class_.id)
        ? state.selectedClasses
        : [...state.selectedClasses, class_],
    })),

  removeClass: (id) =>
    set((state) => ({
      selectedClasses: state.selectedClasses.filter((c) => c.id !== id),
    })),

  reorderClasses: (classes) => set({ selectedClasses: classes }),

  clearCourse: () => set({ selectedClasses: [] }),
}))

export default useCourseBuilderStore
