import { create } from 'zustand'

const useQuizStore = create((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: {},        // { [questionId]: optionId }
  matchedTags: [],
  resourceType: null, // 'sin_tecnologia' | 'computador' | 'computador_internet' | null
  phase: 'quiz',      // 'quiz' | 'summary'

  setQuestions: (questions) => set({ questions }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setPhase: (phase) => set({ phase }),
  setMatchedTags: (tags) => set({ matchedTags: tags }),
  setResourceType: (resource) => set({ resourceType: resource }),

  answerQuestion: (optionId) => {
    const { questions, currentIndex, answers } = get()
    const question = questions[currentIndex]
    const newAnswers = { ...answers, [question.id]: optionId }
    const isLast = currentIndex === questions.length - 1
    set({
      answers: newAnswers,
      currentIndex: isLast ? currentIndex : currentIndex + 1,
    })
  },

  reset: () => set({ questions: [], currentIndex: 0, answers: {}, matchedTags: [], resourceType: null, phase: 'quiz' }),
}))

export default useQuizStore
