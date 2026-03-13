import styles from './QuizQuestion.module.css'

export default function QuizQuestion({ question, onAnswer, selectedOption }) {
  if (!question) return null
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.text}>{question.text}</h2>
      <ul className={styles.options}>
        {question.options.map((opt) => (
          <li key={opt.id}>
            <button
              className={`${styles.option} ${selectedOption === opt.id ? styles.selected : ''}`}
              onClick={() => onAnswer(opt.id)}
            >
              {opt.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
