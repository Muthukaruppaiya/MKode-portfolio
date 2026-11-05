import { createContext, useCallback, useContext, useState } from 'react'
import { flushSync } from 'react-dom'

const STORAGE_KEY = 'gc-theme'
const META_COLOR = { day: '#F3F6F1', night: '#0E1915' }

const ThemeContext = createContext({ theme: 'day', toggleTheme: () => {} })

function readTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'night' ? 'night' : 'day'
  } catch {
    return 'day'
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[theme])
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* private mode */
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme)

  const toggleTheme = useCallback((origin) => {
    const next = theme === 'day' ? 'night' : 'day'
    const commit = () => {
      applyTheme(next)
      flushSync(() => setTheme(next))
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce || !origin) {
      commit()
      return
    }

    const { x, y } = origin
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    document.startViewTransition(commit).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
