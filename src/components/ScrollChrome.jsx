import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ScrollChrome() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduce ? 1000 : 120,
    damping: reduce ? 100 : 28,
    restDelta: 0.001,
  })
  const [overFooter, setOverFooter] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { rootMargin: '0px 0px -120px 0px' },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      {!reduce && <div className={`scroll-veil ${overFooter ? 'is-off' : ''}`} aria-hidden="true" />}
    </>
  )
}
