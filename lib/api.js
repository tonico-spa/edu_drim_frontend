const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw new Error('Unauthorized')
  }

  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

// User types
export const getUserTypes = () => request('/api/user-types')

// Auth
export const login = (email, password) =>
  request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })

export const register = (name, email, password, user_type_id) =>
  request('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, user_type_id }) })

export const forgotPassword = (email) =>
  request('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })

export const resetPassword = (token, password) =>
  request('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, password }) })

// Quiz
export const getQuizQuestions = () => request('/api/quiz/questions')

export const submitQuiz = (answers) =>
  request('/api/quiz/submit', { method: 'POST', body: JSON.stringify({ answers }) })

// Classes
export const getClasses = (tags, resource) => {
  const params = new URLSearchParams()
  if (tags?.length) params.set('tags', tags.join(','))
  if (resource) params.set('resource', resource)
  const q = params.toString() ? `?${params.toString()}` : ''
  return request(`/api/classes${q}`)
}

export const getClass = (id) => request(`/api/classes/${id}`)

// Catalog Courses
export const getCourses = (tags) => {
  const q = tags?.length ? `?tags=${tags.join(',')}` : ''
  return request(`/api/courses${q}`)
}

export const getCourse = (id) => request(`/api/courses/${id}`)

// Teacher Courses
export const getTeacherCourses = () => request('/api/teacher/courses')
export const getTeacherCourse = (id) => request(`/api/teacher/courses/${id}`)

export const saveCourse = (data) =>
  request('/api/teacher/courses', { method: 'POST', body: JSON.stringify(data) })

export const updateCourse = (id, data) =>
  request(`/api/teacher/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteCourse = (id) =>
  request(`/api/teacher/courses/${id}`, { method: 'DELETE' })
