'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './Navbar.module.css'

function getTeacherName() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
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
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setTeacherName(getTeacherName())

    function onAuthChange() {
      setTeacherName(getTeacherName())
    }
    window.addEventListener('auth-change', onAuthChange)
    return () => window.removeEventListener('auth-change', onAuthChange)
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function logout() {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('auth-change'))
    setOpen(false)
    router.push('/')
  }

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image src="/profe_stem_logo_simple.png" alt="EDU_DRIM" height={36} width={120} style={{ objectFit: 'contain' }} />
      </Link>

      <div className={styles.right} ref={dropdownRef}>
        <button className={styles.menuBtn} onClick={() => setOpen(!open)}>
          {teacherName && (
            <svg className={styles.personIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          )}
          <span className={styles.menuLabel}>
            {teacherName ? `` : 'Menú'}
          </span>
          <span className={`${styles.chevron} ${open ? styles.chevronUp : ''}`}>▾</span>
        </button>

        {open && (
          <div className={styles.dropdown}>
            {teacherName ? (
              <>
                <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setOpen(false)}>
                  Mi perfil
                </Link>
                <Link href="/my-courses" className={styles.dropdownItem} onClick={() => setOpen(false)}>
                  Mis cursos
                </Link>
                <button className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} onClick={logout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className={styles.dropdownItem} onClick={() => setOpen(false)}>
                  Crear cuenta
                </Link>
                <Link href="/login" className={styles.dropdownItem} onClick={() => setOpen(false)}>
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
