'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { register } from '../../lib/api'
import styles from './register.module.css'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await register(name, email, password)
      localStorage.setItem('token', data.access_token)
      window.dispatchEvent(new Event('auth-change'))
      router.push('/quiz')
    } catch {
      setError('No se pudo crear la cuenta. El email puede ya estar en uso.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear cuenta</h1>
        <p className={styles.sub}>¿Ya tienes cuenta? <Link href="/login" className={styles.link}>Inicia sesión</Link></p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Nombre</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.label}>Contraseña</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </div>
  )
}
