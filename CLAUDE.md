# EDU_DRIM Frontend — Claude Instructions

## What this app does

Next.js 14 (App Router) frontend for EDU_DRIM — an educational platform for teachers. The flow is:

1. **Landing** (`/`) — 3 marketing sections (Hero, How It Works, Why)
2. **Quiz** (`/quiz`) — teacher answers questions; on submit the backend scores answers by tag and returns matched tags + resource type
3. **Results** (`/results`) — shows personalized suggested classes (filtered by matched tags + resource type) and all available classes; teacher can add classes to their course
4. **Course Builder** (`/course-builder`) — split-panel UI: left sidebar = full class catalog, right canvas = drag-and-drop course assembly (via `@hello-pangea/dnd`); teacher names/describes their course and saves it
5. **My Courses** (`/my-courses`) — authenticated list of saved teacher courses with delete; click → detail view
6. **Class Detail** (`/classes/[id]`) — full detail page for a single class
7. **Auth** (`/login`, `/register`) — JWT-based login/register

---

## Stack

| Concern | Library |
|---------|---------|
| Framework | Next.js 14 App Router |
| Language | JavaScript (no TypeScript) |
| Styling | CSS Modules (one `.module.css` per component, colocated) |
| State | Zustand |
| Drag & drop | `@hello-pangea/dnd` |
| Rich text | `@portabletext/react` (Sanity content) |
| API | `lib/api.js` (central fetch wrapper) |

---

## Key conventions

- **One CSS Module per component**, file lives next to the component (e.g. `QuizQuestion.module.css` beside `QuizQuestion.js`)
- **All API calls go through `lib/api.js`** — never call `fetch` directly in a component
- **`'use client'`** only on components that use hooks, router, or event handlers
- **No prop drilling for cross-page state** — use Zustand stores
- **No TypeScript** — plain `.js` files throughout

---

## Project structure

```
app/
├── (landing)/          # Landing page sections (colocated, route-group)
│   ├── CTAButton.js / .module.css
│   ├── SectionHero.js / .module.css
│   ├── SectionHowItWorks.js / .module.css
│   └── SectionWhy.js / .module.css
├── classes/[id]/       # Class detail page
├── components/         # Shared components
│   └── Navbar.js / .module.css
├── course-builder/     # Course builder page + sub-components
│   ├── ClassCatalog.js / .module.css
│   ├── ClassItem.js / .module.css
│   ├── CourseCanvas.js / .module.css   ← drag-and-drop canvas
│   ├── SaveCourseModal.js / .module.css
│   └── page.js
├── login/
├── my-courses/
│   └── [id]/           # Course detail page
├── quiz/               # Quiz flow
│   ├── QuizProgress.js / .module.css
│   ├── QuizQuestion.js / .module.css
│   ├── QuizSummary.js / .module.css
│   └── page.js
├── register/
├── results/            # Results + class browsing
│   ├── AllCourses.js
│   ├── ClassCard.js / .module.css
│   ├── CourseCard.js / .module.css
│   ├── SuggestedCourses.js
│   └── page.js
├── globals.css
├── layout.js           # Root layout — wraps all pages with <Navbar />
└── page.js             # Landing page (assembles landing sections)

lib/
└── api.js              # All API calls — single source of truth

store/
├── quizStore.js        # Quiz state (questions, answers, matchedTags, resourceType, phase)
└── courseBuilderStore.js  # Course builder state (selectedClasses)
```

---

## Zustand stores

### `quizStore` (`store/quizStore.js`)
| Field | Type | Description |
|-------|------|-------------|
| `questions` | array | Loaded from `/api/quiz/questions` |
| `currentIndex` | number | Current question index |
| `answers` | object | `{ [questionId]: optionId }` |
| `matchedTags` | array | Tags returned after quiz submit |
| `resourceType` | string\|null | `'sin_tecnologia'` \| `'computador'` \| `'computador_internet'` \| `null` |
| `phase` | string | `'quiz'` \| `'summary'` |

### `courseBuilderStore` (`store/courseBuilderStore.js`)
| Field/Action | Description |
|--------------|-------------|
| `selectedClasses` | Array of class objects in the course |
| `addClass(class_)` | Add class (deduplicates by `id`) |
| `removeClass(id)` | Remove class by id |
| `reorderClasses(classes)` | Replace full ordered list (used by DnD) |
| `clearCourse()` | Reset to empty |

---

## `lib/api.js` — API reference

All functions call `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`). JWT token is read from `localStorage` and injected as `Authorization: Bearer <token>`. On 401, token is removed and user is redirected to `/login`.

| Function | Method | Endpoint |
|----------|--------|----------|
| `login(email, password)` | POST | `/api/auth/login` |
| `register(name, email, password)` | POST | `/api/auth/register` |
| `forgotPassword(email)` | POST | `/api/auth/forgot-password` |
| `resetPassword(token, password)` | POST | `/api/auth/reset-password` |
| `getQuizQuestions()` | GET | `/api/quiz/questions` |
| `submitQuiz(answers)` | POST | `/api/quiz/submit` |
| `getClasses(tags?, resource?)` | GET | `/api/classes[?tags=...&resource=...]` |
| `getClass(id)` | GET | `/api/classes/:id` |
| `getCourses(tags?)` | GET | `/api/courses[?tags=...]` |
| `getCourse(id)` | GET | `/api/courses/:id` |
| `getTeacherCourses()` | GET | `/api/teacher/courses` |
| `getTeacherCourse(id)` | GET | `/api/teacher/courses/:id` |
| `saveCourse(data)` | POST | `/api/teacher/courses` |
| `updateCourse(id, data)` | PUT | `/api/teacher/courses/:id` |
| `deleteCourse(id)` | DELETE | `/api/teacher/courses/:id` |

---

## Auth

- JWT stored in `localStorage` under key `token`
- `lib/api.js` attaches it automatically to every request
- Protected pages (`/my-courses`) check for the token on mount and redirect to `/login` if missing
- On any 401 response, `lib/api.js` clears the token and redirects globally

---

## Design system

- **Base background:** `#fff` (white throughout)
- **Primary (Rose Punch):** `#D73186` — buttons, links, logo, active states
- **Primary hover:** `#b8206e`
- **Primary tint bg:** `#fde8f4` — selected options, tag badges
- **Blue Bell:** `#4F98D3` — resource type badges (`background: #e8f3fb`)
- **Jungle Green:** `#33AA74` — match/success badges (`background: #e6f7f0`)
- **Old Gold:** `#B2B408` — level badges (`background: #fdf8d0`)
- **Border radius:** `8px` (buttons/inputs), `12px` (cards)
- **Border color:** `#e5e5e5`
- **Muted text:** `#555` / `#888` / `#999`
- **Font:** system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)

---

## Running locally

```bash
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL etc.
npm run dev                         # runs on http://localhost:3000
```

**Required env vars (`.env.local`):**
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend URL (default `http://localhost:8000`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For rendering Sanity rich text |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

---

## Resource type labels

Used in class cards and course detail views:

```js
const RESOURCE_LABELS = {
  sin_tecnologia:      'Sin tecnología',
  computador:          'Computador',
  computador_internet: 'Computador + internet',
}
```

---

## Known gaps / future work

- Pagination: backend supports `page` param but the frontend doesn't pass it yet
- Course sharing (read-only link) not implemented
- Course export (PDF) not implemented
- Admin analytics view not implemented
