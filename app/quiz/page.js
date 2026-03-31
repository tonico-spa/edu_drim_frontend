'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useQuizStore from '../../store/quizStore'
import QuizProgress from './QuizProgress'
import QuizQuestion from './QuizQuestion'
import QuizSummary from './QuizSummary'
import styles from './quiz.module.css'
import { getQuizQuestions } from '../../lib/api'

export default function QuizPage() {
  const router = useRouter()
  const { questions, currentIndex, answers, phase, setQuestions, setCurrentIndex, setPhase } = useQuizStore()

  useEffect(() => {
    getQuizQuestions().then((qs) => {
      setQuestions(qs)
      setCurrentIndex(0)
      setPhase('quiz')
    })
  }, [])

  const isLast = currentIndex === questions.length - 1

  function handleAnswer(optionId) {
    useQuizStore.getState().answerQuestion(optionId)
    if (isLast) setPhase('summary')
  }

  async function handleSubmit() {
    const { submitQuiz } = await import('../../lib/api')
    const result = await submitQuiz(answers)
    useQuizStore.getState().setMatchedTags(result.tags)
    useQuizStore.getState().setResourceType(result.resource)
    router.push('/results')
  }

  if (!questions.length) return <div className={styles.loading}>Loading quiz…</div>

  return (
    <div className={styles.container}>
      {phase === 'quiz' && (
        <>
          <QuizProgress current={currentIndex + 1} total={questions.length} />
          <QuizQuestion
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            selectedOption={answers[questions[currentIndex]?.id]}
          />
        </>
      )}
      {phase === 'summary' && (
        <QuizSummary questions={questions} answers={answers} onSubmit={handleSubmit} onBack={() => { setCurrentIndex(0); setPhase('quiz') }} />
      )}
    </div>
  )
}
