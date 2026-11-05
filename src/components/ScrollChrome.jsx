import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ScrollChrome() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduce ? 1000 : 120,
    damping: reduce ? 100 : 28,
    restDelta: 0.001,
  })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      {!reduce && <div className="scroll-veil" aria-hidden="true" />}
    </>
  )
}
