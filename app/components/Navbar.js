'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './Navbar.module.css'

function getTeacherName() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    // JWT exp check
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token')
      return null
    }
    return payload.name || null
  } catch {
    return null
  }
}

export default function Navbar() {
  const router = useRouter()
  const [teacherName, setTeacherName] = useState(null)

  useEffect(() => {
    setTeacherName(getTeacherName())

    function onAuthChange() {
      setTeacherName(getTeacherName())
    }
    window.addEventListener('auth-change', onAuthChange)
    return () => window.removeEventListener('auth-change', onAuthChange)
  }, [])

  function logout() {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('auth-change'))
    router.push('/')
  }

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoText}>EDU_DRIM</span>
      </Link>

      <div className={styles.right}>
        {teacherName ? (
          <>
            <Link href="/my-courses" className={styles.registerLink}>Mis cursos</Link>
            <span className={styles.name}>Hola, {teacherName}</span>
            <button className={styles.logoutBtn} onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link href="/register" className={styles.registerLink}>Crear cuenta</Link>
            <button className={styles.loginBtn} onClick={() => router.push('/login')}>Iniciar sesión</button>
          </>
        )}
      </div>
    </nav>
  )
}
