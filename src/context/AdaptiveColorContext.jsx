import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const DEFAULT_ACCENT = {
  primary: '#D4AF37',
  secondary: '#FFD700',
  rgb: '212, 175, 55',
  glow: 'rgba(212, 175, 55, 0.35)',
  soft: 'rgba(212, 175, 55, 0.12)',
}

const AdaptiveColorContext = createContext({
  accent: DEFAULT_ACCENT,
  setAccentFromProject: () => {},
  resetAccent: () => {},
})

function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean
  const num = parseInt(full, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

export function AdaptiveColorProvider({ children }) {
  const [accent, setAccent] = useState(DEFAULT_ACCENT)

  const applyAccent = useCallback((primary, secondary = primary) => {
    const { r, g, b } = hexToRgb(primary)
    const next = {
      primary,
      secondary,
      rgb: `${r}, ${g}, ${b}`,
      glow: `rgba(${r}, ${g}, ${b}, 0.4)`,
      soft: `rgba(${r}, ${g}, ${b}, 0.14)`,
    }
    setAccent(next)

    const root = document.documentElement
    root.style.setProperty('--adaptive', primary)
    root.style.setProperty('--adaptive-secondary', secondary)
    root.style.setProperty('--adaptive-rgb', next.rgb)
    root.style.setProperty('--adaptive-glow', next.glow)
    root.style.setProperty('--adaptive-soft', next.soft)
    root.style.setProperty('--gradient-adaptive', `linear-gradient(135deg, ${primary}, ${secondary})`)
  }, [])

  const setAccentFromProject = useCallback((project) => {
    if (!project?.accent) return
    applyAccent(project.accent, project.accentSecondary || project.accent)
  }, [applyAccent])

  const resetAccent = useCallback(() => {
    applyAccent(DEFAULT_ACCENT.primary, DEFAULT_ACCENT.secondary)
  }, [applyAccent])

  useEffect(() => {
    applyAccent(DEFAULT_ACCENT.primary, DEFAULT_ACCENT.secondary)
  }, [applyAccent])

  const value = useMemo(
    () => ({ accent, setAccentFromProject, resetAccent }),
    [accent, setAccentFromProject, resetAccent]
  )

  return (
    <AdaptiveColorContext.Provider value={value}>
      {children}
    </AdaptiveColorContext.Provider>
  )
}

export const useAdaptiveColor = () => useContext(AdaptiveColorContext)
