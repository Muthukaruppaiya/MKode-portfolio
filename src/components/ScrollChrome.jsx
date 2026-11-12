import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ScrollChrome() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduce ? 1000 : 90,
    damping: reduce ? 100 : 32,
    restDelta: 0.001,
  })
  const topFade = useTransform(scrollYProgress, [0, 0.04, 0.12], [0, 0.55, 0.85])
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
      {!reduce && (
        <>
          <motion.div
            className="scroll-veil scroll-veil--top"
            style={{ opacity: topFade }}
            aria-hidden="true"
          />
          <div
            className={`scroll-veil scroll-veil--bottom ${overFooter ? 'is-off' : ''}`}
            aria-hidden="true"
          />
        </>
      )}
    </>
  )
}
