import styles from './QuizSummary.module.css'

export default function QuizSummary({ questions, answers, onSubmit, onBack }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Revisa tus respuestas</h2>
      <ul className={styles.list}>
        {questions.map((q) => {
          const selected = q.options.find((o) => o.id === answers[q.id])
          return (
            <li key={q.id} className={styles.item}>
              <p className={styles.question}>{q.text}</p>
              <p className={styles.answer}>{selected ? selected.text : <em>Not answered</em>}</p>
            </li>
          )
        })}
      </ul>
      <div className={styles.actions}>
        <button className={styles.back} onClick={onBack}>Editar respuestas</button>
        <button className={styles.submit} onClick={onSubmit}>Ver mis cursos</button>
      </div>
    </div>
  )
}
